import React, { useState } from 'react';
import {
  Globe,
  Share2,
  Database,
  Radio,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Code2,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Cpu,
  Layers,
} from 'lucide-react';
import { Language, StateMeshNode } from '../types';
import { INTER_STATE_MESH_NETWORK } from '../data/mockAgriData';

interface InterStateAgriMeshProps {
  language: Language;
}

export const InterStateAgriMesh: React.FC<InterStateAgriMeshProps> = ({ language }) => {
  const isMr = language === 'mr';
  const [selectedState, setSelectedState] = useState<StateMeshNode>(INTER_STATE_MESH_NETWORK[0]);
  const [activeTab, setActiveTab] = useState<'network' | 'models' | 'alerts' | 'openapi'>('network');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  const handleSyncMesh = () => {
    setIsSyncing(true);
    setSyncStatusMsg(null);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatusMsg(
        isMr
          ? 'आंतरराज्यीय डेटा जाळे समक्रमित झाले: ६ राज्ये, २५+ कृषी मॉडेल्स, व ४ सक्रिय पूर्वसूचना जोडल्या गेल्या.'
          : 'Federated Mesh synchronized across 6 states, 25+ shared ML models, and 4 active cross-border alerts.'
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 md:pb-6">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono block">
            {isMr ? 'डिजिटल पब्लिक गुड (DPG) • आंतरराज्यीय कृषी डेटा जाळे' : 'DIGITAL PUBLIC GOOD (DPG) • INTER-STATE AGRI DATA MESH'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif-indian mt-0.5">
            {isMr ? 'भारतीय राज्यांचे शाश्वत अन्न उत्पादनासाठी मॉडेल देवाणघेवाण व्यासपीठ' : 'Federated Agri Data & Model Exchange Network for Indian States'}
          </h2>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mt-1">
            <span>{isMr ? 'AgriStack / IDEA-v2 मानकांनुसार' : 'AgriStack & IDEA-v2 Compliant'}</span>
            <span aria-hidden="true">·</span>
            <span>{isMr ? '६ सक्रिय राज्य नोड्स' : '6 Active State Nodes'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-800 font-semibold">{isMr ? 'मुक्त कृषी बुद्धिमत्ता (Open DPG)' : 'Open Agri Intelligence'}</span>
          </div>
        </div>

        {/* Sync Mesh Action */}
        <button
          type="button"
          onClick={handleSyncMesh}
          disabled={isSyncing}
          className="px-4 py-2 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-300 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? (isMr ? 'समक्रमण सुरू आहे...' : 'Syncing Mesh...') : (isMr ? 'नोड सिंक करा' : 'Sync Federated Mesh')}</span>
        </button>
      </div>

      {syncStatusMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center gap-2 font-devanagari">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{syncStatusMsg}</span>
        </div>
      )}

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-stone-200 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('network')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'network' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700 hover:bg-stone-50'
          }`}
        >
          {isMr ? 'राज्य नोड्स (State Nodes)' : 'State Federation Nodes'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('models')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'models' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700 hover:bg-stone-50'
          }`}
        >
          {isMr ? 'सामायिक मॉडेल्स (Shared Models)' : 'Shared ML Model Catalog'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('alerts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'alerts' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700 hover:bg-stone-50'
          }`}
        >
          {isMr ? 'आंतरराज्यीय इशारे (Border Alerts)' : 'Cross-Border Early Warnings'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('openapi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'openapi' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700 hover:bg-stone-50'
          }`}
        >
          {isMr ? 'मुक्त एपीआय (Open APIs & Schema)' : 'Open APIs & DPG Schema'}
        </button>
      </div>

      {/* 3. Tab Contents */}
      {activeTab === 'network' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {INTER_STATE_MESH_NETWORK.map((node) => {
              const isSelected = selectedState.stateId === node.stateId;
              return (
                <div
                  key={node.stateId}
                  onClick={() => setSelectedState(node)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-mono text-xs font-bold text-emerald-800 px-2 py-0.5 rounded-lg bg-emerald-100/60">
                      {node.stateId}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">{node.lastTelemetrySync}</span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base font-serif-indian">
                    {isMr ? node.stateNameMr : node.stateName}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {node.department}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-600 font-medium">
                      {isMr ? 'सामायिक मॉडेल्स:' : 'Shared Models:'} <strong className="font-mono text-emerald-800">{node.sharedModelsCount}</strong>
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">{node.status}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected State Deep-Dive */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase font-mono block">
                  {isMr ? 'निवडलेला राज्य नोड तपशील' : 'SELECTED STATE FEDERATION NODE'}
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-serif-indian mt-0.5">
                  {isMr ? selectedState.stateNameMr : selectedState.stateName} — {selectedState.department}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-emerald-800">{selectedState.status}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block font-mono mb-2">
                {isMr ? 'या राज्याने सामायिक केलेले कृषी बुद्धिमत्ता मॉडेल्स:' : 'Shared AI Models Contributed by this State:'}
              </span>
              <div className="space-y-2">
                {selectedState.sharedModels.map((m) => (
                  <div key={m.modelId} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">{m.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 font-mono">{m.type}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 font-mono">
                        {m.algorithm} • <span className="text-emerald-700 font-bold">{m.accuracyMetric}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-[10px] px-2 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold">
                        {m.interoperabilityStandard}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'models' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-stone-900 text-base font-serif-indian">
                {isMr ? 'अखिल भारतीय सामायिक कृषी मॉडेल सूची' : 'Pan-India Shared Agricultural Model Catalog'}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {isMr
                  ? 'कोणत्याही राज्याला किंवा शेतकरी उत्पादक संस्थेला (FPO) या मुक्त मॉडेल्सचा थेट वापर करता येतो.'
                  : 'Open-access ML models ready for zero-cost API ingestion by any state or cooperative.'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800">
              AgriStack & AgrO Verified
            </span>
          </div>

          <div className="space-y-3">
            {INTER_STATE_MESH_NETWORK.flatMap((s) => s.sharedModels.map((m) => ({ ...m, origin: s.stateName, originMr: s.stateNameMr }))).map((m) => (
              <div key={m.modelId} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-900 font-mono">[{m.origin}]</span>
                    <h4 className="text-sm font-bold text-stone-900">{m.name}</h4>
                  </div>
                  <div className="text-xs text-stone-600 font-mono">
                    {m.algorithm} • <span className="text-emerald-700 font-bold">{m.accuracyMetric}</span>
                  </div>
                  <div className="text-[11px] text-stone-400 font-mono">
                    Endpoint: <code className="text-stone-700 bg-stone-200/70 px-1.5 py-0.5 rounded">{m.openApiEndpoint}</code>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-1 rounded-xl bg-white border border-stone-200 font-bold font-mono text-stone-700">
                    {m.interoperabilityStandard}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-stone-900 text-base font-serif-indian">
                {isMr ? 'सीमावर्ती कीड व काढणी पूर्वसूचना नेटवर्क' : 'Active Cross-Border Biosecurity & Supply Glut Warnings'}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {isMr
                  ? 'एका राज्यातील कीड किंवा पीक आवकेचा दुसऱ्या राज्यावरील परिणाम रोखण्यासाठी स्वयंचलित सहकार्य.'
                  : 'Automated inter-state coordination to contain transboundary pest migrations and harvest shocks.'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-800">
              Active Transboundary Surveillance
            </span>
          </div>

          <div className="space-y-3">
            {INTER_STATE_MESH_NETWORK.flatMap((s) => s.activeCrossStateAlerts).map((alt) => (
              <div key={alt.alertId} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0" />
                    <h4 className="text-sm font-bold text-amber-950 font-serif-indian">
                      {isMr ? alt.titleMr : alt.titleEn}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-amber-200 text-amber-900">
                    {alt.severity} Priority
                  </span>
                </div>

                <div className="text-xs text-amber-900 font-devanagari flex flex-wrap items-center gap-3">
                  <span>उगम राज्य: <strong>{alt.originState}</strong></span>
                  <span aria-hidden="true">→</span>
                  <span>लक्ष्य राज्ये: <strong>{alt.targetStates.join(', ')}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>प्रभावित पीक: <strong>{alt.crop}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'openapi' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-stone-900 text-base font-serif-indian">
                {isMr ? 'मुक्त एपीआय व डिजिटल पब्लिक गुड तपशील' : 'Digital Public Good Open API Specifications'}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {isMr
                  ? 'केंद्रीकृत नव्हे, तर विकेंद्रीकृत ओपन ॲग्री नेटवर्क प्रोटोकॉल.'
                  : 'Decentralized Open Agricultural Network protocol compliant with India Digital Ecosystem for Agriculture (IDEA).'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800">
              OpenAPI 3.1 & AgrO JSON-LD
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900 text-emerald-400 font-mono text-xs overflow-x-auto space-y-1">
            <p className="text-stone-400">// Sample Inter-State Model Telemetry Query (IDEA-v2 Protocol)</p>
            <p className="text-white">GET /api/dpg/mesh/telemetry?state=MH&crop=Onion&horizon=7d</p>
            <p className="text-stone-400 mt-2">// Response:</p>
            <pre className="text-emerald-300 text-[11px] leading-relaxed">
{`{
  "protocol": "IDEA-AgriStack-v2.1",
  "dpgRegistryId": "DPG-IN-AGRI-092",
  "stateNode": "Maharashtra (MH)",
  "federationStatus": "VERIFIED_ACTIVE",
  "payload": {
    "crop": "Allium cepa (Onion)",
    "spatioTemporalIndex": 0.941,
    "projectedArrivalSurgeDate": "2026-10-02",
    "borderAlertActive": true,
    "borderNodesNotified": ["Karnataka (KA)", "Gujarat (GJ)"],
    "regenerativePrescriptions": {
      "coverCrop": "Sesbania aculeata",
      "soilCarbonTarget": 1.45,
      "biosecurityIndex": "SAFE"
    }
  }
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
