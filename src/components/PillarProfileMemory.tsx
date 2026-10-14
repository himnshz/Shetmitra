import React from 'react';
import { UserCheck, Clock, Bookmark, Sparkles, Sprout, Compass, Award } from 'lucide-react';
import { FarmerProfile, Language } from '../types';

interface PillarProfileMemoryProps {
  farmerProfile: FarmerProfile;
  language: Language;
  onSelectMember: (memberId: string) => void;
}

export const PillarProfileMemory: React.FC<PillarProfileMemoryProps> = ({
  farmerProfile,
  language,
  onSelectMember,
}) => {
  const currentMember = farmerProfile.familyMembers.find((m) => m.id === farmerProfile.selectedMemberId) || farmerProfile.familyMembers[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <Bookmark className="w-4 h-4" />
            <span>स्तंभ २: वैयक्तिक शेतकरी प्रोफाईल व स्मृती (Profile & Memory)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-indian mt-0.5">
            {language === 'mr' ? 'कुटुंब व्हॉईस प्रोफाईल व हंगामी आठवण' : 'Family Voice Profiles & Seasonal Memory'}
          </h2>
          <p className="text-xs text-stone-500">
            एकाच मोबाईलवर कुटुंबातील प्रत्येकासाठी वेगळा आवाज व पीक इतिहास • ऑन-डिव्हाइस सुरक्षित
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          शेतकरी ओळख क्रमांक: {farmerProfile.id}
        </div>
      </div>

      {/* Family Member Cards (Shared Handset Solution) */}
      <div>
        <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
          {language === 'mr' ? 'नोंदणीकृत कौटुंबिक व्हॉईस प्रोफाईल (निवडा):' : 'Registered Family Voice Profiles (Select Active):'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {farmerProfile.familyMembers.map((member) => {
            const isSelected = member.id === farmerProfile.selectedMemberId;

            return (
              <div
                key={member.id}
                onClick={() => onSelectMember(member.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#1b2f1f] to-[#142317] text-white border-emerald-500 shadow-lg ring-2 ring-emerald-500/20'
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800 shadow-sm'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white">
                    सक्रिय (Active)
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base leading-snug">{member.name}</h3>
                    <p className={`text-xs ${isSelected ? 'text-emerald-300' : 'text-stone-500'}`}>
                      {member.roleTitle}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/20 space-y-2 text-xs">
                  <div>
                    <span className={`font-semibold ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      व्यवस्थापित पिके:
                    </span>{' '}
                    <span className="font-medium">{member.cropsManaged.join(', ')}</span>
                  </div>
                  <div>
                    <span className={`font-semibold ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      शेवटचा प्रश्न:
                    </span>
                    <p className={`italic mt-0.5 truncate ${isSelected ? 'text-amber-200' : 'text-stone-600'}`}>
                      &ldquo;{member.lastQuery}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Farmer Memory & Field Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Farm Specs */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <h3 className="font-bold text-stone-800 text-sm mb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>जमीन व सिंचन माहिती (Field Profile)</span>
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 block">एकूण जमीन क्षेत्र:</span>
              <span className="text-base font-bold text-stone-900 mt-0.5 block">{farmerProfile.totalLandAcres} एकर (Acres)</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 block">जिल्हा व गाव:</span>
              <span className="text-base font-bold text-stone-900 mt-0.5 block truncate">{farmerProfile.village}, {farmerProfile.district.split(' ')[0]}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 col-span-2">
              <span className="text-stone-500 block">मातीचा प्रकार (Bhuvan Ground-truth):</span>
              <span className="text-sm font-semibold text-stone-800 mt-0.5 block">{farmerProfile.soilType}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 col-span-2">
              <span className="text-stone-500 block">सिंचन सुविधा:</span>
              <span className="text-sm font-semibold text-stone-800 mt-0.5 block">{farmerProfile.irrigationType}</span>
            </div>
          </div>
        </div>

        {/* Seasonal Episodic Memory Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-5 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>हंगामी स्मृती (Episodic Memory Log)</span>
            </h3>
            <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
              {farmerProfile.seasonalMemory.lastSeason}
            </span>
          </div>

          <p className="text-xs text-amber-900/80 mb-3">
            शेतमित्र एआय शेतकऱ्याचा मागील अनुभव लक्षात ठेवून तुलनात्मक मार्गदर्शन करते:
          </p>

          <div className="bg-white/80 rounded-xl p-3.5 border border-amber-200 space-y-2 text-xs">
            <div className="flex justify-between text-stone-700">
              <span>मागील हंगामात विकलेले पीक:</span>
              <span className="font-bold">{farmerProfile.seasonalMemory.lastCrop}</span>
            </div>
            <div className="flex justify-between text-stone-700">
              <span>विक्री भाव:</span>
              <span className="font-bold text-emerald-800">₹{farmerProfile.seasonalMemory.soldPriceQuintal}/क्विंटल</span>
            </div>
            <div className="flex justify-between text-stone-700">
              <span>बाजार समिती:</span>
              <span className="font-medium">{farmerProfile.seasonalMemory.soldMandi}</span>
            </div>

            <div className="mt-3 pt-2 border-t border-amber-100 text-stone-800 italic font-devanagari">
              &ldquo;{farmerProfile.seasonalMemory.decisionReflection}&rdquo;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
