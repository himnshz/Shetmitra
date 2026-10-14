import React from 'react';
import {
  Sprout,
  ShieldAlert,
  Home,
  UserCheck,
  HeartHandshake,
  TrendingUp,
  Landmark,
  Scale,
  Mic,
  Presentation,
  Cpu,
  Bug,
  Satellite,
  Globe,
} from 'lucide-react';
import { FarmerProfile, Language } from '../types';

interface HeaderProps {
  farmerProfile: FarmerProfile;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectMember: (memberId: string) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  showPitchDeck: boolean;
  onTogglePitchDeck: () => void;
  showBhashiniHub: boolean;
  onToggleBhashiniHub: () => void;
  onGoToLanding: () => void;
  onGoToAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  farmerProfile,
  language,
  onLanguageChange,
  activeTab,
  onSelectTab,
  showPitchDeck,
  onTogglePitchDeck,
  showBhashiniHub,
  onToggleBhashiniHub,
  onGoToLanding,
  onGoToAuth,
}) => {
  const isMr = language === 'mr';

  const navItems = [
    { id: 'home', labelMr: 'मुख्य सहाय्यक', labelEn: 'Home & Voice' },
    { id: 'diagnostic', labelMr: 'रोग निदान (AI Doctor)', labelEn: 'Disease Doctor' },
    { id: 'regenerative', labelMr: 'माती व उपग्रह (Regen)', labelEn: 'Satellite & Soil' },
    { id: 'market', labelMr: 'मंडी भाव व भाकीत', labelEn: 'Market Prices' },
    { id: 'mesh', labelMr: 'आंतरराज्यीय जाळे (DPG)', labelEn: 'Inter-State Mesh' },
    { id: 'schemes', labelMr: 'शासकीय योजना', labelEn: 'Govt Schemes' },
    { id: 'legal', labelMr: 'कायदेशीर हक्क', labelEn: 'Legal Rights' },
    { id: 'carbon', labelMr: 'कार्बन (MRV)', labelEn: 'Carbon MRV' },
    { id: 'hitl', labelMr: 'तज्ज्ञ पडताळणी', labelEn: 'Human in Loop' },
    { id: 'profile', labelMr: 'शेतकरी प्रोफाईल', labelEn: 'Profile' },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#122415] text-[#f8f7f2] border-b border-[#243f29] shadow-sm w-full">
        {/* Top Emergency/Trust Sub-bar */}
        <div className="bg-[#0b170e] px-3 sm:px-6 py-1 text-[11px] text-[#9bb396] flex items-center justify-between border-b border-[#1c3220]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-medium text-emerald-300">
              {isMr
                ? 'डिजिटल पब्लिक गुड (DPG) • आंतरराज्यीय कृषी डेटा व एआय जाळे'
                : 'Digital Public Good (DPG) • Inter-State Agri Data & AI Network'}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <a
              href="tel:15100"
              className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 transition-colors"
            >
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              <span>{isMr ? 'NALSA मोफत विधी: १५१००' : 'NALSA Legal Helpline: 15100'}</span>
            </a>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          {/* Brand Wordmark (Strict 1-line Top Bar Contract) */}
          <div
            onClick={onGoToLanding}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-95 transition-opacity shrink-0 min-w-0"
            title={isMr ? 'मुख्य पानावर जा' : 'Go to Landing Page'}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900 flex items-center justify-center text-white shadow-inner border border-emerald-400/30 shrink-0">
              <Sprout className="w-5 h-5 text-emerald-200" />
            </div>
            <div className="flex items-baseline gap-1.5 whitespace-nowrap min-w-0">
              <span className="text-lg sm:text-xl font-bold tracking-tight font-serif-indian text-white leading-none">
                {isMr ? 'शेतमित्र' : 'ShetMitra'}
              </span>
              <span className="text-emerald-400 font-sans font-extrabold text-sm leading-none">
                DPG
              </span>
            </div>
          </div>

          {/* Action Zone: Language Switcher & Quick Utility Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Direct Language Switcher */}
            <div className="bg-[#1a331e] border border-[#2b4c30] rounded-xl p-0.5 flex items-center shrink-0">
              <button
                type="button"
                onClick={() => onLanguageChange('mr')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  isMr
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  !isMr
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* DPG Mesh Shortcut */}
            <button
              type="button"
              onClick={() => onSelectTab('mesh')}
              className={`hidden sm:flex px-2.5 py-1 rounded-xl text-xs font-bold items-center gap-1.5 border transition-all ${
                activeTab === 'mesh'
                  ? 'bg-emerald-700 text-white border-emerald-500'
                  : 'bg-[#1b2b3a] text-blue-300 border-blue-500/40 hover:bg-[#25394d]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{isMr ? 'आंतरराज्यीय जाळे' : 'State Mesh'}</span>
            </button>

            {/* Pitch Deck Button */}
            <button
              type="button"
              onClick={onTogglePitchDeck}
              className={`hidden sm:flex px-2.5 py-1 rounded-xl text-xs font-bold items-center gap-1.5 border transition-all ${
                showPitchDeck
                  ? 'bg-amber-500 text-stone-950 border-amber-400'
                  : 'bg-[#263c29] text-amber-300 border-amber-500/40 hover:bg-[#314f36]'
              }`}
            >
              <Presentation className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'पिच डेक' : 'Pitch'}</span>
            </button>

            {/* Setup / Register Button */}
            <button
              type="button"
              onClick={onGoToAuth}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#1e3823] hover:bg-[#26452c] text-emerald-300 border border-[#325937] transition-all flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{isMr ? 'नोंदणी / बदल' : 'Farmer Setup'}</span>
            </button>
          </div>
        </div>

        {/* Desktop/Tablet Horizontal Navigation Bar */}
        <div className="bg-[#0e1d11] border-t border-[#1e3422] px-3 sm:px-6 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1 scrollbar-none whitespace-nowrap">
            {navItems.map((item) => {
              const isActive = !showPitchDeck && !showBhashiniHub && activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-700 text-white font-bold shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.id === 'diagnostic' && <Bug className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                  {item.id === 'regenerative' && <Satellite className="w-3.5 h-3.5 text-emerald-300 shrink-0" />}
                  {item.id === 'mesh' && <Globe className="w-3.5 h-3.5 text-blue-300 shrink-0" />}
                  {item.id === 'hitl' && <HeartHandshake className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                  <span>{isMr ? item.labelMr : item.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Dedicated Thumb-First Mobile Bottom Navigation Bar (Farmers in Field) */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200 md:hidden px-2 pt-1 pb-safe shadow-lg"
      >
        <div className="grid grid-cols-5 items-center justify-around text-center max-w-md mx-auto">
          {/* 1. Home */}
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[48px] ${
              activeTab === 'home' ? 'text-emerald-800 font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight truncate">
              {isMr ? 'मुख्य' : 'Home'}
            </span>
          </button>

          {/* 2. Disease Doctor */}
          <button
            type="button"
            onClick={() => onSelectTab('diagnostic')}
            className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[48px] ${
              activeTab === 'diagnostic' ? 'text-rose-800 font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Bug className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight truncate">
              {isMr ? 'रोग निदान' : 'Doctor'}
            </span>
          </button>

          {/* 3. Center Elevated Voice Mic Action */}
          <div className="flex flex-col items-center justify-center -mt-4">
            <button
              type="button"
              onClick={() => onSelectTab('home')}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-600 text-white shadow-xl flex items-center justify-center border-2 border-white ring-2 ring-emerald-500/20 active:scale-95 transition-transform"
              title={isMr ? 'आवाज सहाय्यक' : 'Voice Assistant'}
            >
              <Mic className="w-6 h-6 animate-pulse" />
            </button>
            <span className="text-[9px] font-bold text-emerald-800 mt-0.5">
              {isMr ? 'बोला' : 'Voice'}
            </span>
          </div>

          {/* 4. Regenerative & Satellite */}
          <button
            type="button"
            onClick={() => onSelectTab('regenerative')}
            className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[48px] ${
              activeTab === 'regenerative' ? 'text-emerald-800 font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Satellite className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight truncate">
              {isMr ? 'माती/उपग्रह' : 'Regen'}
            </span>
          </button>

          {/* 5. Inter-State Mesh */}
          <button
            type="button"
            onClick={() => onSelectTab('mesh')}
            className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[48px] ${
              activeTab === 'mesh' ? 'text-blue-800 font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Globe className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight truncate">
              {isMr ? 'DPG जाळे' : 'Mesh'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
