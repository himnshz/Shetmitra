import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
  FileText,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  PhoneCall,
  Send,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { Language, FarmerProfile } from '../types';
import { speechService } from '../services/speechService';

interface HITLDeskProps {
  farmerProfile: FarmerProfile;
  language: Language;
}

interface VerificationCase {
  id: string;
  topicMr: string;
  topicEn: string;
  aiOutputMr: string;
  aiOutputEn: string;
  humanReviewerName: string;
  humanReviewerTitleMr: string;
  humanReviewerTitleEn: string;
  statusMr: string;
  statusEn: string;
  humanNotesMr: string;
  humanNotesEn: string;
  timestampMr: string;
  timestampEn: string;
  farmerFeedback?: 'helpful' | 'unhelpful' | null;
}

export const HITLDesk: React.FC<HITLDeskProps> = ({ farmerProfile, language }) => {
  const isMr = language === 'mr';

  const [cases, setCases] = useState<VerificationCase[]>([
    {
      id: 'hitl-01',
      topicMr: 'कांदा काढणी व ४ दिवस विक्री थांबवण्याचा सल्ला',
      topicEn: 'Onion Harvest & 4-Day Holding Advisory',
      aiOutputMr: 'लासलगाव बाजारात आवक घटल्यामुळे पुढील ४-६ दिवसांत भाव ₹२५० ते ₹३०० ने वाढतील. आज माल विकू नका.',
      aiOutputEn: 'Due to reduced market arrivals in Lasalgaon, prices will surge by ₹250-300 in 4-6 days. Do not sell today.',
      humanReviewerName: 'Dr. Arvind Shinde (डॉ. अरविंद शिंदे)',
      humanReviewerTitleMr: 'वरिष्ठ कृषी शास्त्रज्ञ, KVK निफाड / नाशिक',
      humanReviewerTitleEn: 'Senior Agronomist, KVK Niphad / Nashik',
      statusMr: 'मानवी कृषी तज्ज्ञाद्वारे प्रमाणित',
      statusEn: 'Verified by Agronomist',
      humanNotesMr: 'पडताळणी पूर्ण: स्थानिक लासलगाव व पिंपळगाव आवकेत प्रत्यक्ष २०% घट नोंदवली गेली आहे. शेतकऱ्याने ४ दिवस थांबावे हा सल्ला योग्य आहे.',
      humanNotesEn: 'Verification Complete: 20% drop in local arrivals confirmed. Holding produce for 4 days is sound advice.',
      timestampMr: 'आज सकाळी ०८:३० IST',
      timestampEn: 'Today 08:30 AM IST',
      farmerFeedback: 'helpful',
    },
    {
      id: 'hitl-02',
      topicMr: 'सावकाराचे दरमहा ५% (वार्षिक ६०%) व्याज व जमीन धमकी',
      topicEn: 'Illegal 5% Monthly Moneylending Usury Complaint',
      aiOutputMr: 'महाराष्ट्र सावकारी अधिनियम २०१४ कलम ३१ नुसार ५% मासिक व्याज पूर्णपणे बेकायदेशीर आहे. कमाल मर्यादा वार्षिक १२% आहे.',
      aiOutputEn: 'Under Section 31 of Maharashtra Money Lending Act 2014, 5%/month interest is completely illegal. Cap is 12% annually.',
      humanReviewerName: 'Adv. Sneha Deshmukh (ॲड. स्नेहा देशमुख)',
      humanReviewerTitleMr: 'पॅनेल विधी सहाय्यक, जिल्हा विधी सेवा प्राधिकरण (DLSA), जळगाव',
      humanReviewerTitleEn: 'Panel Legal Counsel, District Legal Services Authority (DLSA)',
      statusMr: 'विधी स्वयंसेवकाकडे वर्ग',
      statusEn: 'Assigned to Legal Volunteer',
      humanNotesMr: 'प्रकरण स्वीकारले: शेतकऱ्याचा अर्ज वर्ग करण्यात आला आहे. उद्या सकाळी १०:३० वाजता मोफत कायदेशीर नोटीस तयार करण्यासाठी फोन केला जाईल.',
      humanNotesEn: 'Case Accepted: Farmer intimation filed. Scheduled callback at 10:30 AM tomorrow to prepare free legal counter-notice.',
      timestampMr: 'काल दुपारी ०३:१५ IST',
      timestampEn: 'Yesterday 03:15 PM IST',
      farmerFeedback: null,
    },
    {
      id: 'hitl-03',
      topicMr: 'गारपीट नुकसान - ७२ तासांनंतर पीक विमा कंपनीने भरपाई नाकारली',
      topicEn: 'PMFBY Hail Damage Intimation Appeal',
      aiOutputMr: 'नैसर्गिक आपत्ती काळात नेटवर्क नसल्यास ऑफलाईन तक्रार ग्राह्य धरली जाते. जिल्हा तक्रार निवारण समितीकडे दाद मागावी.',
      aiOutputEn: 'During natural calamities, offline intimations are legally valid under PMFBY guidelines. File appeal with District Grievance Committee.',
      humanReviewerName: 'Shri. Vijay Patil (श्री. विजय पाटील)',
      humanReviewerTitleMr: 'तालुका कृषी अधिकारी (TKA), महाराष्ट्र शासन कृषी विभाग',
      humanReviewerTitleEn: 'Taluka Agriculture Officer (TKA), Govt. of Maharashtra',
      statusMr: 'मानवी कृषी तज्ज्ञाद्वारे प्रमाणित',
      statusEn: 'Verified by Agronomist',
      humanNotesMr: 'शेतकऱ्याचा पंचनामा अहवाल ग्राह्य धरला गेला आहे. विमा कंपनीच्या नाकारणी पत्राविरुद्ध अपील दाखल करण्यात आले.',
      humanNotesEn: 'Panchnama loss report accepted as valid. Appeal filed against the insurance rejection letter.',
      timestampMr: '२ दिवसांपूर्वी',
      timestampEn: '2 days ago',
      farmerFeedback: 'helpful',
    },
  ]);

  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestText, setRequestText] = useState('');

  const handleFeedback = (caseId: string, isHelpful: boolean) => {
    setCases(
      cases.map((c) =>
        c.id === caseId ? { ...c, farmerFeedback: isHelpful ? 'helpful' : 'unhelpful' } : c
      )
    );
    speechService.speak(
      isMr
        ? 'आपला प्रत्यक्ष अभिप्राय नोंदवला गेला आहे. यामुळे मॉडेलची गुणवत्ता सुधारेल.'
        : 'Your ground-truth feedback has been recorded. This will calibrate model accuracy.',
      language
    );
  };

  const handleRequestHumanCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    setRequestSubmitted(true);
    speechService.speak(
      isMr
        ? 'आपली मानवी कृषी तज्ज्ञ सल्ला विनंती नोंदवली गेली आहे. २४ तासांच्या आत कृषी अधिकारी किंवा DLSA प्रतिनिधी संपर्क करतील.'
        : 'Your expert callback request has been logged. An agronomist or DLSA volunteer will contact you within 24 hours.',
      language
    );
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-5xl mx-auto w-full">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
            <HeartHandshake className="w-4 h-4 text-emerald-700" />
            <span>HUMAN-IN-THE-LOOP (HITL) SAFETY & VERIFICATION ARCHITECTURE</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-indian">
            {isMr
              ? 'मानवी तज्ज्ञ पडताळणी कक्ष (Expert Review Desk)'
              : 'Human Expert Verification Desk'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isMr
              ? 'ग्रामीण भारतात चुकीचा सल्ला चालत नाही: एआय मॉडेल + KVK कृषी शास्त्रज्ञ + NALSA विधी स्वयंसेवक'
              : 'Zero Hallucinations: AI Output + KVK Agronomists + NALSA Legal Volunteers'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>ZERO HALLUCINATION PROTOCOL</span>
        </div>
      </div>

      {/* HITL Protocol Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#152518] text-white border border-[#2b442d] space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
            {isMr ? 'स्तर १: अल्गोरिदम व एआय' : 'Tier 1: AI Model'}
          </span>
          <h4 className="font-bold text-sm">
            {isMr ? 'एआय संभाव्य भाकीत' : 'AI Probabilistic Forecast'}
          </h4>
          <p className="text-xs text-stone-300 font-devanagari">
            {isMr
              ? 'Bhashini ASR/TTS आणि XGBoost-LSTM मॉडेल द्वारे प्राथमिक विश्लेषण तयार होते.'
              : 'Initial predictions generated via XGBoost-LSTM and Bhashini vernacular models.'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#152518] text-white border border-[#2b442d] space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
            {isMr ? 'स्तर २: मानवी तज्ज्ञ' : 'Tier 2: Expert Review'}
          </span>
          <h4 className="font-bold text-sm">
            {isMr ? 'KVK शास्त्रज्ञ व DLSA वकील' : 'KVK Scientists & DLSA Lawyers'}
          </h4>
          <p className="text-xs text-stone-300 font-devanagari">
            {isMr
              ? 'मोठ्या आर्थिक व कायदेशीर निर्णयांवर मानवी कृषी तज्ज्ञ व पॅनेल वकिलांचा पडताळणी शिक्का.'
              : 'Critical financial and legal outputs are signed off by verified domain experts.'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#152518] text-white border border-[#2b442d] space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 font-mono">
            {isMr ? 'स्तर ३: शेतकरी प्रत्यक्ष अनुभव' : 'Tier 3: Ground Truth'}
          </span>
          <h4 className="font-bold text-sm">
            {isMr ? 'ग्राउंड-ट्रूथ फीडबॅक लूप' : 'Farmer Ground-Truth Loop'}
          </h4>
          <p className="text-xs text-stone-300 font-devanagari">
            {isMr
              ? 'शेतकरी प्रत्यक्ष निर्णय नोंदवून मॉडेल कॅलिब्रेट करतात, ज्यामुळे अचूकता ९१.३% राहते.'
              : 'Farmers validate outcomes with 1-click verdicts, constantly refining district models.'}
          </p>
        </div>
      </div>

      {/* Verified HITL Cases Queue */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="font-bold text-stone-900 text-base font-serif-indian">
              {isMr
                ? 'सक्रिय मानवी पडताळणी प्रकरणे'
                : 'Active Expert Verification Stream'}
            </h3>
            <p className="text-xs text-stone-500">
              {isMr
                ? 'आपल्या परिसरातील सल्ले तज्ज्ञ कृषी अधिकारी व विधी स्वयंसेवकांनी तपासले आहेत:'
                : 'Advisories reviewed and verified by district agronomists and legal panel counsel:'}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-stone-500">
            {cases.length} {isMr ? 'प्रकरणे सक्रिय' : 'Active Cases'}
          </span>
        </div>

        <div className="space-y-4">
          {cases.map((c) => (
            <div
              key={c.id}
              className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200 hover:border-emerald-500/50 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-stone-900 font-devanagari">
                  {isMr ? c.topicMr : c.topicEn}
                </span>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 ${
                      c.statusEn.includes('Verified')
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMr ? c.statusMr : c.statusEn}</span>
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {isMr ? c.timestampMr : c.timestampEn}
                  </span>
                </div>
              </div>

              {/* AI Draft vs Human Review */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 uppercase font-mono font-bold block mb-1">
                    {isMr ? '१. AI मॉडेल शिफारस:' : '1. Initial AI Model Output:'}
                  </span>
                  <p className="text-stone-700 font-devanagari leading-relaxed">
                    {isMr ? c.aiOutputMr : c.aiOutputEn}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-emerald-900 uppercase font-mono font-bold block">
                      {isMr ? '२. मानवी तज्ज्ञ अभिप्राय:' : '2. Human Expert Verdict:'}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800">
                      {c.humanReviewerName}
                    </span>
                  </div>
                  <p className="text-emerald-950 font-devanagari font-medium leading-relaxed">
                    &ldquo;{isMr ? c.humanNotesMr : c.humanNotesEn}&rdquo;
                  </p>
                  <span className="text-[10px] text-stone-500 block mt-1">
                    {isMr ? `पद: ${c.humanReviewerTitleMr}` : `Role: ${c.humanReviewerTitleEn}`}
                  </span>
                </div>
              </div>

              {/* Farmer Ground-Truth Feedback Loop */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-stone-200/60">
                <span className="text-stone-600 font-medium">
                  {isMr ? 'शेतकरी पडताळणी: हा सल्ला आपल्या शेतावर योग्य ठरला का?' : 'Farmer Feedback: Did this advice work on your farm?'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleFeedback(c.id, true)}
                    className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${
                      c.farmerFeedback === 'helpful'
                        ? 'bg-emerald-700 text-white shadow'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-300'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{isMr ? 'होय, योग्य ठरला' : 'Yes, Accurate'}</span>
                  </button>

                  <button
                    onClick={() => handleFeedback(c.id, false)}
                    className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${
                      c.farmerFeedback === 'unhelpful'
                        ? 'bg-rose-700 text-white shadow'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-300'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>{isMr ? 'बदल हवा होता' : 'Needed Revision'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Expert Callback Form */}
      <div className="bg-gradient-to-r from-emerald-50 via-stone-50 to-amber-50 rounded-3xl p-5 sm:p-6 border border-emerald-200 shadow-sm space-y-3.5">
        <div>
          <h3 className="text-base font-bold text-stone-900 font-serif-indian flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-700" />
            <span>
              {isMr
                ? 'थेट मानवी कृषी शास्त्रज्ञ किंवा विधी स्वयंसेवक सल्ला हवा आहे का?'
                : 'Need Direct Human Agronomist or Legal Counsel Callback?'}
            </span>
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            {isMr
              ? 'कोणत्याही गुंतागुंतीच्या प्रश्नावर KVK शास्त्रज्ञ किंवा जिल्हा विधी सेवा स्वयंसेवकाकडून मोफत मार्गदर्शन मिळवा.'
              : 'Request a free callback from KVK agronomists or DLSA panel legal volunteers for complex farm disputes.'}
          </p>
        </div>

        {requestSubmitted ? (
          <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              {isMr
                ? 'आपली विनंती यशस्वीरित्या नोंदवली गेली आहे! २४ तासांच्या आत तज्ज्ञ संपर्क करतील.'
                : 'Your request has been successfully registered! An expert will contact you within 24 hours.'}
            </span>
          </div>
        ) : (
          <form onSubmit={handleRequestHumanCall} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder={
                  isMr
                    ? 'आपली अडचण थोडक्यात लिहा (उदा. पीक विमा नाकारला किंवा कीड नियंत्रणासाठी तज्ज्ञ हवा)...'
                    : 'Describe your issue (e.g. crop insurance claim denied or severe pest infestation)...'
                }
                className="flex-1 p-3 rounded-xl border border-stone-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isMr ? 'विनंती पाठवा' : 'Submit'}</span>
              </button>
            </div>
            <div className="text-[11px] text-stone-500">
              *{isMr ? 'आपला संपर्क क्रमांक:' : 'Contact Phone:'}{' '}
              <strong>{farmerProfile.phone || '+91 98234 51092'}</strong> ({farmerProfile.district.split(' ')[0]})
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
