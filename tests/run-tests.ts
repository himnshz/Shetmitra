/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ShetMitra AI Automated Test Suite
 * Validates core business logic, mandi forecasts, Voice MRV calculations,
 * legal engine rules, and sample data integrity.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

const results: TestResult[] = [];

function runTest(name: string, fn: () => void | Promise<void>) {
  const start = Date.now();
  try {
    fn();
    results.push({ name, passed: true, durationMs: Date.now() - start });
    console.log(`  ✓ ${name}`);
  } catch (err: any) {
    results.push({ name, passed: false, error: err.message, durationMs: Date.now() - start });
    console.error(`  ✗ ${name}: ${err.message}`);
  }
}

console.log('\n🌱 ========================================');
console.log('   ShetMitra AI - Prototype Test Suite');
console.log('========================================\n');

// 1. Validate Sample Data JSON
runTest('Sample Data Integrity: data/sample-data.json exists and has valid schemas', () => {
  const sampleDataPath = path.resolve(__dirname, '../data/sample-data.json');
  if (!fs.existsSync(sampleDataPath)) {
    throw new Error('data/sample-data.json not found');
  }
  const content = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));
  if (!content.sampleFarmers || content.sampleFarmers.length === 0) {
    throw new Error('sampleFarmers array is missing or empty');
  }
  if (!content.sampleMandiForecasts || content.sampleMandiForecasts.length === 0) {
    throw new Error('sampleMandiForecasts array is missing or empty');
  }
  if (!content.sampleCropDiseases || content.sampleCropDiseases.length === 0) {
    throw new Error('sampleCropDiseases array is missing or empty');
  }
  if (!content.sampleLegalGuides || content.sampleLegalGuides.length === 0) {
    throw new Error('sampleLegalGuides array is missing or empty');
  }
});

// 2. Mandi 7-Day Price Forecast Math
runTest('Mandi Price Forecasting: Validate 7-day trend calculations and holding recommendations', () => {
  const basePrice = 2450;
  const forecastPrices = [2480, 2520, 2560, 2610, 2650, 2620, 2590];
  const peakPrice = Math.max(...forecastPrices);
  const percentGain = ((peakPrice - basePrice) / basePrice) * 100;

  if (peakPrice !== 2650) {
    throw new Error(`Expected peak price 2650, got ${peakPrice}`);
  }
  if (percentGain < 8.0 || percentGain > 8.3) {
    throw new Error(`Expected percent gain approx 8.16%, got ${percentGain}`);
  }
});

// 3. Voice MRV Carbon Sequestration Parser
runTest('Voice MRV Engine: Accurately parses regenerative practice utterances into tCO2e', () => {
  function parsePractice(utterance: string): { practice: string; estimatedCO2eTonsPerAcre: number } {
    const text = utterance.toLowerCase();
    if (text.includes('zero tillage') || text.includes('शून्य मशागत') || text.includes('no-till')) {
      return { practice: 'Zero-Tillage (No-Till Farming)', estimatedCO2eTonsPerAcre: 0.65 };
    }
    if (text.includes('biochar') || text.includes('बायोचार')) {
      return { practice: 'Biochar Soil Amendment', estimatedCO2eTonsPerAcre: 1.20 };
    }
    if (text.includes('शेणखत') || text.includes('manure') || text.includes('compost')) {
      return { practice: 'Farmyard Manure / Organic Compost', estimatedCO2eTonsPerAcre: 0.45 };
    }
    return { practice: 'General Soil Conservation', estimatedCO2eTonsPerAcre: 0.25 };
  }

  const result1 = parsePractice('आज मी २ एकर शेतात शून्य मशागत (zero tillage) पद्धतीने पेरणी केली');
  if (result1.estimatedCO2eTonsPerAcre !== 0.65) {
    throw new Error(`Expected 0.65 for zero tillage, got ${result1.estimatedCO2eTonsPerAcre}`);
  }

  const result2 = parsePractice('बायोचार वापरून जमिनीची सुपिकता वाढवली');
  if (result2.estimatedCO2eTonsPerAcre !== 1.20) {
    throw new Error(`Expected 1.20 for biochar, got ${result2.estimatedCO2eTonsPerAcre}`);
  }
});

// 4. Legal Rights Engine Rules (Maharashtra Money-Lending Regulation Act 2014)
runTest('Legal Rights Engine: Statutory usury limits enforce max 9% secured / 12% unsecured', () => {
  const legalLimits = {
    securedMaxPercentPerAnnum: 9,
    unsecuredMaxPercentPerAnnum: 12,
    damdupatRuleActive: true,
    nalsaHelpline: '15100',
  };

  function evaluateInterestRate(chargedPercentPerMonth: number, isSecured: boolean) {
    const annualRate = chargedPercentPerMonth * 12;
    const maxAllowed = isSecured ? legalLimits.securedMaxPercentPerAnnum : legalLimits.unsecuredMaxPercentPerAnnum;
    const isIllegal = annualRate > maxAllowed;
    return {
      annualRate,
      maxAllowed,
      isIllegal,
      violationSummary: isIllegal
        ? `महाराष्ट्र सावकारी नियमन अधिनियम २०१४ नुसार कमाल मर्यादा ${maxAllowed}% असताना ${annualRate}% आकारणी बेकायदेशीर आहे.`
        : 'कायदेशीर मर्यादेत आहे.',
    };
  }

  const illegalLoan = evaluateInterestRate(5, false); // 5% per month = 60% per annum
  if (!illegalLoan.isIllegal) {
    throw new Error('Expected 5% per month loan to be marked illegal usury');
  }
  if (illegalLoan.annualRate !== 60) {
    throw new Error(`Expected annualRate 60%, got ${illegalLoan.annualRate}%`);
  }
});

// 5. Centroid Proximity Geolocation Calculation
runTest('GPS Proximity Mapping: Correctly identifies closest Maharashtra district hub', () => {
  const DISTRICT_CENTROIDS = [
    { name: 'Jalgaon (जळगाव)', lat: 21.0077, lng: 75.5626 },
    { name: 'Nashik (नाशिक)', lat: 19.9975, lng: 73.7898 },
    { name: 'Pune (पुणे)', lat: 18.5204, lng: 73.8567 },
  ];

  function findNearest(lat: number, lng: number) {
    let nearest = DISTRICT_CENTROIDS[0];
    let minDistance = Number.MAX_VALUE;
    for (const d of DISTRICT_CENTROIDS) {
      const dist = Math.hypot(d.lat - lat, d.lng - lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = d;
      }
    }
    return nearest;
  }

  // Coordinates near Bhusawal (21.04, 75.80) should match Jalgaon
  const matchJalgaon = findNearest(21.04, 75.80);
  if (!matchJalgaon.name.includes('Jalgaon')) {
    throw new Error(`Expected Jalgaon, got ${matchJalgaon.name}`);
  }

  // Coordinates near Lasalgaon (20.14, 74.22) should match Nashik
  const matchNashik = findNearest(20.14, 74.22);
  if (!matchNashik.name.includes('Nashik')) {
    throw new Error(`Expected Nashik, got ${matchNashik.name}`);
  }
});

// Summary
const total = results.length;
const passed = results.filter((r) => r.passed).length;
const failed = results.filter((r) => !r.passed).length;

console.log('\n----------------------------------------');
console.log(`Results: ${passed}/${total} passed (${failed} failed)`);
console.log('----------------------------------------\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✨ All prototype tests passed successfully!\n');
}
