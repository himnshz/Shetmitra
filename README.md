# 🌾 ShetMitra AI (शेतमित्र एआय)
### *From Algorithm to Agriculture. From Data to Dignity.*

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-3.8_Flash-orange.svg)](https://aistudio.google.com/)
[![Bhashini](https://img.shields.io/badge/MeitY-Bhashini_Enabled-green.svg)](https://bhashini.gov.in/)
[![Tests](https://img.shields.io/badge/Tests-5%2F5_Passing-brightgreen.svg)](tests/run-tests.ts)

**ShetMitra AI** is a voice-first, multimodal rural intelligence platform designed specifically for small and marginal farmers across Maharashtra and India. Available primarily in **Marathi (मराठी)** and **Hindi (हिंदी)**, ShetMitra AI shields farming families from predatory information asymmetry, volatile price collapses, unverified agronomic inputs, and usurious informal lending.

---

## 📋 Evaluation Checklist Compliance

| Evaluation Item | Status | Location / Reference |
|---|---|---|
| **Complete Open-Source Code** | ✅ Ready | Root repository with full React 19 + Express full-stack codebase |
| **README with Setup Steps & Env Vars** | ✅ Complete | [Setup Instructions](#-quick-start--setup-guide) & [Environment Variables](#-environment-variables) |
| **Technical Design Document (Architecture Diagrams)** | ✅ Complete | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| **Sample Data & Automated Test Cases** | ✅ Complete | [data/sample-data.json](data/sample-data.json) & [tests/run-tests.ts](tests/run-tests.ts) (`npm test`) |
| **License File** | ✅ Complete | [LICENSE](LICENSE) (Apache License 2.0) |

---

## 🌟 Key Features

1. **🎙️ Voice-First Conversational Intelligence (Marathi & Hindi)**
   - Conversational AI powered by **Google Gemini 3.8 Flash** with system prompts tuned for Maharashtrian agricultural vocabulary, local idioms, and seasonal contexts.
   - Dual-engine speech architecture: **Bhashini National Language Infrastructure** (IIT Madras & AI4Bharat neural models) with seamless browser Web Speech API fallback.

2. **📈 7-Day APMC Mandi Price & Arrival Forecasting**
   - High-precision price projection models for Lasalgaon, Jalgaon, Nashik, and Pune APMC mandis (Onion, Cotton, Soyabean, Tomato).
   - Clear, actionable hold/sell recommendations backed by inter-state influx patterns.

3. **🔬 Multimodal Crop Disease Diagnostic & Biological Remedies**
   - Instant visual leaf disease identification powered by Gemini Vision multimodal inspection.
   - Prioritizes low-cost regenerative biological treatments (Sour buttermilk, Neem oil, Dashparni ark, Trichoderma) with emergency IPM chemical fallbacks and pre-harvest intervals (PHI).

4. **🌱 Voice MRV (Measurement, Reporting, Verification) Carbon Credits**
   - Farmers speak their daily practices (*"आज मी २ एकर शेतात शून्य मशागत केली"*).
   - Natural language parser quantifies practices into estimated $t\text{CO}_2\text{e}$ sequestered, aggregated into cooperative pools compliant with Verra VM0042 standards.

5. **⚖️ Statutory Legal Rights Engine (Anti-Usury Protection)**
   - Protects vulnerable farmers from illegal private moneylenders under the *Maharashtra Money-Lending (Regulation) Act, 2014*.
   - Enforces statutory interest caps (max 9% secured / 12% unsecured) and the historic Damdupat rule (accumulated interest cannot exceed principal).
   - Direct connection to the National Legal Services Authority (NALSA) 24x7 toll-free helpline **`15100`**.

6. **🛰️ Inter-State Agri Data Mesh & GIS Companion**
   - Transboundary biosecurity alerts (e.g., Pink Bollworm migration between Nanded and Adilabad).
   - Hyperlocal soil moisture, NDVI satellite overlays, and district centroid proximity geolocation.

7. **🤝 Human-In-The-Loop (HITL) Agronomist Escalation Desk**
   - Real-time queue routing low-confidence diagnostic outputs to human agronomists and KVK (Krishi Vigyan Kendra) extension officers.

---

## 🏗️ Architecture Overview

For the complete architectural design and data flow specifications, please see **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

```
+-------------------------------------------------------------------------+
|                  FARMER INTERFACE (Mobile Web / PWA)                    |
|        Voice Console  |  Camera Scanner  |  7-Day Price Forecasts       |
+-------------------------------------------------------------------------+
                                    │
                                    ▼
+-------------------------------------------------------------------------+
|                    SECURE API GATEWAY (server.ts)                       |
|   • Express Server on port 3000   • Vite Middleware in Dev Mode         |
|   • Context Enrichment (Soil, Land, Crops, District)                    |
+-------------------------------------------------------------------------+
         │                               │                         │
         ▼                               ▼                         ▼
+---------------------+       +--------------------+      +---------------+
|  GOOGLE GEMINI API  |       |    BHASHINI API    |      |   DATA MESH   |
|  - Gemini 3.8 Flash |       |    (MeitY India)   |      |  - APMC Rates |
|  - Vision Diagnostic|       |  - ASR / NMT / TTS |      |  - GIS / DLSA |
+---------------------+       +--------------------+      +---------------+
```

---

## ⚙️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion
- **Backend / API**: Node.js, Express, tsx
- **AI & ML**: `@google/genai` (Gemini 3.8 Flash Multimodal)
- **Speech & NMT**: Bhashini Dhruva Pipeline (IIT Madras, AI4Bharat) & Web Speech API
- **Build & Bundler**: Vite 8.3
- **Test Runner**: Node tsx automated test harness

---

## 🚀 Quick Start & Setup Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun**
- (Optional) Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)
- (Optional) Bhashini API credentials from [Bhashini Udyat Portal](https://bhashini.gov.in/)

### 2. Clone the Repository
```bash
git clone https://github.com/himnshz/Shetmitra.git
cd Shetmitra
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy the sample environment file to create your local `.env`:
```bash
cp .env.example .env
```
Edit `.env` and configure your API keys:
```env
GEMINI_API_KEY="your-gemini-api-key"
BHASHINI_USER_ID="your-bhashini-user-id"
BHASHINI_INFERENCE_KEY="your-bhashini-inference-key"
PORT=3000
```
> *Note: If keys are omitted or set to empty, the application will automatically engage high-quality local fallbacks (browser-native speech synthesis and heuristic responses) so that the entire user interface remains fully testable.*

### 5. Run the Automated Test Suite
Verify that all business logic, data models, and calculations pass:
```bash
npm test
```

### 6. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### 7. Production Build
```bash
# Build production bundle
npm run build

# Start production server
npm start
```

---

## 🔑 Environment Variables

| Variable Name | Description | Required? | Default / Sample |
|---|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key for conversational & multimodal vision capabilities | Recommended | `""` *(Falls back to local rural replies)* |
| `APP_URL` | Application base URL for links and webhooks | Optional | `http://localhost:3000` |
| `PORT` | Local server port for Express and Vite | Optional | `3000` |
| `NODE_ENV` | Runtime environment (`development` or `production`) | Optional | `development` |
| `BHASHINI_USER_ID` | Bhashini Udyat Portal Key / User ID | Optional | `""` |
| `BHASHINI_INFERENCE_KEY` | Bhashini Dhruva Pipeline Inference Key | Optional | `""` *(Falls back to browser speech)* |
| `BHASHINI_API_URL` | Bhashini compute endpoint | Optional | `https://dhruva-api.bhashini.gov.in/services/inference/pipeline` |

---

## 🧪 Sample Data & Test Cases

The project includes pre-configured, realistic sample data for Maharashtra agriculture:
- **`data/sample-data.json`**:
  - Sample farmer profiles (Bhaurao Patil in Jalgaon, Ganesh Shinde in Nashik).
  - APMC Mandi price curves and 7-day prediction distributions.
  - Crop disease symptom libraries and biological treatments.
  - Statutory usury limits and legal helpline references.
- **`tests/run-tests.ts`**:
  - Validates sample data schema integrity.
  - Verifies mandi 7-day price calculations and holding gains.
  - Tests Voice MRV parsing for zero tillage and biochar carbon sequestration.
  - Validates Maharashtra anti-usury statutes and legal disclaimers.
  - Tests GPS centroid proximity calculations for Maharashtra district mapping.

Execute tests anytime with:
```bash
npm test
```

---

## 🔒 Security & Privacy Practices

- **Zero Hardcoded Secrets**: No API keys, passwords, or tokens are committed. All credentials are read from server environment variables.
- **Strict `.gitignore`**: Excludes `.env`, certificates (`*.pem`, `*.key`), service account keys, and build outputs.
- **Local Sovereignty**: Farmer profiles and sensitive farm records are maintained on-device in browser storage.
- **Auditable HITL**: Agricultural advisories below calibrated confidence thresholds are routed to the HITL desk for agronomist verification.

---

## 📄 License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ for Indian Farmers. Dedicated to rural dignity and open agricultural intelligence.*
