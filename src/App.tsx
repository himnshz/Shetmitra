/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { AuthSetupPage } from './components/AuthSetupPage';
import { HomeDashboard } from './components/HomeDashboard';
import { PillarMarketClimate } from './components/PillarMarketClimate';
import { PillarSchemesCivic } from './components/PillarSchemesCivic';
import { PillarLegalEngine } from './components/PillarLegalEngine';
import { PillarCarbonMRV } from './components/PillarCarbonMRV';
import { CropDiseaseDiagnostic } from './components/CropDiseaseDiagnostic';
import { RegenerativeAgroAdvisor } from './components/RegenerativeAgroAdvisor';
import { InterStateAgriMesh } from './components/InterStateAgriMesh';
import { HITLDesk } from './components/HITLDesk';
import { FarmerProfilePage } from './components/FarmerProfilePage';
import { FarmerSetupModal } from './components/FarmerSetupModal';
import { BhashiniModelHub } from './components/BhashiniModelHub';
import { InvestorPitchRoom } from './components/InvestorPitchRoom';
import { useAutoGeolocation } from './hooks/useAutoGeolocation';
import { INITIAL_FARMER_PROFILE } from './data/mockAgriData';
import { Language, FarmerProfile } from './types';
import { Sprout } from 'lucide-react';

const STORAGE_KEY = 'shetmitra_farmer_profile';

type AppView = 'landing' | 'auth' | 'app' | 'pitch' | 'bhashini';

export default function App() {
  const [language, setLanguage] = useState<Language>('mr');
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to load profile from storage:', e);
      }
    }
    return INITIAL_FARMER_PROFILE;
  });

  // Sync profile changes to localStorage
  const handleUpdateProfile = (updated: FarmerProfile) => {
    setFarmerProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to persist profile:', e);
    }
  };

  // Hook: Requests navigator.geolocation permissions upon application load to detect
  // the user's location, and updates the farmerProfile state with detected location data automatically.
  const {
    detectedLocation,
    isDetecting,
    error,
    permissionStatus,
    isGpsEnabled,
    requestLocationPermission,
    toggleGps,
    selectManualDistrict,
  } = useAutoGeolocation(farmerProfile, handleUpdateProfile, {
    autoUpdateProfile: true,
  });

  const handleSelectMember = (memberId: string) => {
    const updated = {
      ...farmerProfile,
      selectedMemberId: memberId,
    };
    handleUpdateProfile(updated);
  };

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthComplete = (newProfile: FarmerProfile) => {
    handleUpdateProfile(newProfile);
    setCurrentView('app');
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f7f6f0] text-[#1c241c] flex flex-col font-sans selection:bg-emerald-200">
      {/* 1. Dedicated Landing Page View */}
      {currentView === 'landing' && (
        <LandingPage
          language={language}
          onLanguageChange={setLanguage}
          farmerProfile={farmerProfile}
          isGpsEnabled={isGpsEnabled}
          permissionStatus={permissionStatus}
          isDetectingLocation={isDetecting}
          onRequestLocationPermission={requestLocationPermission}
          onToggleGps={toggleGps}
          onSelectManualDistrict={selectManualDistrict}
          onGetStarted={() => setCurrentView('auth')}
          onDirectLaunchApp={() => setCurrentView('app')}
          onOpenPitchRoom={() => setCurrentView('pitch')}
          onOpenBhashiniHub={() => setCurrentView('bhashini')}
        />
      )}

      {/* 2. Dedicated Kisan Login & Voice-Assisted Setup Page */}
      {currentView === 'auth' && (
        <AuthSetupPage
          currentProfile={farmerProfile}
          onCompleteSetup={handleAuthComplete}
          onBackToLanding={() => setCurrentView('landing')}
          language={language}
          onLanguageChange={setLanguage}
        />
      )}

      {/* 3. Dedicated Bhashini Hub Full View */}
      {currentView === 'bhashini' && (
        <div className="min-h-screen p-4 sm:p-6 max-w-7xl mx-auto w-full">
          <BhashiniModelHub
            language={language}
            onClose={() => setCurrentView('app')}
          />
        </div>
      )}

      {/* 4. Dedicated Competition Pitch Room Full View */}
      {currentView === 'pitch' && (
        <div className="min-h-screen p-4 sm:p-6 max-w-7xl mx-auto w-full">
          <InvestorPitchRoom
            language={language}
            onExit={() => setCurrentView('app')}
          />
        </div>
      )}

      {/* 5. Production App View with Segregated Navigation Header */}
      {currentView === 'app' && (
        <>
          <Header
            farmerProfile={farmerProfile}
            language={language}
            onLanguageChange={setLanguage}
            onSelectMember={handleSelectMember}
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            showPitchDeck={false}
            onTogglePitchDeck={() => setCurrentView('pitch')}
            showBhashiniHub={false}
            onToggleBhashiniHub={() => setCurrentView('bhashini')}
            onGoToLanding={() => setCurrentView('landing')}
            onGoToAuth={() => setCurrentView('auth')}
          />

          {/* Main Segregated Page Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
            <section className="transition-all duration-150">
              {/* Page 1: Home & Voice Assistant Dashboard */}
              {activeTab === 'home' && (
                <HomeDashboard
                  farmerProfile={farmerProfile}
                  language={language}
                  onNavigate={handleSelectTab}
                  onOpenEditProfile={() => setIsEditModalOpen(true)}
                  isGpsEnabled={isGpsEnabled}
                  permissionStatus={permissionStatus}
                  isDetectingLocation={isDetecting}
                  onRequestLocationPermission={requestLocationPermission}
                  onToggleGps={toggleGps}
                  onSelectManualDistrict={selectManualDistrict}
                />
              )}

              {/* Page 2: Visual Crop Disease Doctor & Biological Remedies */}
              {activeTab === 'diagnostic' && (
                <CropDiseaseDiagnostic language={language} />
              )}

              {/* Page 3: Regenerative Satellite & Soil Health Intelligence */}
              {activeTab === 'regenerative' && (
                <RegenerativeAgroAdvisor language={language} />
              )}

              {/* Page 4: Inter-State Agri Data Mesh & Digital Public Good */}
              {activeTab === 'mesh' && (
                <InterStateAgriMesh language={language} />
              )}

              {/* Page 5: Dedicated Market, Mandi & 7-Day Forecast */}
              {activeTab === 'market' && (
                <PillarMarketClimate language={language} />
              )}

              {/* Page 6: Dedicated Government Schemes & Civic Rights */}
              {activeTab === 'schemes' && (
                <PillarSchemesCivic language={language} />
              )}

              {/* Page 7: Dedicated Legal Awareness & NALSA Helpline */}
              {activeTab === 'legal' && (
                <PillarLegalEngine language={language} />
              )}

              {/* Page 8: Dedicated Voice MRV & Smallholder Carbon Credits */}
              {activeTab === 'carbon' && (
                <PillarCarbonMRV language={language} />
              )}

              {/* Page 6: Human in the Loop (HITL) Verification Desk */}
              {activeTab === 'hitl' && (
                <HITLDesk
                  farmerProfile={farmerProfile}
                  language={language}
                />
              )}

              {/* Page 7: Dedicated Farmer Profile & Land Details */}
              {activeTab === 'profile' && (
                <FarmerProfilePage
                  farmerProfile={farmerProfile}
                  onUpdateProfile={handleUpdateProfile}
                  onSelectMember={handleSelectMember}
                  language={language}
                />
              )}
            </section>
          </main>

          {/* Global Farmer Setup / Edit Modal */}
          <FarmerSetupModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            currentProfile={farmerProfile}
            onSaveProfile={handleUpdateProfile}
            language={language}
          />

          {/* Clean Footer for App View */}
          <footer className="bg-[#121c13] text-[#d6ded5] border-t border-[#233825] mt-12 py-6 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white font-serif-indian">शेतमित्र AI</span>
                <span className="text-stone-400">|</span>
                <span className="text-stone-400 italic">From Algorithm to Agriculture. From Data to Dignity.</span>
              </div>

              <div className="flex items-center gap-4 text-stone-400 font-medium">
                <button onClick={() => setCurrentView('landing')} className="hover:text-emerald-300">
                  मुख्य पान (Landing)
                </button>
                <span>•</span>
                <button onClick={() => setCurrentView('auth')} className="hover:text-emerald-300">
                  नोंदणी / लॉगिन
                </button>
                <span>•</span>
                <button onClick={() => handleSelectTab('hitl')} className="hover:text-emerald-300">
                  मानवी पडताळणी (HITL)
                </button>
                <span>•</span>
                <button onClick={() => setCurrentView('bhashini')} className="hover:text-emerald-300">
                  भाषिणी मॉडेल्स
                </button>
                <span>•</span>
                <a href="tel:15100" className="text-amber-300 hover:underline">
                  NALSA: १५१००
                </a>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
