# ShetMitra AI (शेतमित्र एआय) — Technical Design Document & Architecture

> **"From Algorithm to Agriculture. From Data to Dignity."**  
> Voice-First Multimodal Rural Intelligence Platform for Smallholder Farmers in Maharashtra, India.

---

## 1. Executive Architecture Summary

ShetMitra AI is architected as an **inclusive, voice-first, dual-language (Marathi & Hindi)** rural intelligence operating system. It bridges severe information asymmetry for small and marginal farmers across Maharashtra by unifying:
1. **Google Gemini 3.8 Flash Multimodal AI**: Natural agricultural advisory, multimodal crop disease diagnostics, legal reasoning, and context-aware conversational assistance.
2. **Bhashini National Language Infrastructure (MeitY)**: Sovereign Indian language speech-to-text (Conformer ASR), neural machine translation (IndicTrans2), and expressive text-to-speech (IIT Madras & AI4Bharat TTS models).
3. **Mandi 7-Day Price Forecasting Engine**: Micro-economic arrival forecasting for APMCs (Lasalgaon, Jalgaon, Nashik, Pune) with direct hold/sell recommendations.
4. **Voice MRV (Measurement, Reporting, Verification)**: Voice-logged regenerative agronomy practices (Zero Tillage, Biochar, Farmyard Manure) mapped to Verra VM0042 carbon credit pooling.
5. **Agronomist Human-In-The-Loop (HITL) Desk**: Expert agronomist triage with confidence-threshold escalations and auditable verification logs.
6. **Statutory Legal Rights Engine**: Plain-language rights protection under the Maharashtra Money-Lending Regulation Act 2014, Damdupat interest caps, and integrated NALSA 15100 legal aid connectivity.

---

## 2. End-to-End System Architecture

```
+-----------------------------------------------------------------------------------+
|                            FARMER FIELD ENVIRONMENT                               |
|   Feature Phones / Budget Smartphones / Mobile Web (Marathi & Hindi Voice First)  |
+-----------------------------------------------------------------------------------+
                                      │
                                      ▼
+-----------------------------------------------------------------------------------+
|                        CLIENT PRESENTATION LAYER (React 19 SPA)                   |
|  - Voice Assistant Floating Console (Web Speech + Bhashini Audio Stream)          |
|  - Crop Disease Camera Diagnostic & Leaf Symptom Scanner                          |
|  - Mandi 7-Day Arrival & Price Curve Visualizer                                   |
|  - Regenerative Agro Satellite & Soil Moisture Heatmaps                           |
|  - Legal Rights Advisor with Spoken Statutory Disclaimers                         |
|  - Local Offline-Resilient Storage (Profile Memory & Cache)                       |
+-----------------------------------------------------------------------------------+
                                      │
                 HTTPS / JSON (Client to Express Gateway)
                                      │
                                      ▼
+-----------------------------------------------------------------------------------+
|                     APPLICATION GATEWAY & PROXY (server.ts)                       |
|  - Express Server with Vite Middleware in Development / Optimized Static in Prod   |
|  - Context Injector (Farmer Landholding, Soil Type, Active Crops, District)       |
|  - Secure Environment Variable Handler (No Client-Exposed Keys)                   |
|  - Health Checks & High-Availability Endpoints (/health, /api/health)             |
+-----------------------------------------------------------------------------------+
           │                                 │                             │
           ▼                                 ▼                             ▼
+-----------------------+       +------------------------+      +-----------------------+
|   GOOGLE GEMINI API   |       |   BHASHINI DHRUVA API  |      |  INTER-STATE AGRI     |
|   (Google GenAI SDK)  |       |   (MeitY Digital Good) |      |      DATA MESH        |
+-----------------------+       +------------------------+      +-----------------------+
| - Gemini 3.8 Flash    |       | - Pipeline Compute     |      | - APMC Mandi Influx   |
| - Multimodal Vision   |       | - Conformer ASR        |      | - Soil Health Data    |
| - Context Grounding   |       | - IndicTrans2 NMT      |      | - Climate & Weather   |
| - Low Latency Stream  |       | - IIT-M / Coqui TTS    |      | - Biosecurity Alerts  |
+-----------------------+       +------------------------+      +-----------------------+
           │                                 │                             │
           └─────────────────┬───────────────┴─────────────────────────────┘
                             ▼
+-----------------------------------------------------------------------------------+
|                          DATA & VERIFICATION LEDGER                               |
|  - Voice MRV Carbon Practice Store (Zero-Till, Biochar, Manure, tCO2e Pooling)    |
|  - Human-in-the-Loop (HITL) Desk: Agronomist Validation & Review Queue            |
|  - DLSA / NALSA Legal Directory & Maharashtra Statutory Rules Base                |
+-----------------------------------------------------------------------------------+
```

---

## 3. Core Architectural Subsystems

### 3.1 Bhashini Indian Language Pipeline

To guarantee inclusivity for rural farmers who may not read or write English, ShetMitra AI leverages India's **National Language Translation Mission (Bhashini)**:

```
[Farmer Voice Query] ──► [Conformer Multilingual ASR] ──► [Indic Marathi Text]
                                                                  │
                                                                  ▼
[Bhashini IIT-M / Coqui TTS] ◄── [Gemini 3.8 Flash Engine] ◄──────┘
         │
         ▼
[Farmer Spoken Output in Native Tone & Cadence]
```

- **ASR Task**: `bhashini/ai4bharat/conformer-multilingual-asr` transcribed directly from farmer field utterances.
- **Translation Task**: `ai4bharat/indictrans-v2-all-gpu--t4` for cross-lingual data mesh queries.
- **TTS Task**: `Bhashini/IITM/TTS` delivering high-intelligibility 22kHz speech in Marathi and Hindi with a browser-native Web Speech fallback.

---

### 3.2 Multimodal Crop Disease Diagnostic Flow

```
[Leaf Photo Upload] ──► [Canvas Base64 Compressor] ──► [Gemini 3.8 Flash Vision]
                                                              │
                                                              ▼
[Structured Diagnostic Response]:
├── 1. Disease Name & Pathogen Classification (Fungal / Bacterial / Viral / Pest)
├── 2. Confidence Metric (%)
├── 3. Primary Biological Remedy (Sour buttermilk, Neem oil, Trichoderma, Dashparni)
└── 4. Emergency IPM Chemical Fallback (Dosage & Pre-Harvest Interval - PHI)
```

---

### 3.3 Voice MRV & Verra VM0042 Carbon Ledger

Smallholder farmers adopting regenerative practices often cannot afford expensive third-party MRV audits. ShetMitra implements **Voice MRV**:
1. **Field Audio Utterance**: "आज मी २ एकर शेतात शून्य मशागत पद्धतीने पेरणी केली."
2. **Intent & Practice Entity Extraction**: Extracts `practice: zero_tillage`, `acres: 2`, `gps_location: [lat, lng]`.
3. **Sequestration Math Engine**: Applies calibrated carbon coefficients ($0.65\text{ tCO}_2\text{e/acre}$ for zero tillage, $1.20\text{ tCO}_2\text{e/acre}$ for biochar).
4. **Verra VM0042 Compliance**: Batches individual farmer contributions into a cooperative cluster pool for institutional carbon verification.

---

### 3.4 Statutory Legal Protection Subsystem

Provides actionable shielding against predatory non-institutional lending:
- **Statute Reference**: *Maharashtra Money-Lending (Regulation) Act, 2014* (Sections 31 & 39).
- **Statutory Limits**: Maximum 9% per annum for secured agricultural loans; 12% per annum for unsecured.
- **Damdupat Doctrine**: Total recovered interest can never legally exceed the principal amount.
- **NALSA Connect**: Seamless integration with the 24x7 toll-free legal aid helpline `15100`.
- **Mandatory Spoken Disclaimer**: "ही माहिती आहे, कायदेशीर सल्ला नाही. मोफत मदतीसाठी राष्ट्रीय विधी सेवा प्राधिकरण टोल फ्री १५१०० वर कॉल करा."

---

## 4. API Specification & Contracts

| Endpoint | Method | Description | Primary Payload |
|---|---|---|---|
| `/api/chat` | `POST` | Conversational voice/text advisor powered by Gemini 3.8 Flash | `{ message, language, farmerContext }` |
| `/api/crop-disease/diagnose` | `POST` | Multimodal visual diagnostic & regenerative prescription | `{ crop, symptoms, imageBase64 }` |
| `/api/forecast` | `POST` | 7-day APMC arrival and modal price projection | `{ crop, mandi, district }` |
| `/api/voice-mrv` | `POST` | Parses voice logs into verifiable carbon credits | `{ utterance, farmerId, coordinates }` |
| `/api/legal-advisor` | `POST` | Evaluates legality of loan terms and provides legal guides | `{ query, category }` |
| `/api/bhashini/tts` | `POST` | Synthesizes native Marathi/Hindi speech audio | `{ text, language, gender, serviceId }` |
| `/api/bhashini/translate`| `POST` | Translates text across Indic languages | `{ text, sourceLang, targetLang }` |
| `/api/bhashini/asr` | `POST` | Transcribes audio bytes into text | `{ audioContent, language, serviceId }` |
| `/api/bhashini/models` | `GET` | Registry of active Indic language models | *None* |
| `/health` | `GET` | Container and Cloud Run uptime health probe | *None* |

---

## 5. Security, Secrets & Privacy Architecture

1. **Zero Secret Leakage**:
   - `GEMINI_API_KEY`, `BHASHINI_USER_ID`, and `BHASHINI_INFERENCE_KEY` are stored strictly server-side in environment variables and never bundled into client JavaScript.
   - Comprehensive `.gitignore` protects against accidental leakage of `.env`, service account JSON keys, logs, and certificates.
2. **Graceful Degradation**:
   - If external AI or Bhashini keys are unconfigured, server endpoints return structured status warnings rather than failing abruptly, and the frontend falls back seamlessly to client-side heuristics and browser speech APIs.
3. **Data Sovereignty**:
   - Farmer personal records are stored locally in the browser (`localStorage`) and only shared with the server in ephemeral request contexts without persistent profiling.
