import React, { useState } from 'react';
import { X, BookOpen, Search, Code, ShieldCheck, Terminal, Zap, ChevronRight } from 'lucide-react';

interface DocsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsDrawer: React.FC<DocsDrawerProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [docSearch, setDocSearch] = useState('');

  if (!isOpen) return null;

  const sections = [
    { id: 'intro', title: '01. The Producer Model & Intent' },
    { id: 'nova', title: '02. NOVA Cognitive Architecture' },
    { id: 'security', title: '03. Sovereign Security Perimeter' },
    { id: 'mtf', title: '04. Metro Task Force State Machine' },
    { id: 'ledger', title: '05. Sovereign OS Truth Ledger' },
  ];

  return (
    <div
      id="drawer-docs-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
    >
      <div
        id="drawer-docs"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl h-full bg-[#131313] border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0e0e0e]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#98cbff]/10 border border-[#98cbff]/20">
              <BookOpen className="w-5 h-5 text-[#98cbff]" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono-tech text-[#e5e2e1]">
                KAIJU_OS // SYSTEMS_DOCS
              </h2>
              <p className="text-xs text-[#88919d] font-mono-tech">
                SOVEREIGN ECOSYSTEM ENGINEERING SPECIFICATIONS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#88919d] hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="p-4 border-b border-white/5 bg-black/40 flex gap-2 overflow-x-auto">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech whitespace-nowrap transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-[#98cbff] text-[#003354] font-bold shadow-[0_0_8px_rgba(152,203,255,0.4)]'
                  : 'bg-white/5 text-[#88919d] hover:text-white'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>

        {/* Doc content body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-[#bec7d4] text-sm leading-relaxed font-sans">
          {activeSection === 'intro' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono-tech text-[#e5e2e1]">
                The Producer Model: Human Intent & AI Acceleration
              </h3>
              <p>
                In high-velocity AI-native software engineering, human developers do not manually type routine boilerplates. The producer (Blade) defines the problem space, operational requirements, unit margin economics, system state machine boundaries, and verification criteria.
              </p>
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2 font-mono-tech text-xs">
                <span className="text-[#4edea3] font-bold block">OPERATING PRINCIPLES:</span>
                <p>• Human architect strictly owns boundary definition, system topology, and security rules.</p>
                <p>• AI agents (Gemini, Claude, deep research workers) accelerate code drafting and test suite generation.</p>
                <p>• Mandatory human verification before deployment; zero unvetted autonomous self-modifying execution in production.</p>
              </div>
            </div>
          )}

          {activeSection === 'nova' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono-tech text-[#e5e2e1]">
                NOVA Executive Intelligence & Model Gateway
              </h3>
              <p>
                NOVA functions as Blade's cognitive companion and task broker. Rather than exposing unmetered LLM access, NOVA sits behind a resilient model gateway with automatic provider fallback, semantic attention pruning, and isolated memory partitions.
              </p>
              <div className="space-y-2 font-mono-tech text-xs bg-black/40 p-4 rounded-xl border border-white/10">
                <span className="text-[#98cbff] font-bold block">NOVA CORE ATTRIBUTES:</span>
                <p><span className="text-[#4edea3]">[GATEWAY]</span> Dynamic routing between Anthropic, Google Gemini, and local Ollama models.</p>
                <p><span className="text-[#4edea3]">[MEMORY]</span> Tiered cache: Ephemeral context, SQLite episodic journal, pgvector semantic store.</p>
                <p><span className="text-[#4edea3]">[DEGRADED]</span> Offline deterministic rule-based mode when external APIs suffer outage or latency spike.</p>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono-tech text-[#e5e2e1]">
                Sovereign Security: Zero-Trust & Defensive Guardrails
              </h3>
              <p>
                Defensive layer enforcing strict zero-trust boundaries across all human and agent interactions. Implements semantic prompt injection firewalls, canary tokens, and sandboxed execution environments.
              </p>
              <div className="p-4 bg-black/40 rounded-xl border border-white/10 font-mono-tech text-xs space-y-2">
                <span className="text-[#ffb4ab] font-bold block">DEFENSIVE CONTROLS:</span>
                <p>• Bidirectional token sanitizer: removes private keys, tokens, and PII before sending context to LLMs.</p>
                <p>• V8 Isolate sandboxes for any dynamic script or automation evaluation.</p>
                <p>• Hardware FIDO2 auth requirement for privileged operations and infrastructure mutations.</p>
              </div>
            </div>
          )}

          {activeSection === 'mtf' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono-tech text-[#e5e2e1]">
                Metro Task Force: Real-World Field Service Dispatch
              </h3>
              <p>
                Operational field-service platform operating in Greater London for commercial and residential emergency drainage. Features dynamic pricing engines, automated contractor job matching, and SMS/WhatsApp job status transitions.
              </p>
              <div className="bg-black/60 p-4 rounded-xl border border-white/10 font-mono-tech text-xs space-y-2 text-[#e5e2e1]">
                <p><span className="text-[#98cbff]">• State Machine:</span> Deterministic status transitions (QUOTE_REQUESTED &rarr; DEPOSIT_PAID &rarr; DISPATCHED &rarr; EN_ROUTE &rarr; ON_SITE &rarr; RESOLVED &rarr; INVOICED).</p>
                <p><span className="text-[#98cbff]">• FinOps Margin Guard:</span> Minimum 35% net margin enforced on every emergency quotation.</p>
                <p><span className="text-[#98cbff]">• High-Availability:</span> 99.9% uptime SLA with offline PWA field client capabilities.</p>
              </div>
            </div>
          )}

          {activeSection === 'ledger' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono-tech text-[#e5e2e1]">
                Sovereign OS: Consolidated Multi-Venture Truth Ledger
              </h3>
              <p>
                The central operational orchestration ledger consolidating cash flow, asset governance, and runtime telemetry across MTF, Compliance Labs, and AudioBlue under GriDD Corp capital management.
              </p>
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono-tech text-xs space-y-2">
                <span className="text-[#4edea3] font-bold block">DOUBLE-ENTRY ACID ASSURANCE:</span>
                <p>All financial movements across ventures are recorded with strict double-entry invariants, verified against cryptographic checksums, eliminating reconciliation discrepancies.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0e0e0e] border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-[#88919d]">
          <span>KAIJU_OS // DOCS_VERSION 2.5.0</span>
          <button
            onClick={onClose}
            className="bg-[#98cbff] text-[#003354] px-4 py-1.5 rounded-lg font-bold hover:bg-[#cfe5ff] transition-all cursor-pointer"
          >
            DISMISS_DOCS
          </button>
        </div>
      </div>
    </div>
  );
};
