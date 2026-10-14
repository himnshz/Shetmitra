import React, { useState } from 'react';
import { Leaf, Mic, ShieldCheck, Hash, Database, Award, ArrowUpRight, CheckCircle2, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';
import { INITIAL_VOICE_MRV_LOGS } from '../data/mockAgriData';
import { Language, VoiceMRVRecord } from '../types';
import { apiService } from '../services/apiService';
import { speechService } from '../services/speechService';

interface PillarCarbonMRVProps {
  language: Language;
}

export const PillarCarbonMRV: React.FC<PillarCarbonMRVProps> = ({ language }) => {
  const [logs, setLogs] = useState<VoiceMRVRecord[]>(INITIAL_VOICE_MRV_LOGS);
  const [customVoiceInput, setCustomVoiceInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastLoggedRecord, setLastLoggedRecord] = useState<VoiceMRVRecord | null>(null);

  const samplePractices = [
    'मी आज २ एकरावर शून्य मशागत (Zero Tillage) पद्धतीने थेट पेरणी पूर्ण केली.',
    'कापूस पिकात युरिया ऐवजी शेणखत आणि जीवामृत टाकले आहे.',
    'ठिबक सिंचन वापरून पाण्याचा अपव्यय ४०% ने कमी केला.',
  ];

  const handleSimulateVoiceMRV = async (practiceText: string) => {
    setIsSubmitting(true);
    try {
      const res = await apiService.logVoiceMRV(practiceText, 'MH-JAL-84920', { lat: 21.0421, lng: 75.6124 });

      const newRecord: VoiceMRVRecord = {
        id: `mrv-${Date.now().toString().slice(-4)}`,
        farmerId: 'MH-JAL-84920',
        farmerName: 'भाऊराव पाटील (Bhaurao Patil)',
        timestamp: new Date().toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
        practiceSpoken: practiceText,
        verraMethodology: res?.verraMethodology || 'Verra VM0042 (Improved Agricultural Land Management)',
        acreage: 2.0,
        gpsCoordinates: { lat: 21.0421, lng: 75.6124 },
        cryptoHash: res?.hash || '0x' + Math.random().toString(16).slice(2, 34),
        carbonCreditsEstimated: parseFloat(res?.estimatedAnnualCO2PerAcre || '1.2'),
        estimatedEarningsINR: res?.calculatedPayoutEstimateINR || 1020,
        status: 'Hashed on Ledger',
      };

      setLogs([newRecord, ...logs]);
      setLastLoggedRecord(newRecord);
      setIsSubmitting(false);

      // Speak confirmation
      speechService.speak(
        `आपली ${practiceText} ही शेती पद्धत व्हॉईस एमआरव्ही द्वारे क्रिप्टोग्राफिकली नोंदवली गेली आहे. वेरा व्हीएम००४२ नुसार क्रेडिट्स समूहात जमा झाले.`,
        language
      );
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  const totalPoolCredits = logs.reduce((acc, curr) => acc + curr.carbonCreditsEstimated, 1850);
  const totalPoolEarnings = Math.round(totalPoolCredits * 850);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <Leaf className="w-4 h-4" />
            <span>स्तंभ ५: व्हॉईस एमआरव्ही व कार्बन क्रेडिट्स (Voice MRV & Carbon Market)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-indian mt-0.5">
            {language === 'mr' ? 'व्हॉईसने शेती पद्धती नोंदवा व कार्बन उत्पन्न मिळवा' : 'Voice MRV Protocol & Smallholder Carbon Aggregation'}
          </h2>
          <p className="text-xs text-stone-500">
            केंद्रीय कृषी मंत्रालय VCM 2024 फ्रेमवर्क • वेरा (Verra) VM0042 पद्धती • ब्लॉकचेन हॅशिंग
          </p>
        </div>

        {/* Price benchmark tag */}
        <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>१ कार्बन क्रेडिट = ₹८५० (CCTS बाजार भाव)</span>
        </div>
      </div>

      {/* Aggregation Pool Metric Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#18281a] to-[#121e14] text-white p-5 rounded-2xl border border-[#2d4631] shadow-md">
          <div className="text-xs text-stone-400 font-medium">जळगाव शेतकरी समूह (Farmer Cluster Pool)</div>
          <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 mt-1">४२० शेतकरी</div>
          <div className="text-xs text-stone-300 mt-1">लहान तुकडे एकत्र करून थेट ट्रेडिंग</div>
        </div>

        <div className="bg-gradient-to-br from-[#18281a] to-[#121e14] text-white p-5 rounded-2xl border border-[#2d4631] shadow-md">
          <div className="text-xs text-stone-400 font-medium">एकूण जमा कार्बन क्रेडिट्स (Verified tCO2e)</div>
          <div className="text-2xl md:text-3xl font-extrabold text-amber-300 mt-1">{totalPoolCredits.toLocaleString()} टन CO2e</div>
          <div className="text-xs text-stone-300 mt-1">Verra VM0042 मानकानुसार प्रमाणित</div>
        </div>

        <div className="bg-gradient-to-br from-[#18281a] to-[#121e14] text-white p-5 rounded-2xl border border-[#2d4631] shadow-md">
          <div className="text-xs text-stone-400 font-medium">समूहाचे अंदाजे अतिरिक्त उत्पन्न (Pool Value)</div>
          <div className="text-2xl md:text-3xl font-extrabold text-emerald-300 mt-1">₹{totalPoolEarnings.toLocaleString()}</div>
          <div className="text-xs text-stone-300 mt-1">थेट शेतकऱ्यांच्या बँक खात्यात वाटप</div>
        </div>
      </div>

      {/* Interactive Voice MRV Logging Section */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Mic className="w-5 h-5 text-emerald-600" />
              <span>व्हॉईस एमआरव्ही चाचणी (Test Voice MRV Practice Logger)</span>
            </h3>
            <p className="text-xs text-stone-500">
              शेतकरी शेतात जे काम करेल ते फक्त आवाजात सांगेल. शेतमित्र आपोआप जीपीएस व टाईमस्टॅम्पसह लेजरवर नोंदवेल.
            </p>
          </div>
        </div>

        {/* Quick Sample Voice Utterances */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            खालीलपैकी एका शेती कृतीवर क्लिक करा (किंवा स्वतः टाईप करा):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {samplePractices.map((text, idx) => (
              <button
                key={idx}
                disabled={isSubmitting}
                onClick={() => handleSimulateVoiceMRV(text)}
                className="p-3 rounded-xl bg-stone-50 hover:bg-emerald-50/80 border border-stone-200 hover:border-emerald-300 text-left text-xs font-medium text-stone-800 transition-all group flex flex-col justify-between"
              >
                <span className="font-devanagari leading-snug line-clamp-2">&ldquo;{text}&rdquo;</span>
                <span className="text-[10px] text-emerald-700 font-bold uppercase mt-2 group-hover:underline flex items-center gap-1">
                  व्हॉईसने नोंदवा <ArrowUpRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Last Logged Cryptographic Receipt */}
        {lastLoggedRecord && (
          <div className="mt-5 p-4 rounded-xl bg-emerald-950 text-white border border-emerald-700/80 shadow-md">
            <div className="flex items-center justify-between text-xs text-emerald-300 mb-2 font-mono">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                CRYPTO HASH VERIFIED ON LEDGER
              </span>
              <span>{lastLoggedRecord.timestamp}</span>
            </div>

            <div className="text-sm font-semibold font-devanagari text-stone-100">
              नोंदवलेली पद्धत: &ldquo;{lastLoggedRecord.practiceSpoken}&rdquo;
            </div>

            <div className="mt-3 pt-3 border-t border-emerald-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-stone-400 block text-[10px]">Methodology:</span>
                <span className="text-emerald-200 font-medium">VM0042 Land Mgmt</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Estimated tCO2e:</span>
                <span className="text-amber-300 font-bold">+{lastLoggedRecord.carbonCreditsEstimated} टन</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Estimated Earnings:</span>
                <span className="text-emerald-300 font-bold">+₹{lastLoggedRecord.estimatedEarningsINR}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">GPS Geo-Stamp:</span>
                <span className="text-stone-300">21.042°N, 75.612°E</span>
              </div>
            </div>

            <div className="mt-2 text-[10px] text-stone-400 font-mono truncate">
              SHA-256 Hash: <span className="text-emerald-400">{lastLoggedRecord.cryptoHash}</span>
            </div>
          </div>
        )}
      </div>

      {/* Historical Ledger Table */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>शेतकरी खाते नोंदवही (Immutable Ledger of Practices)</span>
          </h3>
          <span className="text-xs text-stone-500 font-mono">ICMGB CCTS Compliant</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-stone-500 uppercase font-semibold border-b border-stone-200">
              <tr>
                <th className="py-2.5 px-3">तारीख व वेळ</th>
                <th className="py-2.5 px-3">नोंदवलेली शेती पद्धत</th>
                <th className="py-2.5 px-3">वेरा पद्धती</th>
                <th className="py-2.5 px-3">कार्बन क्रेडिट्स</th>
                <th className="py-2.5 px-3">अपेक्षित मूल्य</th>
                <th className="py-2.5 px-3">स्थिती</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {logs.map((record) => (
                <tr key={record.id} className="hover:bg-stone-50/80">
                  <td className="py-3 px-3 font-mono text-stone-600 whitespace-nowrap">{record.timestamp}</td>
                  <td className="py-3 px-3 font-medium text-stone-900 font-devanagari max-w-xs">{record.practiceSpoken}</td>
                  <td className="py-3 px-3 text-stone-600 whitespace-nowrap">{record.verraMethodology.split('(')[0]}</td>
                  <td className="py-3 px-3 font-bold text-amber-700 whitespace-nowrap">+{record.carbonCreditsEstimated} tCO2e</td>
                  <td className="py-3 px-3 font-bold text-emerald-700 whitespace-nowrap">+₹{record.estimatedEarningsINR}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
