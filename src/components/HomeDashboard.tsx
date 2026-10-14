import React from 'react';
import {
  TrendingUp,
  Landmark,
  Scale,
  ArrowRight,
  MapPin,
  Volume2,
  Calendar,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Bug,
  Satellite,
  Globe,
  Sprout,
  Sparkles,
} from 'lucide-react';
import { FarmerProfile, Language } from '../types';
import { VoiceInterface } from './VoiceInterface';
import { LocationPermissionBanner } from './LocationPermissionBanner';
import { CROP_FORECASTS, PROACTIVE_ALERTS } from '../data/mockAgriData';
import { speechService } from '../services/speechService';

interface HomeDashboardProps {
  farmerProfile: FarmerProfile;
  language: Language;
  onNavigate: (tabId: string) => void;
  onOpenEditProfile: () => void;
  isGpsEnabled?: boolean;
  permissionStatus?: 'prompt' | 'granted' | 'denied' | 'unsupported';
  isDetectingLocation?: boolean;
  onRequestLocationPermission?: () => void;
  onToggleGps?: () => void;
  onSelectManualDistrict?: (district: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  farmerProfile,
  language,
  onNavigate,
  onOpenEditProfile,
  isGpsEnabled = true,
  permissionStatus = 'granted',
  isDetectingLocation = false,
  onRequestLocationPermission = () => {},
  onToggleGps = () => {},
  onSelectManualDistrict = () => {},
}) => {
  const isMr = language === 'mr';

  const currentMember =
    farmerProfile.familyMembers.find((m) => m.id === farmerProfile.selectedMemberId) ||
    farmerProfile.familyMembers[0];

  const primaryCrop = farmerProfile.activeCrops[0] || 'कांदा (Onion)';
  const forecastKey = primaryCrop.includes('कापूस') || primaryCrop.includes('Cotton')
    ? 'Cotton'
    : primaryCrop.includes('सोयाबीन') || primaryCrop.includes('Soyabean')
    ? 'Soyabean'
    : 'Onion';

  const forecast = CROP_FORECASTS[forecastKey] || CROP_FORECASTS.Onion;
  const latestAlert = PROACTIVE_ALERTS[0];

  const recommendationTranslations: Record<string, { mr: string; en: string }> = {
    Onion: {
      mr: 'पुढील ४ ते ६ दिवस थांबा (HOLD) — लासलगाव बाजारात आवक घटल्याने भाव ₹२५० ते ₹३०० ने सुधारतील.',
      en: 'HOLD produce for 4-6 days: 20% arrival drop will drive prices up by ₹250 to ₹300 per quintal.',
    },
    Cotton: {
      mr: 'कापूस साठा राखा (STORE & HOLD) — हमीभावाच्या (MSP) वर भाव जात असून तेजी कायम राहील.',
      en: 'STORE & HOLD: Trading above MSP. Robust CCI procurement will sustain market strength.',
    },
    Soyabean: {
      mr: 'टप्प्याटप्प्याने विक्री करा (STAGGERED SELLING) — खाद्यतेल आयात शुल्कामुळे भाव स्थिर राहतील.',
      en: 'STAGGERED SELLING: Import duty revisions will stabilize prices between ₹4,850 and ₹4,950.',
    },
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-5xl mx-auto w-full pb-16 md:pb-6">
      {/* 1. Location & Farm GPS Status Banner */}
      <LocationPermissionBanner
        farmerProfile={farmerProfile}
        isGpsEnabled={isGpsEnabled}
        permissionStatus={permissionStatus}
        isDetecting={isDetectingLocation}
        onRequestPermission={onRequestLocationPermission}
        onToggleGps={onToggleGps}
        onSelectManualDistrict={onSelectManualDistrict}
        language={language}
      />

      {/* 2. Farmer Welcome Bar (Clean Typography, Zero-Pill Discipline) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-sm shrink-0">
            {currentMember.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-devanagari truncate">
              {isMr ? `रामराम, ${currentMember.name.split(' ')[0]}!` : `Welcome, ${currentMember.name.split(' ')[0]}!`}
            </h2>

            {/* Clean unboxed metadata with subtle dot separators */}
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium truncate mt-0.5">
              <span>{farmerProfile.village}, {farmerProfile.district.split(' ')[0]}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-stone-700">
                {farmerProfile.totalLandAcres} {isMr ? 'एकर जमीन' : 'Acres Land'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-800 font-semibold">{primaryCrop.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenEditProfile}
            className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all border border-stone-200"
          >
            {isMr ? 'तपशील बदला' : 'Edit Farm'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all border border-emerald-200 flex items-center gap-1"
          >
            <span>{isMr ? 'पूर्ण प्रोफाईल' : 'Profile'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Top Urgent Proactive Alert Banner (if available) */}
      {latestAlert && (
        <div className="bg-amber-50/90 border border-amber-300 rounded-3xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-200/70 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-amber-800" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950 font-mono uppercase tracking-wide">
                <span>{isMr ? 'सक्रिय सावधगिरी अलर्ट' : 'PROACTIVE GUARDIAN ALERT'}</span>
              </div>
              <h3 className="text-sm font-bold text-stone-900 font-devanagari mt-0.5">
                {isMr ? latestAlert.titleMr : latestAlert.titleEn}
              </h3>
              <p className="text-xs text-stone-700 mt-0.5 font-devanagari line-clamp-1 max-w-2xl">
                {isMr ? latestAlert.bodyMr : latestAlert.bodyEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                speechService.speak(
                  isMr ? latestAlert.spokenAudioText : latestAlert.bodyEn,
                  language
                )
              }
              className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{isMr ? 'ऐका' : 'Listen'}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('market')}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-900 font-bold text-xs border border-stone-300 shadow-xs flex items-center gap-1 transition-all"
            >
              <span>{isMr ? 'पहा' : 'View'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Central Voice Assistant Component */}
      <VoiceInterface
        language={language}
        farmerProfile={farmerProfile}
      />

      {/* 4.5. New Core DPG & Precision Agriculture Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card A: AI Crop Disease Doctor */}
        <div
          onClick={() => onNavigate('diagnostic')}
          className="bg-gradient-to-br from-rose-50/90 to-white rounded-3xl p-5 border border-rose-200/80 shadow-xs hover:border-rose-400 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group active:scale-[0.99]"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-rose-800 mb-2 font-mono font-bold">
              <span className="flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                <Bug className="w-4 h-4 text-rose-700" />
                <span>{isMr ? 'एआय पीक रोग निदान' : 'AI Crop Doctor'}</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-lg bg-rose-100 text-rose-900">
                {isMr ? 'कॅमेरा / फोटो' : 'Camera AI'}
              </span>
            </div>

            <h3 className="text-base font-bold text-stone-900 font-serif-indian leading-snug">
              {isMr ? 'रोगट पानाचा फोटो काढा व जैविक उपाय मिळवा' : 'Visual Disease Doctor & Biological Remedies'}
            </h3>

            <p className="text-xs text-stone-600 font-devanagari mt-2 leading-relaxed">
              {isMr
                ? 'करपा, गुलाबी बोंडअळी, तांबेरा ओळखणे आणि ताक-तांबे, दशपर्णी अर्क यांसारखे नैसर्गिक उपाय.'
                : 'Instant vision diagnosis for blight, pink bollworm, and rust with zero-chemical biological recipes.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-rose-900 group-hover:text-rose-950">
            <span>{isMr ? 'रोग निदान सुरू करा' : 'Open Crop Doctor'}</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card B: Regenerative Agro Advisor (Satellite + Soil + Weather) */}
        <div
          onClick={() => onNavigate('regenerative')}
          className="bg-gradient-to-br from-emerald-50/90 to-white rounded-3xl p-5 border border-emerald-200/80 shadow-xs hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group active:scale-[0.99]"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-emerald-800 mb-2 font-mono font-bold">
              <span className="flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                <Satellite className="w-4 h-4 text-emerald-700" />
                <span>{isMr ? 'उपग्रह व माती पुनरुत्थान' : 'Satellite & Soil AI'}</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-900">
                Sentinel-2
              </span>
            </div>

            <h3 className="text-base font-bold text-stone-900 font-serif-indian leading-snug">
              {isMr ? 'मातीचे आरोग्य, उपग्रह निर्देशांक व पीक फेरपालट' : 'Precision Soil Health & Regenerative Crop Plan'}
            </h3>

            <p className="text-xs text-stone-600 font-devanagari mt-2 leading-relaxed">
              {isMr
                ? 'सेंद्रिय कर्ब ०.३८% वरून वाढवण्यासाठी धैंचा आच्छादन, आंतरपीक आणि ७ दिवसांच्या पावसाचे नियोजन.'
                : 'Multi-layer fusion of Sentinel-2 NDVI, Soil Health Card NPK/Zinc, and ECMWF 7-day rain grids.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-900 group-hover:text-emerald-950">
            <span>{isMr ? 'पुनरुत्थान सल्ला पहा' : 'View Regenerative Plan'}</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card C: Inter-State Agri Data Mesh (DPG) */}
        <div
          onClick={() => onNavigate('mesh')}
          className="bg-gradient-to-br from-blue-50/90 to-white rounded-3xl p-5 border border-blue-200/80 shadow-xs hover:border-blue-400 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group active:scale-[0.99]"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-blue-800 mb-2 font-mono font-bold">
              <span className="flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                <Globe className="w-4 h-4 text-blue-700" />
                <span>{isMr ? 'आंतरराज्यीय कृषी डेटा जाळे' : 'Inter-State Mesh'}</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-lg bg-blue-100 text-blue-900">
                DPG Public Good
              </span>
            </div>

            <h3 className="text-base font-bold text-stone-900 font-serif-indian leading-snug">
              {isMr ? 'महाराष्ट्र, कर्नाटक, तेलंगणा राज्य मॉडेल देवाणघेवाण' : 'Federated State Model Exchange & Bio-Alerts'}
            </h3>

            <p className="text-xs text-stone-600 font-devanagari mt-2 leading-relaxed">
              {isMr
                ? 'AgriStack मानकांनुसार सीमावर्ती कीड पूर्वसूचना, सामायिक कांदा-कापूस मॉडेल्स व मुक्त एपीआय.'
                : 'Open DPI enabling Indian states to exchange ML models, transboundary pest alerts, and open APIs.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-blue-950">
            <span>{isMr ? 'राज्य जाळे एक्सप्लोर करा' : 'Explore State Mesh'}</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* 5. Three Core Decision Highlights (Mandi, Schemes, Legal) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Today's Mandi Price & Forecast */}
        <div
          onClick={() => onNavigate('market')}
          className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:border-emerald-600 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group active:scale-[0.99]"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold uppercase tracking-wider text-[11px] font-mono">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>{isMr ? 'आजचा बाजार भाव' : 'Mandi Price Today'}</span>
              </span>
              <span className="font-semibold text-stone-700">{forecast.mandi.split(' ')[0]}</span>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tracking-tight mt-1">
              ₹{forecast.currentModalPrice.toLocaleString()}{' '}
              <span className="text-xs font-normal text-stone-500">
                {isMr ? '/ क्विंटल' : '/ Quintal'}
              </span>
            </div>

            <p className="text-xs text-stone-600 font-devanagari mt-2.5 leading-relaxed line-clamp-2">
              {recommendationTranslations[forecastKey]?.[isMr ? 'mr' : 'en'] || forecast.recommendationText}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
            <span>{isMr ? '७ दिवसांचे भाकीत व वाहतूक नफा' : 'View 7-Day Forecast & Net Realization'}</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Government Scheme Subsidies */}
        <div
          onClick={() => onNavigate('schemes')}
          className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:border-amber-600 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group active:scale-[0.99]"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="flex items-center gap-1.5 text-amber-800 font-bold uppercase tracking-wider text-[11px] font-mono">
                <Landmark className="w-4 h-4 text-amber-700" />
                <span>{isMr ? 'शासकीय योजना' : 'Govt Schemes'}</span>
              </span>
              <span className="text-xs font-bold text-rose-700 font-mono">
                {isMr ? '४८ तास शिल्लक' : '48h Left'}
              </span>
            </div>

            <h3 className="text-base font-bold text-stone-900 font-devanagari mt-1 leading-snug">
              {isMr ? 'मागेल त्याला शेततळे योजना' : 'Magel Tyala Farm Pond Scheme'}
            </h3>

            <div className="text-xs text-emerald-800 font-bold mt-1 font-mono">
              {isMr ? '₹ ५०,००० ते ₹ ७५,००० थेट खात्यात' : '₹50,000 to ₹75,000 Direct Subsidy'}
            </div>

            <p className="text-xs text-stone-600 font-devanagari mt-2 leading-relaxed line-clamp-2">
              {isMr
                ? `${farmerProfile.district.split(' ')[0]} जिल्ह्यासाठी नवीन कोटा उपलब्ध. आधार व ७/१२ जोडून अर्ज करा.`
                : `Active quota in ${farmerProfile.district.split(' ')[0]}. Apply with 7/12 & Aadhaar verification.`}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-950">
            <span>{isMr ? 'अर्ज कसा करावा पहा' : 'View Application Process'}</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Anti-Usury Legal Protection */}
        <div
          onClick={() => onNavigate('legal')}
          className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:border-rose-600 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group active:scale-[0.99]"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="flex items-center gap-1.5 text-rose-800 font-bold uppercase tracking-wider text-[11px] font-mono">
                <Scale className="w-4 h-4 text-rose-700" />
                <span>{isMr ? 'कायदेशीर हक्क संरक्षण' : 'Anti-Usury Protection'}</span>
              </span>
              <span className="font-mono text-rose-700 font-bold">NALSA 15100</span>
            </div>

            <h3 className="text-base font-bold text-stone-900 font-devanagari mt-1 leading-snug">
              {isMr ? 'सावकारी व जमीन महसूल हक्क' : 'Money Lending Act 2014 & Land Rights'}
            </h3>

            <p className="text-xs text-stone-600 font-devanagari mt-2 leading-relaxed line-clamp-2">
              {isMr
                ? 'दरमहा ५% (वार्षिक ६०%) व्याज मागणे कायद्याने गुन्हा आहे. कलम ३१ नुसार विधी सेवा प्राधिकरणाचा मोफत वकील मिळवा.'
                : '5%/month moneylender interest is illegal under Section 31. Access free DLSA legal notices & counsel.'}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-rose-800 group-hover:text-rose-950">
            <span>{isMr ? 'कायदेशीर नियम व मोफत वकील' : 'Legal Rules & Free Panel Counsel'}</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
