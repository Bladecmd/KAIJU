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
    { id: 'intro', title: '01. Executive Overview & Thesis' },
    { id: 'pipelines', title: '02. Automation Pipelines & Nodes' },
    { id: 'telemetry', title: '03. Sensor Feeds & Low-Latency Routing' },
    { id: 'cli', title: '04. Terminal CLI & STDOUT Protocol' },
    { id: 'api', title: '05. High-Frequency WebSocket & gRPC API' },
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
                KAIJU_OS // EXECUTIVE_DOCS
              </h2>
              <p className="text-xs text-[#88919d] font-mono-tech">
                SYSTEM SPECIFICATIONS & ARCHITECTURE MANUAL
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
                The Strategic Mandate for Capital Autonomy
              </h3>
              <p>
                In high-velocity institutional markets, human operational reaction times (150ms+) introduce insurmountable slippage and risk exposure. KAIJU OS was architected to abstract legacy transactional logic into deterministic execution graphs.
              </p>
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2 font-mono-tech text-xs">
                <span className="text-[#4edea3] font-bold block">CORE PERFORMANCE PRINCIPLES:</span>
                <p>• Zero runtime garbage collection via pre-allocated memory rings.</p>
                <p>• Lock-free single-writer messaging pipelines (LMAX Disruptor pattern).</p>
                <p>• Kernel-bypass raw socket ingestion over direct dark fiber connections.</p>
              </div>
              <p>
                By continuous monitoring of the 6 primary global telemetry nodes, the operating system dynamically allocates worker threads to capture arbitrage opportunities before liquidity pools rebalance.
              </p>
            </div>
          )}

          {activeSection === 'pipelines' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono-tech text-[#e5e2e1]">
                Autonomous Pipelines & Dynamic Hedging
              </h3>
              <p>
                Execution workers (L1) run isolated in dedicated hyper-threads. Each worker is bound to a specific financial mandate (e.g. Delta-Neutral Collar, Statistical Spread Inversion, High-Frequency Cross-Venue Clearing).
              </p>
              <div className="space-y-2 font-mono-tech text-xs bg-black/40 p-4 rounded-xl border border-white/10">
                <span className="text-[#98cbff] font-bold block">PIPELINE TOPOLOGY:</span>
                <p><span className="text-[#4edea3]">[L1.01]</span> Liquidity Arb Router - Sub-1ms Spread Arbitrage</p>
                <p><span className="text-[#4edea3]">[L1.02]</span> Hedge Protocol Sentinel - Dynamic Tail-Risk Collars</p>
                <p><span className="text-[#4edea3]">[L1.03]</span> Market Inefficiency Hunter - Alpha Generation Ingester</p>
                <p><span className="text-[#4edea3]">[L1.04]</span> Cross-Venue Settlement GW - Atomic Clearing Gateway</p>
              </div>
            </div>
          )}

          {activeSection === 'telemetry' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono-tech text-[#e5e2e1]">
                Global Sensor Nodes & Failover Logic
              </h3>
              <p>
                Sensor nodes situated in Tokyo (TY3), New York (NY4), London (LD4), and Frankfurt (FR2) stream orderbook depth deltas directly into the L0 core.
              </p>
              <div className="p-4 bg-black/40 rounded-xl border border-white/10 font-mono-tech text-xs space-y-2">
                <span className="text-[#ffb4ab] font-bold block">FAILOVER PROTOCOL:</span>
                <p>If packet jitter exceeds 0.50ms on any primary route, the L0 state engine immediately reroutes outbound orders through an adjacent low-latency relay without halting active execution streams.</p>
              </div>
            </div>
          )}

          {activeSection === 'cli' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono-tech text-[#e5e2e1]">
                Terminal CLI Reference
              </h3>
              <p>
                The L0 terminal supports rapid command execution directly within the STDOUT stdout card.
              </p>
              <div className="bg-black/60 p-4 rounded-xl border border-white/10 font-mono-tech text-xs space-y-2 text-[#e5e2e1]">
                <p><span className="text-[#98cbff]">status</span> - Output current engine health, active workers, complexity</p>
                <p><span className="text-[#98cbff]">nodes</span> - Switch viewport to L1_AUTO pipelines</p>
                <p><span className="text-[#98cbff]">sensors</span> - Switch viewport to L2_DATA radar map</p>
                <p><span className="text-[#98cbff]">ping</span> - Trigger microsecond roundtrip ping to cluster</p>
                <p><span className="text-[#98cbff]">sync</span> - Synchronize market liquidity indices with Tokyo/NY</p>
                <p><span className="text-[#98cbff]">arch</span> - Open architecture blueprints</p>
                <p><span className="text-[#98cbff]">docs</span> - Open this executive documentation drawer</p>
              </div>
            </div>
          )}

          {activeSection === 'api' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono-tech text-[#e5e2e1]">
                Programmatic Ingestion Specs
              </h3>
              <p>
                External algorithmic entities can stream state transitions directly via standard WebSocket frames with authentication headers.
              </p>
              <pre className="bg-black/80 p-4 rounded-xl border border-white/10 font-mono-tech text-xs text-[#98cbff] overflow-x-auto">
{`// Connect to L0 Core WebSocket
const socket = new WebSocket('wss://api.kaiju-os.internal/v2/stream', {
  headers: {
    'Authorization': 'Bearer kj_live_99a8f2c0192e448b11c009d7',
    'X-Kaiju-Layer': 'L1_EXECUTION'
  }
});

socket.on('tick', (payload) => {
  // Sub-millisecond tick ingest
  processOrderbookDelta(payload);
});`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0e0e0e] border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-[#88919d]">
          <span>KAIJU_OS // DOCS_VERSION 2.0.4</span>
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
