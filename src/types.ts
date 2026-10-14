export type Language = 'mr' | 'hi' | 'en';

export interface FamilyMember {
  id: string;
  name: string;
  relation: 'farmer' | 'spouse' | 'son' | 'daughter';
  roleTitle: string;
  avatarSeed: string;
  cropsManaged: string[];
  lastQuery: string;
  voiceSignature: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  district: string;
  taluka: string;
  village: string;
  totalLandAcres: number;
  soilType: string;
  irrigationType: string;
  activeCrops: string[];
  familyMembers: FamilyMember[];
  selectedMemberId: string;
  coordinates?: { lat: number; lng: number };
  seasonalMemory: {
    lastSeason: string;
    lastCrop: string;
    soldPriceQuintal: number;
    soldMandi: string;
    decisionReflection: string;
  };
}

export interface MandiPriceForecast {
  crop: string;
  mandi: string;
  district: string;
  currentModalPrice: number;
  unit: string;
  change24h: number;
  forecast7d: number[];
  recommendationAction: 'HOLD' | 'SELL_NOW' | 'STAGGER' | 'STORE';
  recommendationText: string;
  netRealizationComparison: {
    mandiName: string;
    distanceKm: number;
    modalPrice: number;
    transportCostPerQuintal: number;
    netRealizationPerQuintal: number;
    isBestChoice: boolean;
  }[];
  modelMetrics: {
    rSquared: number;
    directionalAccuracy: string;
    mape: string;
    features: string[];
  };
}

export interface ProactivePushAlert {
  id: string;
  timestamp: string;
  urgency: 'high' | 'medium' | 'info';
  category: 'mandi_shock' | 'climate_risk' | 'scheme_deadline' | 'legal_alert' | 'community_supply';
  titleMr: string;
  titleEn: string;
  bodyMr: string;
  bodyEn: string;
  actionLabelMr: string;
  actionLabelEn: string;
  spokenAudioText: string;
  iconType: string;
}

export interface SchemeInfo {
  id: string;
  titleMr: string;
  titleEn: string;
  department: string;
  subsidyAmount: string;
  eligibilityMr: string;
  eligibilityEn: string;
  deadline: string;
  hoursRemaining: number;
  documentsRequiredMr: string[];
  applicationStepsMr: string[];
  status: 'Open' | 'Expiring Soon' | 'Applied' | 'Approved';
  portalUrl: string;
}

export interface LegalStatuteGuide {
  id: string;
  category: 'moneylending' | 'land_revenue' | 'contract_farming' | 'crop_insurance' | 'tenancy';
  querySampleMr: string;
  querySampleEn: string;
  statuteName: string;
  keyRuleSummaryMr: string;
  keyRuleSummaryEn: string;
  legalRightsPointsMr: string[];
  actionStepsMr: string[];
  tollFreeHelpline: string;
  disclaimerMr: string;
}

export interface VoiceMRVRecord {
  id: string;
  farmerId: string;
  farmerName: string;
  timestamp: string;
  practiceSpoken: string;
  verraMethodology: string;
  acreage: number;
  gpsCoordinates: { lat: number; lng: number };
  cryptoHash: string;
  carbonCreditsEstimated: number;
  estimatedEarningsINR: number;
  status: 'Pending Verification' | 'Hashed on Ledger' | 'ICMGB Submitted';
}

export interface GISDataPoint {
  taluka: string;
  currentNDVI: number;
  ndviAnomalyVs3Yr: number; // e.g. -0.12 or +0.08
  cropStage: 'Vegetative' | 'Peak Flowering' | 'Maturity & Harvest Peak' | 'Post-Harvest';
  supplySurgeRisk: 'Low' | 'Moderate' | 'High Supply Glut Expected';
  soilMoistureIndex: string;
  microclimateAlertMr: string;
}

export interface CropDiseaseDiagnosis {
  id: string;
  cropName: string;
  diseaseNameMr: string;
  diseaseNameEn: string;
  scientificName: string;
  confidence: number;
  severity: 'सौम्य (Mild)' | 'मध्यम (Moderate)' | 'गंभीर (Severe)';
  pathogenType: 'बुरशीजन्य (Fungal)' | 'विषाणूजन्य (Viral)' | 'जिवाणूजन्य (Bacterial)' | 'कीड / अळी (Pest / Larvae)';
  symptomsMr: string[];
  symptomsEn: string[];
  regenerativeTreatmentMr: string[];
  regenerativeTreatmentEn: string[];
  chemicalFallbackMr: string;
  chemicalFallbackEn: string;
  preHarvestIntervalDays: number;
  preventiveMeasuresMr: string[];
  preventiveMeasuresEn: string[];
  isInterStateAlertActive: boolean;
  affectedStates: string[];
}

export interface SatelliteSoilObservation {
  plotId: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  satelliteData: {
    satelliteName: string;
    lastPassDate: string;
    ndvi: number; // 0.0 - 1.0 (Vegetation vigor)
    ndwi: number; // -1.0 - 1.0 (Canopy moisture)
    evi: number;
    canopyCoverPercent: number;
    soilMoistureProxy: 'पुरेशी (Adequate)' | 'अल्प (Deficit)' | 'अति ओल (Saturated)';
    thermalAnomalyCelsius: number;
  };
  soilHealthCard: {
    sampleDate: string;
    ph: number;
    organicCarbonPercent: number; // e.g. 0.38% (critically low)
    nitrogenKgHa: number;
    phosphorusKgHa: number;
    potassiumKgHa: number;
    zincPpm: number;
    ironPpm: number;
    boronPpm: number;
    electricalConductivity: number;
    soilRating: 'कमी सेंद्रिय कर्ब (Low Carbon)' | 'मध्यम (Moderate)' | 'उत्कृष्ट (Healthy)';
  };
  weatherForecast: {
    rainfallNext7DaysMm: number;
    tempMax: number;
    tempMin: number;
    humidityPercent: number;
    windSpeedKmph: number;
    monsoonDeviationPercent: number;
    heatStressWarning: boolean;
  };
  regenerativePrescriptions: {
    recommendedCrops: string[];
    cropRotationStrategyMr: string;
    cropRotationStrategyEn: string;
    coverCropChoiceMr: string;
    coverCropChoiceEn: string;
    biofertilizersMr: string[];
    biofertilizersEn: string[];
    soilCarbonTargetTonsPerAcre: number;
    waterSavingPercent: number;
  };
}

export interface StateMeshNode {
  stateId: string;
  stateName: string;
  stateNameMr: string;
  department: string;
  status: 'Active Federated Node' | 'Syncing Models' | 'Ready for Exchange';
  sharedModelsCount: number;
  lastTelemetrySync: string;
  focusAgriCrops: string[];
  sharedModels: {
    modelId: string;
    name: string;
    type: 'Price Forecasting' | 'Pest Early Warning' | 'Drought Resilience Index' | 'Soil Carbon MRV';
    algorithm: string;
    accuracyMetric: string;
    interoperabilityStandard: 'AgriStack IDEA-v2' | 'AgrO Open Ontology' | 'DPG Certified' | 'CCTS / Verra VM0042';
    openApiEndpoint: string;
  }[];
  activeCrossStateAlerts: {
    alertId: string;
    titleMr: string;
    titleEn: string;
    severity: 'High' | 'Medium' | 'Info';
    originState: string;
    targetStates: string[];
    crop: string;
  }[];
}
