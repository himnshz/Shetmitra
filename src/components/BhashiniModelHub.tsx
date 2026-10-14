import React, { useState } from 'react';
import { Cpu, Volume2, Globe, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Play, RefreshCw, Key, Layers, Mic } from 'lucide-react';
import { apiService } from '../services/apiService';
import { speechService } from '../services/speechService';
import { Language } from '../types';

interface BhashiniModelHubProps {
  language: Language;
  onClose?: () => void;
}

export const BhashiniModelHub: React.FC<BhashiniModelHubProps> = ({ language, onClose }) => {
  // TTS State
  const [ttsInput, setTtsInput] = useState('रामराम शेतकरी बंधू! आज लासलगाव बाजारात कांद्याचे भाव वाढले आहेत.');
  const [selectedTtsModel, setSelectedTtsModel] = useState('Bhashini/IITM/TTS');
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const [ttsStatus, setTtsStatus] = useState<string | null>(null);

  // Translation State
  const [transInput, setTransInput] = useState('कांदा आज विकावा की ५ दिवस थांबावे?');
  const [transSource, setTransSource] = useState('mr');
  const [transTarget, setTransTarget] = useState('en');
  const [transOutput, setTransOutput] = useState('');
  const [isTransLoading, setIsTransLoading] = useState(false);

  // NER State
  const [nerInput, setNerInput] = useState('भाऊराव पाटील जळगाव येथे ४ एकरावर कापूस आणि सोयाबीन पिकवतात.');
  const [nerResults, setNerResults] = useState<any[]>([]);
  const [isNerLoading, setIsNerLoading] = useState(false);

  const handleTestTTS = async () => {
    setIsTtsLoading(true);
    setTtsStatus('Bhashini Dhruva Pipeline शी संपर्क करत आहे...');

    try {
      const res = await apiService.getBhashiniTTS(ttsInput, language, 'female', selectedTtsModel);
      if (res && res.audioContent) {
        setTtsStatus(`यशस्वी! मॉडेल: ${res.serviceId} (${res.provider}) • ${res.samplingRate}Hz WAV`);
        const audio = new Audio(`data:audio/wav;base64,${res.audioContent}`);
        audio.play();
      } else {
        setTtsStatus('Bhashini कडून ऑडिओ प्राप्त झाला नाही, फॉलबॅक वापरला जाईल.');
      }
    } catch (e: any) {
      setTtsStatus(`त्रुटी: ${e?.message || 'TTS अयशस्वी'}`);
    } finally {
      setIsTtsLoading(false);
    }
  };

  const handleTestTranslate = async () => {
    setIsTransLoading(true);
    try {
      const res = await apiService.translateWithBhashini(transInput, transSource, transTarget);
      if (res) {
        setTransOutput(res.translatedText);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTransLoading(false);
    }
  };

  const handleTestNER = async () => {
    setIsNerLoading(true);
    try {
      const res = await apiService.getBhashiniNER(nerInput, 'mr');
      if (res && res.nerPrediction) {
        setNerResults(res.nerPrediction);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsNerLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-300 shadow-xl p-5 md:p-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-700 via-blue-700 to-emerald-700 text-white flex items-center justify-center font-bold shadow-md">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-indian">
                भाषिणी राष्ट्रीय भाषा तंत्रज्ञान केंद्र (Bhashini AI Hub)
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                LIVE INFERENCE ACTIVE
              </span>
            </div>
            <p className="text-xs text-stone-500">
              इलेक्ट्रॉनिक्स आणि माहिती तंत्रज्ञान मंत्रालय (MeitY) • ध्रुव (Dhruva) REST API इंटिग्रेशन
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs transition-all"
          >
            डॅशबोर्डवर परत जा (Close Hub)
          </button>
        )}
      </div>

      {/* Authenticated Credentials Ribbon */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-stone-900 via-[#18261b] to-stone-900 text-white border border-stone-700 shadow-inner grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
        <div>
          <span className="text-stone-400 block text-[10px]">Udyat Key (User ID):</span>
          <span className="text-emerald-300 font-semibold truncate block">Configured via BHASHINI_USER_ID</span>
        </div>
        <div>
          <span className="text-stone-400 block text-[10px]">Dhruva Inference Key:</span>
          <span className="text-amber-300 font-semibold truncate block">Configured via BHASHINI_INFERENCE_KEY</span>
        </div>
        <div>
          <span className="text-stone-400 block text-[10px]">Gateway Endpoint:</span>
          <span className="text-stone-300 truncate block">dhruva-api.bhashini.gov.in</span>
        </div>
      </div>

      {/* Model Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Live Bhashini TTS Playground */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span>१. टेक्स्ट-टू-स्पीच (TTS Model Playground)</span>
            </h3>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
              WAV 22kHz Audio
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-600 block mb-1">
              वाचून दाखवण्यासाठी मजकूर (Input Text in Marathi):
            </label>
            <textarea
              value={ttsInput}
              onChange={(e) => setTtsInput(e.target.value)}
              rows={3}
              className="w-full text-xs font-devanagari p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-600 font-semibold">मॉडेल:</span>
              <select
                value={selectedTtsModel}
                onChange={(e) => setSelectedTtsModel(e.target.value)}
                className="text-xs font-semibold p-1.5 rounded-lg border border-stone-300 bg-white"
              >
                <option value="Bhashini/IITM/TTS">Bhashini/IITM/TTS (IIT Madras)</option>
                <option value="ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4">
                  ai4bharat/indic-tts-coqui (AI4Bharat)
                </option>
              </select>
            </div>

            <button
              onClick={handleTestTTS}
              disabled={isTtsLoading}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow"
            >
              {isTtsLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isTtsLoading ? 'जनरेट होत आहे...' : 'भाषिणी आवाजात ऐका'}</span>
            </button>
          </div>

          {ttsStatus && (
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
              {ttsStatus}
            </div>
          )}
        </div>

        {/* 2. Live Bhashini NMT Translation */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-700" />
              <span>२. भाषांतर मॉडेल (IndicTrans-v2 NMT)</span>
            </h3>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded font-mono">
              ai4bharat/indictrans-v2
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-600 block mb-1">
              मूळ वाक्य (Source Text):
            </label>
            <input
              type="text"
              value={transInput}
              onChange={(e) => setTransInput(e.target.value)}
              className="w-full text-xs font-devanagari p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-stone-600">दिशा:</span>
              <span className="px-2 py-1 rounded bg-stone-200 font-mono font-bold">मराठी (mr)</span>
              <ArrowRight className="w-3 h-3 text-stone-400" />
              <span className="px-2 py-1 rounded bg-stone-200 font-mono font-bold">English (en)</span>
            </div>

            <button
              onClick={handleTestTranslate}
              disabled={isTransLoading}
              className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow"
            >
              {isTransLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{isTransLoading ? 'अनुवाद सुरू...' : 'भाषांतर करा'}</span>
            </button>
          </div>

          {transOutput && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-[10px] uppercase font-bold text-blue-900 block mb-0.5">
                भाषिणी IndicTrans-v2 भाषांतर:
              </span>
              <p className="text-xs font-bold text-blue-950 font-sans">{transOutput}</p>
            </div>
          )}
        </div>

        {/* 3. Named Entity Recognition (NER) */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-700" />
              <span>३. कृषी घटक ओळख (Indic NER)</span>
            </h3>
            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded font-mono">
              bhashini/ai4bharat/indic-ner
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-600 block mb-1">
              तपासण्यासाठी मराठी शेती वाक्य:
            </label>
            <input
              type="text"
              value={nerInput}
              onChange={(e) => setNerInput(e.target.value)}
              className="w-full text-xs font-devanagari p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>

          <button
            onClick={handleTestNER}
            disabled={isNerLoading}
            className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow"
          >
            {isNerLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Layers className="w-3.5 h-3.5" />}
            <span>{isNerLoading ? 'घटक शोधत आहे...' : 'नाव / पीक / जागा घटक ओळखा'}</span>
          </button>

          {nerResults.length > 0 && (
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-purple-900 block mb-1">
                ओळखलेले घटक (NER Tags):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {nerResults.map((item, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded text-[11px] font-bold ${
                      item.tag.includes('PER')
                        ? 'bg-amber-200 text-amber-900'
                        : item.tag.includes('LOC')
                        ? 'bg-emerald-200 text-emerald-900'
                        : item.tag.includes('ORG')
                        ? 'bg-blue-200 text-blue-900'
                        : 'bg-stone-200 text-stone-800'
                    }`}
                  >
                    {item.token} ({item.tag})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. ASR & Speech Model Catalogue */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Mic className="w-4 h-4 text-rose-700" />
              <span>४. व्हॉईस रेकग्निशन (ASR Service IDs)</span>
            </h3>
            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
              Active Config
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-white border border-stone-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-stone-900 block">bhashini/ai4bharat/conformer-multilingual-asr</span>
                <span className="text-[11px] text-stone-500">AI4Bharat • मराठी, हिंदी, इंग्रजी, गुजराती सह २२ भाषा</span>
              </div>
              <span className="text-emerald-700 font-bold text-[10px]">DEFAULT</span>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-stone-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-stone-900 block">ai4bharat/conformer-multilingual-indo_aryan-gpu--t4</span>
                <span className="text-[11px] text-stone-500">AI4Bharat • इंडो-आर्यन भाषा विशेष मॉडेल</span>
              </div>
              <span className="text-stone-500 font-bold text-[10px]">T4 GPU</span>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-stone-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-stone-900 block">bhashini/iitm/asr-indoaryan--gpu--t4</span>
                <span className="text-[11px] text-stone-500">IIT Madras • मराठी, हिंदी, पंजाबी, बंगाली</span>
              </div>
              <span className="text-stone-500 font-bold text-[10px]">IITM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
