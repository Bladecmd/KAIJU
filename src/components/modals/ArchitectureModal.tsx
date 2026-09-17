import React from 'react';
import { X, Layers, Boxes, Cpu, Database, GitFork, Fingerprint, Shield, Zap, ArrowDown } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const layers = [
    {
      level: 'L0_EXEC',
      name: 'EXECUTIVE PRODUCER & STRATEGIC INTENT',
      color: 'border-[#98cbff] bg-[#98cbff]/5 text-[#98cbff]',
      description:
        'Human systems architect (Blade) establishes domain models, operational objectives, safety perimeters, unit economics, and state machine constraints.',
      tech: ['Systems Architecture', 'FinOps Margins', 'Boundary Definitions'],
    },
    {
      level: 'L1_COGNITIVE',
      name: 'NOVA COGNITIVE & ATTENTION ORCHESTRATION',
      color: 'border-[#4edea3] bg-[#4edea3]/5 text-[#4edea3]',
      description:
        'Context assembly, tiered memory retrieval, multi-agent dispatch, and token economy optimizer. Operates with strict degraded-mode safety envelopes.',
      tech: ['Model Gateway', 'Episodic Memory', 'Context Compaction'],
    },
    {
      level: 'L2_SECURITY',
      name: 'SOVEREIGN DEFENSIVE & ZERO-TRUST GATEWAY',
      color: 'border-[#ffb4ab] bg-[#ffb4ab]/5 text-[#ffb4ab]',
      description:
        'Prompt injection firewalls, egress token sanitizers, HMAC authentication, V8 isolate sandboxing, and immutable tamper-evident audit logging.',
      tech: ['Zero-Trust Egress', 'Threat Sanitizers', 'Hardware FIDO2 Quorum'],
    },
    {
      level: 'L3_VENTURES',
      name: 'MULTI-VENTURE OPERATIONAL RUNTIMES',
      color: 'border-[#cfe5ff] bg-[#cfe5ff]/5 text-[#cfe5ff]',
      description:
        'Autonomous venture engines: Metro Task Force (emergency drainage dispatch & pricing), Compliance Labs (brokerage checks), and AudioBlue (DSP pipelines).',
      tech: ['PostgreSQL ACID Ledger', 'Fastify / Node.js', 'Redis State Engine'],
    },
    {
      level: 'L4_SOVEREIGN_OS',
      name: 'SOVEREIGN OS CENTRAL TRUTH LEDGER & GOVERNANCE',
      color: 'border-[#8f92ff] bg-[#8f92ff]/5 text-[#8f92ff]',
      description:
        'Consolidated cross-venture ledger, telemetry aggregation, cash flow attribution, and GriDD Corp legal/capital asset governance.',
      tech: ['Truth Ledger', 'Merkle Audit Root', 'Double-Entry Accounting'],
    },
  ];

  return (
    <div
      id="modal-architecture-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="modal-architecture"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] glass-card rounded-2xl border border-white/15 overflow-hidden flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.9)]"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#131313]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#98cbff]/20 border border-[#98cbff]/40">
              <Layers className="w-5 h-5 text-[#98cbff]" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-mono-tech text-[#e5e2e1] tracking-tight">
                SYSTEMS_ARCHITECTURE_BLUEPRINT
              </h2>
              <p className="text-xs text-[#88919d] font-mono-tech">
                SOVEREIGN ECOSYSTEM // 5-TIER AUTONOMOUS STACK
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

        {/* Blueprint content */}
        <div className="p-6 overflow-y-auto space-y-6 bg-black/40">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-[#bec7d4] leading-relaxed">
            <span className="text-[#98cbff] font-bold font-mono-tech block mb-1">
              ARCHITECTURAL THESIS:
            </span>
            The Sovereign Ecosystem is architected around strict separation of concerns across 5 discrete, fault-isolated tiers. Strategic intent and boundaries originate with the human producer (L0), orchestrated through cognitive reasoning (L1 NOVA) and defensive firewalls (L2 Sovereign Security), executing in real-world venture runtimes (L3 MTF / Compliance Labs), and settling into an immutable cross-venture Truth Ledger (L4 Sovereign OS).
          </div>

          {/* Layer Cards */}
          <div className="space-y-4">
            {layers.map((layer, index) => (
              <div key={layer.level} className="space-y-2">
                <div
                  className={`p-5 rounded-xl border ${layer.color} transition-all hover:scale-[1.01]`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono-tech text-xs font-bold px-2 py-0.5 rounded bg-black/40 border border-white/10">
                      {layer.level}
                    </span>
                    <h3 className="font-mono-tech text-sm sm:text-base font-bold text-[#e5e2e1]">
                      {layer.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#bec7d4] leading-relaxed mb-3">
                    {layer.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono-tech text-[#88919d]">
                      COMPONENTS:
                    </span>
                    {layer.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[#e5e2e1]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {index < layers.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowDown className="w-4 h-4 text-[#88919d]/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#131313] border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-[#88919d]">
          <span>VERIFIED BY ADM_KAIJU // SEC_CERT_V2</span>
          <button
            onClick={onClose}
            className="bg-[#98cbff] text-[#003354] px-4 py-1.5 rounded-lg font-bold hover:bg-[#cfe5ff] transition-all cursor-pointer"
          >
            CLOSE_BLUEPRINT
          </button>
        </div>
      </div>
    </div>
  );
};
