import React from 'react';
import { Navigation, MapPin, Check, RefreshCw, ChevronRight } from 'lucide-react';
import { Language, FarmerProfile } from '../types';

interface LocationPermissionBannerProps {
  farmerProfile: FarmerProfile;
  isGpsEnabled: boolean;
  permissionStatus: 'prompt' | 'granted' | 'denied' | 'unsupported';
  isDetecting: boolean;
  onRequestPermission: () => void;
  onToggleGps: () => void;
  onSelectManualDistrict: (district: string) => void;
  language: Language;
  compact?: boolean;
}

const DISTRICT_MAPPING: Record<string, { mr: string; en: string }> = {
  'Jalgaon (जळगाव)': { mr: 'जळगाव', en: 'Jalgaon' },
  'Nashik (नाशिक)': { mr: 'नाशिक', en: 'Nashik' },
  'Pune (पुणे)': { mr: 'पुणे', en: 'Pune' },
  'Ahmednagar (अहिल्यानगर/अहमदनगर)': { mr: 'अहिल्यानगर', en: 'Ahmednagar' },
  'Solapur (सोलापूर)': { mr: 'सोलापूर', en: 'Solapur' },
  'Chhatrapati Sambhajinagar (छ. संभाजीनगर)': { mr: 'छ. संभाजीनगर', en: 'Sambhajinagar' },
};

export const LocationPermissionBanner: React.FC<LocationPermissionBannerProps> = ({
  farmerProfile,
  isGpsEnabled,
  permissionStatus,
  isDetecting,
  onRequestPermission,
  onToggleGps,
  onSelectManualDistrict,
  language,
  compact = false,
}) => {
  const isMr = language === 'mr';
  const hasGpsLocation = Boolean(farmerProfile.coordinates?.lat && isGpsEnabled);

  const displayDistrict = isMr
    ? farmerProfile.district
    : farmerProfile.district.split(' ')[0] + ', Maharashtra';

  const displayTaluka = isMr
    ? farmerProfile.taluka || 'तालुका'
    : farmerProfile.taluka || 'Taluka';

  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Side: Status & Farm Location */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
            <Navigation className={`w-5 h-5 ${isDetecting ? 'animate-spin text-emerald-600' : 'text-emerald-700'}`} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span className="text-[11px] font-bold font-mono uppercase text-emerald-800 tracking-wider">
                {isMr ? 'शेताचे स्थान (GPS लोकेशन)' : 'FARM LOCATION (GPS)'}
              </span>
              <span aria-hidden="true">·</span>
              <span className={hasGpsLocation ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                {hasGpsLocation
                  ? (isMr ? 'सक्रिय (GPS पडताळणी)' : 'Active (GPS Verified)')
                  : (isMr ? 'परवानगी आवश्यक' : 'Permission Required')}
              </span>
            </div>

            <p className="text-sm sm:text-base font-bold text-stone-900 truncate font-devanagari mt-0.5">
              {displayDistrict} • {displayTaluka}
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          {/* Toggle Switch */}
          <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-2xl px-3 py-1.5">
            <span className="text-xs text-stone-700 font-bold">GPS</span>
            <button
              type="button"
              onClick={onToggleGps}
              className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative ${
                isGpsEnabled ? 'bg-emerald-700' : 'bg-stone-400'
              }`}
              title={isMr ? 'GPS स्वयं-शोध चालू/बंद करा' : 'Toggle GPS Auto-Detection'}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  isGpsEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Trigger Permission / Detect Button */}
          <button
            type="button"
            onClick={onRequestPermission}
            disabled={isDetecting}
            className="px-3.5 py-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
            <span>
              {isDetecting
                ? (isMr ? 'शोधत आहे...' : 'Locating...')
                : (isMr ? 'स्थान निश्चित करा' : 'Detect Farm GPS')}
            </span>
          </button>
        </div>
      </div>

      {/* 1-Tap District Override Selector */}
      {!compact && (
        <div className="pt-2 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-0.5 text-xs">
          <span className="text-stone-500 font-medium shrink-0">
            {isMr ? 'किंवा जिल्हा बदला:' : 'Or Select District:'}
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {Object.entries(DISTRICT_MAPPING).map(([fullKey, labelObj]) => {
              const isSelected = farmerProfile.district === fullKey;
              return (
                <button
                  key={fullKey}
                  type="button"
                  onClick={() => onSelectManualDistrict(fullKey)}
                  className={`px-3 py-1 rounded-xl whitespace-nowrap text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-emerald-800 text-white font-bold shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {isMr ? labelObj.mr : labelObj.en}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
