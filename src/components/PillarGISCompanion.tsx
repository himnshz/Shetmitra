import React, { useState } from 'react';
import { Radio, Satellite, Volume2, CloudSun, MapPin, Sparkles, AlertTriangle, Layers, Play, Pause, Compass } from 'lucide-react';
import { GIS_DATA_POINTS } from '../data/mockAgriData';
import { Language } from '../types';
import { speechService } from '../services/speechService';

interface PillarGISCompanionProps {
  language: Language;
}

export const PillarGISCompanion: React.FC<PillarGISCompanionProps> = ({ language }) => {
  const [isPlayingBrief, setIsPlayingBrief] = useState(false);
  const [selectedTaluka, setSelectedTaluka] = useState(GIS_DATA_POINTS[0]);

  const morningBriefTextMr = `रामराम भाऊराव पाटील! आज २७ सप्टेंबर रोजी जळगाव जिल्ह्यात कमाल तापमान ३२ अंश तर किमान २२ अंश राहील, ढगाळ वातावरणामुळे संध्याकाळी हलक्या सरींची शक्यता आहे. नाशिक व लासलगाव बाजारात कांद्याची आवक २० टक्क्यांनी कमी झाल्यामुळे आजचे भाव प्रति क्विंटल अडीचशे रुपयांनी मजबूत झाले आहेत. महाडीबीटी शेततळे अनुदानाची मुदत फक्त दोन दिवसात संपत असून आजच अर्ज पूर्ण करा. आजचा कायदेशीर सल्ला: कोणताही खाजगी सावकार महिन्याला पाच टक्के व्याज आकारू शकत नाही; अशी मागणी झाल्यास तात्काळ नाल्सा १५१०० वर तक्रार करा. आपला दिवस शुभ जावो!`;

  const handleToggleMorningBrief = () => {
    if (isPlayingBrief) {
      speechService.stopSpeaking();
      setIsPlayingBrief(false);
    } else {
      setIsPlayingBrief(true);
      speechService.speak(morningBriefTextMr, language, () => {
        setIsPlayingBrief(false);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <Radio className="w-4 h-4" />
            <span>स्तंभ ६: दैनिक जीवन साथी व उपग्रह जीआयएस (Daily Companion & GIS Layer)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-indian mt-0.5">
            {language === 'mr' ? 'सकाळी ६ वाजताचा शेती बुलेटिन व उपग्रह पाहणी' : '6 AM Morning Farm Brief & GIS Satellite Layer'}
          </h2>
          <p className="text-xs text-stone-500">
            शेतकऱ्याला नकाशा बघायची गरज नाही - उपग्रहाचा डेटा थेट सोप्या मराठी आवाजात मिळतो (Sentinel-2 & Bhuvan)
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 flex items-center gap-2">
          <Satellite className="w-4 h-4 text-amber-700 animate-spin-slow" />
          <span>Sentinel-2 ५-दिवसीय Revisit Active</span>
        </div>
      </div>

      {/* 6 AM Morning Farm Brief Player */}
      <div className="bg-gradient-to-br from-[#162719] via-[#111e13] to-[#0d170e] text-white rounded-2xl p-6 border border-[#2b442d] shadow-lg relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <CloudSun className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  दैनिक व्हॉईस बुलेटिन
                </span>
                <span className="text-xs text-stone-400 font-mono">06:00 AM IST Broadcast</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mt-0.5">
                आजचा सकाळचा शेती संवाद (Personalized Morning Brief)
              </h3>
            </div>
          </div>

          <button
            onClick={handleToggleMorningBrief}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
              isPlayingBrief
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white ring-2 ring-emerald-400/30'
            }`}
          >
            {isPlayingBrief ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlayingBrief ? 'बुलेटिन थांबवा' : 'संपूर्ण बुलेटिन ऐका (Play Brief)'}</span>
          </button>
        </div>

        {/* Written Transcript of the 6 AM Brief */}
        <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-stone-200 text-sm font-devanagari leading-relaxed">
          &ldquo;{morningBriefTextMr}&rdquo;
        </div>

        {/* 4 Pillars of the Morning Brief */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-[#1e3422] border border-[#2f5136]">
            <span className="text-stone-400 block text-[10px]">१. हवामान (Weather):</span>
            <span className="text-white font-semibold">३२°C / हलक्या सरी</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#1e3422] border border-[#2f5136]">
            <span className="text-stone-400 block text-[10px]">२. मंडी भाव (Mandi):</span>
            <span className="text-emerald-300 font-semibold">+₹२५० कांदा तेजी</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#1e3422] border border-[#2f5136]">
            <span className="text-stone-400 block text-[10px]">३. योजना (Scheme):</span>
            <span className="text-amber-300 font-semibold">शेततळे ४८ तास मुदत</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#1e3422] border border-[#2f5136]">
            <span className="text-stone-400 block text-[10px]">४. कायदेशीर टीप (Legal):</span>
            <span className="text-rose-300 font-semibold">सावकारी व्याज मर्यादा</span>
          </div>
        </div>
      </div>

      {/* GIS Sentinel-2 Intelligence Simulation */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Satellite className="w-5 h-5 text-emerald-700" />
              <span>सेंटिनेल-२ उपग्रह वनस्पती निर्देशांक (Sentinel-2 Cropland NDVI Anomaly)</span>
            </h3>
            <p className="text-xs text-stone-500">
              पीक वाढ, काढणीची परिपक्वता व संभाव्य आवक लाट शोधण्यासाठी उपग्रह विश्लेषणाचा वापर:
            </p>
          </div>

          {/* Taluka Selector */}
          <div className="flex items-center gap-1.5">
            {GIS_DATA_POINTS.map((pt) => (
              <button
                key={pt.taluka}
                onClick={() => setSelectedTaluka(pt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedTaluka.taluka === pt.taluka
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-stone-50 text-stone-700 border-stone-200'
                }`}
              >
                {pt.taluka.split('/')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected GIS Data Inspection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* NDVI Health Gauge */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs text-stone-500 font-medium block">वर्तमान NDVI निर्देशांक (Current NDVI):</span>
            <div className="text-3xl font-extrabold text-stone-900 mt-1">{selectedTaluka.currentNDVI}</div>
            <div className={`text-xs font-semibold mt-1 ${selectedTaluka.ndviAnomalyVs3Yr >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
              {selectedTaluka.ndviAnomalyVs3Yr >= 0 ? '+' : ''}{(selectedTaluka.ndviAnomalyVs3Yr * 100).toFixed(0)}% (मागील ३ वर्षांच्या सरासरीपेक्षा)
            </div>
            <div className="mt-3 text-xs text-stone-600">
              पीक स्थिती: <strong className="text-stone-900">{selectedTaluka.cropStage}</strong>
            </div>
          </div>

          {/* Supply Glut Risk */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs text-stone-500 font-medium block">आवक लाट धोका (Supply Surge Risk):</span>
            <div className={`text-lg font-bold mt-1 ${selectedTaluka.supplySurgeRisk.includes('High') ? 'text-rose-700' : 'text-emerald-700'}`}>
              {selectedTaluka.supplySurgeRisk}
            </div>
            <div className="text-xs text-stone-600 mt-2">
              माती ओलावा: <strong className="text-stone-900">{selectedTaluka.soilMoistureIndex}</strong>
            </div>
          </div>

          {/* Spoken Alert generated from GIS */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block">
                शेतकऱ्याला मिळणारा थेट आवाज संदेश:
              </span>
              <p className="text-xs font-semibold text-emerald-950 mt-1 font-devanagari leading-snug">
                &ldquo;{selectedTaluka.microclimateAlertMr}&rdquo;
              </p>
            </div>
            <span className="text-[10px] text-emerald-700 font-mono mt-3">
              ISRO MOSDAC + IMD 0.25° Gridded
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
