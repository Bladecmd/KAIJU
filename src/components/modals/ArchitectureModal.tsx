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
      level: 'L0_CORE',
      name: 'EXECUTIVE KERNEL & CONTROL PLANE',
      color: 'border-[#98cbff] bg-[#98cbff]/5 text-[#98cbff]',
      description:
        'State reconciliation engine and master synchronization loop. Dispatches macro execution mandates and maintains strict delta-neutral risk envelopes.',
      tech: ['Rust Kernel', 'Deterministic State Ring', 'Low-Jitter IPC'],
    },
    {
      level: 'L1_AUTO',
      name: 'AUTONOMOUS EXECUTION PIPELINES',
      color: 'border-[#4edea3] bg-[#4edea3]/5 text-[#4edea3]',
      description:
        'Sub-millisecond smart order routing, statistical arbitrage hunters, and automated dynamic hedging options collars with sub-1ms execution.',
      tech: ['FPGA Accelerated', 'C++ Market Ingestion', 'Direct Co-Location'],
    },
    {
      level: 'L2_DATA',
      name: 'GLOBAL LOW-LATENCY SENSOR RADAR',
      color: 'border-[#cfe5ff] bg-[#cfe5ff]/5 text-[#cfe5ff]',
      description:
        'Direct exchange cross-connects situated across Tokyo (TY3), New York (NY4), London (LD4), Frankfurt (FR2), and Singapore (SG1).',
      tech: ['Dark Fiber Relays', 'Solarflare OpenOnload', 'Kernel Bypass UDP'],
    },
    {
      level: 'L3_FLOW',
      name: 'ZERO-KNOWLEDGE SETTLEMENT & STDOUT RING',
      color: 'border-[#8f92ff] bg-[#8f92ff]/5 text-[#8f92ff]',
      description:
        'Cryptographic batch settlement with succinct zero-knowledge proofs. Real-time audit trails and high-throughput memory-mapped ring logging.',
      tech: ['ZK-SNARK Prover', 'Ring Buffer stdout', 'Immutable Telemetry Log'],
    },
    {
      level: 'L4_USER',
      name: 'CRYPTOGRAPHIC ACCESS & HARDWARE AUTH',
      color: 'border-[#ffb4ab] bg-[#ffb4ab]/5 text-[#ffb4ab]',
      description:
        'Executive superuser verification via FIDO2 hardware tokens and ED25519 multi-signature quorum for structural parameter changes.',
      tech: ['FIDO2 Security Key', 'ED25519 Curve', 'Multi-Party Quorum'],
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
                KAIJU_OS // 5-LAYER EXECUTIVE STACK
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
            KAIJU OS is structured around strict separation of concerns across 5 discrete, fault-isolated tiers. By isolating executive risk enforcement (L0) from low-level high-frequency socket routines (L2), the system guarantees sub-millisecond execution without risking systemic capital contagion.
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
