import { Language } from '../types';
import { apiService } from './apiService';

export interface SpeechCallback {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
  onResult?: (transcript: string, isFinal: boolean) => void;
}

export type VoiceEngine = 'bhashini_iitm' | 'bhashini_ai4bharat' | 'browser_native';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private recognition: any = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private isSpeaking = false;
  private isListening = false;
  private preferredEngine: VoiceEngine = 'bhashini_iitm';
  private activeEngineUsed: string = 'Bhashini (IIT Madras)';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public setPreferredEngine(engine: VoiceEngine) {
    this.preferredEngine = engine;
  }

  public getActiveEngineUsed(): string {
    return this.activeEngineUsed;
  }

  public async speak(
    text: string,
    language: Language = 'mr',
    onComplete?: () => void
  ) {
    this.stopSpeaking();

    // Clean text for speech synthesis
    const cleanText = text
      .replace(/[*_#`~[\]()]/g, ' ')
      .replace(/₹/g, ' रुपये ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      if (onComplete) onComplete();
      return;
    }

    // 1. Try Bhashini National Language Infrastructure TTS First
    try {
      const serviceId =
        this.preferredEngine === 'bhashini_ai4bharat'
          ? 'ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4'
          : 'Bhashini/IITM/TTS';

      this.isSpeaking = true;
      const bhashiniRes = await apiService.getBhashiniTTS(
        cleanText.slice(0, 300), // Bhashini optimal chunk
        language,
        'female',
        serviceId
      );

      if (bhashiniRes && bhashiniRes.audioContent) {
        this.activeEngineUsed = `${bhashiniRes.serviceId} (${bhashiniRes.provider})`;
        const audioSrc = `data:audio/${bhashiniRes.audioFormat || 'wav'};base64,${bhashiniRes.audioContent}`;
        const audio = new Audio(audioSrc);
        this.currentAudioElement = audio;

        audio.onended = () => {
          this.isSpeaking = false;
          this.currentAudioElement = null;
          if (onComplete) onComplete();
        };

        audio.onerror = (e) => {
          console.warn('Bhashini audio playback failed, falling back to browser:', e);
          this.currentAudioElement = null;
          this.speakBrowserFallback(cleanText, language, onComplete);
        };

        await audio.play();
        return;
      }
    } catch (err) {
      console.warn('Bhashini TTS attempt caught error, falling back:', err);
    }

    // 2. Fallback to Browser Speech Synthesis
    this.speakBrowserFallback(cleanText, language, onComplete);
  }

  private speakBrowserFallback(text: string, language: Language, onComplete?: () => void) {
    this.activeEngineUsed = 'Browser SpeechSynthesis (Fallback)';
    if (!this.synth) {
      this.isSpeaking = false;
      if (onComplete) onComplete();
      return;
    }

    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = this.synth.getVoices();
    let selectedVoice: SpeechSynthesisVoice | null = null;

    if (language === 'mr') {
      selectedVoice =
        voices.find((v) => v.lang.includes('mr') || v.name.toLowerCase().includes('marathi')) ||
        voices.find((v) => v.lang.includes('hi')) ||
        voices.find((v) => v.lang.includes('en-IN')) ||
        null;
    } else if (language === 'hi') {
      selectedVoice =
        voices.find((v) => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi')) ||
        voices.find((v) => v.lang.includes('en-IN')) ||
        null;
    } else {
      selectedVoice = voices.find((v) => v.lang.includes('en-IN') || v.name.toLowerCase().includes('india')) || null;
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onComplete) onComplete();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onComplete) onComplete();
    };

    this.synth.speak(utterance);
  }

  public stopSpeaking() {
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch (e) {
        // ignore
      }
      this.currentAudioElement = null;
    }

    if (this.synth) {
      this.synth.cancel();
    }

    this.isSpeaking = false;
  }

  public startListening(language: Language, callbacks: SpeechCallback) {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not available in browser');
      if (callbacks.onError) callbacks.onError('Speech Recognition not supported in this browser');
      return;
    }

    try {
      this.stopListening();

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

      this.recognition.onstart = () => {
        this.isListening = true;
        if (callbacks.onStart) callbacks.onStart();
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const transcript = finalTranscript || interimTranscript;
        const isFinal = Boolean(finalTranscript);
        if (callbacks.onResult && transcript) {
          callbacks.onResult(transcript, isFinal);
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        this.isListening = false;
        if (callbacks.onError) callbacks.onError(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (callbacks.onEnd) callbacks.onEnd();
      };

      this.recognition.start();
    } catch (err) {
      console.error('Failed to start listening:', err);
      this.isListening = false;
      if (callbacks.onError) callbacks.onError(err);
    }
  }

  public stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.recognition = null;
      this.isListening = false;
    }
  }

  public getSpeakingState() {
    return this.isSpeaking;
  }

  public getListeningState() {
    return this.isListening;
  }
}

export const speechService = new SpeechService();
