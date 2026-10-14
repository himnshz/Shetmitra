import React, { useState } from 'react';
import { Landmark, Clock, FileText, CheckCircle, ExternalLink, BellRing, Sparkles, Volume2, ShieldCheck, ChevronRight } from 'lucide-react';
import { SCHEMES_LIST } from '../data/mockAgriData';
import { Language, SchemeInfo } from '../types';
import { speechService } from '../services/speechService';

interface PillarSchemesCivicProps {
  language: Language;
}

export const PillarSchemesCivic: React.FC<PillarSchemesCivicProps> = ({ language }) => {
  const [selectedScheme, setSelectedScheme] = useState<SchemeInfo>(SCHEMES_LIST[0]);
  const [activeTab, setActiveTab] = useState<'schemes' | 'civic'>('schemes');

  const handleReadSchemeSteps = (scheme: SchemeInfo) => {
    const textToSpeak = `${scheme.titleMr}. अनुदान रक्कम ${scheme.subsidyAmount}. आवश्यक कागदपत्रे: ${scheme.documentsRequiredMr.join(', ')}. अर्ज करण्यासाठी महाडीबीटी पोर्टलवर लॉगिन करा.`;
    speechService.speak(textToSpeak, language);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            <span>स्तंभ ३: सक्रिय शासकीय योजना व नागरिक मार्गदर्शक (Schemes & Civic)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-indian mt-0.5">
            {language === 'mr' ? 'महाडीबीटी योजना, थेट अनुदान व ग्रामसभा हक्क' : 'MahaDBT Schemes & Civic Navigator'}
          </h2>
          <p className="text-xs text-stone-500">
            पुश नोटिफिकेशन्स (Push vs Polling) द्वारे ४८ तास आधी थेट व्हॉईस अलर्ट • कमी इंटरनेटवर कार्यरत
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            onClick={() => setActiveTab('schemes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'schemes'
                ? 'bg-emerald-700 text-white shadow'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            कृषी अनुदान योजना (Schemes)
          </button>
          <button
            onClick={() => setActiveTab('civic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'civic'
                ? 'bg-emerald-700 text-white shadow'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            नागरी हक्क व ग्रामसभा (Civic Rights)
          </button>
        </div>
      </div>

      {activeTab === 'schemes' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Schemes List */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              उपलब्ध योजना (Active Schemes):
            </div>
            {SCHEMES_LIST.map((scheme) => {
              const isSelected = scheme.id === selectedScheme.id;
              const isUrgent = scheme.hoursRemaining <= 48;

              return (
                <div
                  key={scheme.id}
                  onClick={() => setSelectedScheme(scheme)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-900 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm leading-snug">{scheme.titleMr}</h4>
                    {isUrgent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white whitespace-nowrap animate-pulse">
                        ४८ तास शिल्लक
                      </span>
                    )}
                  </div>

                  <div className={`mt-2 text-xs font-semibold ${isSelected ? 'text-amber-300' : 'text-emerald-700'}`}>
                    {scheme.subsidyAmount}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-stone-200/20">
                    <span className={isSelected ? 'text-stone-300' : 'text-stone-500'}>
                      अंतिम मुदत: {scheme.deadline.split('(')[0]}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-stone-400'}`} />
                  </div>
                </div>
              );
            })}

            {/* Architecture Explainer Badge */}
            <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-600">
              <span className="font-bold text-stone-800 block mb-1">💡 पुश आर्किटेक्चर (Push Architecture):</span>
              वारंवार ॲप रिफ्रेश न करता, योजना उघडताच थेट फोनवर व्हॉईस कॉल किंवा अलर्ट येतो. यामुळे बॅटरी व डेटा ७०% वाचतो.
            </div>
          </div>

          {/* Selected Scheme Detail View */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-200">
                <div>
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    {selectedScheme.department}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-stone-900 mt-0.5">
                    {selectedScheme.titleMr}
                  </h3>
                </div>

                <button
                  onClick={() => handleReadSchemeSteps(selectedScheme)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>व्हॉईसने ऐका (Speak Steps)</span>
                </button>
              </div>

              {/* Subsidy Highlight */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-amber-50/50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 font-medium">अनुदान स्वरूप व रक्कम:</span>
                  <div className="text-lg font-extrabold text-emerald-900 mt-0.5">{selectedScheme.subsidyAmount}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 font-medium">अंतिम मुदत:</span>
                  <div className="text-xs font-bold text-rose-700 mt-0.5">{selectedScheme.deadline}</div>
                </div>
              </div>

              {/* Eligibility */}
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  पात्रता निकष (Eligibility):
                </h4>
                <p className="text-sm font-medium text-stone-800 font-devanagari bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {selectedScheme.eligibilityMr}
                </p>
              </div>

              {/* Required Documents */}
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  आवश्यक कागदपत्रे (Required Documents):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedScheme.documentsRequiredMr.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-100 text-xs text-stone-800 font-medium">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step by step procedure */}
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  अर्ज करण्याची सोपी पद्धत (Application Steps):
                </h4>
                <div className="space-y-1.5">
                  {selectedScheme.applicationStepsMr.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-medium bg-emerald-50/40 p-2 rounded-lg border border-emerald-100/60">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Portal Action */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                शेतमित्र एआय थेट महाडीबीटी पोर्टलशी जोडले आहे.
              </span>
              <a
                href={selectedScheme.portalUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow"
              >
                <span>शासकीय पोर्टल उघडा</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Civic Rights Layer */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              🏛️
            </div>
            <h3 className="font-bold text-base text-stone-900">ग्रामसभा बैठक सूचना व विषय</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-devanagari">
              ग्रामसभा ही खऱ्या अर्थाने गावाची संसद आहे. पेसा (PESA) क्षेत्रातील ग्रामपंचायतींमध्ये जल, जंगल व जमिनीचे हक्क ग्रामसभेला आहेत.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-1">
              <div className="font-bold text-stone-800">पुढील ग्रामसभा तारीख:</div>
              <div className="text-emerald-700 font-semibold">२६ जानेवारी / १५ ऑगस्ट / २ ऑक्टोबर व २६ नोव्हेंबर</div>
              <div className="text-stone-500 text-[11px] mt-1">*अध्यक्ष व सरपंचांना ३ दिवस आधी नोटीस देणे सक्तीचे आहे.</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              ⚡
            </div>
            <h3 className="font-bold text-base text-stone-900">शेती वीज व डीपी बिघाड तक्रार</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-devanagari">
              महावितरण नियमावलीनुसार शेती पंपाचा ट्रान्सफॉर्मर (DP) जळाल्यास ७२ तासांच्या आत मोफत बदलून देणे वीज कंपनीवर बंधनकारक आहे.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-1">
              <div className="font-bold text-stone-800">तक्रार नोंदणी टोल-फ्री क्रमांक:</div>
              <div className="text-amber-800 font-mono font-bold">1912 / 1800-233-3435</div>
              <div className="text-stone-500 text-[11px] mt-1">शेतमित्र व्हॉईस द्वारे थेट कंप्लेंट क्रमांक मिळवा.</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              🌾
            </div>
            <h3 className="font-bold text-base text-stone-900">रेशन कार्ड ई-केवायसी व अन्न हक्क</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-devanagari">
              राष्ट्रीय अन्न सुरक्षा कायदा (NFSA) अंतर्गत अंत्योदय व प्राधान्य कुटुंब योजनेतील लाभार्थ्यांची ई-केवायसी पडताळणी मोफत आहे.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-1">
              <div className="font-bold text-stone-800">अडचण आल्यास संपर्क:</div>
              <div className="text-sky-800 font-mono font-bold">1800-22-4950 (अन्न व नागरी पुरवठा)</div>
              <div className="text-stone-500 text-[11px] mt-1">रास्त भाव दुकानदाराने धान्य नाकारल्यास तक्रार करा.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
