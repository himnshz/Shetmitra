import React, { useState } from 'react';
import { User, MapPin, Sprout, Layers, Droplets, Phone, Check, X, Sparkles } from 'lucide-react';
import { FarmerProfile, Language } from '../types';

interface FarmerSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: FarmerProfile;
  onSaveProfile: (updatedProfile: FarmerProfile) => void;
  language: Language;
  isInitialSetup?: boolean;
}

const MAHARASHTRA_DISTRICTS = [
  'Nashik (नाशिक)',
  'Jalgaon (जळगाव)',
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

const SOIL_TYPES = [
  'काळी कसदार / रेगूर (Deep Black Regur Soil)',
  'मध्यम काळी (Medium Black Soil)',
  'तांबडी माती (Red Loamy Soil)',
  'हलकी / मुरमाड (Light Sandy/Rocky Soil)',
  'गाळाची जमीन (Alluvial Riverbed Soil)',
];

const IRRIGATION_TYPES = [
  'विहीर + ठिबक सिंचन (Well + Drip Irrigation)',
  'कूपनलिका / बोअरवेल (Borewell)',
  'शेततळे (Farm Pond)',
  'कालवा / नदी उपसा (Canal / River Lift)',
  'फक्त पावसाचे पाणी / कोरडवाहू (Rainfed / Dryland)',
  'तुषार सिंचन (Sprinkler Irrigation)',
];

const AVAILABLE_CROPS = [
  'कांदा (Onion)',
  'कापूस (Cotton)',
  'सोयाबीन (Soyabean)',
  'डाळिंब (Pomegranate)',
  'टोमॅटो (Tomato)',
  'गहू (Wheat)',
  'हरभरा (Gram/Chana)',
  'केळी (Banana)',
  'द्राक्षे (Grapes)',
  'ऊस (Sugarcane)',
  'मका (Maize)',
  'तूर (Pigeon Pea)',
];

export const FarmerSetupModal: React.FC<FarmerSetupModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  language,
  isInitialSetup = false,
}) => {
  const [name, setName] = useState(currentProfile.name);
  const [phone, setPhone] = useState(currentProfile.phone || '+91 ');
  const [district, setDistrict] = useState(currentProfile.district);
  const [taluka, setTaluka] = useState(currentProfile.taluka);
  const [village, setVillage] = useState(currentProfile.village);
  const [totalLandAcres, setTotalLandAcres] = useState(currentProfile.totalLandAcres);
  const [soilType, setSoilType] = useState(currentProfile.soilType);
  const [irrigationType, setIrrigationType] = useState(currentProfile.irrigationType);
  const [selectedCrops, setSelectedCrops] = useState<string[]>(currentProfile.activeCrops);

  if (!isOpen) return null;

  const toggleCrop = (crop: string) => {
    if (selectedCrops.includes(crop)) {
      if (selectedCrops.length > 1) {
        setSelectedCrops(selectedCrops.filter((c) => c !== crop));
      }
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated: FarmerProfile = {
      ...currentProfile,
      name: name.trim(),
      phone: phone.trim(),
      district,
      taluka: taluka.trim() || 'मध्यवर्ती',
      village: village.trim() || 'मुख्य गाव',
      totalLandAcres: Number(totalLandAcres) || 4,
      soilType,
      irrigationType,
      activeCrops: selectedCrops.length > 0 ? selectedCrops : ['कांदा (Onion)'],
      familyMembers: currentProfile.familyMembers.map((m) =>
        m.relation === 'farmer' ? { ...m, name: name.trim(), cropsManaged: selectedCrops } : m
      ),
    };

    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#182a1b] to-[#122015] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold font-serif-indian">
                {isInitialSetup
                  ? (language === 'mr' ? 'शेतकरी नोंदणी व शेती माहिती' : 'Farmer Registration & Profile Setup')
                  : (language === 'mr' ? 'शेतकरी प्रोफाईल संपादित करा' : 'Edit Farmer Profile Details')}
              </h2>
              <p className="text-xs text-stone-300">
                {language === 'mr'
                  ? 'योग्य माहिती दिल्यास अचूक बाजार भाव आणि हवामान सल्ला मिळतो'
                  : 'Personalized to your district, soil type, and active crops'}
              </p>
            </div>
          </div>

          {!isInitialSetup && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 text-stone-800 text-xs flex-1">
          {/* 1. Basic Info */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-800 flex items-center gap-1.5 border-b border-stone-200 pb-1">
              <User className="w-3.5 h-3.5" />
              <span>१. प्राथमिक वैयक्तिक माहिती (Basic Information)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  शेतकऱ्याचे पूर्ण नाव (Farmer Full Name) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. भाऊराव यशवंत पाटील"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 font-devanagari font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  मोबाईल क्रमांक (Mobile Number)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98234 51092"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 font-mono"
                />
              </div>
            </div>
          </div>

          {/* 2. Location */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-800 flex items-center gap-1.5 border-b border-stone-200 pb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>२. शेताचे ठिकाण (Location)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  जिल्हा (District) *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 font-medium"
                >
                  {MAHARASHTRA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  तालुका (Taluka)
                </label>
                <input
                  type="text"
                  value={taluka}
                  onChange={(e) => setTaluka(e.target.value)}
                  placeholder="उदा. भुसावळ / दिंडोरी / निफाड"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 font-devanagari font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  गाव (Village)
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="उदा. वरणगाव / पिंपळगाव"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 font-devanagari font-medium"
                />
              </div>
            </div>
          </div>

          {/* 3. Land & Soil Details */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-800 flex items-center gap-1.5 border-b border-stone-200 pb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>३. जमीन, माती व सिंचन (Land & Soil Specifications)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  एकूण जमीन क्षेत्र (Acres) *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="100"
                    value={totalLandAcres}
                    onChange={(e) => setTotalLandAcres(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 font-bold text-sm"
                  />
                  <span className="font-semibold text-stone-600">एकर</span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  मातीचा प्रकार (Soil Type)
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 font-medium truncate"
                >
                  {SOIL_TYPES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  सिंचन सोय (Irrigation)
                </label>
                <select
                  value={irrigationType}
                  onChange={(e) => setIrrigationType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 font-medium truncate"
                >
                  {IRRIGATION_TYPES.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 4. Active Crops Selection */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-800 flex items-center justify-between border-b border-stone-200 pb-1">
              <span className="flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5" />
                <span>४. आपण पिकवत असलेली मुख्य पिके (Select Active Crops)</span>
              </span>
              <span className="text-[10px] text-stone-500 font-normal">
                (किमान १ निवडा)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AVAILABLE_CROPS.map((crop) => {
                const isSelected = selectedCrops.includes(crop);
                return (
                  <button
                    type="button"
                    key={crop}
                    onClick={() => toggleCrop(crop)}
                    className={`p-2.5 rounded-xl text-left border text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-950 border-emerald-600 ring-1 ring-emerald-600'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span>{crop}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            {!isInitialSetup && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-all"
              >
                रद्द करा (Cancel)
              </button>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all shadow-md flex items-center gap-2 text-sm"
            >
              <Check className="w-4 h-4" />
              <span>{language === 'mr' ? 'माहिती जतन करा (Save Profile)' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
