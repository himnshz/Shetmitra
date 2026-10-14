import React, { useState } from 'react';
import { Presentation, TrendingUp, DollarSign, Award, ShieldCheck, HeartHandshake, FileText, CheckCircle2, Users, ChevronRight, Zap } from 'lucide-react';
import { PITCH_METRICS } from '../data/mockAgriData';
import { Language } from '../types';

interface InvestorPitchRoomProps {
  language: Language;
  onExit: () => void;
}

export const InvestorPitchRoom: React.FC<InvestorPitchRoomProps> = ({ language, onExit }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const slides = [
    {
      id: 'story',
      title: '१. द फाउंडिंग स्टोरी (The Human Anchor)',
      subtitle: 'माझ्या चुलत्यांचे कापूस पीक आणि माहितीची तफावत',
      content: (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300">
            <h4 className="font-bold text-amber-950 text-base mb-2 font-serif-indian">
              &ldquo;आम्ही शेतीमुळे नव्हे, तर योग्य माहिती वेळेवर न मिळाल्यामुळे हरलो.&rdquo;
            </h4>
            <p className="text-sm text-amber-900 leading-relaxed font-devanagari">
              माझ्या चुलत्यांनी संपूर्ण खरीप हंगामात जिवापाड मेहनत करून कापूस पिकवला. बाजार भाव वाढतील या आशेने महिनाभर वाट पाहिली. घरात पैशांची चणचण वाढल्याने शेवटी अधीर होऊन त्यांनी स्थानिक व्यापाऱ्याला कमी भावात माल विकला. अवघ्या दोन दिवसांनंतर बाजार समितीमध्ये कापसाचे भाव प्रचंड वाढले! महिन्यांची मेहनत दोन दिवसांच्या माहितीच्या अभावामुळे वाया गेली.
            </p>
            <p className="text-xs text-amber-800 font-bold mt-3">
              👉 हाच शेतमित्र एआयचा जन्मक्षण: लहान शेतकऱ्याला निर्णय घेताना योग्य क्षणी, त्याच्याच भाषेत, आवाजाद्वारे खरी माहिती देणे.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-stone-200">
              <span className="text-stone-500 block">महाराष्ट्रातील लहान शेतकरी:</span>
              <span className="text-lg font-extrabold text-stone-900 mt-1 block">८९.४% (NABARD NAFIS)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-stone-200">
              <span className="text-stone-500 block">शेतकऱ्याला मिळणारा वाटा:</span>
              <span className="text-lg font-extrabold text-rose-700 mt-1 block">फक्त २५-३०% (किरकोळच्या)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-stone-200">
              <span className="text-stone-500 block">अपुऱ्या माहितीमुळे वार्षिक नुकसान:</span>
              <span className="text-lg font-extrabold text-stone-900 mt-1 block">₹४५,००० कोटी (Grant Thornton)</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'economics',
      title: '२. युनिट इकॉनॉमिक्स व व्हॅल्यूएशन (Unit Economics & Ask)',
      subtitle: '८४% ते ९१% ग्रॉस मार्जिन • शून्य पेड मार्केटिंग • शून्य परवाना खर्च',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs text-emerald-800 block font-semibold">मासिक वर्गणी (B2C Sub):</span>
              <span className="text-2xl font-extrabold text-emerald-900 mt-1 block">₹९९ / महिना</span>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
              <span className="text-xs text-stone-600 block font-semibold">प्रति शेतकरी खर्च (Cost to Serve):</span>
              <span className="text-2xl font-extrabold text-stone-800 mt-1 block">₹९ - ₹१६</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-xs text-amber-800 block font-semibold">निव्वळ नफा (Gross Margin):</span>
              <span className="text-2xl font-extrabold text-amber-900 mt-1 block">८४% - ९१%</span>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center">
              <span className="text-xs text-rose-800 block font-semibold">गुंतवणूक मागणी (Investment Ask):</span>
              <span className="text-2xl font-extrabold text-rose-900 mt-1 block">₹१८ लाख (8% Equity)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900 text-white space-y-2 text-xs">
            <div className="flex justify-between items-center text-amber-300 font-bold text-sm pb-2 border-b border-stone-800">
              <span>तिसऱ्या वर्षाचे अंदाजे उत्पन्न (Year 3 Projected Revenue):</span>
              <span className="text-base">₹ ५.०६ कोटी (₹5.06 Cr)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-stone-300">
              <div>• २६,७५० सशुल्क शेतकरी: ₹३.१८ कोटी</div>
              <div>• १० बी२बी कॉर्पोरेट परवाने: ₹८० लाख</div>
              <div>• ५० शेतकरी उत्पादक कंपन्या (FPO): ₹४८ लाख</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'moats',
      title: '३. चार अभेद्य स्पर्धात्मक तटबंद्या (4 Competitive Moats)',
      subtitle: 'कोणताही व्हीसी-बॅक्ड स्पर्धक ही किंमत व विश्वास संरचना तोडू शकत नाही',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PITCH_METRICS.competitiveMoats.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">{m.moat}</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed font-devanagari">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'paper',
      title: '४. टेक्नोव्हेट २०२६ IEEE संशोधन शोधनिबंध (IEEE Research Benchmark)',
      subtitle: 'XGBoost-LSTM Hybrid Model vs Traditional Time Series',
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left bg-white rounded-xl border border-stone-200">
              <thead className="bg-stone-50 text-stone-600 font-bold uppercase border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">मॉडेल (Model Architecture)</th>
                  <th className="py-2.5 px-3">R² Score</th>
                  <th className="py-2.5 px-3">दिशात्मक अचूकता (Directional Acc.)</th>
                  <th className="py-2.5 px-3">MAPE Error</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                <tr>
                  <td className="py-2.5 px-3 text-stone-600 font-sans">ARIMA Baseline</td>
                  <td className="py-2.5 px-3 text-stone-600">0.712</td>
                  <td className="py-2.5 px-3 text-stone-600">68.4%</td>
                  <td className="py-2.5 px-3 text-stone-600">11.8%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-stone-600 font-sans">Standard LSTM</td>
                  <td className="py-2.5 px-3 text-stone-600">0.845</td>
                  <td className="py-2.5 px-3 text-stone-600">79.2%</td>
                  <td className="py-2.5 px-3 text-stone-600">7.6%</td>
                </tr>
                <tr className="bg-emerald-50/70 font-bold text-emerald-950">
                  <td className="py-2.5 px-3 font-sans text-emerald-800">ShetMitra Hybrid (XGBoost + Bi-LSTM)</td>
                  <td className="py-2.5 px-3 text-emerald-700">0.941</td>
                  <td className="py-2.5 px-3 text-emerald-700">91.3%</td>
                  <td className="py-2.5 px-3 text-emerald-700">4.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
            <strong>फॉर्म्युला रॅशनल:</strong> LSTM सिरीयल ट्रेंड व दीर्घकालीन मोमेंटम शिकते, तर XGBoost हवामान शॉक, आवक तफावत व सरकारी धोरण बदल यांसारखे उच्च-फ्रिक्वेन्सी नॉन-लिनियर रेसिड्यूअल्स अचूक ओळखते.
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-300 shadow-xl p-5 md:p-8 space-y-6">
      {/* Top Bar with Exit */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-stone-900">
                स्पर्धा व गुंतवणूक कक्ष (Pitch Room & Research Deck)
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                ICT Pitchers • NMIMS • Technovate
              </span>
            </div>
            <p className="text-xs text-stone-500 italic">
              &ldquo;{PITCH_METRICS.tagline}&rdquo;
            </p>
          </div>
        </div>

        <button
          onClick={onExit}
          className="px-4 py-2 rounded-xl bg-stone-800 text-white hover:bg-stone-900 font-bold text-xs transition-all"
        >
          शेतकरी डॅशबोर्डवर परत जा (Back to App)
        </button>
      </div>

      {/* Slide Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActiveSlide(idx)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-left border ${
              activeSlide === idx
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            {s.title.split('(')[0]}
          </button>
        ))}
      </div>

      {/* Active Slide Body */}
      <div className="bg-stone-50/60 rounded-2xl p-5 md:p-6 border border-stone-200 space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-stone-900 font-serif-indian">
            {slides[activeSlide].title}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5 font-medium">
            {slides[activeSlide].subtitle}
          </p>
        </div>

        {slides[activeSlide].content}
      </div>

      {/* Competition Checklist Footer */}
      <div className="p-4 rounded-xl bg-[#142316] text-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-emerald-400 block mb-0.5">चालू स्पर्धा स्थिती (Competition Status):</span>
          <span className="text-stone-300">
            • ICT Mumbai Pitchers (Round 2 Shortlisted) • EnviroPreneure IIT Bombay • NMIMS Inceptio 9.0 SocioVision Track
          </span>
        </div>
        <div className="text-right font-mono text-amber-300">
          Runway: ४० महिने @ ₹४५,०००/महिना
        </div>
      </div>
    </div>
  );
};
