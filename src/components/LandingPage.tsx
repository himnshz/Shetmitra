import React from 'react';
import {
  Sprout,
  TrendingUp,
  Landmark,
  Scale,
  Leaf,
  ShieldCheck,
  Users,
  Mic,
  ArrowRight,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Award,
  PhoneCall,
  Presentation,
  Cpu,
  Globe,
  Navigation,
  ChevronRight,
  BarChart3,
  Bug,
  Satellite,
} from 'lucide-react';
import { Language, FarmerProfile } from '../types';
import { LocationPermissionBanner } from './LocationPermissionBanner';

interface LandingPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  farmerProfile: FarmerProfile;
  isGpsEnabled: boolean;
  permissionStatus: 'prompt' | 'granted' | 'denied' | 'unsupported';
  isDetectingLocation: boolean;
  onRequestLocationPermission: () => void;
  onToggleGps: () => void;
  onSelectManualDistrict: (district: string) => void;
  onGetStarted: () => void;
  onDirectLaunchApp: () => void;
  onOpenPitchRoom: () => void;
  onOpenBhashiniHub: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  onLanguageChange,
  farmerProfile,
  isGpsEnabled,
  permissionStatus,
  isDetectingLocation,
  onRequestLocationPermission,
  onToggleGps,
  onSelectManualDistrict,
  onGetStarted,
  onDirectLaunchApp,
  onOpenPitchRoom,
  onOpenBhashiniHub,
}) => {
  const isMr = language === 'mr';

  return (
    <div className="min-h-screen bg-[#f8f7f2] text-[#142216] font-sans selection:bg-emerald-200 w-full overflow-x-hidden">
      {/* 1. Top Navigation Bar (Strict 1-Row, 3-Zone Top Bar Contract) */}
      <nav className="sticky top-0 z-30 bg-[#122415]/95 backdrop-blur-md text-white border-b border-[#243f29] px-4 sm:px-8 py-3 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <div className="flex items-center gap-2.5 min-w-0 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900 flex items-center justify-center text-white shadow-inner border border-emerald-400/30 shrink-0">
              <Sprout className="w-5 h-5 text-emerald-200" />
            </div>
            <div className="flex items-baseline gap-1.5 whitespace-nowrap min-w-0">
              <span className="text-lg sm:text-xl font-bold tracking-tight font-serif-indian text-white leading-none">
                {isMr ? 'शेतमित्र' : 'ShetMitra'}
              </span>
              <span className="text-emerald-400 font-sans font-extrabold text-sm leading-none">
                AI
              </span>
            </div>
          </div>

          {/* Zone 2: Clean Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-stone-200">
            <a href="#forecast" className="hover:text-emerald-300 transition-colors">
              {isMr ? 'मंडी भाव भाकीत' : 'Price Forecast'}
            </a>
            <a href="#schemes" className="hover:text-emerald-300 transition-colors">
              {isMr ? 'शासकीय योजना' : 'Govt Subsidies'}
            </a>
            <a href="#legal" className="hover:text-emerald-300 transition-colors">
              {isMr ? 'NALSA १५१०० संरक्षण' : 'Legal Rights'}
            </a>
            <a href="#carbon" className="hover:text-emerald-300 transition-colors">
              {isMr ? 'कार्बन उत्पन्न (MRV)' : 'Carbon MRV'}
            </a>
          </div>

          {/* Zone 3: Primary Action & Direct Controls */}
          <div className="flex items-center gap-2 shrink-0">
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

            <button
              type="button"
              onClick={onOpenBhashiniHub}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#1b2b3a] text-blue-300 border border-blue-500/40 hover:bg-[#25394d] transition-all hidden sm:flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>{isMr ? 'भाषिणी AI' : 'Bhashini AI'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenPitchRoom}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#263c29] text-amber-300 border border-amber-500/40 hover:bg-[#314f36] transition-all hidden sm:flex items-center gap-1.5"
            >
              <Presentation className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'पिच डेक' : 'Pitch Deck'}</span>
            </button>

            <button
              type="button"
              onClick={onGetStarted}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <span>{isMr ? 'नोंदणी / लॉगिन' : 'Register / Login'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section: Dignified Rural Agricultural Landscape */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#122415] via-[#18321c] to-[#0e1d11] text-white pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6 relative z-10">
          {/* Quiet Subtitle Banner */}
          <div className="text-xs sm:text-sm font-semibold text-emerald-300 tracking-wide flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {isMr
                ? 'डिजिटल पब्लिक गुड (DPG) • आंतरराज्यीय कृषी डेटा जाळे व एआय सल्लागार'
                : 'Interoperable Digital Public Good (DPG) • Inter-State Agri Data & AI Network'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-serif-indian leading-tight text-white max-w-3xl mx-auto">
            {isMr ? (
              <>
                शाश्वत शेतीसाठी एकात्मिक <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300">
                  आंतरराज्यीय कृषी डेटा व एआय जाळे.
                </span>
              </>
            ) : (
              <>
                Interoperable Digital Agriculture <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300">
                  For Sustainable Food Production.
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-stone-200 font-devanagari max-w-2xl mx-auto leading-relaxed">
            {isMr
              ? 'उपग्रह डेटा, मृदा आरोग्य पत्रिका व हवामान पूर्वानुमानावर आधारित पुनरुत्थान पीक नियोजन, कॅमेऱ्याद्वारे पीक रोग निदान, ७ दिवसांचे अचूक मंडी भाव भाकीत आणि भारतीय राज्यांमध्ये कृषी मॉडेल्स सामायिक करणारा स्केलेबल डिजिटल पब्लिक गुड.'
              : 'Scalable Digital Public Good delivering real-time localised agro-advisories, regenerative crop recommendations (Sentinel-2 satellite + soil health + ECMWF weather), and multimodal crop disease diagnosis, enabling Indian states to exchange AI models.'}
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onGetStarted}
              className="px-6 sm:px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 ring-2 ring-emerald-500/30"
            >
              <Mic className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{isMr ? 'व्हॉईसने नोंदणी करा' : 'Voice Registration (Get Started)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onDirectLaunchApp}
              className="px-6 sm:px-7 py-3.5 rounded-2xl bg-[#1e3823] hover:bg-[#26472d] text-stone-200 border border-[#355f3b] font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <span>{isMr ? 'थेट ॲप डॅशबोर्ड पहा' : 'Open Live App Dashboard'}</span>
            </button>
          </div>

          {/* Location Banner inside Hero */}
          <div className="pt-4 max-w-xl mx-auto text-left">
            <LocationPermissionBanner
              farmerProfile={farmerProfile}
              isGpsEnabled={isGpsEnabled}
              permissionStatus={permissionStatus}
              isDetecting={isDetectingLocation}
              onRequestPermission={onRequestLocationPermission}
              onToggleGps={onToggleGps}
              onSelectManualDistrict={onSelectManualDistrict}
              language={language}
            />
          </div>

          {/* Quantitative Metrics Bar (Tabular Numbers, Clean Layout) */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-xs text-stone-300 block font-medium">
                {isMr ? 'दिशात्मक अचूकता:' : 'Directional Accuracy:'}
              </span>
              <span className="text-2xl font-extrabold text-emerald-400 block mt-1 font-mono">
                {isMr ? '९१.३%' : '91.3%'}
              </span>
              <span className="text-[11px] text-stone-400">
                {isMr ? 'R² = ०.९४१ (Technovate)' : 'R² = 0.941 (Technovate)'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-xs text-stone-300 block font-medium">
                {isMr ? 'लहान शेतकरी:' : 'MH Smallholders:'}
              </span>
              <span className="text-2xl font-extrabold text-amber-300 block mt-1 font-mono">
                {isMr ? '८९.४%' : '89.4%'}
              </span>
              <span className="text-[11px] text-stone-400">
                {isMr ? '१.५३ कोटी कुटुंबे' : '15.3M Families'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-xs text-stone-300 block font-medium">
                {isMr ? 'सरकारी टेक स्टॅक:' : 'Govt Tech Cost:'}
              </span>
              <span className="text-2xl font-extrabold text-emerald-300 block mt-1 font-mono">
                {isMr ? '₹० (मोफत)' : '₹0 (Free)'}
              </span>
              <span className="text-[11px] text-stone-400">
                {isMr ? 'भाषिणी, Agmarknet, NALSA' : 'Bhashini, Agmarknet, NALSA'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-xs text-stone-300 block font-medium">
                {isMr ? 'ग्रॉस मार्जिन:' : 'Gross Margin:'}
              </span>
              <span className="text-2xl font-extrabold text-white block mt-1 font-mono">
                {isMr ? '८८%' : '88%'}
              </span>
              <span className="text-[11px] text-stone-400">
                {isMr ? '₹९९ वर्गणी • ₹१२ खर्च' : '₹99 Sub • ₹12 Unit Cost'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Founding Human Story (Information Asymmetry in Agriculture) */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-9 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span>{isMr ? 'संस्थापक प्रेरणा (THE FOUNDING INSPIRATION)' : 'FOUNDING INSPIRATION'}</span>
          </div>

          <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-indian text-stone-900 leading-snug">
            {isMr
              ? '“आम्ही शेतीमुळे नव्हे, तर योग्य वेळी माहिती न मिळाल्यामुळे हरलो.”'
              : '“We didn’t lose because of farming; we lost because timely information never reached us.”'}
          </blockquote>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-devanagari">
            {isMr
              ? 'माझ्या चुलत्यांनी संपूर्ण खरीप हंगामात जिवापाड मेहनत करून कापूस पिकवला. बाजार भाव वाढतील या आशेने महिनाभर वाट पाहिली. शेवटी पैशांची निकड निर्माण झाल्याने अधीर होऊन त्यांनी कमी भावात माल विकला. अवघ्या दोन दिवसांनंतर बाजार समितीत कापसाचे भाव प्रति क्विंटल ₹६०० ने वाढले! महिन्यांची मेहनत दोन दिवसांच्या माहितीच्या अभावामुळे वाया गेली. शेतमित्र AI चा जन्म या माहितीची तफावत (Information Asymmetry) नष्ट करण्यासाठी झाला आहे.'
              : 'My uncle poured his sweat into farming cotton across the entire Kharif season. In urgent need of money, he sold his harvest to a local aggregator at distressed rates. Just 48 hours later, mandi prices surged by ₹600/quintal! Months of hard toil lost due to a 2-day information void. ShetMitra AI was founded to eradicate this information asymmetry for every farmer.'}
          </p>
        </div>
      </section>

      {/* 4. Four Core Pillars of the Platform */}
      <section className="py-12 px-4 sm:px-8 max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest font-mono">
            {isMr ? 'एकात्मिक ग्रामीण व्यासपीठ' : 'COMPREHENSIVE RURAL PLATFORM'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-indian text-stone-900">
            {isMr
              ? 'शेतकऱ्याच्या प्रत्येक टप्प्यासाठी एकच विश्वासू साथी'
              : 'A Single Trusted Companion for Every Stage of Rural Farming'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-devanagari">
            {isMr
              ? 'केवळ चॅटबॉट नव्हे; तर बाजार, हवामान, कायदेशीर हक्क, शासकीय योजना आणि कार्बन उत्पन्नाचे एकात्मिक इंजिन.'
              : 'Not just a chatbot; an integrated engine uniting market forecasts, proactive subsidies, anti-usury rights, and carbon revenue.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Pillar 1: Crop Disease Diagnostic */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold">
              <Bug className="w-6 h-6 text-rose-700" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif-indian">
              {isMr ? '१. एआय पीक रोग निदान व जैविक उपाय' : '1. AI Crop Disease Doctor & Biological Remedies'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-devanagari">
              {isMr
                ? 'पानांचा थेट फोटो काढून करपा, बोंडअळी, तांबेरा ओळखणे आणि ताक-तांबे, दशपर्णी अर्क यांसारखे शून्य विषारी जैविक उपचार मिळवणे.'
                : 'Computer vision leaf diagnostics identifying fungal/pest vectors with immediate organic biological and IPM safe prescriptions.'}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-rose-800">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{isMr ? 'आंतरराज्यीय कीड इशारा प्रसारण' : 'Transboundary Pest Outbreak Broadcast'}</span>
            </div>
          </div>

          {/* Pillar 2: Regenerative Agro Advisor */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Satellite className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif-indian">
              {isMr ? '२. उपग्रह, माती व हवामान पुनरुत्थान सल्ला' : '2. Satellite, Soil & Weather Regenerative Plan'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-devanagari">
              {isMr
                ? 'सेंटिनेल-२ उपग्रह NDVI, मृदा आरोग्य पत्रिका (सेंद्रिय कर्ब, जस्त) व ७ दिवसांच्या पावसाचा संगम करून रासायनिक खतांचा खर्च ३५% कमी करणे.'
                : 'Multi-layer fusion of Sentinel-2 NDVI/NDWI, Soil Health Card NPK/Zinc, and ECMWF rain grids for regenerative crop rotations.'}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isMr ? 'सेंद्रिय कर्ब व पाणी संवर्धन लक्ष्य' : 'Soil Organic Carbon & Water Restoration'}</span>
            </div>
          </div>

          {/* Pillar 3: Inter-State Agri Data Mesh */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif-indian">
              {isMr ? '३. आंतरराज्यीय कृषी डेटा जाळे (DPG)' : '3. Inter-State Agri Data Mesh (DPG)'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-devanagari">
              {isMr
                ? 'महाराष्ट्र, कर्नाटक, तेलंगणा, म.प्र. राज्य कृषी विभागांना जोडणारा मुक्त डिजिटल पब्लिक गुड (AgriStack/IDEA प्रोटोकॉल).'
                : 'Decentralized Digital Public Good allowing Indian states to federate ML models, share seed trials, and coordinate biosecurity.'}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-blue-800">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{isMr ? 'मुक्त एपीआय व कृषी डेटा देवाणघेवाण' : 'Open API & Model Federation'}</span>
            </div>
          </div>

          {/* Pillar 4: Mandi Forecasting */}
          <div id="forecast" className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif-indian">
              {isMr ? '४. ७ दिवसांचे अचूक मंडी भाव भाकीत व वाहतूक नफा' : '4. 7-Day Mandi Price Forecast & Net Realization'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-devanagari">
              {isMr
                ? 'हायब्रिड XGBoost-LSTM मॉडेलद्वारे लासलगाव, नाशिक, पुणे बाजारांचे भाकीत. अंतर व वाहतूक खर्च (₹१०/किमी) वजा करून हातात पडणारा खरा नफा.'
                : 'Hybrid XGBoost-LSTM model predicting arrivals across APMCs, automatically deducting transit costs (₹10/km) for real cash-in-hand.'}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isMr ? 'सामूहिक काढणी संकेत (Supply Signal)' : 'Community Supply Glut Signal'}</span>
            </div>
          </div>

          {/* Pillar 5: Proactive Govt Subsidies */}
          <div id="schemes" className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <Landmark className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif-indian">
              {isMr ? '५. सक्रिय शासकीय योजना व व्हॉईस अलर्ट' : '5. Proactive Govt Schemes & 48h Voice Alerts'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-devanagari">
              {isMr
                ? 'पुश आर्किटेक्चरद्वारे महाडीबीटी शेततळे, ठिबक सिंचन (८०% अनुदान) आणि पीक विमा दाव्याची मुदत संपण्याआधी थेट फोनवर मराठीत सूचना.'
                : 'Push architecture delivering phone voice alerts 48h before MahaDBT farm pond and drip subsidy deadlines expire.'}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-800">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{isMr ? '२जी/३जी नेटवर्कवर बॅटरी व डेटा बचत' : 'Low-Bandwidth Mobile Optimized'}</span>
            </div>
          </div>

          {/* Pillar 6: NALSA Anti-Usury Legal Protection */}
          <div id="legal" className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold">
              <Scale className="w-6 h-6 text-rose-700" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif-indian">
              {isMr ? '६. कायदेशीर साक्षरता व NALSA १५१०० संरक्षण' : '6. Legal Rights & NALSA 15100 Direct Protection'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-devanagari">
              {isMr
                ? 'खाजगी सावकारांची ५% मासिक व्याज आकारणी बेकायदेशीर असल्याचे सांगून महाराष्ट्र सावकारी कायदा २०१४ नुसार मोफत वकील व कायदेशीर मदत मिळवून देते.'
                : 'Zero-hallucination legal literacy informing farmers that 5%/month interest is illegal under Money Lending Act 2014, connecting to DLSA.'}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-rose-800">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{isMr ? 'NALSA टोल-फ्री १५१०० थेट संपर्क' : 'NALSA 15100 One-Tap Direct Dialer'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Human-in-the-Loop (HITL) Safety & Verification Architecture */}
      <section className="py-12 px-4 sm:px-8 bg-white border-y border-stone-200">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 font-mono uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-emerald-700" />
            <span>HUMAN-IN-THE-LOOP (HITL) SAFETY ARCHITECTURE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif-indian text-stone-900">
            {isMr
              ? 'केवळ अल्गोरिदम नाही; तज्ज्ञ मानवी कृषी शास्त्रज्ञ व वकिलांची पडताळणी'
              : 'Not Just Algorithms: Verified by Agronomists and Legal Panel Counsel'}
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-devanagari">
            {isMr
              ? 'ग्रामीण भागात हॅल्युसिनेशन किंवा चुकीचा सल्ला शेतकऱ्याचे आयुष्य उद्ध्वस्त करू शकतो. म्हणूनच शेतमित्र AI त्रिस्तरीय मानवी पडताळणीवर काम करते:'
              : 'In rural agriculture, hallucinations cause irreversible financial devastation. ShetMitra AI enforces a tri-tier human verification protocol:'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-3">
            <div className="p-5 rounded-2xl bg-[#fbfbfa] border border-stone-200 space-y-2">
              <span className="text-xs font-bold text-emerald-800 font-mono block">
                {isMr ? 'स्तर १' : 'TIER 1'}
              </span>
              <h4 className="font-bold text-sm text-stone-900">
                {isMr ? 'KVK कृषी शास्त्रज्ञ पडताळणी' : 'KVK Agronomist Review'}
              </h4>
              <p className="text-xs text-stone-600 font-devanagari leading-relaxed">
                {isMr
                  ? 'काढणी वेळ, हवामान शॉक आणि कीड नियंत्रणाचे मोठे अलर्ट स्थानिक तालुका कृषी अधिकारी व KVK तज्ज्ञांद्वारे पडताळले जातात.'
                  : 'Harvest timing alerts and weather shock advisories are reviewed by local KVK scientists.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbfbfa] border border-stone-200 space-y-2">
              <span className="text-xs font-bold text-rose-800 font-mono block">
                {isMr ? 'स्तर २' : 'TIER 2'}
              </span>
              <h4 className="font-bold text-sm text-stone-900">
                {isMr ? 'NALSA / DLSA पॅनेल वकील' : 'NALSA / DLSA Panel Counsel'}
              </h4>
              <p className="text-xs text-stone-600 font-devanagari leading-relaxed">
                {isMr
                  ? 'सावकारी छळ किंवा पीक विमा फेटाळणी प्रकरणात एआय केवळ माहिती देते, आणि शेतकरी थेट शासकीय विधी स्वयंसेवकाशी जोडला जातो.'
                  : 'Moneylender disputes route directly to Legal Services Authority panel advocates for free notices.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbfbfa] border border-stone-200 space-y-2">
              <span className="text-xs font-bold text-amber-800 font-mono block">
                {isMr ? 'स्तर ३' : 'TIER 3'}
              </span>
              <h4 className="font-bold text-sm text-stone-900">
                {isMr ? 'शेतकरी १-क्लिक पडताळणी' : 'Farmer Ground-Truth Loop'}
              </h4>
              <p className="text-xs text-stone-600 font-devanagari leading-relaxed">
                {isMr
                  ? 'प्रत्येक सल्ल्यानंतर शेतकरी १-क्लिकने नोंदवतो: “हा सल्ला शेतात खरा ठरला का?”, ज्यामुळे मॉडेल अधिकाधिक अचूक होते.'
                  : 'Farmers confirm field outcomes with 1-click verdicts, constantly calibrating the local district model.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer (Clean, Quiet, No Slop) */}
      <footer className="bg-[#122415] text-stone-300 py-8 px-4 sm:px-8 border-t border-[#243f29] text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold text-white font-serif-indian text-sm">
              {isMr ? 'शेतमित्र AI' : 'ShetMitra AI'}
            </span>
            <span className="text-stone-500">·</span>
            <span className="text-stone-400 italic">
              {isMr
                ? 'अल्गोरिदम ते शेती • डेटा ते स्वाभिमान'
                : 'From Algorithm to Agriculture. From Data to Dignity.'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <button type="button" onClick={onOpenBhashiniHub} className="hover:text-emerald-400 transition-colors">
              {isMr ? 'भाषिणी मॉडेल्स' : 'Bhashini Hub'}
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={onOpenPitchRoom} className="hover:text-emerald-400 transition-colors">
              {isMr ? 'पिच डेक' : 'Pitch Deck'}
            </button>
            <span aria-hidden="true">·</span>
            <a href="tel:15100" className="text-amber-300 hover:underline">
              {isMr ? 'NALSA विधी: १५१००' : 'NALSA Legal: 15100'}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
