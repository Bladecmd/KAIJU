import React, { useState } from 'react';
import { X, Zap, Cpu, Sparkles, CheckCircle2, Sliders } from 'lucide-react';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (name: string, layer: string, description: string) => void;
}

export const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  onDeploy,
}) => {
  const [pipelineName, setPipelineName] = useState('ALPHA_CROSS_MOMENTUM_V3');
  const [layer, setLayer] = useState('L1.07 // ALPHA_GEN');
  const [strategy, setStrategy] = useState('Cross-Exchange Spread Arb');
  const [memoryAlloc, setMemoryAlloc] = useState('512 MB');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onDeploy(pipelineName, layer, `${strategy} with ${memoryAlloc} ring buffer allocation.`);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div
      id="modal-deploy-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        id="modal-deploy-pipeline"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg glass-card rounded-2xl border border-[#4edea3]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#131313]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#4edea3]/20 border border-[#4edea3]/40">
              <Zap className="w-5 h-5 text-[#4edea3]" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono-tech text-[#e5e2e1]">
                DEPLOY_AUTONOMOUS_PIPELINE
              </h2>
              <p className="text-xs text-[#88919d] font-mono-tech">
                L1_AUTO EXECUTION WORKER ALLOCATION
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-black/50">
          <div>
            <label className="block text-xs font-mono-tech text-[#88919d] mb-1">
              PIPELINE_IDENTIFIER
            </label>
            <input
              type="text"
              value={pipelineName}
              onChange={(e) => setPipelineName(e.target.value)}
              required
              className="w-full bg-[#131313] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono-tech text-[#e5e2e1] focus:border-[#4edea3] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-tech text-[#88919d] mb-1">
                EXECUTION_LAYER
              </label>
              <select
                value={layer}
                onChange={(e) => setLayer(e.target.value)}
                className="w-full bg-[#131313] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono-tech text-[#e5e2e1] focus:border-[#4edea3]"
              >
                <option value="L1.07 // ALPHA_GEN">L1.07 // ALPHA_GEN</option>
                <option value="L1.08 // HEDGE_RISK">L1.08 // HEDGE_RISK</option>
                <option value="L1.09 // SETTLEMENT">L1.09 // SETTLEMENT</option>
                <option value="L1.10 // VOLATILITY">L1.10 // VOLATILITY</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono-tech text-[#88919d] mb-1">
                RING_MEMORY_ALLOCATION
              </label>
              <select
                value={memoryAlloc}
                onChange={(e) => setMemoryAlloc(e.target.value)}
                className="w-full bg-[#131313] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono-tech text-[#e5e2e1] focus:border-[#4edea3]"
              >
                <option value="256 MB">256 MB (Standard)</option>
                <option value="512 MB">512 MB (High Throughput)</option>
                <option value="1024 MB">1024 MB (Max IOPS)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-tech text-[#88919d] mb-1">
              STRATEGY_TEMPLATES
            </label>
            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="w-full bg-[#131313] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono-tech text-[#e5e2e1] focus:border-[#4edea3]"
            >
              <option value="Cross-Exchange Spread Arb">Cross-Exchange Spread Arb (Sub-1ms)</option>
              <option value="Delta Neutral Tail Risk Collar">Delta Neutral Tail Risk Collar</option>
              <option value="Multi-Venue Liquidity Ingestion">Multi-Venue Liquidity Ingestion</option>
              <option value="Atomic DEX/CEX Clearing Gateway">Atomic DEX/CEX Clearing Gateway</option>
            </select>
          </div>

          <div className="p-3 bg-[#4edea3]/10 border border-[#4edea3]/20 rounded-xl text-xs font-mono-tech text-[#4edea3] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Pre-compiled deterministic WebAssembly worker binary ready.</span>
          </div>

          {/* Submit */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono-tech text-[#88919d] hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#4edea3] text-[#003824] hover:brightness-110 px-5 py-2 rounded-xl text-xs font-mono-tech font-bold transition-all shadow-[0_0_12px_rgba(78,222,163,0.3)] cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'PROVISIONING...' : 'INITIATE_DEPLOYMENT'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
