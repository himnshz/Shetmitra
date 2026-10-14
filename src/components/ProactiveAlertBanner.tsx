import React, { useState } from 'react';
import { BellRing, Volume2, TrendingUp, AlertCircle, Users, X, ChevronRight } from 'lucide-react';
import { PROACTIVE_ALERTS } from '../data/mockAgriData';
import { Language, ProactivePushAlert } from '../types';
import { speechService } from '../services/speechService';

interface ProactiveAlertBannerProps {
  language: Language;
  onSelectAlertAction?: (category: string) => void;
}

export const ProactiveAlertBanner: React.FC<ProactiveAlertBannerProps> = ({
  language,
  onSelectAlertAction,
}) => {
  const [alerts, setAlerts] = useState<ProactivePushAlert[]>(PROACTIVE_ALERTS);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);

  if (alerts.length === 0) return null;

  const currentAlert = alerts[activeAlertIndex] || alerts[0];

  const handleSpeakAlert = (alert: ProactivePushAlert) => {
    speechService.speak(alert.spokenAudioText, language);
  };

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-stone-950 rounded-2xl p-4 md:p-5 shadow-lg border-2 border-amber-300 relative overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center shrink-0 shadow">
            <BellRing className="w-5 h-5 animate-bounce" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-stone-950 text-amber-300 font-mono">
                PROACTIVE GUARDIAN PUSH
              </span>
              <span className="text-xs font-bold text-stone-900 font-mono">
                {currentAlert.timestamp}
              </span>
            </div>

            <h3 className="font-bold text-base md:text-lg text-stone-950 font-devanagari leading-snug">
              {language === 'mr' ? currentAlert.titleMr : currentAlert.titleEn}
            </h3>

            <p className="text-xs md:text-sm text-stone-900 mt-1 font-devanagari font-medium leading-relaxed max-w-3xl">
              {language === 'mr' ? currentAlert.bodyMr : currentAlert.bodyEn}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleSpeakAlert(currentAlert)}
                className="px-3.5 py-1.5 rounded-lg bg-stone-950 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-stone-900 transition-all shadow"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? 'हा अलर्ट आवाजात ऐका' : 'Listen by Voice'}</span>
              </button>

              <button
                onClick={() => onSelectAlertAction && onSelectAlertAction(currentAlert.category)}
                className="px-3.5 py-1.5 rounded-lg bg-white/90 text-stone-900 font-bold text-xs flex items-center gap-1 hover:bg-white transition-all shadow-sm border border-stone-300"
              >
                <span>{language === 'mr' ? currentAlert.actionLabelMr : currentAlert.actionLabelEn}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Next Alert & Dismiss Controls */}
        <div className="flex items-center gap-1">
          {alerts.length > 1 && (
            <div className="flex items-center gap-1 bg-stone-950/10 px-2 py-1 rounded-lg text-xs font-bold">
              <span>{activeAlertIndex + 1}/{alerts.length}</span>
              <button
                onClick={() => setActiveAlertIndex((prev) => (prev + 1) % alerts.length)}
                className="ml-1 hover:underline text-stone-950 font-bold"
              >
                पुढील »
              </button>
            </div>
          )}
          <button
            onClick={() => handleDismiss(currentAlert.id)}
            className="p-1 rounded-lg hover:bg-black/10 text-stone-900 transition-all"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
