import React, { useState } from 'react';
import { Scale, ShieldAlert, PhoneCall, CheckCircle2, AlertOctagon, HelpCircle, FileCheck, ExternalLink, Volume2 } from 'lucide-react';
import { LEGAL_GUIDES } from '../data/mockAgriData';
import { Language, LegalStatuteGuide } from '../types';
import { speechService } from '../services/speechService';

interface PillarLegalEngineProps {
  language: Language;
}

export const PillarLegalEngine: React.FC<PillarLegalEngineProps> = ({ language }) => {
  const [selectedGuide, setSelectedGuide] = useState<LegalStatuteGuide>(LEGAL_GUIDES[0]);

  const handleSpeakLegalSummary = (guide: LegalStatuteGuide) => {
    const textToSpeak = `${guide.statuteName}. ${guide.keyRuleSummaryMr}. ही माहिती आहे, कायदेशीर सल्ला नाही. मोफत मदतीसाठी राष्ट्रीय विधी सेवा प्राधिकरण टोल फ्री १५१०० वर कॉल करा.`;
    speechService.speak(textToSpeak, language);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner with Mandatory Legal Disclaimer */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>स्तंभ ४: कायदेशीर साक्षरता व हक्क इंजिन (Legal Awareness & Rights)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-indian mt-0.5">
            {language === 'mr' ? 'शेतकरी कायदेशीर हक्क, सावकारी संरक्षण व नाल्सा (NALSA)' : 'Farmer Legal Rights & NALSA Protection'}
          </h2>
          <p className="text-xs text-stone-500">
            संरचित ज्ञान प्रणाली (Structured Knowledge Engine) • शून्य हॅल्युसिनेशन (Zero Hallucination) • भारतीय संविधानाचे कलम ३९-अ
          </p>
        </div>

        {/* NALSA 15100 Direct Action Badge */}
        <a
          href="tel:15100"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-red-800 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:from-rose-800 hover:to-red-900 transition-all border border-red-500/30"
        >
          <PhoneCall className="w-4 h-4 text-rose-200 animate-bounce" />
          <div className="text-left leading-tight">
            <span className="text-[10px] text-rose-200 block uppercase font-mono">NALSA मोफत विधी सहाय्य</span>
            <span className="text-sm font-extrabold">टोल-फ्री: १५१०० (15100)</span>
          </div>
        </a>
      </div>

      {/* Prominent Legal Disclaimer Box */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900">
          <strong className="font-bold text-amber-950 block mb-0.5">
            कायदेशीर साक्षरता अस्वीकरण (Mandatory Spoken Disclaimer):
          </strong>
          &ldquo;ही माहिती आहे, कायदेशीर सल्ला नाही (This is legal literacy information, not professional legal counsel).&rdquo;
          शेतमित्र एआय न्यायालयातील वकिलांची जागा घेत नाही, तर शेतकऱ्याला कायद्याची माहिती देऊन राष्ट्रीय विधी सेवा प्राधिकरण (NALSA) च्या मोफत पॅनेल वकिलांशी जोडते.
        </div>
      </div>

      {/* Main Grid: Legal Inquiries & Detailed Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Category Inquiries Selector */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            वारंवार विचारले जाणारे कायदेशीर प्रश्न:
          </div>

          {LEGAL_GUIDES.map((guide) => {
            const isSelected = guide.id === selectedGuide.id;

            return (
              <div
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#1e2a22] text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                    guide.category === 'moneylending'
                      ? 'bg-rose-900/60 text-rose-300 border border-rose-700/50'
                      : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                  }`}>
                    {guide.category === 'moneylending' ? 'सावकारी संरक्षण' : guide.category === 'land_revenue' ? 'जमीन महसूल कायदा' : 'पीक विमा तक्रार'}
                  </span>
                </div>

                <p className="text-xs font-semibold font-devanagari leading-snug line-clamp-2">
                  &ldquo;{guide.querySampleMr}&rdquo;
                </p>

                <div className="mt-3 pt-2 border-t border-stone-200/20 text-[11px] flex justify-between items-center">
                  <span className={isSelected ? 'text-stone-300' : 'text-stone-500'}>
                    कायदा: {guide.statuteName.split('(')[0]}
                  </span>
                </div>
              </div>
            );
          })}

          {/* District Legal Services Authority Card */}
          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-2 text-xs">
            <h4 className="font-bold text-stone-800 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>जिल्हा विधी सेवा प्राधिकरण (DLSA)</span>
            </h4>
            <p className="text-stone-600 font-devanagari text-[11px] leading-relaxed">
              प्रत्येक जिल्हा न्यायालयामध्ये DLSA कार्यालय असते. अल्पभूधारक, महिला व अनुसूचित जाती/जमातीच्या शेतकऱ्यांना शासनमान्य वकिलांमार्फत मोफत खटला लढण्याची सोय उपलब्ध आहे.
            </p>
          </div>
        </div>

        {/* Selected Legal Guide Detail Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                  लागू असणारा कायदा (Applicable Statute):
                </span>
                <h3 className="text-base md:text-lg font-bold text-stone-900 mt-0.5">
                  {selectedGuide.statuteName}
                </h3>
              </div>

              <button
                onClick={() => handleSpeakLegalSummary(selectedGuide)}
                className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold text-xs flex items-center gap-1.5 transition-all border border-rose-200"
              >
                <Volume2 className="w-4 h-4" />
                <span>हक्क आवाजात ऐका (Spoken Rights)</span>
              </button>
            </div>

            {/* Core Rule in Plain Marathi */}
            <div className="mt-4 p-4 rounded-xl bg-rose-50/70 border border-rose-200">
              <div className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-1">
                थेट व स्पष्ट कायद्याचा नियम (Key Legal Truth):
              </div>
              <p className="text-sm font-bold text-rose-950 font-devanagari leading-snug">
                {selectedGuide.keyRuleSummaryMr}
              </p>
            </div>

            {/* Detailed Legal Provisions */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                शेतकऱ्याला मिळालेले कायदेशीर हक्क व कलमे:
              </h4>
              <div className="space-y-2">
                {selectedGuide.legalRightsPointsMr.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-800 font-medium font-devanagari">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Action Steps */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                शेतकऱ्याने प्रत्यक्ष काय पावले उचलावीत? (Actionable Steps):
              </h4>
              <div className="space-y-1.5">
                {selectedGuide.actionStepsMr.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs text-stone-800 font-semibold font-devanagari">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Call to Action with 15100 */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-3.5 rounded-xl">
            <div className="text-xs text-stone-600 font-devanagari">
              कोणतीही फी न भरता शासकीय विधी सहाय्य मिळवण्यासाठी फोन उचला:
            </div>
            <a
              href="tel:15100"
              className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>१५१०० वर कॉल करा (Call NALSA 15100)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
