import React, { useState } from 'react';
import { User, MapPin, Layers, Droplets, Sprout, Edit3, Users, Plus, ShieldCheck, Clock, Bookmark, Phone, QrCode } from 'lucide-react';
import { FarmerProfile, Language, FamilyMember } from '../types';
import { FarmerSetupModal } from './FarmerSetupModal';

interface FarmerProfilePageProps {
  farmerProfile: FarmerProfile;
  onUpdateProfile: (updated: FarmerProfile) => void;
  onSelectMember: (memberId: string) => void;
  language: Language;
}

export const FarmerProfilePage: React.FC<FarmerProfilePageProps> = ({
  farmerProfile,
  onUpdateProfile,
  onSelectMember,
  language,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState<'spouse' | 'son' | 'daughter'>('spouse');
  const [showAddMember, setShowAddMember] = useState(false);

  const currentMember =
    farmerProfile.familyMembers.find((m) => m.id === farmerProfile.selectedMemberId) ||
    farmerProfile.familyMembers[0];

  const handleAddFamilyMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const relationTitle =
      newMemberRelation === 'spouse'
        ? 'गृह व्यवस्थापक व भाजीपाला'
        : newMemberRelation === 'son'
        ? 'कृषी तंत्रज्ञान व कार्बन अभ्यासक'
        : 'शेती व दुग्ध व्यवसाय सहाय्यक';

    const newMember: FamilyMember = {
      id: `mem-${Date.now()}`,
      name: newMemberName.trim(),
      relation: newMemberRelation,
      roleTitle: relationTitle,
      avatarSeed: newMemberName.trim(),
      cropsManaged: [farmerProfile.activeCrops[0] || 'भाजीपाला'],
      lastQuery: 'नवीन सदस्य नोंदणी पूर्ण झाली.',
      voiceSignature: `${newMemberName}_MH_Voice`,
    };

    const updated: FarmerProfile = {
      ...farmerProfile,
      familyMembers: [...farmerProfile.familyMembers, newMember],
    };

    onUpdateProfile(updated);
    setNewMemberName('');
    setShowAddMember(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-5 md:p-6 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
            <User className="w-4 h-4 text-emerald-700" />
            <span>शेतकरी ओळख व शेती तपशील (Farmer Profile)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-indian">
            {farmerProfile.name}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {farmerProfile.village}, तालुका: {farmerProfile.taluka}, जिल्हा: {farmerProfile.district}
          </p>
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'माहिती संपादित करा (Edit Info)' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Digital Farmer Identity Card */}
        <div className="space-y-6 md:col-span-1">
          {/* Kisan Digital Identity Pass */}
          <div className="bg-gradient-to-br from-[#162719] via-[#1a301e] to-[#122214] text-white rounded-3xl p-6 border border-[#2d4631] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

            <div className="flex items-center justify-between pb-3 border-b border-stone-700/60 mb-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 font-mono">
                KISAN DIGITAL PASS
              </span>
              <span className="text-xs font-mono text-amber-300 font-semibold">{farmerProfile.id}</span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-stone-400 block">शेतकऱ्याचे नाव:</span>
                <span className="text-base font-bold text-white font-devanagari block">{farmerProfile.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block">जमीन क्षेत्र:</span>
                  <span className="font-bold text-emerald-300">{farmerProfile.totalLandAcres} एकर</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">जिल्हा:</span>
                  <span className="font-semibold text-stone-200 truncate block">{farmerProfile.district.split(' ')[0]}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-stone-400 block">मोबाईल क्रमांक:</span>
                <span className="text-xs font-mono text-stone-300">{farmerProfile.phone || 'नोंद नाही'}</span>
              </div>

              <div className="pt-3 border-t border-stone-700/60 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>7/12 ई-केवायसी सत्यापित</span>
                </span>
                <QrCode className="w-5 h-5 text-stone-300" />
              </div>
            </div>
          </div>

          {/* Seasonal Memory Card */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>हंगामी स्मृती (Past Season Memory)</span>
              </h3>
              <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                {farmerProfile.seasonalMemory.lastSeason}
              </span>
            </div>

            <div className="text-xs space-y-1.5 font-medium text-amber-900">
              <div className="flex justify-between">
                <span>पीक:</span>
                <span className="font-bold">{farmerProfile.seasonalMemory.lastCrop}</span>
              </div>
              <div className="flex justify-between">
                <span>विक्री भाव:</span>
                <span className="font-bold text-emerald-800">₹{farmerProfile.seasonalMemory.soldPriceQuintal}/क्विंटल</span>
              </div>
              <div className="flex justify-between">
                <span>मंडी:</span>
                <span className="text-stone-700">{farmerProfile.seasonalMemory.soldMandi}</span>
              </div>
            </div>

            <p className="text-xs text-stone-700 italic border-t border-amber-200 pt-2 font-devanagari">
              &ldquo;{farmerProfile.seasonalMemory.decisionReflection}&rdquo;
            </p>
          </div>
        </div>

        {/* Right Column: Agricultural Specifications & Family Profiles */}
        <div className="space-y-6 md:col-span-2">
          {/* Farm Details Card */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2 border-b border-stone-100 pb-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>शेती, माती व पिकांचा तपशील (Farm Specifications)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-1">
                <span className="text-stone-500 font-medium block">एकूण जमीन क्षेत्र:</span>
                <span className="text-base font-extrabold text-stone-900 block">{farmerProfile.totalLandAcres} एकर (Acres)</span>
                <span className="text-[11px] text-stone-500">किमान कोरडवाहू व बागायत क्षेत्र</span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-1">
                <span className="text-stone-500 font-medium block">सिंचन सुविधा:</span>
                <span className="text-sm font-bold text-stone-900 block truncate">{farmerProfile.irrigationType}</span>
                <span className="text-[11px] text-emerald-700 font-semibold">८०% ठिबक अनुदान पात्र</span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-1 sm:col-span-2">
                <span className="text-stone-500 font-medium block">मातीचा प्रकार (Soil Classification):</span>
                <span className="text-sm font-bold text-stone-900 block">{farmerProfile.soilType}</span>
                <span className="text-[11px] text-stone-500">इस्रो भुवन (Bhuvan) सॅटेलाइट द्वारे पडताळणीकृत</span>
              </div>
            </div>

            {/* Active Crops Chips */}
            <div>
              <span className="text-xs font-bold text-stone-700 block mb-2">
                सध्या लागवड केलेली पिके (Current Active Crops):
              </span>
              <div className="flex flex-wrap gap-2">
                {farmerProfile.activeCrops.map((crop) => (
                  <span
                    key={crop}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center gap-1.5"
                  >
                    <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{crop}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Family Voice Profiles (Shared Phone Solution) */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>कुटुंब व्हॉईस प्रोफाईल (Family Voice Profiles)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  एकाच फोनवरून कुटुंबातील प्रत्येक सदस्य स्वतःच्या आवडीचे पीक व सल्ला विचारू शकतो.
                </p>
              </div>

              <button
                onClick={() => setShowAddMember(!showAddMember)}
                className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>सदस्य जोडा</span>
              </button>
            </div>

            {/* Add Member Form */}
            {showAddMember && (
              <form onSubmit={handleAddFamilyMember} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="font-bold text-xs text-stone-800 block">नवीन कुटुंब सदस्य नोंदवा:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-stone-600 block mb-1">सदस्याचे नाव:</label>
                    <input
                      type="text"
                      required
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="उदा. अनिता पाटील"
                      className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1">नाते / भूमिका:</label>
                    <select
                      value={newMemberRelation}
                      onChange={(e) => setNewMemberRelation(e.target.value as any)}
                      className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                    >
                      <option value="spouse">धर्मपत्नी (Spouse / Horticulture)</option>
                      <option value="son">मुलगा (Son / AgriTech)</option>
                      <option value="daughter">मुलगी (Daughter / Dairy & Farming)</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMember(false)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold text-stone-600"
                  >
                    रद्द करा
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold"
                  >
                    जोडा
                  </button>
                </div>
              </form>
            )}

            {/* Family Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {farmerProfile.familyMembers.map((member) => {
                const isSelected = member.id === farmerProfile.selectedMemberId;

                return (
                  <div
                    key={member.id}
                    onClick={() => onSelectMember(member.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-950 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                            isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-900'
                          }`}
                        >
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm leading-snug">{member.name}</h4>
                          <span className={`text-[11px] ${isSelected ? 'text-emerald-300' : 'text-stone-500'}`}>
                            {member.roleTitle}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white uppercase">
                          सक्रिय
                        </span>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-200/20 text-xs space-y-1">
                      <div>
                        <span className={isSelected ? 'text-stone-300' : 'text-stone-500'}>पिके:</span>{' '}
                        <span className="font-semibold">{member.cropsManaged.join(', ')}</span>
                      </div>
                      <div className="truncate italic text-[11px]">
                        <span className={isSelected ? 'text-stone-400' : 'text-stone-500'}>शेवटचा प्रश्न:</span>{' '}
                        <span className={isSelected ? 'text-amber-200' : 'text-stone-700'}>
                          &ldquo;{member.lastQuery}&rdquo;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <FarmerSetupModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentProfile={farmerProfile}
        onSaveProfile={onUpdateProfile}
        language={language}
      />
    </div>
  );
};
