import React, { useState } from 'react';
import {
  Satellite,
  Layers,
  CloudRain,
  Sprout,
  Activity,
  CheckCircle2,
  TrendingUp,
  Volume2,
  Sparkles,
  Droplets,
  Thermometer,
  Wind,
  Info,
} from 'lucide-react';
import { Language, SatelliteSoilObservation } from '../types';
import { MOCK_SATELLITE_SOIL_DATA } from '../data/mockAgriData';
import { speechService } from '../services/speechService';

interface RegenerativeAgroAdvisorProps {
  language: Language;
}

export const RegenerativeAgroAdvisor: React.FC<RegenerativeAgroAdvisorProps> = ({ language }) => {
  const isMr = language === 'mr';
  const data: SatelliteSoilObservation = MOCK_SATELLITE_SOIL_DATA;

  const handleSpeakAdvisory = () => {
    const text = isMr
      ? `उपग्रह व माती परीक्षण सल्ला: आपल्या शेताचा सेंद्रिय कर्ब ०.३८ टक्के असून तो वाढवण्यासाठी धैंचा किंवा ताग हिरवळीचे खत वापरावे. कापूस पिकात तूर आंतरपीक घेतल्यास नत्राची बचत होईल आणि पुढील ७ दिवसांत ३८ मिमी पाऊस अपेक्षित असल्याने खत व्यवस्थापन वेळेवर करा.`
      : `Satellite and Soil Regenerative Advisory: Plot organic carbon is at 0.38%. Incorporate Sunn hemp green manure to restore microbial balance. Intercrop cotton with pigeon pea to fix atmospheric nitrogen. 38mm precipitation forecast in 7 days.`;
    speechService.speak(text, language);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 md:pb-6">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono block">
            {isMr ? 'उपग्रह, माती व हवामान संचलित पुनरुत्थान शेती' : 'SATELLITE, SOIL & CLIMATE REGENERATIVE ADVISORY'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif-indian mt-0.5">
            {isMr ? 'मातीचे आरोग्य, उपग्रह डेटा व हवामानानुसार पीक नियोजन' : 'Precision Regenerative Crop & Soil Health Intelligence'}
          </h2>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mt-1">
            <span>{data.village}, {data.district}</span>
            <span aria-hidden="true">·</span>
            <span>{isMr ? 'सर्व्हे गट क्र. ४B (४.५ एकर)' : 'Plot 4B (4.5 Acres)'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-800 font-semibold">{isMr ? 'सेंटिनेल-२ रिअल-टाइम' : 'Sentinel-2 Live'}</span>
          </div>
        </div>

        {/* Speak Advisory Button */}
        <button
          type="button"
          onClick={handleSpeakAdvisory}
          className="px-4 py-2 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
        >
          <Volume2 className="w-4 h-4 text-emerald-300" />
          <span>{isMr ? 'सल्ला मराठीत ऐका' : 'Listen to Agro-Advisory'}</span>
        </button>
      </div>

      {/* 2. Tri-Layer Data Grid: Satellite + Soil Card + Weather Projection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Layer 1: Satellite Earth Observation (Sentinel-2) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-3">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-800 font-mono text-[11px]">
              <Satellite className="w-4 h-4 text-emerald-700" />
              <span>{isMr ? 'उपग्रह डेटा (Sentinel-2)' : 'Satellite Spectral Data'}</span>
            </span>
            <span className="font-mono text-[10px] text-stone-400">10m Res</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-stone-600">
                <span>NDVI (पिकाची हिरवळ/कॅनॉपी):</span>
                <span className="font-mono font-bold text-emerald-800">{data.satelliteData.ndvi}</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mt-1">
                <div style={{ width: `${data.satelliteData.ndvi * 100}%` }} className="bg-emerald-600 h-full rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-stone-600">
                <span>NDWI (पानाचा ओलावा निर्देशांक):</span>
                <span className="font-mono font-bold text-blue-700">{data.satelliteData.ndwi}</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mt-1">
                <div style={{ width: `${(data.satelliteData.ndwi + 0.2) * 100}%` }} className="bg-blue-600 h-full rounded-full" />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">{isMr ? 'मातीतील ओल (Proxy):' : 'Soil Moisture:'}</span>
                <strong className="text-stone-800 font-medium">{data.satelliteData.soilMoistureProxy}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isMr ? 'कॅनॉपी कव्हर:' : 'Canopy Coverage:'}</span>
                <strong className="text-stone-800 font-mono">{data.satelliteData.canopyCoverPercent}%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 2: Soil Health Card Laboratory Parameters */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-3">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-800 font-mono text-[11px]">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>{isMr ? 'मृदा आरोग्य पत्रिका (SHC)' : 'Soil Health Card'}</span>
            </span>
            <span className="font-mono text-[10px] text-amber-700 font-bold">{data.soilHealthCard.soilRating}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-500 block">सेंद्रिय कर्ब (OC)</span>
              <strong className="text-amber-800 font-mono text-sm block mt-0.5">{data.soilHealthCard.organicCarbonPercent}%</strong>
              <span className="text-[9px] text-rose-600 font-medium block">कमी (लक्ष्य: &gt; ०.८%)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-500 block">सामू (pH)</span>
              <strong className="text-stone-800 font-mono text-sm block mt-0.5">{data.soilHealthCard.ph}</strong>
              <span className="text-[9px] text-stone-600 block">किंचित अल्कधर्मी (काळी)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-500 block">जस्त (Zinc)</span>
              <strong className="text-rose-700 font-mono text-sm block mt-0.5">{data.soilHealthCard.zincPpm} ppm</strong>
              <span className="text-[9px] text-rose-600 font-medium block">कमतरता (Deficient)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-500 block">उपलब्ध नत्र (N)</span>
              <strong className="text-stone-800 font-mono text-sm block mt-0.5">{data.soilHealthCard.nitrogenKgHa} kg/ha</strong>
              <span className="text-[9px] text-amber-700 block">मध्यम (तूर आवश्यक)</span>
            </div>
          </div>
        </div>

        {/* Layer 3: 7-Day High-Resolution Weather & Microclimate */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-3">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-800 font-mono text-[11px]">
              <CloudRain className="w-4 h-4 text-blue-700" />
              <span>{isMr ? 'हवामान अंदाज (IMD ECMWF)' : '7-Day Weather Projection'}</span>
            </span>
            <span className="font-mono text-[10px] text-blue-700 font-bold">Rain Forecast</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-blue-800 uppercase font-mono font-bold block">
                  {isMr ? 'पुढील ७ दिवसांचा पाऊस' : 'Precipitation Window'}
                </span>
                <span className="text-lg font-bold text-blue-950 font-mono">{data.weatherForecast.rainfallNext7DaysMm} mm</span>
              </div>
              <Droplets className="w-7 h-7 text-blue-600 opacity-80" />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="flex items-center gap-1 text-stone-600">
                <Thermometer className="w-3.5 h-3.5 text-stone-400" />
                <span>कमाल: <strong className="font-mono text-stone-900">{data.weatherForecast.tempMax}°C</strong></span>
              </div>
              <div className="flex items-center gap-1 text-stone-600">
                <Wind className="w-3.5 h-3.5 text-stone-400" />
                <span>वारा: <strong className="font-mono text-stone-900">{data.weatherForecast.windSpeedKmph} km/h</strong></span>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 pt-1 font-devanagari">
              {isMr ? 'मान्सून विचलन: +८.४% (हलक्या ते मध्यम सरींचा अंदाज; आंतरमशागत २ दिवसांत उरका).' : 'Monsoon +8.4% deviation. Complete inter-cultivation before rain window.'}
            </div>
          </div>
        </div>
      </div>

      {/* 3. AI-Driven Regenerative Prescriptions */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif-indian">
                {isMr ? 'माती व उपग्रह आकडेवारीवर आधारित पुनरुत्थान शिफारसी' : 'Precision Regenerative Crop & Farm Plan'}
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5 font-devanagari">
              {isMr
                ? 'रासायनिक खतांचा खर्च ३५% कमी करून जमिनीत सेंद्रिय कर्ब व पाणी धारणा क्षमता वाढवणारा वैज्ञानिक आराखडा.'
                : 'Scientific roadmap designed to cut input costs by 35% while sequestering soil carbon.'}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
              +{data.regenerativePrescriptions.soilCarbonTargetTonsPerAcre} t/acre C-Seq
            </span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-800 font-bold border border-blue-200">
              {data.regenerativePrescriptions.waterSavingPercent}% Water Saved
            </span>
          </div>
        </div>

        {/* 3 Action Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Action 1: Recommended Crops & Intercropping */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
            <span className="text-xs font-bold text-emerald-900 uppercase font-mono block">
              {isMr ? '१. आंतरपीक व पीक फेरपालट' : '1. Intercropping & Rotation'}
            </span>
            <ul className="space-y-1.5 text-xs font-semibold text-stone-800 font-devanagari">
              {data.regenerativePrescriptions.recommendedCrops.map((crop, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{crop}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-stone-600 font-devanagari pt-1 leading-relaxed">
              {isMr
                ? data.regenerativePrescriptions.cropRotationStrategyMr
                : data.regenerativePrescriptions.cropRotationStrategyEn}
            </p>
          </div>

          {/* Action 2: Cover Crop & Soil Carbon Buildup */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
            <span className="text-xs font-bold text-amber-900 uppercase font-mono block">
              {isMr ? '२. हिरवळीचे खत व आच्छादन (Cover Crop)' : '2. Cover Crop & Carbon Restoration'}
            </span>
            <p className="text-xs font-semibold text-stone-800 font-devanagari">
              {isMr
                ? data.regenerativePrescriptions.coverCropChoiceMr
                : data.regenerativePrescriptions.coverCropChoiceEn}
            </p>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950 font-medium font-devanagari">
              {isMr
                ? 'शून्य मशागत (Zero-Tillage) सह तणाचा प्रादुर्भाव ६०% घटतो आणि पाण्याचे बाष्पीभवन थांबते.'
                : 'Zero-tillage residue mulching retains 40% more moisture through dry spells.'}
            </div>
          </div>

          {/* Action 3: Biofertilizer Consortium & Zinc Correction */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
            <span className="text-xs font-bold text-blue-900 uppercase font-mono block">
              {isMr ? '३. जैविक संवर्धक व जिवाणू खते' : '3. Microbial Biofertilizers'}
            </span>
            <ul className="space-y-1.5 text-xs text-stone-800 font-devanagari">
              {(isMr ? data.regenerativePrescriptions.biofertilizersMr : data.regenerativePrescriptions.biofertilizersEn).map((bio, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                  <span>{bio}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
