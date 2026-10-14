import { FarmerProfile, MandiPriceForecast, ProactivePushAlert, SchemeInfo, LegalStatuteGuide, VoiceMRVRecord, GISDataPoint } from '../types';

export const INITIAL_FARMER_PROFILE: FarmerProfile = {
  id: 'MH-JAL-84920',
  name: 'भाऊराव यशवंत पाटील (Bhaurao Patil)',
  phone: '+91 98234 51092',
  district: 'Jalgaon (जळगाव)',
  taluka: 'Bhusawal (भुसावळ)',
  village: 'Varangaon (वरणगाव)',
  totalLandAcres: 4.5,
  soilType: 'काळी कसदार / मध्यम काळी (Deep Black Regur Soil)',
  irrigationType: 'विहीर + ठिबक सिंचन (Well + Drip Irrigation)',
  activeCrops: ['कापूस (Cotton)', 'सोयाबीन (Soyabean)', 'कांदा (Onion)'],
  selectedMemberId: 'mem-1',
  familyMembers: [
    {
      id: 'mem-1',
      name: 'भाऊराव पाटील (मुखिया शेतकरी)',
      relation: 'farmer',
      roleTitle: 'मुख्य शेती व्यवस्थापक (Head Farmer)',
      avatarSeed: 'Bhaurao',
      cropsManaged: ['कापूस (Cotton)', 'सोयाबीन (Soyabean)'],
      lastQuery: 'कापूस आज विकावा की सीसीआय खरेदी केंद्रावर द्यावा?',
      voiceSignature: 'Bhaurao_MH_Male_LowPitch',
    },
    {
      id: 'mem-2',
      name: 'सुनिता पाटील (धर्मपत्नी)',
      relation: 'spouse',
      roleTitle: 'भाजीपाला व परसबाग व्यवस्थापक (Horticulture & Kitchen Farm)',
      avatarSeed: 'Sunita',
      cropsManaged: ['कांदा (Onion)', 'टोमॅटो (Tomato)', 'मेथी/कोथिंबीर'],
      lastQuery: 'कांद्याची आवक वाढण्याआधी स्थानिक बाजारात काय भाव मिळेल?',
      voiceSignature: 'Sunita_MH_Female_WarmPitch',
    },
    {
      id: 'mem-3',
      name: 'रोहित पाटील (सुपुत्र - तंत्रज्ञान अभ्यासक)',
      relation: 'son',
      roleTitle: 'कृषी तंत्रज्ञान व कार्बन क्रेडिट समन्वयक (AgriTech & Carbon Lead)',
      avatarSeed: 'Rohit',
      cropsManaged: ['शून्य मशागत प्रयोग (Zero-Till Pilot)'],
      lastQuery: 'व्हॉईस एमआरव्ही द्वारे शेणखताची कार्बन क्रेडिट नोंद कशी करावी?',
      voiceSignature: 'Rohit_MH_Male_YouthPitch',
    },
  ],
  seasonalMemory: {
    lastSeason: 'Kharif 2025',
    lastCrop: 'सोयाबीन (Soyabean)',
    soldPriceQuintal: 4850,
    soldMandi: 'जळगाव कृषी उत्पन्न बाजार समिती (Jalgaon APMC)',
    decisionReflection: 'गेल्या वर्षी गडबडीत विक्री केल्यामुळे प्रति क्विंटल ₹४०० चे नुकसान झाले होते. यंदा शेतमित्र एआय च्या ७ दिवसांच्या भाकितानुसारच निर्णय घेणार.',
  },
};

export const CROP_FORECASTS: Record<string, MandiPriceForecast> = {
  Onion: {
    crop: 'Onion (लाल कांदा)',
    mandi: 'Lasalgaon (लासलगाव)',
    district: 'Nashik',
    currentModalPrice: 2450,
    unit: '₹ / क्विंटल',
    change24h: 3.8,
    forecast7d: [2450, 2490, 2540, 2610, 2670, 2720, 2750],
    recommendationAction: 'HOLD',
    recommendationText: 'पुढील ४ ते ६ दिवस थांबा (HOLD) - लासलगाव व पिंपळगाव येथे आवक २०% घटल्यामुळे आणि उत्तरेकडील मागणीमुळे भाव ₹२५० ते ₹३०० ने सुधारतील.',
    netRealizationComparison: [
      {
        mandiName: 'लासलगाव मुख्य आवार (Lasalgaon APMC)',
        distanceKm: 85,
        modalPrice: 2450,
        transportCostPerQuintal: 95,
        netRealizationPerQuintal: 2355,
        isBestChoice: false,
      },
      {
        mandiName: 'नाशिक दिंडोरी मार्केट (Dindori Market Yard)',
        distanceKm: 110,
        modalPrice: 2580,
        transportCostPerQuintal: 120,
        netRealizationPerQuintal: 2460,
        isBestChoice: true,
      },
      {
        mandiName: 'पुणे गुलटेकडी मार्केट यार्ड (Pune APMC)',
        distanceKm: 290,
        modalPrice: 2800,
        transportCostPerQuintal: 380,
        netRealizationPerQuintal: 2420,
        isBestChoice: false,
      },
    ],
    modelMetrics: {
      rSquared: 0.941,
      directionalAccuracy: '91.3%',
      mape: '4.2%',
      features: ['Agmarknet Modal Momentum', 'Sentinel-2 Cropland NDVI Anomaly', 'IMD Gridded Rainfall', 'Export Duty Status'],
    },
  },
  Cotton: {
    crop: 'Cotton (मध्यम लांब धागा कापूस)',
    mandi: 'Nagpur / Jalgaon Cotton Yard',
    district: 'Jalgaon / Vidarbha',
    currentModalPrice: 7280,
    unit: '₹ / क्विंटल',
    change24h: 1.2,
    forecast7d: [7280, 7310, 7380, 7440, 7510, 7550, 7590],
    recommendationAction: 'STORE',
    recommendationText: 'कापूस साठवून ठेवा (STORE & HOLD) - हमीभाव (MSP ₹७,१२२) पेक्षा वर भाव जात आहेत आणि कापूस महामंडळ (CCI) खरेदी जोमात असल्याने तेजी कायम राहील.',
    netRealizationComparison: [
      {
        mandiName: 'जळगाव कॉटन मार्केट (Jalgaon Mandi)',
        distanceKm: 25,
        modalPrice: 7280,
        transportCostPerQuintal: 40,
        netRealizationPerQuintal: 7240,
        isBestChoice: true,
      },
      {
        mandiName: 'धुळे कृषी उत्पन्न बाजार समिती (Dhule Mandi)',
        distanceKm: 90,
        modalPrice: 7350,
        transportCostPerQuintal: 130,
        netRealizationPerQuintal: 7220,
        isBestChoice: false,
      },
      {
        mandiName: 'अकोला कॉटन एक्सचेंज (Akola APMC)',
        distanceKm: 165,
        modalPrice: 7420,
        transportCostPerQuintal: 220,
        netRealizationPerQuintal: 7200,
        isBestChoice: false,
      },
    ],
    modelMetrics: {
      rSquared: 0.938,
      directionalAccuracy: '89.7%',
      mape: '3.9%',
      features: ['CCI Procurement Volume', 'MCX Cotton Futures', 'Spinning Mill Inventory Days', 'District Moisture'],
    },
  },
  Soyabean: {
    crop: 'Soyabean (पिवळी सोयाबीन)',
    mandi: 'Jalgaon / Latur APMC',
    district: 'Jalgaon',
    currentModalPrice: 4860,
    unit: '₹ / क्विंटल',
    change24h: -0.4,
    forecast7d: [4860, 4850, 4870, 4890, 4910, 4920, 4915],
    recommendationAction: 'STAGGER',
    recommendationText: 'टप्प्याटप्प्याने माल विका (STAGGERED SELLING) - खाद्यतेल आयात शुल्कातील बदलांमुळे भाव ₹४,८५० ते ₹४,९५० दरम्यान स्थिर राहतील.',
    netRealizationComparison: [
      {
        mandiName: 'जळगाव कृषी बाजार (Jalgaon APMC)',
        distanceKm: 22,
        modalPrice: 4860,
        transportCostPerQuintal: 35,
        netRealizationPerQuintal: 4825,
        isBestChoice: true,
      },
      {
        mandiName: 'लातूर प्रमुख तेलबिया मार्केट (Latur APMC)',
        distanceKm: 340,
        modalPrice: 5120,
        transportCostPerQuintal: 410,
        netRealizationPerQuintal: 4710,
        isBestChoice: false,
      },
    ],
    modelMetrics: {
      rSquared: 0.925,
      directionalAccuracy: '88.4%',
      mape: '4.8%',
      features: ['Edible Oil Import Parity', 'Solvent Extractors Association Offtake', 'Local Rainfall Anomaly'],
    },
  },
};

export const PROACTIVE_ALERTS: ProactivePushAlert[] = [
  {
    id: 'alt-1',
    timestamp: 'आज सकाळी ०६:१५',
    urgency: 'high',
    category: 'mandi_shock',
    titleMr: 'नाशिक कांदा बाजारात तेजीची नांदी',
    titleEn: 'Nashik Onion Market Recovery Alert',
    bodyMr: 'लासलगाव बाजारात आवक कालच्या तुलनेत १८% ने घटली आहे. आमच्या मॉडेलनुसार पुढील ३ दिवसांत भाव प्रति क्विंटल ₹१५० ते ₹२२० ने वाढतील. आज माल विकण्याची घाई करू नका.',
    bodyEn: 'Onion arrivals in Lasalgaon dropped 18% today. Model predicts price rise of ₹150-220/quintal over the next 3 days. Delay harvest/sale if possible.',
    actionLabelMr: '७ दिवसांचा भाव तक्ता पहा',
    actionLabelEn: 'View 7-Day Forecast',
    spokenAudioText: 'शेतकरी बंधू, नाशिक बाजारात कांद्याची आवक घटल्यामुळे भाव वाढण्याचे संकेत आहेत. आज विक्री न करता चार दिवस थांबावे.',
    iconType: 'TrendingUp',
  },
  {
    id: 'alt-2',
    timestamp: 'काल दुपारी ०३:४०',
    urgency: 'high',
    category: 'scheme_deadline',
    titleMr: 'महाडीबीटी: मागेल त्याला शेततळे - ४८ तास शिल्लक',
    titleEn: 'MahaDBT: Farm Pond Subsidy - 48 Hours Remaining',
    bodyMr: 'जळगाव जिल्ह्यासाठी शेततळे अनुदानाची नवीन कोटा मर्यादा लवकरच संपत आहे. अनुदानाची रक्कम थेट खात्यात ₹५०,००० पर्यंत जमा होते. त्वरित ई-केवायसी करा.',
    bodyEn: 'Farm pond subsidy quota for Jalgaon district is closing in 48 hours. Max subsidy ₹50,000 directly to bank account via DBT.',
    actionLabelMr: 'व्हॉईसने अर्ज सुरू करा',
    actionLabelEn: 'Start Voice Application',
    spokenAudioText: 'सावधान! मागेल त्याला शेततळे योजनेची मुदत फक्त दोन दिवसात संपत आहे. आत्ताच शेतमित्र द्वारे अर्ज करा.',
    iconType: 'AlertCircle',
  },
  {
    id: 'alt-3',
    timestamp: '२ दिवसांपूर्वी',
    urgency: 'medium',
    category: 'community_supply',
    titleMr: 'सामूहिक आवक इशारा (Community Supply Signal)',
    titleEn: 'District Supply Glut Signal (50+ Farmers)',
    bodyMr: 'भुसावळ व रावेर परिसरातील ५४ शेतकऱ्यांनी या आठवड्यात केळी व भाजीपाला काढणीची नोंद केली आहे. स्थानिक बाजारात अचानक आवक वाढल्यास भाव घसरू शकतात.',
    bodyEn: 'Anonymized harvest intent from 54 local farmers indicates synchronized harvesting. Consider sending produce to secondary markets.',
    actionLabelMr: 'पर्यायी बाजार मार्ग पहा',
    actionLabelEn: 'Check Alternate Mandis',
    spokenAudioText: 'आपल्या भागात एकाच वेळी जास्त शेतकरी काढणी करत आहेत. स्थानिक बाजाराऐवजी पर्यायी बाजार निवडल्यास फायदा होईल.',
    iconType: 'Users',
  },
];

export const SCHEMES_LIST: SchemeInfo[] = [
  {
    id: 'sch-1',
    titleMr: 'मागेल त्याला शेततळे योजना (Magel Tyala Shettale)',
    titleEn: 'Magel Tyala Shettale Farm Pond Scheme',
    department: 'महाराष्ट्र शासन कृषी विभाग (Govt. of Maharashtra Agri Dept)',
    subsidyAmount: '₹ ५०,००० ते ₹ ७५,००० (थेट बँक खात्यात)',
    eligibilityMr: 'किमान ०.६० हेक्टर (१.५ एकर) शेती, ७/१२ वर नाव, पूर्वी शेततळ्याचा लाभ घेतलेला नसावा.',
    eligibilityEn: 'Min 0.60 Hectare landholding, 7/12 record, no prior pond subsidy.',
    deadline: '३१ मार्च २०२६ (कोटा मर्यादित - ४८ तास शिल्लक)',
    hoursRemaining: 48,
    documentsRequiredMr: ['७/१२ व ८-अ उतारा', 'आधार कार्ड व बँक पासबुक', 'जमीन नकाशा व हमीपत्र'],
    applicationStepsMr: [
      '१. महाडीबीटी पोर्टलवर शेतकरी लॉगिन करा.',
      '२. विशेष घटक योजना अंतर्गत शेततळे पर्याय निवडा.',
      '३. शेताचे जिओ-टॅगिंग लोकेशन जोडा.',
      '४. कृषी सहाय्यक यांच्या पूर्वसंमतीनंतर खोदकाम सुरू करा.',
    ],
    status: 'Expiring Soon',
    portalUrl: 'https://mahadbt.maharashtra.gov.in',
  },
  {
    id: 'sch-2',
    titleMr: 'पंतप्रधान कृषी सिंचन योजना - सूक्ष्म सिंचन (PMKSY Drip/Sprinkler)',
    titleEn: 'PM Krishi Sinchayee Yojana - Micro Irrigation Subsidy',
    department: 'केंद्र व राज्य शासन कृषी संचनालय',
    subsidyAmount: 'लहान शेतकऱ्यांना ८०%, इतर शेतकऱ्यांना ७५% अनुदान',
    eligibilityMr: 'सर्व भूधारक शेतकरी. विहीर, कूपनलिका किंवा शेततळे पाणी स्रोत उपलब्ध असावे.',
    eligibilityEn: 'Small/marginal farmers get up to 80% subsidy for drip installation.',
    deadline: 'सुरू (चालू आर्थिक वर्ष)',
    hoursRemaining: 360,
    documentsRequiredMr: ['७/१२ उतारा', 'वीज बिल / पाणी उपलब्धतेचा दाखला', 'ठिबक कंपनीचे कोटेशन'],
    applicationStepsMr: [
      '१. नोंदणीकृत डीलरकडून कोटेशन मिळवा.',
      '२. महाडीबीटीवर अपलोड करा.',
      '३. कृषी पर्यवेक्षक पडताळणीनंतर अनुदानाची रक्कम जमा.',
    ],
    status: 'Open',
    portalUrl: 'https://mahadbt.maharashtra.gov.in',
  },
  {
    id: 'sch-3',
    titleMr: 'पंतप्रधान पीक विमा योजना (PMFBY खरीप/रब्बी दावा प्रक्रिया)',
    titleEn: 'Pradhan Mantri Fasal Bima Yojana (Crop Insurance Loss Claim)',
    department: 'कृषी व शेतकरी कल्याण मंत्रालय',
    subsidyAmount: '१००% नुकसान भरपाई (विमा संरक्षित रकमेनुसार)',
    eligibilityMr: 'विमा काढलेले सर्व शेतकरी. अवकाळी पाऊस/गारपीट झाल्यास ७२ तासांच्या आत पूर्वसूचना देणे बंधनकारक.',
    eligibilityEn: 'Mandatory 72-hour crop loss intimation on Crop Insurance App.',
    deadline: 'आपत्ती घडल्यापासून ७२ तास',
    hoursRemaining: 72,
    documentsRequiredMr: ['विमा पावती (Application Receipt)', 'शेतातील नुकसानीचे जिओ-टॅग फोटो', '७/१२ उतारा'],
    applicationStepsMr: [
      '१. क्रॉप इन्शुरन्स ॲपवर तक्रार नोंदवा किंवा टोल फ्री १४४४७ वर कॉल करा.',
      '२. पंचनाम्यासाठी कृषी अधिकारी व विमा कंपनी प्रतिनिधी उपस्थित राहतील.',
      '३. संयुक्त स्वाक्षरी प्रत जपून ठेवा.',
    ],
    status: 'Open',
    portalUrl: 'https://pmfby.gov.in',
  },
];

export const LEGAL_GUIDES: LegalStatuteGuide[] = [
  {
    id: 'leg-1',
    category: 'moneylending',
    querySampleMr: 'सावकार दरमहा ५% (वार्षिक ६०%) व्याज मागतोय आणि जमीन लिहून घेण्याची धमकी देतोय, हे कायदेशीर आहे का?',
    querySampleEn: 'Moneylender charges 5% monthly interest and threatens land takeover. Is this legal?',
    statuteName: 'महाराष्ट्र सावकारी (नियमन) अधिनियम, २०१४ (Maharashtra Money Lending Regulation Act 2014)',
    keyRuleSummaryMr: 'दरमहा ५% व्याज मागणे पूर्णपणे बेकायदेशीर आणि फौजदारी गुन्हा आहे. सावकार शेतजमीन हडपू शकत नाही.',
    keyRuleSummaryEn: 'Charging 5% monthly interest is strictly illegal and a cognizable criminal offense under Section 31.',
    legalRightsPointsMr: [
      'कलम ३१: अनधिकृत सावकारी हा अजामीनपात्र गुन्हा असून ५ वर्षे तुरुंगवास आणि ₹५०,००० दंडाची तरतूद आहे.',
      'व्याज मर्यादा: तारण कर्जासाठी जास्तीत जास्त ९% वार्षिक आणि विनातारण कर्जासाठी १२% वार्षिक एवढेच व्याज घेता येते.',
      'कलम १८: सावकाराने बळजबरीने घेतलेली जमीन किंवा दस्तऐवज जिल्हा उपनिबंधक तात्काळ रद्द करून शेतकऱ्याला परत मिळवून देऊ शकतात.',
    ],
    actionStepsMr: [
      '१. सावकाराला कोणतेही मूळ कागदपत्रे किंवा कोरे धनादेश देऊ नका.',
      '२. आपल्या तालुक्याच्या सहाय्यक निबंधक (सहकारी संस्था) कार्यालयात लेखी तक्रार दाखल करा.',
      '३. स्थानिक विधी सेवा प्राधिकरणाकडे (DLSA) मोफत वकिलासाठी अर्ज करा.',
      '४. राष्ट्रीय विधी सेवा प्राधिकरण (NALSA) च्या १५१०० या टोल-फ्री क्रमांकावर संपर्क साधा.',
    ],
    tollFreeHelpline: '15100 (NALSA Toll-Free Legal Aid)',
    disclaimerMr: 'ही माहिती आहे, कायदेशीर सल्ला नाही (This is legal information, not formal legal advice. Route to NALSA 15100).',
  },
  {
    id: 'leg-2',
    category: 'land_revenue',
    querySampleMr: 'शेती जमिनीच्या अकृषिक (NA) वापरासाठी आणि रस्त्याच्या वहिवाटीसाठी काय नवीन नियम आहेत?',
    querySampleEn: 'What are the rules for farm access road disputes and NA conversion under Land Revenue Code?',
    statuteName: 'महाराष्ट्र जमीन महसूल संहिता, १९६६ व २०२५ सुधारणा (MLRC 1966 & 2025 Amendment)',
    keyRuleSummaryMr: '२०२५ च्या नवीन सुधारणेनुसार प्रादेशिक विकास आराखड्यानुसार जमिनीच्या वापरासाठी जिल्हाधिकाऱ्यांच्या कलम ४२ च्या पूर्वपरवानगीची अट शिथिल करण्यात आली आहे.',
    keyRuleSummaryEn: 'The 2025 amendment removes Collector permission requirement under Section 42 for development plan aligned lands.',
    legalRightsPointsMr: [
      'कलम १४३: बांधावरून शेतात जाण्यासाठी शेतकऱ्याला हक्काचा वहिवाट रस्ता देण्याचा अधिकार तहसीलदारांना आहे.',
      'शेजारील शेतकऱ्याने रस्ता अडवल्यास तहसीलदार घटनास्थळाची पाहणी करून त्वरित वहिवाट खुला करण्याचे आदेश देऊ शकतात.',
      '७/१२ उताऱ्यावरील इतर हक्कातील चुकीच्या नोंदी महसूल न्यायालयीन अपीलद्वारे दुरुस्त करता येतात.',
    ],
    actionStepsMr: [
      '१. तहसीलदार यांच्याकडे कलम १४३ अन्वये वहिवाट रस्त्यासाठी रीतसर अर्ज करा.',
      '२. शेताचा नकाशा व चतुःसीमा कागदपत्रे सोबत जोडा.',
      '३. तलाठी यांच्याकडून स्थळपाहणी पंचनामा करून घ्या.',
    ],
    tollFreeHelpline: '15100',
    disclaimerMr: 'ही माहिती आहे, कायदेशीर सल्ला नाही.',
  },
  {
    id: 'leg-3',
    category: 'crop_insurance',
    querySampleMr: 'गारपिटीनंतर विमा कंपनीने पूर्वसूचना विलंबाचे कारण देऊन भरपाई नाकारली, अपील कसे करावे?',
    querySampleEn: 'Crop insurance company rejected hail damage claim citing delay in intimation. How to appeal?',
    statuteName: 'प्रधानमंत्री पीक विमा योजना मार्गदर्शक तत्वे व ग्राहक संरक्षण कायदा, २०१९',
    keyRuleSummaryMr: 'विमा कंपनी मनमानी पद्धतीने दावा नाकारू शकत नाही. जिल्हास्तरीय तक्रार निवारण समितीकडे दाद मागता येते.',
    keyRuleSummaryEn: 'Appeals can be filed before the District Level Grievance Redressal Committee (DGRC) headed by District Collector.',
    legalRightsPointsMr: [
      'नैसर्गिक आपत्तीच्या वेळी नेटवर्क किंवा मोबाईल नसल्यास ऑफलाईन तक्रार ग्राह्य धरली जाते.',
      'जिल्हाधिकारी यांच्या अध्यक्षतेखालील समितीला विमा कंपनीचे आदेश रद्द करण्याचा अधिकार आहे.',
      'ग्राहक मंचाकडे (Consumer Forum) नुकसान भरपाईसह मानसिक त्रासापोटी दाद मागता येते.',
    ],
    actionStepsMr: [
      '१. विमा कंपनीचे नकारपत्र व पॉलिसी पावतीची प्रत गोळा करा.',
      '२. जिल्हा कृषी अधीक्षक (SDAO) किंवा जिल्हाधिकारी कार्यालयातील DGRC कडे लेखी अपील सादर करा.',
      '३. NALSA १५१०० वरून मोफत पॅनेल वकिलाचे मार्गदर्शन घ्या.',
    ],
    tollFreeHelpline: '15100',
    disclaimerMr: 'ही माहिती आहे, कायदेशीर सल्ला नाही.',
  },
];

export const INITIAL_VOICE_MRV_LOGS: VoiceMRVRecord[] = [
  {
    id: 'mrv-001',
    farmerId: 'MH-JAL-84920',
    farmerName: 'भाऊराव पाटील (Bhaurao Patil)',
    timestamp: '२०२६-०२-२४ ०७:४५:१२ IST',
    practiceSpoken: 'मी आज शेतात २ एकरावर शून्य मशागत (Zero Tillage) पद्धतीने थेट पेरणी पूर्ण केली आहे.',
    verraMethodology: 'Verra VM0042 (Improved Agricultural Land Management)',
    acreage: 2.0,
    gpsCoordinates: { lat: 21.0421, lng: 75.6124 },
    cryptoHash: '0x8f3c7a91e5d2b406981fae620c3b889a71d4e28c',
    carbonCreditsEstimated: 1.5,
    estimatedEarningsINR: 1275,
    status: 'Hashed on Ledger',
  },
  {
    id: 'mrv-002',
    farmerId: 'MH-JAL-84920',
    farmerName: 'सुनिता पाटील (Sunita Patil)',
    timestamp: '२०२६-०२-१५ ११:२०:०५ IST',
    practiceSpoken: 'कांदा पिकासाठी रासायनिक युरिया ऐवजी गांडूळखत आणि जिवामृत वापरले आहे.',
    verraMethodology: 'Verra VM0042 / N2O Reduction & Soil Biology',
    acreage: 1.0,
    gpsCoordinates: { lat: 21.0418, lng: 75.6131 },
    cryptoHash: '0x4e19b62a90f84501cd87ab2e33917fae298014bd',
    carbonCreditsEstimated: 0.9,
    estimatedEarningsINR: 765,
    status: 'Hashed on Ledger',
  },
];

export const GIS_DATA_POINTS: GISDataPoint[] = [
  {
    taluka: 'Bhusawal / Jalgaon',
    currentNDVI: 0.68,
    ndviAnomalyVs3Yr: 0.05,
    cropStage: 'Peak Flowering',
    supplySurgeRisk: 'Low',
    soilMoistureIndex: 'Moderate (४२% Field Capacity)',
    microclimateAlertMr: 'जमीन ओलावा समाधानकारक आहे. पुढील ५ दिवस सिंचनाची तातडीची गरज नाही.',
  },
  {
    taluka: 'Niphad / Lasalgaon (Nashik)',
    currentNDVI: 0.81,
    ndviAnomalyVs3Yr: 0.14,
    cropStage: 'Maturity & Harvest Peak',
    supplySurgeRisk: 'High Supply Glut Expected',
    soilMoistureIndex: 'High (६५%)',
    microclimateAlertMr: 'कांदा पीक परिपक्वतेच्या शिखरावर. पुढील आठवड्यात स्थानिक आवकेचा मोठा लोंढा येण्याची शक्यता.',
  },
  {
    taluka: 'Baramati / Indapur (Pune)',
    currentNDVI: 0.58,
    ndviAnomalyVs3Yr: -0.09,
    cropStage: 'Vegetative',
    supplySurgeRisk: 'Low',
    soilMoistureIndex: 'Dry (२८%)',
    microclimateAlertMr: 'उष्ण वारे आणि बाष्पीभवन वेग जास्त. ठिबक सिंचनाचा कालावधी २५% ने वाढवावा.',
  },
];

export const PITCH_METRICS = {
  tagline: 'From Algorithm to Agriculture. From Data to Dignity.',
  unitEconomics: {
    monthlySubscription: 99,
    costToServe: 12,
    grossMarginINR: 87,
    grossMarginPercent: 88,
  },
  year3Projections: {
    totalRevenueINR: '५.०६ कोटी (₹5.06 Cr)',
    payingFarmers: '२६,७५० शेतकरी',
    b2bContracts: '१० एंटरप्राइज कंपन्या (₹८० लाख)',
    fpoCooperatives: '५० शेतकरी उत्पादक संस्था (FPOs)',
    carbonFacilitation: '₹२० लाख (८-१२% कमिशन)',
  },
  fundingAsk: {
    amount: '₹ १८ लाख (ICT Pitchers Round 2)',
    equityOffered: '८% Equity',
    impliedValuation: '₹ २.२५ कोटी',
    runwayMonths: '४० महिने (Month 18 breakeven लक्ष्य)',
  },
  competitiveMoats: [
    {
      moat: 'Proprietary Harvest Intent Data',
      desc: '५०+ शेतकऱ्यांच्या काढणी निर्णयांचा सामूहिक डेटा, जो कोणत्याही सरकारी किंवा खाजगी प्लॅटफॉर्मकडे उपलब्ध नाही.',
    },
    {
      moat: 'Founder Inside Farming Community',
      desc: 'शेतकरी कुटुंबातील पार्श्वभूमी, शून्य विश्वास तफावत (Zero Trust Gap), शून्य पेड मार्केटिंग खर्च.',
    },
    {
      moat: 'Zero-Cost Government Tech Stack',
      desc: 'भाषिणी (Bhashini), व्हॉईसईआरए (VoicERA), अ‍ॅगमार्कनेट (Agmarknet), महाडीबीटी (MahaDBT) आणि नाल्सा (NALSA) - शून्य परवाना शुल्क.',
    },
    {
      moat: 'Regulatory & Carbon Alignment',
      desc: 'नाल्सा कायदेशीर साक्षरता भागीदारी व कृषी मंत्रालयाचा स्वेच्छा कार्बन फ्रेमवर्क (VCM 2024) थेट इंटिग्रेशन.',
    },
  ],
};

// -------------------------------------------------------------
// DPG & INTEROPERABLE AGRI NETWORK DATASETS
// -------------------------------------------------------------

import { CropDiseaseDiagnosis, SatelliteSoilObservation, StateMeshNode } from '../types';

export const CROP_DISEASE_CATALOG: CropDiseaseDiagnosis[] = [
  {
    id: 'dis-onion-purple-blotch',
    cropName: 'कांदा (Onion)',
    diseaseNameMr: 'जांभळा करपा (Purple Blotch & Stemphylium)',
    diseaseNameEn: 'Purple Blotch & Stemphylium Leaf Blight',
    scientificName: 'Alternaria porri / Stemphylium vesicarium',
    confidence: 96.4,
    severity: 'मध्यम (Moderate)',
    pathogenType: 'बुरशीजन्य (Fungal)',
    symptomsMr: [
      'पानांवर प्रथम पांढुरके, नंतर मध्यभागी जांभळट तपकिरी रंगाचे लांबट चट्टे पडतात.',
      'चट्ट्यांभोवती पिवळसर कडा तयार होऊन पाने वाळतात व शेंडे जळाल्यासारखे दिसतात.',
      'ढगाळ हवामान व सकाळच्या दाट धुक्यामुळे प्रादुर्भाव झपाट्याने वाढतो.'
    ],
    symptomsEn: [
      'Small water-soaked lesions on leaves turning purple-brown in the center with yellow halos.',
      'Leaves dry up and blight from tip downwards, severely reducing bulb expansion.',
      'Rapidly escalates during humid mornings and post-rain drizzle.'
    ],
    regenerativeTreatmentMr: [
      'ताक + तांब्याची जुनी तार / पाटी: ५ लिटर आंबट ताकात तांब्याचा तुकडा ४ दिवस भिजवून २०० लिटर पाण्यात मिसळून फवारा (नैसर्गिक बुरशीनाशक).',
      'ट्रायकोडर्मा व्हिरीडी (Trichoderma viride): ५ ग्रॅम/लिटर पाण्यात मिसळून पानांवर फवारणी व मुळांशी ड्रेन्चिंग करा.',
      'दशपर्णी अर्क (Dashparni Ark): २०० लिटर पाण्यात ६ लिटर अर्क मिसळून आठवड्यातून एकदा फवारा.'
    ],
    regenerativeTreatmentEn: [
      'Fermented sour buttermilk aged with copper wire (5L in 200L water) as a potent natural bio-fungicide.',
      'Trichoderma viride bio-agent @ 5g/litre for foliar spray and soil application.',
      'Dashparni Ark biological botanical extract @ 6L per 200L water spray.'
    ],
    chemicalFallbackMr: 'अत्यावश्यक असल्यास: प्रोपिकोनॅझोल २५% ईसी (Propiconazole) १ मिली किंवा टेब्युकोनॅझोल + ट्रायफ्लॉक्सीस्ट्रॉबिन ०.७ ग्रॅम प्रति लिटर पाणी.',
    chemicalFallbackEn: 'Emergency Chemical: Propiconazole 25% EC @ 1ml/litre or Tebuconazole + Trifloxystrobin @ 0.7g/litre.',
    preHarvestIntervalDays: 14,
    preventiveMeasuresMr: [
      'गादीवाफ्यावर लागवड करून पाण्याचा योग्य निचरा ठेवा.',
      'नत्राचा (युरिया) अतिवापर टाळा; पालाश व सिलिकॉनयुक्त द्रव्यांचा वापर वाढवा.'
    ],
    preventiveMeasuresEn: [
      'Raised bed planting with optimal furrow drainage.',
      'Avoid excess nitrogen fertilizer; supplement with bio-potash and silica.'
    ],
    isInterStateAlertActive: true,
    affectedStates: ['Maharashtra (नाशिक, जळगाव, पुणे)', 'Karnataka (विजापूर, बागलकोट)', 'Gujarat (भावनगर)']
  },
  {
    id: 'dis-cotton-pink-bollworm',
    cropName: 'कापूस (Cotton)',
    diseaseNameMr: 'गुलाबी बोंडअळी (Pink Bollworm)',
    diseaseNameEn: 'Pink Bollworm Infestation',
    scientificName: 'Pectinophora gossypiella',
    confidence: 94.8,
    severity: 'गंभीर (Severe)',
    pathogenType: 'कीड / अळी (Pest / Larvae)',
    symptomsMr: [
      'फुलांवर रोसेट (गुलाबासारखी मिटलेली फुले) दिसणे.',
      'बोंडांमध्ये सूक्ष्म छिद्र करून अळी आत शिरून सरकी व रुई खाते.',
      'बोंडे अकाली उमलणे व रुईची प्रत पूर्णपणे खराब होणे.'
    ],
    symptomsEn: [
      'Rosette flowers with petals tied together by silk threads.',
      'Larvae bore into green bolls, feeding on developing seeds and staining lint.',
      'Premature boll opening with blackened, unmarketable lint.'
    ],
    regenerativeTreatmentMr: [
      'कामगंध सापळे (Pheromone Traps): प्रति एकरी ५ ते ८ सापळे पीक पातळीपेक्षा १ फूट वर लावा.',
      'ट्रायकोग्रामा व्हॅस्प (Trichogramma bactrae) परोपजीवी मित्रकीटक: १.५ लाख अंडी प्रति हेक्टरी ३ वेळा शेतात सोडा.',
      'निम अर्क (Azadirachtin 10,000 ppm): २.५ मिली प्रति लिटर पाण्यात मिसळून संध्याकाळी फवारा.'
    ],
    regenerativeTreatmentEn: [
      'Install 6-8 Gossyplure pheromone traps per acre to disrupt mating cycles.',
      'Release Trichogramma egg parasitoids @ 1.5 lakh eggs/hectare at 10-day intervals.',
      'Spray Azadirachtin 10,000 ppm botanical neem formulation @ 2.5ml/litre at dusk.'
    ],
    chemicalFallbackMr: 'ईटीएल पातळी (८ पतंग/सापळा सलग ३ दिवस) ओलांडल्यास: प्रोफेनोफॉस ५०% ईसी २ मिली किंवा इमामेक्टिन बेन्झोएट ५% एसजी ०.५ ग्रॅम प्रति लिटर पाणी.',
    chemicalFallbackEn: 'If ETL exceeds 8 moths/trap/night: Profenofos 50% EC @ 2ml/L or Emamectin Benzoate 5% SG @ 0.5g/L.',
    preHarvestIntervalDays: 21,
    preventiveMeasuresMr: [
      'कापूस वेचणीनंतर पऱ्हाट्या शेतात न ठेवता त्वरित कंपोस्ट किंवा बायोचार बनवा.',
      'सीमा भागात आंतरपिक म्हणून भेंडी किंवा एरंडी लावू नका.'
    ],
    preventiveMeasuresEn: [
      'Avoid ratoon cotton; convert stalks into biochar or compost immediately.',
      'Maintain synchronized sowing across border villages.'
    ],
    isInterStateAlertActive: true,
    affectedStates: ['Maharashtra (विदर्भ, मराठवाडा, खान्देश)', 'Telangana (आदिलाबाद, वारंगळ)', 'Madhya Pradesh (खरगोन, बडवानी)']
  },
  {
    id: 'dis-soyabean-rust',
    cropName: 'सोयाबीन (Soyabean)',
    diseaseNameMr: 'सोयाबीन तांबेरा (Asian Soybean Rust)',
    diseaseNameEn: 'Asian Soybean Rust',
    scientificName: 'Phakopsora pachyrhizi',
    confidence: 91.2,
    severity: 'मध्यम (Moderate)',
    pathogenType: 'बुरशीजन्य (Fungal)',
    symptomsMr: [
      'पानांच्या खालच्या बाजूला फिकट तपकिरी ते लालसर रंगाचे फोडासारखे ठिपके दिसतात.',
      'पाने अकाली पिवळी पडून गळतात, ज्यामुळे शेंगा पोचट राहतात.'
    ],
    symptomsEn: [
      'Polygonal reddish-brown pustules on the abaxial leaf surface.',
      'Rapid premature defoliation leading to poorly filled pods and shrivelled seeds.'
    ],
    regenerativeTreatmentMr: [
      'अग्निअस्त्र किंवा गोमूत्र + हिंग द्रावण: २०० लिटर पाण्यात ५ लिटर गोमूत्र व ५० ग्रॅम हिंग मिसळून फवारा.',
      'सुडोमोनास फ्लुरोसन्स (Pseudomonas fluorescens) जैविक बुरशीनाशक १० ग्रॅम प्रति लिटर पाणी.'
    ],
    regenerativeTreatmentEn: [
      'Fermented cow urine + asafoetida formulation for foliar protection.',
      'Pseudomonas fluorescens bio-fungicide @ 10g/litre.'
    ],
    chemicalFallbackMr: 'प्रादुर्भाव दिसताच: हेक्झाकोनॅझोल ५% ईसी २ मिली किंवा अझॉक्सीस्ट्रॉबिन + डायफेनोकोनॅझोल १ मिली प्रति लिटर पाणी.',
    chemicalFallbackEn: 'Hexaconazole 5% EC @ 2ml/L or Azoxystrobin + Difenoconazole @ 1ml/L.',
    preHarvestIntervalDays: 20,
    preventiveMeasuresMr: ['प्रमाणित बियाण्यांची पेरणी करा व बीजप्रक्रिया न चुकता करा.'],
    preventiveMeasuresEn: ['Plant certified rust-tolerant varieties with bio-priming.'],
    isInterStateAlertActive: false,
    affectedStates: ['Maharashtra (सांगली, कोल्हापूर)', 'Karnataka (बेळगाव)']
  }
];

export const MOCK_SATELLITE_SOIL_DATA: SatelliteSoilObservation = {
  plotId: 'MH-CADASTRE-712-4B',
  village: 'Varangaon (वरणगाव)',
  taluka: 'Bhusawal (भुसावळ)',
  district: 'Jalgaon (जळगाव)',
  state: 'Maharashtra',
  satelliteData: {
    satelliteName: 'Sentinel-2 Multispectral MSI',
    lastPassDate: '२७ सप्टेंबर २०२६ (११:४२ IST)',
    ndvi: 0.64, // Good canopy health
    ndwi: 0.32, // Moderate moisture index
    evi: 0.58,
    canopyCoverPercent: 78,
    soilMoistureProxy: 'पुरेशी (Adequate)',
    thermalAnomalyCelsius: -1.2, // Leaf cooler than ground = good transpiration
  },
  soilHealthCard: {
    sampleDate: 'ऑगस्ट २०२६ (मृदा परीक्षण प्रयोगशाळा जळगाव)',
    ph: 7.8, // Slightly alkaline calcareous black soil
    organicCarbonPercent: 0.38, // Low (< 0.5% needs organic buildup)
    nitrogenKgHa: 192, // Low
    phosphorusKgHa: 16.4, // Medium
    potassiumKgHa: 340, // High
    zincPpm: 0.52, // Deficient (< 0.6 ppm)
    ironPpm: 4.8, // Marginal
    boronPpm: 0.45,
    electricalConductivity: 0.42, // Normal
    soilRating: 'कमी सेंद्रिय कर्ब (Low Carbon)',
  },
  weatherForecast: {
    rainfallNext7DaysMm: 38.5,
    tempMax: 33.4,
    tempMin: 22.8,
    humidityPercent: 74,
    windSpeedKmph: 14,
    monsoonDeviationPercent: +8.4,
    heatStressWarning: false,
  },
  regenerativePrescriptions: {
    recommendedCrops: [
      'कापूस + तूर आंतरपीक (Cotton + Pigeon Pea 4:1)',
      'हरभरा / चवळी आच्छादन (Chickpea / Cowpea Green Cover)',
      'ताग / धैंचा हिरवळीचे खत (Sunn Hemp Green Manuring)'
    ],
    cropRotationStrategyMr: 'कापूस निघाल्यानंतर लगेच हरभरा किंवा मूग घ्यावा, जेणेकरून जमिनीत रायझोबियम जिवाणूंद्वारे हवेतील नत्र स्थिरावेल आणि पुढील हंगामात खतांचा खर्च ३५% कमी होईल.',
    cropRotationStrategyEn: 'Immediate post-cotton relay planting of Chickpea (Gram) or Mungbean to fix atmospheric nitrogen via Rhizobium, reducing chemical NPK requirement by 35%.',
    coverCropChoiceMr: 'धैंचा (Sesbania aculeata) किंवा ताग: ४५ दिवसांत जमिनीत गाडल्यास सेंद्रिय कर्ब ०.३८% वरून ०.६५% पर्यंत वाढेल.',
    coverCropChoiceEn: 'Sunn hemp or Sesbania cover crop incorporated at 45 days to lift organic carbon from 0.38% to 0.65%.',
    biofertilizersMr: [
      'ॲझोटोबॅक्टर (Azotobacter) + पीएसबी (PSB) प्रति एकरी २ किलो शेणखतात मिसळून देणे.',
      'झिंक विरघळवणारे जिवाणू (Zinc Solubilizing Bacteria - ZSB) जमिनीत दिल्यास जस्त कमतरता दूर होईल.',
      'जीवामृत (Jeevamrut): दर १५ दिवसांनी २०० लिटर प्रति एकरी सिंचनाच्या पाण्यासोबत देणे.'
    ],
    biofertilizersEn: [
      'Azotobacter + PSB bio-inoculants @ 2kg/acre blended with farmyard compost.',
      'Zinc Solubilizing Bacteria (ZSB) consortium to unlock fixed soil zinc reserves.',
      'Jeevamrut fermented microbial culture @ 200L/acre via drip fertigation fortnightly.'
    ],
    soilCarbonTargetTonsPerAcre: 1.45,
    waterSavingPercent: 28,
  }
};

export const INTER_STATE_MESH_NETWORK: StateMeshNode[] = [
  {
    stateId: 'MH',
    stateName: 'Maharashtra',
    stateNameMr: 'महाराष्ट्र',
    department: 'Department of Agriculture & MahaDBT Federation',
    status: 'Active Federated Node',
    sharedModelsCount: 6,
    lastTelemetrySync: 'आज, ०९:१५ IST (Real-time)',
    focusAgriCrops: ['Onion', 'Cotton', 'Soyabean', 'Grapes', 'Sugarcane'],
    sharedModels: [
      {
        modelId: 'MH-AGRI-XGB-ONION-v2',
        name: 'Maharashtra Onion 7-Day Spatio-Temporal Arrival Model',
        type: 'Price Forecasting',
        algorithm: 'Hybrid XGBoost + Bi-LSTM (Agmarknet + IMD Weather Grids)',
        accuracyMetric: 'R² = 0.941 • 91.3% Directional',
        interoperabilityStandard: 'AgriStack IDEA-v2',
        openApiEndpoint: '/api/dpg/models/mh/onion-forecast',
      },
      {
        modelId: 'MH-PEST-BOLLWORM-EARLY-v1',
        name: 'Pink Bollworm Sensor & Pheromone Geospatial Early Warning',
        type: 'Pest Early Warning',
        algorithm: 'Spatial Bayesian Diffusion + Sentinel Thermal Anomalies',
        accuracyMetric: '89.7% 5-Day Warning Lead Time',
        interoperabilityStandard: 'AgrO Open Ontology',
        openApiEndpoint: '/api/dpg/models/mh/bollworm-surveillance',
      },
      {
        modelId: 'MH-SOIL-CARBON-VM0042',
        name: 'Smallholder Black Soil Regenerative Carbon MRV Ledger',
        type: 'Soil Carbon MRV',
        algorithm: 'Verra VM0042 + SHA-256 Ledger Aggregator',
        accuracyMetric: '±4.2% Soil Carbon Stock Validation',
        interoperabilityStandard: 'CCTS / Verra VM0042',
        openApiEndpoint: '/api/dpg/models/mh/voice-carbon-mrv',
      }
    ],
    activeCrossStateAlerts: [
      {
        alertId: 'ALT-MH-KA-ONION-GLUT',
        titleMr: 'लासलगाव व बागलकोट कांदा आवक समन्वय अलर्ट',
        titleEn: 'Lasalgaon (MH) & Bagalkote (KA) Onion Harvest Synchronization Alert',
        severity: 'High',
        originState: 'Maharashtra',
        targetStates: ['Karnataka', 'Gujarat'],
        crop: 'Onion (कांदा)',
      },
      {
        alertId: 'ALT-MH-TS-PBW-MIGRATION',
        titleMr: 'नांदेड-आदिलाबाद सीमा गुलाबी बोंडअळी संसर्ग पूर्वसूचना',
        titleEn: 'Nanded-Adilabad Border Pink Bollworm Outbreak Diffusion Warning',
        severity: 'High',
        originState: 'Maharashtra',
        targetStates: ['Telangana', 'Madhya Pradesh'],
        crop: 'Cotton (कापूस)',
      }
    ]
  },
  {
    stateId: 'KA',
    stateName: 'Karnataka',
    stateNameMr: 'कर्नाटक',
    department: 'Karnataka State Agricultural Dept & FRUITS Registry',
    status: 'Active Federated Node',
    sharedModelsCount: 4,
    lastTelemetrySync: 'आज, ०८:४० IST',
    focusAgriCrops: ['Onion', 'Tur (Arhar)', 'Maize', 'Ragi', 'Arecanut'],
    sharedModels: [
      {
        modelId: 'KA-DRYLAND-TUR-DROUGHT-v3',
        name: 'Kalaburagi Red Gram Drought Moisture Depletion Index',
        type: 'Drought Resilience Index',
        algorithm: 'Sentinel-2 NDWI + GRACE Groundwater Anomaly Model',
        accuracyMetric: '92.4% Soil Moisture Depletion Accuracy',
        interoperabilityStandard: 'AgriStack IDEA-v2',
        openApiEndpoint: '/api/dpg/models/ka/drought-depletion',
      },
      {
        modelId: 'KA-FAW-MAIZE-RADAR',
        name: 'Fall Armyworm (लष्करी अळी) Regional Canopy Spread Model',
        type: 'Pest Early Warning',
        algorithm: 'Deep Convolutional Visual Trap + Wind Trajectory Vector',
        accuracyMetric: '94.1% Identification Accuracy',
        interoperabilityStandard: 'DPG Certified',
        openApiEndpoint: '/api/dpg/models/ka/faw-surveillance',
      }
    ],
    activeCrossStateAlerts: [
      {
        alertId: 'ALT-KA-MH-TUR-WILT',
        titleMr: 'बेळगाव-सांगली सीमा तूर मर रोग प्रतिबंधक सूचना',
        titleEn: 'Belagavi-Sangli Cross-Border Tur Fusarium Wilt Advisory',
        severity: 'Medium',
        originState: 'Karnataka',
        targetStates: ['Maharashtra'],
        crop: 'Pigeon Pea (तूर)',
      }
    ]
  },
  {
    stateId: 'TS',
    stateName: 'Telangana',
    stateNameMr: 'तेलंगणा',
    department: 'Telangana Rythu Bandhu & Agri Innovation Hub',
    status: 'Active Federated Node',
    sharedModelsCount: 5,
    lastTelemetrySync: 'आज, ०९:०० IST',
    focusAgriCrops: ['Cotton', 'Paddy', 'Chilli', 'Turmeric'],
    sharedModels: [
      {
        modelId: 'TS-COTTON-PEST-AI',
        name: 'Telangana Real-time Cotton Sucking Pest AI Predictor',
        type: 'Pest Early Warning',
        algorithm: 'XGBoost Microclimate Anomaly + High Temperature Humidity Surge',
        accuracyMetric: '90.2% Prediction Horizon',
        interoperabilityStandard: 'AgriStack IDEA-v2',
        openApiEndpoint: '/api/dpg/models/ts/cotton-pests',
      }
    ],
    activeCrossStateAlerts: [
      {
        alertId: 'ALT-TS-MH-CHILLI-THRIPS',
        titleMr: 'मिरची काळी फुलकिडे (Black Thrips) आंतरराज्यीय इशारा',
        titleEn: 'Invasive Black Thrips Vector Warning across TS-MH Border',
        severity: 'High',
        originState: 'Telangana',
        targetStates: ['Maharashtra', 'Andhra Pradesh'],
        crop: 'Chilli (मिरची)',
      }
    ]
  },
  {
    stateId: 'MP',
    stateName: 'Madhya Pradesh',
    stateNameMr: 'मध्य प्रदेश',
    department: 'MP Kisan Kalyan & Krishi Vikas Mantralaya',
    status: 'Active Federated Node',
    sharedModelsCount: 4,
    lastTelemetrySync: 'आज, ०७:३० IST',
    focusAgriCrops: ['Soyabean', 'Wheat', 'Gram', 'Mustard', 'Garlic'],
    sharedModels: [
      {
        modelId: 'MP-SOYABEAN-YIELD-SURGE',
        name: 'Malwa-Nimar Soyabean Pod Filling & Yield Estimator',
        type: 'Price Forecasting',
        algorithm: 'Multi-spectral NDVI Time-Series Peak Analysis',
        accuracyMetric: 'R² = 0.915',
        interoperabilityStandard: 'AgriStack IDEA-v2',
        openApiEndpoint: '/api/dpg/models/mp/soya-yield-forecast',
      }
    ],
    activeCrossStateAlerts: [
      {
        alertId: 'ALT-MP-MH-SOYA-RUST',
        titleMr: 'बडवानी-धुळे सीमा सोयाबीन तांबेरा बुरशी सूचना',
        titleEn: 'Barwani-Dhule Cross-Border Asian Soybean Rust Containment',
        severity: 'Medium',
        originState: 'Madhya Pradesh',
        targetStates: ['Maharashtra', 'Gujarat'],
        crop: 'Soyabean (सोयाबीन)',
      }
    ]
  },
  {
    stateId: 'GJ',
    stateName: 'Gujarat',
    stateNameMr: 'गुजरात',
    department: 'Gujarat Krishi Vigyan & i-Khedut Network',
    status: 'Ready for Exchange',
    sharedModelsCount: 3,
    lastTelemetrySync: 'काल, २१:०० IST',
    focusAgriCrops: ['Cotton', 'Groundnut', 'Castor', 'Cumin'],
    sharedModels: [
      {
        modelId: 'GJ-GROUNDNUT-AFLATOXIN-RISK',
        name: 'Saurashtra Groundnut Post-Harvest Moisture & Aflatoxin Risk Model',
        type: 'Pest Early Warning',
        algorithm: 'Relative Humidity Loggers + Storage Aeration Engine',
        accuracyMetric: '93.5% Precision',
        interoperabilityStandard: 'DPG Certified',
        openApiEndpoint: '/api/dpg/models/gj/aflatoxin-risk',
      }
    ],
    activeCrossStateAlerts: []
  },
  {
    stateId: 'PB',
    stateName: 'Punjab',
    stateNameMr: 'पंजाब',
    department: 'Punjab Agriculture University & PAU Kisan Portal',
    status: 'Syncing Models',
    sharedModelsCount: 3,
    lastTelemetrySync: 'आज, ०६:४५ IST',
    focusAgriCrops: ['Wheat', 'Basmati Paddy', 'Cotton', 'Kinnow'],
    sharedModels: [
      {
        modelId: 'PB-WHEAT-HEAT-TOLERANCE',
        name: 'Terminal Heat Wave Shock Vulnerability Index for Wheat',
        type: 'Drought Resilience Index',
        algorithm: 'Thermal Infrared Modis MOD11A1 + Canopy Temperature Depression',
        accuracyMetric: '89.4% Lead Accuracy',
        interoperabilityStandard: 'AgrO Open Ontology',
        openApiEndpoint: '/api/dpg/models/pb/wheat-heat-stress',
      }
    ],
    activeCrossStateAlerts: []
  }
];

