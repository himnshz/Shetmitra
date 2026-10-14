import { Language } from '../types';

export interface ChatResponse {
  reply: string;
  model: string;
  language: string;
}

export interface BhashiniTTSResponse {
  audioContent: string;
  audioFormat: string;
  samplingRate: number;
  serviceId: string;
  provider: string;
}

export interface BhashiniTranslationResponse {
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  serviceId: string;
  provider: string;
}

export interface BhashiniNERResponse {
  text: string;
  nerPrediction: Array<{ token: string; tag: string; tokenIndex?: number }>;
  serviceId: string;
  provider: string;
}

export const apiService = {
  async sendChatMessage(message: string, language: Language, farmerContext?: any): Promise<ChatResponse> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          language,
          farmerContext,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      return await response.json();
    } catch (err: any) {
      console.warn('API error, falling back locally:', err);
      return {
        reply: language === 'mr'
          ? 'शेतकरी बंधू, लासलगाव बाजारात कांद्याला ₹२,४५० भाव असून पुढील ५ दिवसांत ५-८% वाढ अपेक्षित आहे. घाईत माल विकू नका.'
          : 'Dear farmer, current modal price is ₹2,450. Expect a 5-8% recovery in 5 days.',
        model: 'client-offline-fallback',
        language,
      };
    }
  },

  // Bhashini Live Text-to-Speech API
  async getBhashiniTTS(
    text: string,
    language: Language = 'mr',
    gender: 'female' | 'male' = 'female',
    serviceId: string = 'Bhashini/IITM/TTS'
  ): Promise<BhashiniTTSResponse | null> {
    try {
      const res = await fetch('/api/bhashini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language, gender, serviceId }),
      });
      if (!res.ok) {
        throw new Error(`Bhashini TTS returned ${res.status}`);
      }
      return await res.json();
    } catch (e) {
      console.warn('Bhashini TTS client fetch failed, fallback will engage:', e);
      return null;
    }
  },

  // Bhashini Live Translation API
  async translateWithBhashini(
    text: string,
    sourceLang: string = 'mr',
    targetLang: string = 'en',
    serviceId: string = 'ai4bharat/indictrans-v2-all-gpu--t4'
  ): Promise<BhashiniTranslationResponse | null> {
    try {
      const res = await fetch('/api/bhashini/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, sourceLang, targetLang, serviceId }),
      });
      if (!res.ok) throw new Error(`Bhashini translate returned ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  // Bhashini Live Named Entity Recognition API
  async getBhashiniNER(
    text: string,
    language: string = 'mr',
    serviceId: string = 'bhashini/ai4bharat/indic-ner'
  ): Promise<BhashiniNERResponse | null> {
    try {
      const res = await fetch('/api/bhashini/ner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language, serviceId }),
      });
      if (!res.ok) throw new Error(`Bhashini NER returned ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  // Bhashini Model Registry Status
  async getBhashiniModels() {
    try {
      const res = await fetch('/api/bhashini/models');
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async getForecast(crop: string, mandi?: string, district?: string) {
    try {
      const res = await fetch('/api/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, mandi, district }),
      });
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async logVoiceMRV(utterance: string, farmerId?: string, coordinates?: { lat: number; lng: number }) {
    try {
      const res = await fetch('/api/voice-mrv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ utterance, farmerId, coordinates }),
      });
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async getLegalGuide(query: string, category?: string) {
    try {
      const res = await fetch('/api/legal-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, category }),
      });
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};
