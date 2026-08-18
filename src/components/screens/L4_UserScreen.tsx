import React, { useState } from 'react';
import {
  Fingerprint,
  Shield,
  Key,
  Lock,
  Cpu,
  RefreshCw,
  Copy,
  Check,
  Power,
  Sliders,
  SlidersHorizontal,
  Bell,
  Eye,
  AlertTriangle,
} from 'lucide-react';

interface L4UserScreenProps {
  onAddLog: (type: any, text: string, subtext?: string) => void;
  onOpenPowerModal: () => void;
}

export const L4UserScreen: React.FC<L4UserScreenProps> = ({
  onAddLog,
  onOpenPowerModal,
}) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [soundFeedback, setSoundFeedback] = useState(true);
  const [telemetryRate, setTelemetryRate] = useState('1000ms');
  const [twoFactorActive, setTwoFactorActive] = useState(true);

  const apiKey = 'kj_live_99a8f2c0192e448b11c009d7';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    onAddLog('OK', 'API Key copied to system clipboard.');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRotateKeys = () => {
    onAddLog('AUTH', 'Rotating ADM_KAIJU cryptographic credentials...');
    setTimeout(() => {
      onAddLog('OK', 'New session keypair derived via ED25519 curve.');
    }, 500);
  };

  return (
    <div id="screen-l4-user" className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono-tech text-[#98cbff] uppercase tracking-widest px-2 py-0.5 rounded bg-[#98cbff]/10 border border-[#98cbff]/20 font-semibold">
              L4 // SECURITY & ARCHITECTURE ACCESS
            </span>
            <span className="text-xs font-mono-tech text-[#4edea3]">
              STATUS: AUTHENTICATED
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono-tech text-[#e5e2e1] tracking-tight">
            EXECUTIVE_ACCESS_PORTAL
          </h2>
        </div>

        <button
          onClick={onOpenPowerModal}
          className="bg-white/5 hover:bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 text-[#ffb4ab] px-4 py-2 rounded-xl text-xs font-mono-tech flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Power className="w-4 h-4" />
          <span>REBOOT_OR_TERMINATE_CLUSTER</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-6 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#00a3ff]/20 border border-[#00a3ff]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,163,255,0.3)]">
              <Fingerprint className="w-9 h-9 text-[#98cbff]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-mono-tech text-[#e5e2e1]">
                  ADM_KAIJU
                </h3>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30 font-bold">
                  LEVEL_0_SUPERUSER
                </span>
              </div>
              <p className="text-xs text-[#88919d] font-mono-tech mt-1">
                SESSION_ID: #882-990-KAIJU-OS
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/5 font-mono-tech text-xs">
            <div className="flex justify-between items-center text-[#88919d]">
              <span>ACCESS_TIER</span>
              <span className="text-[#e5e2e1]">EXECUTIVE_ADMIN [ROOT]</span>
            </div>
            <div className="flex justify-between items-center text-[#88919d]">
              <span>CRYPTOGRAPHIC_KEYRING</span>
              <span className="text-[#4edea3]">ED25519 / FIDO2_HW</span>
            </div>
            <div className="flex justify-between items-center text-[#88919d]">
              <span>CLUSTER_AUTHORITY</span>
              <span className="text-[#98cbff]">GLOBAL_AUTONOMOUS</span>
            </div>
            <div className="flex justify-between items-center text-[#88919d]">
              <span>ENCRYPTION_PROTOCOL</span>
              <span className="text-[#e5e2e1]">AES-256-GCM + ZK-SNARK</span>
            </div>
          </div>
        </div>

        {/* API Credentials */}
        <div className="md:col-span-6 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono-tech text-[#88919d] tracking-widest uppercase block mb-4">
              API CREDENTIALS & INGESTION KEYS
            </span>
            <p className="text-xs text-[#bec7d4] mb-4">
              Direct WebSocket and gRPC endpoint authentication keys for programmatic pipeline triggers.
            </p>

            <div className="p-3 bg-black/60 rounded-xl border border-white/10 font-mono-tech text-xs text-[#98cbff] flex items-center justify-between gap-2 mb-4">
              <span className="truncate">{apiKey}</span>
              <button
                onClick={handleCopyKey}
                className="p-1.5 hover:bg-white/10 rounded text-[#88919d] hover:text-white transition-colors cursor-pointer"
                title="Copy API Key"
              >
                {copiedKey ? <Check className="w-4 h-4 text-[#4edea3]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex gap-3">
            <button
              onClick={handleRotateKeys}
              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-[#e5e2e1] py-2 rounded-xl text-xs font-mono-tech flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ROTATE_KEYPAIR</span>
            </button>
          </div>
        </div>

        {/* System Engine Settings */}
        <div className="md:col-span-12 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <span className="text-xs font-mono-tech text-[#88919d] tracking-widest uppercase block">
            CORE OPERATING SYSTEM PREFERENCES
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Setting 1 */}
            <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs font-bold text-[#e5e2e1]">
                  HAPTIC_AUDIO_SIM
                </span>
                <input
                  type="checkbox"
                  checked={soundFeedback}
                  onChange={(e) => {
                    setSoundFeedback(e.target.checked);
                    onAddLog('SYSTEM', `Audio simulation: ${e.target.checked ? 'ENABLED' : 'DISABLED'}`);
                  }}
                  className="rounded bg-black border-white/20 text-[#98cbff] focus:ring-0 cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-[#88919d]">
                Simulate low-frequency mechanical feedback upon pipeline triggers.
              </p>
            </div>

            {/* Setting 2 */}
            <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs font-bold text-[#e5e2e1]">
                  TELEMETRY_SAMPLE_RATE
                </span>
                <span className="text-xs font-mono-tech text-[#4edea3]">{telemetryRate}</span>
              </div>
              <select
                value={telemetryRate}
                onChange={(e) => {
                  setTelemetryRate(e.target.value);
                  onAddLog('SYSTEM', `Telemetry rate adjusted to ${e.target.value}`);
                }}
                className="w-full bg-black/80 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono-tech text-[#e5e2e1] focus:border-[#98cbff]"
              >
                <option value="500ms">500ms (High Fidelity)</option>
                <option value="1000ms">1000ms (Optimal)</option>
                <option value="5000ms">5000ms (Eco Mode)</option>
              </select>
            </div>

            {/* Setting 3 */}
            <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs font-bold text-[#e5e2e1]">
                  2FA_HARDWARE_LOCK
                </span>
                <span className="text-xs font-mono-tech text-[#4edea3]">ENFORCED</span>
              </div>
              <p className="text-[11px] text-[#88919d]">
                Hardware security keys strictly required for all automated treasury movements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
