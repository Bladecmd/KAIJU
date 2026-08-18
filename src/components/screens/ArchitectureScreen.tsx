import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { projectsData } from '../../data/projectsData';
import { allCaseStudies } from '../../data/caseStudies';
import {
  Layers,
  ArrowUpRight,
  Server,
  Database,
  Cpu,
  Lock,
  Zap,
  ShieldCheck,
  TrendingUp,
  Activity,
  GitBranch,
  CheckCircle2,
} from 'lucide-react';

interface ArchitectureScreenProps {
  onSelectScreen: (screenId: ScreenId, caseStudySlug?: string) => void;
}

export const ArchitectureScreen: React.FC<ArchitectureScreenProps> = ({ onSelectScreen }) => {
  const [selectedSystem, setSelectedSystem] = useState<string>('metro-task-force');

  const activeStudy = allCaseStudies.find((c) => c.slug === selectedSystem) || allCaseStudies[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#1c2736] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-1 text-xs font-mono text-[#98cbff]">
          <Layers className="h-3.5 w-3.5" />
          SYSTEM_BLUEPRINTS // ARCHITECTURAL TOPOLOGY & EVENT FLOWS
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white font-mono">
          System Architecture Explorer
        </h1>
        <p className="text-sm text-[#a3b1c2]">
          Deep architectural specifications, state machine topologies, double-entry financial ledgers, and zero-trust security perimeters.
        </p>
      </div>

      {/* System Selector */}
      <div className="flex flex-wrap gap-2">
        {allCaseStudies.map((cs) => (
          <button
            key={cs.id}
            onClick={() => setSelectedSystem(cs.slug)}
            className={`rounded-xl px-4 py-2.5 text-xs font-mono transition-all ${
              selectedSystem === cs.slug
                ? 'bg-[#98cbff] text-[#001f3f] font-bold shadow-lg shadow-[#98cbff]/20'
                : 'border border-[#223142] bg-[#0c141e] text-[#8ca3b8] hover:text-white hover:border-[#3b5168]'
            }`}
          >
            {cs.identity.projectName}
          </button>
        ))}
      </div>

      {/* Active System Topology */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topology Card */}
        <div className="lg:col-span-8 rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#1c2736] pb-4">
            <div>
              <h2 className="text-xl font-bold text-white font-mono">
                {activeStudy.identity.projectName} // Topology
              </h2>
              <p className="text-xs font-mono text-[#98cbff] mt-0.5">{activeStudy.identity.projectType}</p>
            </div>
            <button
              onClick={() => onSelectScreen('CASE_STUDIES', activeStudy.slug)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#142232] border border-[#98cbff]/30 px-3 py-1.5 text-xs font-mono text-[#98cbff] hover:bg-[#98cbff] hover:text-[#001f3f] transition-all"
            >
              Full 25-Section Case Study <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* ASCII / Box Architecture Diagram */}
          <div className="rounded-xl border border-[#1e2d3d] bg-[#070b10] p-5 font-mono text-xs text-[#a3b1c2] space-y-4">
            <span className="text-[#657a8e] text-[11px] uppercase block">Interactive Blueprint Diagram:</span>
            <div className="p-4 rounded-lg bg-[#04070a] border border-[#16212d] text-[#d1e1f5] overflow-x-auto whitespace-pre leading-relaxed">
{`+-----------------------------------------------------------------------------------+
| CLIENT / EDGE INGRESS LAYER                                                       |
| React 19 + PWA Offline Worker  <-->  WebRTC / TLS 1.3  <-->  Nginx API Gateway   |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
| APPLICATION MICROSERVICES (Fastify / TypeScript / Node.js)                         |
| • State Machine Orchestrator        • Semantic Anomaly Filter (ONNX)              |
| • FinOps Margin Guard (<15% alert)  • JSON Schema Compiler (AJV)                  |
+-----------------------------------------------------------------------------------+
                     |                                       |
                     v                                       v
+-----------------------------------+   +-------------------------------------------+
| ASYNC EVENT BUS (Redis Pub/Sub)   |   | PERSISTENCE & FINANCIAL LEDGER            |
| • Atomic Lua Mutex Locks (<2ms)   |   | • PostgreSQL 16 ACID Double-Entry Ledger  |
| • BullMQ Retry & DLQ Pipelines    |   | • PostGIS Geospatial Spatial Indexes      |
+-----------------------------------+   +-------------------------------------------+
                     |                                       |
                     +-------------------+-------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
| SECURITY PERIMETER & COMPLIANCE (AWS KMS + S3 Object Lock + V8 Isolates)          |
| • Ephemeral 60s Token Minters       • Merkle Root Audit Log (SHA-256)             |
+-----------------------------------------------------------------------------------+`}
            </div>
          </div>

          {/* Architectural Breakdown Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl border border-[#1e2d3d] bg-[#080d14] space-y-1.5">
              <span className="text-[#98cbff] font-bold uppercase block flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5" /> Frontend & Backend Stack
              </span>
              <p className="text-white"><strong>Frontend:</strong> {activeStudy.systemArchitecture.frontend}</p>
              <p className="text-white"><strong>Backend:</strong> {activeStudy.systemArchitecture.backend}</p>
            </div>

            <div className="p-4 rounded-xl border border-[#1e2d3d] bg-[#080d14] space-y-1.5">
              <span className="text-[#4edea3] font-bold uppercase block flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5" /> Database & Storage
              </span>
              <p className="text-white"><strong>Database:</strong> {activeStudy.systemArchitecture.database}</p>
              <p className="text-white"><strong>Queue:</strong> {activeStudy.systemArchitecture.eventQueueArchitecture}</p>
            </div>

            <div className="p-4 rounded-xl border border-[#1e2d3d] bg-[#080d14] space-y-1.5">
              <span className="text-[#ffb4ab] font-bold uppercase block flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" /> Security & Auth Perimeter
              </span>
              <p className="text-white"><strong>Auth:</strong> {activeStudy.systemArchitecture.authentication}</p>
              <p className="text-white"><strong>Infrastructure:</strong> {activeStudy.systemArchitecture.infrastructure}</p>
            </div>

            <div className="p-4 rounded-xl border border-[#1e2d3d] bg-[#080d14] space-y-1.5">
              <span className="text-[#f5a623] font-bold uppercase block flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5" /> AI & External APIs
              </span>
              <p className="text-white"><strong>External Services:</strong> {activeStudy.systemArchitecture.externalServices.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Sidebar: Hard Problems & Decision Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-4 font-mono text-xs">
            <span className="text-[#657a8e] uppercase block font-bold border-b border-[#1c2736] pb-2">
              Key Hard Problems Solved
            </span>

            {activeStudy.hardProblems.map((hp) => (
              <div key={hp.id} className="p-3 rounded-xl border border-[#1e2d3d] bg-[#080d14] space-y-1.5">
                <span className="text-white font-bold block">{hp.title}</span>
                <p className="text-[#4edea3] text-[11px]">{hp.solution}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#1e3b2e] bg-[#09140e]/90 p-5 space-y-3 font-mono text-xs">
            <span className="text-[#4edea3] uppercase block font-bold flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" /> FinOps Cost Guard
            </span>
            <p className="text-white">
              <strong>Cost per transaction:</strong> {activeStudy.finOps.costPerTransaction}
            </p>
            <p className="text-[#a3b1c2] text-[11px]">
              {activeStudy.finOps.costControls[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
