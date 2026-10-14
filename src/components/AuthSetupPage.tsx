import React, { useState, useEffect } from 'react';
import {
  User,
  MapPin,
  Sprout,
  Layers,
  Phone,
  Mic,
  MicOff,
  Volume2,
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
  Navigation,
  Globe,
} from 'lucide-react';
import { FarmerProfile, Language } from '../types';
import { speechService } from '../services/speechService';
import { locationService, DetectedLocation } from '../services/locationService';

interface AuthSetupPageProps {
  currentProfile: FarmerProfile;
  onCompleteSetup: (profile: FarmerProfile) => void;
  onBackToLanding: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const MAHARASHTRA_DISTRICTS = [
  'Jalgaon (जळगाव)',
  'Nashik (नाशिक)',
  'Pune (पुणे)',
  'Ahmednagar (अहिल्यानगर/अहमदनगर)',
  'Solapur (सोलापूर)',
  'Chhatrapati Sambhajinagar (छ. संभाजीनगर)',
  'Nagpur (नागपूर)',
  'Amravati (अमरावती)',
  'Kolhapur (कोल्हापूर)',
  'Latur (लातूर)',
  'Dhule (धुळे)',
  'Nanded (नांदेड)',
  'Sangli (सांगली)',
  'Satara (सातारा)',
  'Beed (बीड)',
  'Yavatmal (यवतमाळ)',
  'Buldhana (बुलढाणा)',
];

const SOIL_OPTIONS = [
  { id: 'black_deep', mr: 'काळी कसदार / रेगूर जमीन', en: 'Deep Black Regur Soil' },
  { id: 'black_medium', mr: 'मध्यम काळी माती', en: 'Medium Black Soil' },
  { id: 'red', mr: 'तांबडी / लाल माती', en: 'Red Loamy Soil' },
  { id: 'sandy', mr: 'हलकी / मुरमाड जमीन', en: 'Light Sandy/Rocky Soil' },
  { id: 'alluvial', mr: 'गाळाची जमीन', en: 'Alluvial Riverbed Soil' },
];

const IRRIGATION_OPTIONS = [
  { id: 'well_drip', mr: 'विहीर + ठिबक सिंचन', en: 'Well + Drip Irrigation' },
  { id: 'borewell', mr: 'कूपनलिका / बोअरवेल', en: 'Borewell' },
  { id: 'farm_pond', mr: 'शेततळे', en: 'Farm Pond' },
  { id: 'canal', mr: 'कालवा / नदी उपसा', en: 'Canal / River Lift' },
  { id: 'rainfed', mr: 'फक्त पावसाचे पाणी (कोरडवाहू)', en: 'Rainfed / Dryland' },
  { id: 'sprinkler', mr: 'तुषार सिंचन', en: 'Sprinkler Irrigation' },
];

const CROP_OPTIONS = [
  { id: 'cotton', mr: 'कापूस (Cotton)', en: 'Cotton' },
  { id: 'soyabean', mr: 'सोयाबीन (Soyabean)', en: 'Soyabean' },
  { id: 'onion', mr: 'कांदा (Onion)', en: 'Onion' },
  { id: 'tomato', mr: 'टोमॅटो (Tomato)', en: 'Tomato' },
  { id: 'pomegranate', mr: 'डाळिंब (Pomegranate)', en: 'Pomegranate' },
  { id: 'wheat', mr: 'गहू (Wheat)', en: 'Wheat' },
  { id: 'gram', mr: 'हरभरा (Gram/Chana)', en: 'Gram / Chana' },
  { id: 'banana', mr: 'केळी (Banana)', en: 'Banana' },
  { id: 'grapes', mr: 'द्राक्षे (Grapes)', en: 'Grapes' },
  { id: 'sugarcane', mr: 'ऊस (Sugarcane)', en: 'Sugarcane' },
];

type ActiveField = 'name' | 'phone' | 'location' | 'acres' | 'soil' | 'irrigation' | 'crops' | null;

export const AuthSetupPage: React.FC<AuthSetupPageProps> = ({
  currentProfile,
  onCompleteSetup,
  onBackToLanding,
  language,
  onLanguageChange,
}) => {
  const isMr = language === 'mr';

  const [name, setName] = useState(currentProfile.name);
  const [phone, setPhone] = useState(currentProfile.phone || '+91 98234 51092');
  const [district, setDistrict] = useState(currentProfile.district);
  const [taluka, setTaluka] = useState(currentProfile.taluka || (isMr ? 'भुसावळ' : 'Bhusawal'));
  const [village, setVillage] = useState(currentProfile.village || (isMr ? 'वरणगाव' : 'Varangaon'));
  const [totalLandAcres, setTotalLandAcres] = useState<number>(currentProfile.totalLandAcres || 4.5);
  const [soilType, setSoilType] = useState(currentProfile.soilType || SOIL_OPTIONS[0].mr);
  const [irrigationType, setIrrigationType] = useState(currentProfile.irrigationType || IRRIGATION_OPTIONS[0].mr);
  const [selectedCrops, setSelectedCrops] = useState<string[]>(
    currentProfile.activeCrops || ['कापूस (Cotton)', 'सोयाबीन (Soyabean)']
  );

  // Per-Field Voice State
  const [activeVoiceField, setActiveVoiceField] = useState<ActiveField>(null);
  const [fieldTranscript, setFieldTranscript] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  useEffect(() => {
    handleAutoDetectGPS(false);
  }, []);

  const handleAutoDetectGPS = async (speakConfirmation = true) => {
    setIsDetectingLocation(true);
    setLocationStatus(isMr ? 'GPS द्वारे आपले शेत शोधत आहे...' : 'Detecting farm location via GPS...');

    try {
      const loc: DetectedLocation = await locationService.detectCurrentLocation();
      setDistrict(loc.district);
      if (loc.taluka) setTaluka(loc.taluka);
      if (loc.village) setVillage(loc.village);

      setLocationStatus(
        isMr
          ? `शोधलेले ठिकाण: ${loc.village}, ${loc.district}`
          : `Detected Location: ${loc.village}, ${loc.district.split(' ')[0]}`
      );
      setIsDetectingLocation(false);

      if (speakConfirmation) {
        speechService.speak(
          isMr
            ? `आपले शेत ${loc.district} जिल्ह्यात शोधले गेले आहे.`
            : `Your farm has been detected in ${loc.district.split(' ')[0]} district.`,
          language
        );
      }
    } catch (e) {
      setIsDetectingLocation(false);
      setLocationStatus(isMr ? 'स्थान निश्चित केले: जळगाव, महाराष्ट्र' : 'Location set: Jalgaon, Maharashtra');
    }
  };

  const prompts: Record<string, { mr: string; en: string }> = {
    name: {
      mr: 'कृपया आपले पूर्ण नाव सांगा.',
      en: 'Please speak your full name.',
    },
    phone: {
      mr: 'कृपया आपला दहा अंकी मोबाईल क्रमांक सांगा.',
      en: 'Please speak your 10 digit mobile phone number.',
    },
    location: {
      mr: 'आपल्या तालुक्याचे किंवा गावाचे नाव सांगा.',
      en: 'Please speak your taluka or village name.',
    },
    acres: {
      mr: 'आपल्याकडे एकूण किती एकर शेती जमीन आहे? उदा. चार एकर किंवा दोन एकर.',
      en: 'How many acres of agricultural land do you own? For example, 4 acres.',
    },
    soil: {
      mr: 'आपल्या शेतातील मातीचा प्रकार कोणता आहे? काळी, मध्यम काळी, की तांबडी?',
      en: 'What is your soil type? Deep black, medium black, or red soil?',
    },
    irrigation: {
      mr: 'आपल्याकडे कोणती सिंचन सुविधा आहे? विहीर, ठिबक, बोअरवेल, की शेततळे?',
      en: 'What irrigation facility do you have? Well, drip, borewell, or farm pond?',
    },
    crops: {
      mr: 'सध्या शेतात कोणती मुख्य पिके आहेत? कापूस, कांदा, सोयाबीन की इतर?',
      en: 'Which active crops are growing on your farm? Cotton, onion, soyabean?',
    },
  };

  const handleHearFieldPrompt = (field: ActiveField) => {
    if (!field) return;
    const promptText = isMr ? prompts[field]?.mr : prompts[field]?.en;
    speechService.speak(promptText, language);
  };

  const handleStartFieldVoiceInput = (field: ActiveField) => {
    if (activeVoiceField === field) {
      speechService.stopListening();
      setActiveVoiceField(null);
      return;
    }

    speechService.stopListening();
    setActiveVoiceField(field);
    setFieldTranscript('');

    speechService.startListening(language, {
      onStart: () => {},
      onEnd: () => {
        setActiveVoiceField(null);
      },
      onError: () => {
        setActiveVoiceField(null);
      },
      onResult: (text, isFinal) => {
        setFieldTranscript(text);
        if (isFinal) {
          speechService.stopListening();
          setActiveVoiceField(null);
          processFieldVoiceResult(field, text);
        }
      },
    });
  };

  const processFieldVoiceResult = (field: ActiveField, text: string) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    if (field === 'name') {
      setName(cleanText);
      speechService.speak(isMr ? `नाव नोंदवले: ${cleanText}` : `Name recorded: ${cleanText}`, language);
    } else if (field === 'phone') {
      const digits = cleanText.replace(/\D/g, '');
      if (digits.length >= 10) {
        setPhone('+91 ' + digits.slice(-10));
      } else {
        setPhone(cleanText);
      }
      speechService.speak(isMr ? 'मोबाईल क्रमांक नोंदवला.' : 'Mobile number recorded.', language);
    } else if (field === 'location') {
      setTaluka(cleanText);
      speechService.speak(isMr ? `गाव/तालुका नोंदवला: ${cleanText}` : `Location recorded: ${cleanText}`, language);
    } else if (field === 'acres') {
      const match = cleanText.match(/([०-९\d.]+)/);
      if (match) {
        const val = match[1].replace('४', '4').replace('२', '2').replace('५', '5').replace('३', '3');
        const num = parseFloat(val);
        if (num && num > 0) {
          setTotalLandAcres(num);
          speechService.speak(isMr ? `जमीन नोंदवली: ${num} एकर` : `Land recorded: ${num} acres`, language);
        }
      }
    } else if (field === 'soil') {
      const lower = cleanText.toLowerCase();
      if (lower.includes('तांबडी') || lower.includes('red')) setSoilType(isMr ? 'तांबडी / लाल माती' : 'Red Loamy Soil');
      else if (lower.includes('मध्यम') || lower.includes('medium')) setSoilType(isMr ? 'मध्यम काळी माती' : 'Medium Black Soil');
      else setSoilType(isMr ? 'काळी कसदार / रेगूर जमीन' : 'Deep Black Regur Soil');
      speechService.speak(isMr ? 'मातीचा प्रकार नोंदवला.' : 'Soil type recorded.', language);
    } else if (field === 'irrigation') {
      const lower = cleanText.toLowerCase();
      if (lower.includes('बोअरवेल') || lower.includes('borewell')) setIrrigationType(isMr ? 'कूपनलिका / बोअरवेल' : 'Borewell');
      else if (lower.includes('शेततळे') || lower.includes('pond')) setIrrigationType(isMr ? 'शेततळे' : 'Farm Pond');
      else setIrrigationType(isMr ? 'विहीर + ठिबक सिंचन' : 'Well + Drip Irrigation');
      speechService.speak(isMr ? 'सिंचन सुविधा नोंदवली.' : 'Irrigation recorded.', language);
    } else if (field === 'crops') {
      const lower = cleanText.toLowerCase();
      const updated = [...selectedCrops];
      CROP_OPTIONS.forEach((crop) => {
        if ((lower.includes(crop.mr.toLowerCase()) || lower.includes(crop.en.toLowerCase())) && !updated.includes(crop.mr)) {
          updated.push(crop.mr);
        }
      });
      if (updated.length > 0) setSelectedCrops(updated);
      speechService.speak(isMr ? 'पिके निवडली गेली आहेत.' : 'Crops updated.', language);
    }
  };

  const toggleCrop = (cropKey: string) => {
    if (selectedCrops.includes(cropKey)) {
      if (selectedCrops.length > 1) {
        setSelectedCrops(selectedCrops.filter((c) => c !== cropKey));
      }
    } else {
      setSelectedCrops([...selectedCrops, cropKey]);
    }
  };

  const handleSelectDemoProfile = (type: 'bhaurao' | 'sunita' | 'rohit') => {
    if (type === 'bhaurao') {
      setName(isMr ? 'भाऊराव यशवंत पाटील' : 'Bhaurao Patil');
      setPhone('+91 98234 51092');
      setDistrict('Jalgaon (जळगाव)');
      setTaluka(isMr ? 'भुसावळ' : 'Bhusawal');
      setVillage(isMr ? 'वरणगाव' : 'Varangaon');
      setTotalLandAcres(4.5);
      setSelectedCrops(['कापूस (Cotton)', 'सोयाबीन (Soyabean)']);
      setSoilType(isMr ? 'काळी कसदार / रेगूर जमीन' : 'Deep Black Regur Soil');
      setIrrigationType(isMr ? 'विहीर + ठिबक सिंचन' : 'Well + Drip Irrigation');
    } else if (type === 'sunita') {
      setName(isMr ? 'सुनिता पाटील' : 'Sunita Patil');
      setPhone('+91 98234 51093');
      setDistrict('Nashik (नाशिक)');
      setTaluka(isMr ? 'दिंडोरी / निफाड' : 'Dindori / Niphad');
      setVillage(isMr ? 'पिंपळगाव' : 'Pimpalgaon');
      setTotalLandAcres(2.0);
      setSelectedCrops(['कांदा (Onion)', 'टोमॅटो (Tomato)']);
      setSoilType(isMr ? 'मध्यम काळी माती' : 'Medium Black Soil');
      setIrrigationType(isMr ? 'विहीर + ठिबक सिंचन' : 'Well + Drip Irrigation');
    } else {
      setName(isMr ? 'रोहित पाटील' : 'Rohit Patil');
      setPhone('+91 98234 51094');
      setDistrict('Pune (पुणे)');
      setTaluka(isMr ? 'बारामती' : 'Baramati');
      setVillage(isMr ? 'माळेगाव' : 'Malegaon');
      setTotalLandAcres(3.0);
      setSelectedCrops(['गहू (Wheat)', 'हरभरा (Gram/Chana)']);
      setSoilType(isMr ? 'काळी कसदार / रेगूर जमीन' : 'Deep Black Regur Soil');
      setIrrigationType(isMr ? 'तुषार सिंचन' : 'Sprinkler Irrigation');
    }
    speechService.speak(isMr ? 'डेमो शेतकरी प्रोफाईल लोड केले.' : 'Demo farmer profile loaded.', language);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated: FarmerProfile = {
      ...currentProfile,
      name: name.trim(),
      phone: phone.trim(),
      district,
      taluka: taluka.trim() || (isMr ? 'मध्यवर्ती' : 'Central'),
      village: village.trim() || (isMr ? 'मुख्य गाव' : 'Main Village'),
      totalLandAcres: Number(totalLandAcres) || 4,
      soilType,
      irrigationType,
      activeCrops: selectedCrops.length > 0 ? selectedCrops : ['कापूस (Cotton)'],
      familyMembers: currentProfile.familyMembers.map((m) =>
        m.relation === 'farmer' ? { ...m, name: name.trim(), cropsManaged: selectedCrops } : m
      ),
    };

    onCompleteSetup(updated);
  };

  return (
    <div className="min-h-screen bg-[#f5f4ec] text-stone-900 font-sans py-6 sm:py-8 px-3 sm:px-6 flex flex-col justify-center items-center w-full">
      <div className="max-w-3xl w-full space-y-4 sm:space-y-6">
        {/* Top Header Bar with Language Toggle and Back Button */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onBackToLanding}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition-all shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="truncate">{isMr ? 'मुख्य पानावर परत जा' : 'Back to Home'}</span>
          </button>

          {/* Language Toggle Right on Setup Page - Mobile Compact */}
          <div className="bg-white border border-stone-300 rounded-xl p-0.5 sm:p-1 flex items-center shrink-0 shadow-sm">
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-xs font-bold transition-all ${
                isMr
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-xs font-bold transition-all ${
                !isMr
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden w-full">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#162719] to-[#1a331e] px-4 sm:px-8 py-5 sm:py-6 text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-600/30 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shrink-0">
                <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 font-mono block">
                  {isMr ? 'व्हॉईस-स्मार्ट नोंदणी' : 'VERNACULAR VOICE ONBOARDING'}
                </span>
                <h1 className="text-lg sm:text-2xl font-bold font-serif-indian text-white leading-tight">
                  {isMr ? 'शेतकरी नोंदणी व शेती तपशील' : 'Farmer Registration & Farm Setup'}
                </h1>
                <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5">
                  {isMr
                    ? 'प्रत्येक रकान्यात आवाज ऐका आणि स्वतःच्या भाषेत थेट उत्तर बोला.'
                    : 'Listen to spoken prompts for each field and reply directly in your natural voice.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
            {/* GPS Auto-Location Banner */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Navigation className="w-4 h-4 animate-spin-slow" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-emerald-950 block">
                    {isMr ? 'शेताचे ठिकाण GPS द्वारे निश्चित केले' : 'Farm Location Auto-Detected via GPS'}
                  </span>
                  <span className="text-xs text-stone-600 font-devanagari truncate block">
                    {locationStatus || (isMr ? 'जिल्हा व गाव शोधत आहे...' : 'Detecting district & village...')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleAutoDetectGPS(true)}
                disabled={isDetectingLocation}
                className="px-3 py-1.5 rounded-xl bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                <span>{isMr ? 'पुन्हा GPS तपासा' : 'Re-detect GPS'}</span>
              </button>
            </div>

            {/* Quick 1-Click Demo Profiles for Judges */}
            <div className="space-y-1.5">
              <span className="text-xs text-stone-500 font-semibold block">
                {isMr ? 'किंवा चाचणीसाठी डेमो शेतकरी निवडा:' : 'Or select sample farmer profile for instant testing:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectDemoProfile('bhaurao')}
                  className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left text-xs transition-all hover:border-emerald-500"
                >
                  <strong className="text-stone-900 block font-devanagari">
                    {isMr ? 'भाऊराव पाटील' : 'Bhaurao Patil'}
                  </strong>
                  <span className="text-[11px] text-stone-500 block">
                    {isMr ? 'जळगाव • ४.५ एकर • कापूस' : 'Jalgaon • 4.5 Acres • Cotton'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectDemoProfile('sunita')}
                  className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left text-xs transition-all hover:border-emerald-500"
                >
                  <strong className="text-stone-900 block font-devanagari">
                    {isMr ? 'सुनिता पाटील' : 'Sunita Patil'}
                  </strong>
                  <span className="text-[11px] text-stone-500 block">
                    {isMr ? 'नाशिक • २ एकर • कांदा' : 'Nashik • 2 Acres • Onion'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectDemoProfile('rohit')}
                  className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left text-xs transition-all hover:border-emerald-500"
                >
                  <strong className="text-stone-900 block font-devanagari">
                    {isMr ? 'रोहित पाटील' : 'Rohit Patil'}
                  </strong>
                  <span className="text-[11px] text-stone-500 block">
                    {isMr ? 'पुणे • ३ एकर • गहू/कार्बन' : 'Pune • 3 Acres • Wheat'}
                  </span>
                </button>
              </div>
            </div>

            {/* Form with per-field audio prompt & voice mic buttons */}
            <form onSubmit={handleSubmit} className="space-y-5 text-stone-800 text-xs pt-2 border-t border-stone-200">
              {/* FIELD 1: Farmer Full Name */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-700" />
                    <span>{isMr ? '१. शेतकऱ्याचे पूर्ण नाव *' : '1. Farmer Full Name *'}</span>
                  </label>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleHearFieldPrompt('name')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px] flex items-center gap-1 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isMr ? 'ऐका' : 'Listen'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartFieldVoiceInput('name')}
                      className={`px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-all shadow-sm ${
                        activeVoiceField === 'name'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      {activeVoiceField === 'name' ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>
                        {activeVoiceField === 'name'
                          ? isMr
                            ? 'थांबवा'
                            : 'Stop'
                          : isMr
                          ? 'नाव बोला'
                          : 'Speak Name'}
                      </span>
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isMr ? 'उदा. भाऊराव यशवंत पाटील' : 'e.g. Bhaurao Patil'}
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white font-medium text-sm"
                />
              </div>

              {/* FIELD 2: Mobile Number */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-700" />
                    <span>{isMr ? '२. मोबाईल क्रमांक' : '2. Mobile Number'}</span>
                  </label>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleHearFieldPrompt('phone')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px] flex items-center gap-1 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isMr ? 'ऐका' : 'Listen'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartFieldVoiceInput('phone')}
                      className={`px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-all shadow-sm ${
                        activeVoiceField === 'phone'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      {activeVoiceField === 'phone' ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>
                        {activeVoiceField === 'phone'
                          ? isMr
                            ? 'थांबवा'
                            : 'Stop'
                          : isMr
                          ? 'नंबर बोला'
                          : 'Speak Number'}
                      </span>
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98234 51092"
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white font-mono text-sm"
                />
              </div>

              {/* FIELD 3: Farm Location */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <span>{isMr ? '३. शेताचे ठिकाण (GPS निश्चित)' : '3. Farm Location (GPS Auto-Filled)'}</span>
                  </label>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleHearFieldPrompt('location')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px] flex items-center gap-1 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isMr ? 'ऐका' : 'Listen'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartFieldVoiceInput('location')}
                      className={`px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-all shadow-sm ${
                        activeVoiceField === 'location'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      {activeVoiceField === 'location' ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>
                        {activeVoiceField === 'location'
                          ? isMr
                            ? 'थांबवा'
                            : 'Stop'
                          : isMr
                          ? 'गाव बोला'
                          : 'Speak Place'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <span className="text-[11px] text-stone-500 font-semibold block mb-1">
                      {isMr ? 'जिल्हा:' : 'District:'}
                    </span>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white font-medium text-xs truncate"
                    >
                      {MAHARASHTRA_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {isMr ? d : d.split(' ')[0]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-500 font-semibold block mb-1">
                      {isMr ? 'तालुका:' : 'Taluka:'}
                    </span>
                    <input
                      type="text"
                      value={taluka}
                      onChange={(e) => setTaluka(e.target.value)}
                      placeholder={isMr ? 'उदा. भुसावळ' : 'e.g. Bhusawal'}
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white font-medium text-xs"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-500 font-semibold block mb-1">
                      {isMr ? 'गाव:' : 'Village:'}
                    </span>
                    <input
                      type="text"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      placeholder={isMr ? 'उदा. वरणगाव' : 'e.g. Varangaon'}
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white font-medium text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* FIELD 4: Landholding (Acres) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    <span>{isMr ? '४. एकूण जमीन क्षेत्र *' : '4. Total Landholding (Acres) *'}</span>
                  </label>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleHearFieldPrompt('acres')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px] flex items-center gap-1 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isMr ? 'ऐका' : 'Listen'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartFieldVoiceInput('acres')}
                      className={`px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-all shadow-sm ${
                        activeVoiceField === 'acres'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      {activeVoiceField === 'acres' ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>
                        {activeVoiceField === 'acres'
                          ? isMr
                            ? 'थांबवा'
                            : 'Stop'
                          : isMr
                          ? 'एकर बोला'
                          : 'Speak Acres'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="100"
                    value={totalLandAcres}
                    onChange={(e) => setTotalLandAcres(Number(e.target.value))}
                    className="w-36 p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white font-bold text-sm"
                  />
                  <span className="font-bold text-stone-700 text-sm">
                    {isMr ? 'एकर शेती' : 'Acres'}
                  </span>
                </div>
              </div>

              {/* FIELD 5: Soil Type & Irrigation */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    <span>{isMr ? '५. मातीचा प्रकार व सिंचन' : '5. Soil Type & Irrigation'}</span>
                  </label>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleHearFieldPrompt('soil')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px] flex items-center gap-1 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isMr ? 'ऐका' : 'Listen'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartFieldVoiceInput('soil')}
                      className={`px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-all shadow-sm ${
                        activeVoiceField === 'soil'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      {activeVoiceField === 'soil' ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>
                        {activeVoiceField === 'soil'
                          ? isMr
                            ? 'थांबवा'
                            : 'Stop'
                          : isMr
                          ? 'माती बोला'
                          : 'Speak Soil'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-stone-500 font-semibold block mb-1">
                      {isMr ? 'मातीचा प्रकार:' : 'Soil Type:'}
                    </span>
                    <select
                      value={soilType}
                      onChange={(e) => setSoilType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white font-medium text-xs truncate"
                    >
                      {SOIL_OPTIONS.map((s) => (
                        <option key={s.id} value={isMr ? s.mr : s.en}>
                          {isMr ? s.mr : s.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-500 font-semibold block mb-1">
                      {isMr ? 'सिंचन सुविधा:' : 'Irrigation Facility:'}
                    </span>
                    <select
                      value={irrigationType}
                      onChange={(e) => setIrrigationType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white font-medium text-xs truncate"
                    >
                      {IRRIGATION_OPTIONS.map((i) => (
                        <option key={i.id} value={isMr ? i.mr : i.en}>
                          {isMr ? i.mr : i.en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* FIELD 6: Active Crops Selection */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-emerald-700" />
                    <span>{isMr ? '६. मुख्य पिके' : '6. Active Crops Cultivated'}</span>
                  </label>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleHearFieldPrompt('crops')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px] flex items-center gap-1 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isMr ? 'ऐका' : 'Listen'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartFieldVoiceInput('crops')}
                      className={`px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-all shadow-sm ${
                        activeVoiceField === 'crops'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      {activeVoiceField === 'crops' ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>
                        {activeVoiceField === 'crops'
                          ? isMr
                            ? 'थांबवा'
                            : 'Stop'
                          : isMr
                          ? 'पिके बोला'
                          : 'Speak Crops'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CROP_OPTIONS.map((crop) => {
                    const isSelected = selectedCrops.includes(crop.mr) || selectedCrops.includes(crop.en);
                    return (
                      <button
                        type="button"
                        key={crop.id}
                        onClick={() => toggleCrop(crop.mr)}
                        className={`p-2.5 rounded-xl text-left border text-xs font-semibold flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-950 border-emerald-600 ring-1 ring-emerald-600'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <span className="truncate">{isMr ? crop.mr : crop.en}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-stone-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>
                    {isMr
                      ? 'डेटा पूर्णपणे ऑन-डिव्हाइस सुरक्षित राहतो.'
                      : 'Data is stored securely on-device with zero privacy leakage.'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xl transition-all flex items-center gap-2"
                >
                  <span>{isMr ? 'शेती डॅशबोर्ड सुरू करा' : 'Launch Farm Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
