import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Leaf,
  Bug,
  ShieldAlert,
  ArrowRight,
  Share2,
  RefreshCw,
  Info,
  Layers,
  Volume2,
  Radio,
} from 'lucide-react';
import { Language, CropDiseaseDiagnosis } from '../types';
import { CROP_DISEASE_CATALOG } from '../data/mockAgriData';
import { speechService } from '../services/speechService';

interface CropDiseaseDiagnosticProps {
  language: Language;
}

export const CropDiseaseDiagnostic: React.FC<CropDiseaseDiagnosticProps> = ({ language }) => {
  const isMr = language === 'mr';
  const [selectedDisease, setSelectedDisease] = useState<CropDiseaseDiagnosis>(CROP_DISEASE_CATALOG[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [alertBroadcastSuccess, setAlertBroadcastSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'sample' | 'custom'>('sample');

  const handleSelectSample = (sample: CropDiseaseDiagnosis) => {
    setIsAnalyzing(true);
    setAlertBroadcastSuccess(false);
    setTimeout(() => {
      setSelectedDisease(sample);
      setUploadedImagePreview(null);
      setIsAnalyzing(false);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePreview(reader.result as string);
        setIsAnalyzing(true);
        setAlertBroadcastSuccess(false);
        // Simulate multimodal AI diagnosis
        setTimeout(() => {
          setSelectedDisease(CROP_DISEASE_CATALOG[1]); // Cotton Pink Bollworm as custom match
          setIsAnalyzing(false);
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBroadcastAlert = () => {
    setAlertBroadcastSuccess(true);
    setTimeout(() => setAlertBroadcastSuccess(false), 5000);
  };

  const handleSpeakRemedy = () => {
    const text = isMr
      ? `रोग निदान: ${selectedDisease.diseaseNameMr}. जैविक उपाय: ${selectedDisease.regenerativeTreatmentMr[0]}. रासायनिक पर्याय: ${selectedDisease.chemicalFallbackMr}`
      : `Disease Diagnosis: ${selectedDisease.diseaseNameEn}. Biological solution: ${selectedDisease.regenerativeTreatmentEn[0]}. Emergency chemical fallback: ${selectedDisease.chemicalFallbackEn}`;
    speechService.speak(text, language);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 md:pb-6">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-800 uppercase tracking-wider font-mono block">
            {isMr ? 'एआय पीक रोग व कीड निदान' : 'AI MULTIMODAL CROP DISEASE DIAGNOSTIC'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif-indian mt-0.5">
            {isMr ? 'पानांचा फोटो काढा आणि जैविक उपचार मिळवा' : 'Visual Crop Disease Doctor & Biological Remedies'}
          </h2>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mt-1">
            <span>{isMr ? 'संगणकीय दृष्टी (Computer Vision AI)' : 'Computer Vision Agro-Diagnostics'}</span>
            <span aria-hidden="true">·</span>
            <span>{isMr ? 'नैसर्गिक व जैविक प्राधान्य' : 'Regenerative-First Protocol'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-800 font-semibold">{isMr ? 'आंतरराज्यीय कीड इशारा' : 'Inter-State Mesh Alerting'}</span>
          </div>
        </div>

        {/* Speak Diagnosis Button */}
        <button
          type="button"
          onClick={handleSpeakRemedy}
          className="px-4 py-2 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
        >
          <Volume2 className="w-4 h-4 text-emerald-300" />
          <span>{isMr ? 'उपचार मराठीत ऐका' : 'Listen to Prescription'}</span>
        </button>
      </div>

      {/* 2. Interactive Input Panel: Sample Cases vs. Camera Upload */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono">
            {isMr ? 'निदानासाठी नमुना निवडा किंवा शेतातील फोटो अपलोड करा:' : 'Select Diagnostic Sample or Upload Field Leaf Photo:'}
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('sample')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'sample' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              {isMr ? 'नमुने (Samples)' : 'Field Samples'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'custom' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              {isMr ? 'कॅमेरा / फोटो (Upload)' : 'Camera / Upload'}
            </button>
          </div>
        </div>

        {activeTab === 'sample' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CROP_DISEASE_CATALOG.map((sample) => {
              const isSelected = selectedDisease.id === sample.id;
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-500/20 shadow-xs'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-mono text-[11px] font-bold text-rose-800">{sample.cropName}</span>
                    <span className="text-[10px] font-bold font-mono text-emerald-800">{sample.confidence}% Match</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm font-devanagari">
                    {isMr ? sample.diseaseNameMr : sample.diseaseNameEn}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-600 mt-2">
                    <Bug className="w-3.5 h-3.5 text-stone-400" />
                    <span>{sample.pathogenType}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="border-2 border-dashed border-stone-300 rounded-3xl p-6 text-center hover:border-emerald-600 transition-colors bg-stone-50/50">
            <input
              type="file"
              accept="image/*"
              id="leaf-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label htmlFor="leaf-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
                <Camera className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-stone-800">
                {isMr ? 'शेतातील रोगट पानाचा फोटो काढा किंवा फाइल निवडा' : 'Capture or Upload Infected Crop Leaf / Boll Photo'}
              </span>
              <span className="text-xs text-stone-500">
                {isMr ? 'JPG, PNG किंवा थेट मोबाइल कॅमेरा (थेट AI विश्लेषण)' : 'Supports instant AI computer vision diagnosis in milliseconds'}
              </span>
            </label>

            {uploadedImagePreview && (
              <div className="mt-4 inline-block relative rounded-2xl overflow-hidden border border-stone-300 shadow-sm">
                <img src={uploadedImagePreview} alt="Uploaded leaf" className="max-h-48 object-cover rounded-xl" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Diagnostic Report & Biological Prescription */}
      {isAnalyzing ? (
        <div className="bg-white rounded-3xl p-10 border border-stone-200 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-emerald-700 animate-spin mx-auto" />
          <p className="text-sm font-bold text-stone-800 font-devanagari">
            {isMr ? 'एआय संगणकीय दृष्टीद्वारे रोग लक्षणे तपासली जात आहेत...' : 'AI analyzing cellular leaf lesions and micro-pathogen traits...'}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Diagnostic Result Card */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider font-mono">
                    {selectedDisease.cropName}
                  </span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-xs font-mono font-bold text-emerald-800">
                    {selectedDisease.confidence}% {isMr ? 'अचूकता (Confidence)' : 'Confidence'}
                  </span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-xs font-bold text-amber-800">{selectedDisease.severity}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif-indian mt-1">
                  {isMr ? selectedDisease.diseaseNameMr : selectedDisease.diseaseNameEn}
                </h3>
                <span className="text-xs text-stone-500 italic font-mono block mt-0.5">
                  {selectedDisease.scientificName}
                </span>
              </div>

              {/* Inter-State Biosecurity Trigger Button */}
              {selectedDisease.isInterStateAlertActive && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleBroadcastAlert}
                    className="px-3.5 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
                  >
                    <Radio className="w-4 h-4 text-amber-700 animate-pulse" />
                    <span>{isMr ? 'आंतरराज्यीय जाळ्यावर इशारा पाठवा' : 'Broadcast to Inter-State Mesh'}</span>
                  </button>
                </div>
              )}
            </div>

            {alertBroadcastSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center gap-2 font-devanagari">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  {isMr
                    ? `हा कीड उद्रेक यशस्वीरित्या आंतरराज्यीय कृषी डेटा जाळ्यावर (Maharashtra-Karnataka-Telangana Mesh) नोंदवला गेला. सीमाभागातील कृषी अधिकाऱ्यांना पूर्वसूचना पाठवली गेली आहे.`
                    : `Outbreak vector successfully logged into Inter-State Agricultural Data Mesh. Border talukas alerted.`}
                </span>
              </div>
            )}

            {/* Symptoms Breakdown */}
            <div>
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 font-mono">
                {isMr ? 'ओळखलेली प्रमुख लक्षणे (Key Symptoms Identified):' : 'Identified Visual Symptoms:'}
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700 font-devanagari">
                {(isMr ? selectedDisease.symptomsMr : selectedDisease.symptomsEn).map((sym, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 shrink-0" />
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dual Treatment Protocol: Regenerative vs. Chemical Fallback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Pillar 1: Regenerative / Biological Solution (Primary) */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider font-mono">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span>{isMr ? '१. सेंद्रिय व जैविक उपचार (प्राधान्य)' : '1. Regenerative & Biological Recipe (Primary)'}</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-devanagari">
                  {(isMr ? selectedDisease.regenerativeTreatmentMr : selectedDisease.regenerativeTreatmentEn).map((treat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{treat}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-[11px] text-emerald-800 font-medium pt-1">
                  {isMr ? '✓ मित्रकिडी व मधमाश्यांना कोणताही धोका नाही • मातीचे सूक्ष्मजीव अबाधित.' : '✓ Safe for pollinators & soil biodiversity • Zero toxic runoff.'}
                </div>
              </div>

              {/* Pillar 2: Emergency IPM Chemical Fallback */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider font-mono">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>{isMr ? '२. आपत्कालीन रासायनिक पर्याय (IPM Fallback)' : '2. Emergency Chemical Fallback (IPM Only)'}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 font-devanagari leading-relaxed">
                  {isMr ? selectedDisease.chemicalFallbackMr : selectedDisease.chemicalFallbackEn}
                </p>
                <div className="p-2.5 rounded-xl bg-amber-100/70 text-[11px] text-amber-950 font-semibold space-y-1">
                  <div>
                    {isMr ? 'काढणीपूर्व सुरक्षित अंतर (PHI):' : 'Pre-Harvest Interval (PHI):'}{' '}
                    <strong className="font-mono text-xs">{selectedDisease.preHarvestIntervalDays} {isMr ? 'दिवस' : 'Days'}</strong>
                  </div>
                  <div>
                    {isMr ? 'टीप: रासायनिक फवारणी केवळ प्रादुर्भाव ५०% पेक्षा जास्त असतानाच करावी.' : 'Note: Resort to chemicals only if economic threshold limit (ETL) exceeds critical index.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
