import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { Language, FarmerProfile } from '../types';
import { speechService } from '../services/speechService';
import { apiService } from '../services/apiService';

interface VoiceInterfaceProps {
  language: Language;
  farmerProfile: FarmerProfile;
  onQueryComplete?: (query: string, reply: string) => void;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({
  language,
  farmerProfile,
  onQueryComplete,
}) => {
  const isMr = language === 'mr';
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const currentMember =
    farmerProfile.familyMembers.find((m) => m.id === farmerProfile.selectedMemberId) ||
    farmerProfile.familyMembers[0];

  const suggestedQueries = [
    {
      id: 'q1',
      textMr: 'कांदा आज विकावा की ४ दिवस थांबावे?',
      textEn: 'Should I sell onion today or hold for 4 days?',
      category: isMr ? 'बाजार भाव' : 'Mandi Price',
    },
    {
      id: 'q2',
      textMr: 'सावकार दरमहा ५% व्याज मागतोय, हे कायदेशीर आहे का?',
      textEn: 'Moneylender charges 5% monthly interest, is this legal?',
      category: isMr ? 'सावकारी कायदा' : 'Anti-Usury Law',
    },
    {
      id: 'q3',
      textMr: 'मागेल त्याला शेततळे योजनेचे अनुदान किती मिळेल?',
      textEn: 'How much subsidy for Magel Tyala farm pond?',
      category: isMr ? 'शासकीय योजना' : 'Govt Subsidy',
    },
    {
      id: 'q4',
      textMr: 'मी आज २ एकरावर शून्य मशागत केली, कार्बन उत्पन्न नोंदवा',
      textEn: 'Recorded 2 acres zero-tillage, log Voice MRV carbon',
      category: isMr ? 'कार्बन उत्पन्न' : 'Carbon Credit',
    },
  ];

  // Default welcome response based on member
  useEffect(() => {
    const initialGreeting = isMr
      ? `रामराम ${currentMember.name.split(' ')[0]}! आज ${farmerProfile.district.split(' ')[0]} बाजारात कांद्याला ₹२,४५० भाव आहे. पुढील ४ दिवसांत आवक घटून भाव ५-८% वाढण्याची शक्यता आहे. बोला, शेतीविषयी काय मदत हवी आहे?`
      : `Welcome ${currentMember.name.split(' ')[0]}! Today in ${farmerProfile.district.split(' ')[0]} market, onion modal price is ₹2,450. A 5-8% recovery is projected in 4 days. Tap the microphone to speak your question.`;
    setAiResponse(initialGreeting);
  }, [language, currentMember.id, farmerProfile.district]);

  const handleToggleVoice = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      if (transcript) {
        processQuery(transcript);
      }
    } else {
      speechService.stopSpeaking();
      setIsSpeaking(false);
      setTranscript('');
      setIsListening(true);

      speechService.startListening(language, {
        onStart: () => setIsListening(true),
        onEnd: () => setIsListening(false),
        onError: (err) => {
          console.warn('Voice error:', err);
          setIsListening(false);
        },
        onResult: (text, isFinal) => {
          setTranscript(text);
          if (isFinal) {
            speechService.stopListening();
            setIsListening(false);
            processQuery(text);
          }
        },
      });
    }
  };

  const processQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    setIsLoading(true);
    try {
      const response = await apiService.sendChatMessage(queryText, language, {
        name: currentMember.name,
        district: farmerProfile.district,
        crops: currentMember.cropsManaged,
        landSize: `${farmerProfile.totalLandAcres} Acres`,
        soilType: farmerProfile.soilType,
      });

      setAiResponse(response.reply);
      setIsLoading(false);

      // Speak back the response
      setIsSpeaking(true);
      speechService.speak(response.reply, language, () => {
        setIsSpeaking(false);
      });

      if (onQueryComplete) {
        onQueryComplete(queryText, response.reply);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const handleChipClick = (queryText: string) => {
    setActiveChip(queryText);
    setTranscript(queryText);
    processQuery(queryText);
  };

  const handleStopAudio = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
  };

  const handleReplayAudio = () => {
    if (aiResponse) {
      setIsSpeaking(true);
      speechService.speak(aiResponse, language, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-sm relative overflow-hidden space-y-5">
      {/* Top Header Row with Active Profile */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 font-mono block">
            {isMr ? 'व्हॉईस-फर्स्ट कृषी सहाय्यक' : 'VOICE-FIRST AGRI INTELLIGENCE'}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif-indian mt-0.5">
            {isMr ? 'थेट मराठी आवाजात विचारा' : 'Speak Your Query in Vernacular Voice'}
          </h2>
          <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5 font-devanagari">
            <span>{currentMember.name}</span>
            <span aria-hidden="true">·</span>
            <span>{farmerProfile.village}, {farmerProfile.district.split(' ')[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{farmerProfile.totalLandAcres} {isMr ? 'एकर' : 'Acres'}</span>
          </div>
        </div>

        {/* Audio State / Action Buttons */}
        <div className="flex items-center gap-2">
          {isSpeaking ? (
            <button
              type="button"
              onClick={handleStopAudio}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <VolumeX className="w-4 h-4" />
              <span>{isMr ? 'आवाज थांबवा' : 'Stop Audio'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReplayAudio}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-1.5 border border-emerald-200 transition-all"
            >
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span>{isMr ? 'पुन्हा ऐका' : 'Listen Again'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Central Tactile Microphone Section */}
      <div className="py-4 sm:py-6 flex flex-col items-center justify-center text-center">
        {/* Animated Waveform Indicator */}
        <div className="h-9 flex items-center gap-1.5 mb-3" aria-hidden="true">
          <span className={`w-1.5 rounded-full transition-all ${isListening || isSpeaking ? 'wave-bar-1 bg-emerald-600' : 'h-2 bg-stone-200'}`} />
          <span className={`w-1.5 rounded-full transition-all ${isListening || isSpeaking ? 'wave-bar-2 bg-emerald-600' : 'h-3 bg-stone-200'}`} />
          <span className={`w-1.5 rounded-full transition-all ${isListening || isSpeaking ? 'wave-bar-3 bg-amber-500' : 'h-4 bg-stone-200'}`} />
          <span className={`w-1.5 rounded-full transition-all ${isListening || isSpeaking ? 'wave-bar-4 bg-emerald-600' : 'h-3 bg-stone-200'}`} />
          <span className={`w-1.5 rounded-full transition-all ${isListening || isSpeaking ? 'wave-bar-5 bg-amber-500' : 'h-2 bg-stone-200'}`} />
          <span className={`w-1.5 rounded-full transition-all ${isListening || isSpeaking ? 'wave-bar-6 bg-emerald-600' : 'h-1.5 bg-stone-200'}`} />
        </div>

        {/* Large Tactile Microphone Button (Ideal for Farmers in the Field) */}
        <div className="relative">
          {(isListening || isSpeaking) && (
            <span className="absolute -inset-3 rounded-full bg-emerald-500/20 animate-ping opacity-75 pointer-events-none" />
          )}

          <button
            type="button"
            onClick={handleToggleVoice}
            disabled={isLoading}
            aria-label={isListening ? 'Stop listening' : 'Start speaking'}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-200 tactile-button border-4 ${
              isListening
                ? 'bg-rose-600 text-white border-rose-200 ring-4 ring-rose-500/30 animate-pulse'
                : isSpeaking
                ? 'bg-amber-600 text-white border-amber-200 ring-4 ring-amber-500/30'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-200 ring-4 ring-emerald-600/20'
            }`}
          >
            {isListening ? (
              <MicOff className="w-10 h-10" />
            ) : isSpeaking ? (
              <Volume2 className="w-10 h-10 animate-bounce" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
            <span className="text-[11px] font-extrabold uppercase tracking-wider mt-1 font-mono">
              {isListening
                ? (isMr ? 'ऐकत आहे...' : 'Listening...')
                : isSpeaking
                ? (isMr ? 'बोलत आहे...' : 'Speaking...')
                : (isMr ? 'दाबा व बोला' : 'Tap to Speak')}
            </span>
          </button>
        </div>

        {/* Real-time transcript feedback */}
        <div className="mt-3 min-h-[28px] max-w-lg text-center">
          {isListening && (
            <p className="text-xs sm:text-sm font-semibold text-emerald-800 italic animate-pulse font-devanagari">
              &ldquo;{transcript || (isMr ? 'आपला प्रश्न बोला (उदा. कांदा आज विकावा का?)...' : 'Speak your query in your language...')}&rdquo;
            </p>
          )}
          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-800">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
              <span>{isMr ? 'कृषी मॉडेल व Agmarknet विश्लेषण सुरू आहे...' : 'Analyzing mandi arrivals & agri models...'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Spoken AI Guidance Card - High Contrast in Sunlight */}
      {aiResponse && (
        <div className="bg-[#fcfbf7] border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 font-mono">
                {isMr ? 'शेतमित्र सल्ला (मराठी व्हॉईस)' : 'SHETMITRA SPOKEN GUIDANCE'}
              </span>
            </div>

            {isSpeaking && (
              <span className="text-xs font-semibold text-amber-800 flex items-center gap-1 font-mono">
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-600" />
                <span>{isMr ? 'वाचून दाखवत आहे' : 'Speaking'}</span>
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-stone-900 font-medium font-devanagari">
            {aiResponse}
          </p>

          <div className="pt-2 border-t border-stone-200/80 flex flex-wrap items-center justify-between text-[11px] text-stone-500 gap-2">
            <div className="flex items-center gap-1.5 text-stone-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {isMr
                  ? 'कायदेशीर साक्षरता: ही माहिती आहे, कायदेशीर सल्ला नाही.'
                  : 'Legal Literacy: Educational information, not formal legal advice.'}
              </span>
            </div>

            <a
              href="tel:15100"
              className="text-stone-700 hover:text-stone-900 font-semibold flex items-center gap-1"
            >
              <span>NALSA मोफत:</span>
              <strong className="text-amber-800 font-mono">15100</strong>
            </a>
          </div>
        </div>
      )}

      {/* 4 Suggested Quick Questions with Clear Categories */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
          {isMr ? 'शेतकऱ्यांचे नेहमीचे प्रश्न (१-क्लिकने विचारा):' : 'Common Farmer Questions (Click to Ask):'}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {suggestedQueries.map((q) => {
            const queryText = isMr ? q.textMr : q.textEn;
            const isSelected = activeChip === queryText;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => handleChipClick(queryText)}
                className={`p-3 rounded-2xl text-left border transition-all flex items-start justify-between gap-2 ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-600 ring-1 ring-emerald-600'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                }`}
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block font-mono">
                    {q.category}
                  </span>
                  <p className="text-xs font-semibold text-stone-900 font-devanagari mt-0.5 leading-snug">
                    {queryText}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-1" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
