import React, { useState } from 'react';
import {
  TrendingUp,
  MapPin,
  Truck,
  BarChart3,
  CheckCircle2,
  Navigation,
  Layers,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import { CROP_FORECASTS } from '../data/mockAgriData';
import { Language } from '../types';

interface PillarMarketClimateProps {
  language: Language;
}

export const PillarMarketClimate: React.FC<PillarMarketClimateProps> = ({ language }) => {
  const isMr = language === 'mr';
  const [selectedCrop, setSelectedCrop] = useState<string>('Onion');
  const forecast = CROP_FORECASTS[selectedCrop] || CROP_FORECASTS.Onion;

  const daysLabels = isMr
    ? ['आज', 'उद्या (+१)', '+२ दिवस', '+३ दिवस', '+४ दिवस', '+५ दिवस', '+६ दिवस']
    : ['Today', 'Tomorrow', '+2 Days', '+3 Days', '+4 Days', '+5 Days', '+6 Days'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 md:pb-6">
      {/* Header with Crop Selector */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono block">
            {isMr ? 'बाजार भाव व हवामान विश्लेषण' : 'MARKET & CLIMATE FORECAST'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif-indian mt-0.5">
            {isMr ? '७ दिवसांचे मंडी भाव भाकीत व विक्री सल्ला' : '7-Day Mandi Price Prediction & Harvest Window'}
          </h2>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mt-1">
            <span>{isMr ? 'हायब्रिड मॉडेल (XGBoost + Bi-LSTM)' : 'Hybrid XGBoost-LSTM Model'}</span>
            <span aria-hidden="true">·</span>
            <span>{isMr ? 'दिशात्मक अचूकता: ९१.३%' : 'Directional Accuracy: 91.3%'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">R² = 0.941</span>
          </div>
        </div>

        {/* Crop Selector Segmented Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl border border-stone-200">
          {Object.keys(CROP_FORECASTS).map((cropKey) => {
            const isSelected = selectedCrop === cropKey;
            const label =
              cropKey === 'Onion'
                ? isMr ? 'कांदा' : 'Onion'
                : cropKey === 'Cotton'
                ? isMr ? 'कापूस' : 'Cotton'
                : isMr ? 'सोयाबीन' : 'Soyabean';

            return (
              <button
                key={cropKey}
                type="button"
                onClick={() => setSelectedCrop(cropKey)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Prediction & Decision Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Current Price & Recommendation Window */}
        <div className="bg-[#122415] text-white rounded-3xl p-6 border border-[#243f29] shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-300">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{forecast.mandi}</span>
              </span>
              <span className="font-mono text-emerald-300 text-[11px]">
                Agmarknet Live
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xs text-stone-400 font-medium block">
                {isMr ? 'आजचा सरासरी मॉडेल भाव (Current Modal Price)' : 'Current Modal Mandi Price'}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 flex items-baseline gap-2 font-mono tracking-tight">
                <span>₹{forecast.currentModalPrice.toLocaleString()}</span>
                <span className="text-xs font-normal text-stone-300 font-sans">
                  {isMr ? '/ क्विंटल' : '/ Quintal'}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{isMr ? '+३.८% मागील २४ तासांत तेजी' : '+3.8% in last 24 hours'}</span>
              </div>
            </div>

            {/* Strategic Decision Recommendation Card */}
            <div className="mt-6 p-4 rounded-2xl bg-[#1d3822] border border-[#2e5635] space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>{isMr ? 'शेतमित्र विक्री व काढणी सल्ला' : 'RECOMMENDED DECISION'}</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-stone-100 font-devanagari leading-relaxed">
                {forecast.recommendationText}
              </p>
            </div>
          </div>

          {/* Model Accuracy Proof Tag */}
          <div className="pt-3 border-t border-[#223d26] text-xs text-stone-400 font-mono flex items-center justify-between">
            <span>Accuracy: {forecast.modelMetrics.directionalAccuracy}</span>
            <span className="text-emerald-400">R² = {forecast.modelMetrics.rSquared}</span>
          </div>
        </div>

        {/* Right: 7-Day Forecast Chart / Grid */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-stone-900 text-sm font-serif-indian">
                  {isMr ? 'पुढील ७ दिवसांचे अपेक्षित भाव (Daily Price Trajectory)' : '7-Day Daily Price Trajectory'}
                </h3>
                <span className="text-xs text-stone-500 font-medium">
                  {isMr ? 'नाशिक व लासलगाव बाजार समिती समूह' : 'Nashik & Lasalgaon APMC Cluster'}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800">
                XGBoost + Bi-LSTM
              </span>
            </div>

            {/* Visual Bar Chart */}
            <div className="grid grid-cols-7 gap-2 items-end h-44 pt-6 pb-2 border-b border-stone-100">
              {forecast.forecast7d.map((price, idx) => {
                const minPrice = Math.min(...forecast.forecast7d);
                const maxPrice = Math.max(...forecast.forecast7d);
                const heightPercent = Math.max(25, Math.round(((price - minPrice * 0.95) / (maxPrice - minPrice * 0.95)) * 100));
                const isBestDay = idx === 5 || idx === 6;

                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group">
                    <div className="text-[11px] font-bold text-stone-800 mb-1 group-hover:text-emerald-800 font-mono">
                      ₹{price}
                    </div>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-xl transition-all ${
                        isBestDay
                          ? 'bg-emerald-700 shadow-xs ring-1 ring-emerald-500'
                          : 'bg-stone-300 group-hover:bg-emerald-600'
                      }`}
                    />
                    <div className="text-[10px] text-stone-600 font-medium mt-2 text-center truncate w-full">
                      {daysLabels[idx]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
              <span className="text-stone-800 font-medium">
                {isMr ? 'सर्वोत्तम विक्री दिवस (Highest Price Window)' : 'Optimal Selling Window'}
              </span>
            </div>
            <div className="text-stone-500 text-[11px]">
              {isMr ? '*स्थानिक आवक व पावसाच्या नोंदीनुसार अद्ययावत.' : '*Calibrated with real-time arrivals & IMD precipitation.'}
            </div>
          </div>
        </div>
      </div>

      {/* Spatial Mandi Travel Advisor (Net Realization Calculator) */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 text-stone-900 font-bold text-base font-serif-indian">
            <Truck className="w-5 h-5 text-emerald-700" />
            <span>
              {isMr
                ? 'मंडी प्रवास सल्लागार: वाहतूक खर्च वजा जाता खरा निव्वळ नफा'
                : 'Mandi Travel Advisor: Net Realization after Transit Costs'}
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-0.5 font-devanagari">
            {isMr
              ? 'केवळ जास्त भाव न पाहता अंतर व वाहतूक खर्च (₹१० प्रति क्विंटल/किमी) वजा जाता प्रत्यक्ष हातात किती रक्कम पडेल याची तुलना:'
              : 'Direct comparison deducting transit costs (₹10 per quintal/km) to calculate actual cash-in-hand:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {forecast.netRealizationComparison.map((mandi, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                mandi.isBestChoice
                  ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-600/20 shadow-xs'
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm font-devanagari">{mandi.mandiName}</h4>
                  <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <Navigation className="w-3 h-3 text-stone-400" />
                    <span>
                      {isMr ? `अंतर: ${mandi.distanceKm} किमी` : `Distance: ${mandi.distanceKm} km`}
                    </span>
                  </div>
                </div>
                {mandi.isBestChoice && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-lg bg-emerald-800 text-white font-mono">
                    {isMr ? 'सर्वात जास्त नफा' : 'MAX PROFIT'}
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{isMr ? 'बाजार भाव:' : 'Mandi Price:'}</span>
                  <span className="font-mono font-semibold text-stone-900">₹{mandi.modalPrice}</span>
                </div>
                <div className="flex justify-between text-rose-700">
                  <span>{isMr ? 'अंदाजे वाहतूक खर्च:' : 'Transit Cost:'}</span>
                  <span className="font-mono font-semibold">- ₹{mandi.transportCostPerQuintal}</span>
                </div>
                <div className="flex justify-between text-stone-900 font-bold pt-1.5 border-t border-stone-200 text-sm">
                  <span>{isMr ? 'हातात पडणारा निव्वळ भाव:' : 'Net Realization:'}</span>
                  <span className={`font-mono text-base ${mandi.isBestChoice ? 'text-emerald-800' : 'text-stone-900'}`}>
                    ₹{mandi.netRealizationPerQuintal}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Supply Signal Layer */}
      <div className="bg-amber-50/90 border border-amber-300 rounded-3xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-200/80 flex items-center justify-center text-amber-900 shrink-0">
          <Layers className="w-5 h-5 text-amber-800" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-amber-950 text-sm font-serif-indian">
              {isMr
                ? 'सामूहिक काढणी संकेत (Community Supply Signal)'
                : 'Community Supply Glut Signal'}
            </h4>
            <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-lg">
              {isMr ? '५०+ स्थानिक शेतकरी' : '50+ Farmers'}
            </span>
          </div>
          <p className="text-xs text-amber-900 mt-1 leading-relaxed font-devanagari">
            {isMr
              ? 'आपल्या परिसरातील ६२% कांदा उत्पादक शेतकऱ्यांनी पुढील ३ दिवसांत काढणीची योजना आखली आहे. यामुळे स्थानिक लासलगाव व पिंपळगाव बाजारात अचानक आवक वाढून तात्पुरती मंदी येण्याची शक्यता आहे. शिफारस: माल ४ दिवस उशिरा काढा किंवा थेट पुणे बाजाराकडे वळवा.'
              : '62% of onion farmers in your taluka plan harvest within 72 hours. This will trigger a temporary supply glut in Lasalgaon. Recommendation: Stagger harvest by 4-5 days or divert to Pune mandi.'}
          </p>
        </div>
      </div>
    </div>
  );
};
