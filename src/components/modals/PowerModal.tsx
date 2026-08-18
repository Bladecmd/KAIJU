import React, { useState } from 'react';
import { X, Power, RotateCw, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

interface PowerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReboot: () => void;
}

export const PowerModal: React.FC<PowerModalProps> = ({
  isOpen,
  onClose,
  onReboot,
}) => {
  const [isRebooting, setIsRebooting] = useState(false);

  if (!isOpen) return null;

  const handleTriggerReboot = () => {
    setIsRebooting(true);
    setTimeout(() => {
      onReboot();
      setIsRebooting(false);
      onClose();
    }, 1500);
  };

  return (
    <div
      id="modal-power-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        id="modal-power-action"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md glass-card rounded-2xl border border-[#ffb4ab]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#131313]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#ffb4ab]/20 border border-[#ffb4ab]/40">
              <Power className="w-5 h-5 text-[#ffb4ab]" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono-tech text-[#e5e2e1]">
                SYSTEM_POWER_CONTROL
              </h2>
              <p className="text-xs text-[#88919d] font-mono-tech">
                KERNEL REBOOT & CACHE PURGE
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

        <div className="p-6 space-y-4 bg-black/40">
          <div className="p-4 rounded-xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#ffb4ab] shrink-0 mt-0.5" />
            <div className="text-xs font-mono-tech text-[#ffb4ab]">
              <p className="font-bold mb-1">EXECUTIVE NOTICE:</p>
              <p className="text-[#bec7d4]">
                Rebooting will safely flush volatile ring buffers, verify cryptographic signatures with cluster peers, and re-establish all 6 exchange direct cross-connects.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs font-mono-tech text-[#bec7d4]">
            <div className="flex justify-between">
              <span className="text-[#88919d]">TARGET_CLUSTER:</span>
              <span className="text-[#98cbff]">US-EAST-01 // PROD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#88919d]">DRAIN_IN_FLIGHT_ORDERS:</span>
              <span className="text-[#4edea3]">ENABLED (GRACEFUL)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#88919d]">ESTIMATED_RE-SYNC:</span>
              <span>1.2 SECONDS</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono-tech text-[#88919d] hover:text-white transition-colors"
            >
              ABORT
            </button>
            <button
              onClick={handleTriggerReboot}
              disabled={isRebooting}
              className="bg-[#ffb4ab] text-[#690005] hover:brightness-110 px-5 py-2 rounded-xl text-xs font-mono-tech font-bold transition-all shadow-[0_0_12px_rgba(255,180,171,0.3)] cursor-pointer flex items-center gap-2"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRebooting ? 'animate-spin' : ''}`} />
              <span>{isRebooting ? 'REBOOTING_CORE...' : 'EXECUTE_GRACEFUL_REBOOT'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
