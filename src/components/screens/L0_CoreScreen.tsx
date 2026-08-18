import React, { useState, useEffect, useRef } from 'react';
import { LogItem } from '../../types';
import {
  Share2,
  Terminal,
  FileText,
  Layers,
  Sparkles,
  RefreshCw,
  Play,
  Pause,
  Filter,
  Send,
  Zap,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  Command,
} from 'lucide-react';

interface L0CoreScreenProps {
  logs: LogItem[];
  onAddLog: (type: LogItem['type'], text: string, subtext?: string) => void;
  onOpenArchitectureModal: () => void;
  onOpenDocsDrawer: () => void;
  onOpenCommandPalette: () => void;
  onSelectScreen: (screenId: any) => void;
  activeAutomationCount: number;
  setActiveAutomationCount: React.Dispatch<React.SetStateAction<number>>;
  complexityLevel: 'OPTIMAL' | 'HIGH_INTENSITY' | 'OVERCLOCK' | 'THROTTLED';
  setComplexityLevel: React.Dispatch<
    React.SetStateAction<'OPTIMAL' | 'HIGH_INTENSITY' | 'OVERCLOCK' | 'THROTTLED'>
  >;
}

export const L0CoreScreen: React.FC<L0CoreScreenProps> = ({
  logs,
  onAddLog,
  onOpenArchitectureModal,
  onOpenDocsDrawer,
  onOpenCommandPalette,
  onSelectScreen,
  activeAutomationCount,
  setActiveAutomationCount,
  complexityLevel,
  setComplexityLevel,
}) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [isLogPaused, setIsLogPaused] = useState(false);
  const [logFilter, setLogFilter] = useState<'ALL' | 'WARN' | 'DATA' | 'OK'>('ALL');
  const [uptimeDisplay, setUptimeDisplay] = useState(99.998);
  const terminalScrollRef = useRef<HTMLDivElement | null>(null);

  // Micro-fluctuation for uptime
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.5) * 0.002;
      setUptimeDisplay((prev) => Math.min(99.999, Math.max(99.991, Number((prev + delta).toFixed(3)))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal unless paused
  useEffect(() => {
    if (!isLogPaused && terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [logs, isLogPaused]);

  const handleExecuteCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    onAddLog('CMD', `Executing: ${cmd}`);
    setTerminalInput('');

    const lower = cmd.toLowerCase();
    if (lower === 'help') {
      setTimeout(() => {
        onAddLog('SYSTEM', 'Commands available: status, nodes, sensors, ping, clear, sync, deploy, arch, docs');
      }, 200);
    } else if (lower === 'status') {
      setTimeout(() => {
        onAddLog('OK', `L0_CORE OK | Complexity: ${complexityLevel} | Active Automations: ${activeAutomationCount}`);
      }, 250);
    } else if (lower === 'nodes') {
      onSelectScreen('NODES');
      onAddLog('NET', 'Routing viewport to L1_AUTO (NODES)...');
    } else if (lower === 'sensors') {
      onSelectScreen('SENSORS');
      onAddLog('NET', 'Routing viewport to L2_DATA (SENSORS)...');
    } else if (lower === 'ping') {
      setTimeout(() => {
        onAddLog('OK', `Cluster ping: 1.18ms | Jitter: 0.04ms | Region: US_EAST`);
      }, 150);
    } else if (lower === 'arch') {
      onOpenArchitectureModal();
    } else if (lower === 'docs') {
      onOpenDocsDrawer();
    } else if (lower.includes('sync')) {
      setTimeout(() => {
        onAddLog('DATA', 'Synchronizing high-frequency book with Sensor_09_JP...');
        onAddLog('OK', 'State reconciled with block hash 0x7f4...d89a');
      }, 400);
    } else {
      setTimeout(() => {
        onAddLog('DATA', `Command dispatched: ${cmd}`);
        onAddLog('OK', `Execution acknowledged with PID: ${Math.floor(Math.random() * 8000 + 1000)}`);
      }, 300);
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (logFilter === 'ALL') return true;
    if (logFilter === 'WARN') return log.type === 'WARN' || log.type === 'ERROR';
    if (logFilter === 'DATA') return log.type === 'DATA';
    if (logFilter === 'OK') return log.type === 'OK' || log.type === 'BOOT';
    return true;
  });

  return (
    <div id="screen-l0-core" className="w-full space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#4edea3]/10 border border-[#4edea3]/25 rounded-full shadow-[0_0_12px_rgba(78,222,163,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse shadow-[0_0_6px_#4edea3]" />
            <span className="font-mono-tech text-xs text-[#4edea3] tracking-widest uppercase font-semibold">
              SYSTEM BOOT SUCCESSFUL
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono-tech text-[#88919d]">
            <span>NODE_CLUSTER:</span>
            <span className="text-[#98cbff]">US-EAST-01</span>
          </div>

          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono-tech text-[#88919d]">
            <span>ENGINE:</span>
            <span className="text-[#4edea3]">V2.0.4-PROD</span>
          </div>
        </div>

        <h1 className="font-mono-tech text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold text-[#e5e2e1] tracking-tight leading-none text-glow select-none">
          PROJECT_KAIJU.OS<span className="text-[#98cbff] cursor-blink">_</span>
        </h1>

        <p className="font-sans text-base sm:text-lg md:text-xl text-[#88919d] max-w-3xl border-l-2 border-[#98cbff]/50 pl-5 sm:pl-6 leading-relaxed">
          Executive Automation & Systems Architecture. Bridging the gap between legacy financial logic and high-velocity autonomous operations.
        </p>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Mission (Spans 8) */}
        <div
          id="card-strategic-mission"
          className="md:col-span-8 glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between overflow-hidden relative group border border-white/10 transition-all duration-300"
        >
          {/* Cyber Hub Background Graphic */}
          <div className="absolute top-2 right-2 p-4 opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <Share2 className="w-32 h-32 text-[#98cbff] animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-[#98cbff]/20 animate-spin" style={{ animationDuration: '24s' }} />
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-xs text-[#88919d] uppercase tracking-widest block font-medium">
                01 // STRATEGIC MISSION
              </span>
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#98cbff]/10 text-[#98cbff] border border-[#98cbff]/20">
                CAPITAL_AUTONOMY
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#e5e2e1] tracking-tight">
              The Evolution of Capital Automation
            </h2>

            <p className="text-[#bec7d4] text-sm sm:text-base leading-relaxed max-w-xl">
              Kaiju OS is engineered to transition complex financial frameworks into modular, automated pipelines. By abstracting market volatility into predictable system nodes, we enable executive-level control over sprawling digital infrastructures.
            </p>
          </div>

          <div className="mt-8 pt-4 sm:pt-6 border-t border-white/5 flex flex-wrap gap-4 relative z-10">
            <button
              id="btn-view-architecture"
              onClick={onOpenArchitectureModal}
              className="bg-[#98cbff] text-[#003354] hover:bg-[#cfe5ff] px-6 py-2.5 font-mono-tech text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-[0_0_16px_rgba(152,203,255,0.3)] hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>VIEW_ARCHITECTURE</span>
            </button>
            <button
              id="btn-read-docs"
              onClick={onOpenDocsDrawer}
              className="border border-[#3f4852] text-[#e5e2e1] hover:bg-white/10 hover:border-white/30 px-6 py-2.5 font-mono-tech text-xs sm:text-sm rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#88919d]" />
              <span>READ_DOCS</span>
            </button>
          </div>
        </div>

        {/* Card 2: Core Metrics (Spans 4) */}
        <div
          id="card-core-metrics"
          className="md:col-span-4 glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-white/10"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono-tech text-xs text-[#88919d] uppercase tracking-widest block font-medium">
                02 // CORE METRICS
              </span>
              <button
                id="btn-metrics-detail"
                onClick={() => onSelectScreen('NODES')}
                className="text-[11px] font-mono-tech text-[#98cbff] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>DIAGNOSTICS</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-6">
              {/* UPTIME */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-mono-tech text-xs text-[#bec7d4]">UPTIME</span>
                  <span className="font-mono-tech text-sm text-[#4edea3] font-bold">
                    {uptimeDisplay.toFixed(3)}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div
                    className="h-full bg-[#4edea3] rounded-full transition-all duration-500 shadow-[0_0_8px_#4edea3]"
                    style={{ width: `${uptimeDisplay}%` }}
                  />
                </div>
              </div>

              {/* AUTOMATIONS SLOTS */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-mono-tech text-xs text-[#bec7d4]">AUTOMATIONS</span>
                  <span className="font-mono-tech text-sm text-[#98cbff] font-bold">
                    {activeAutomationCount} ACTIVE
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map((slot) => {
                    const isActive = slot <= activeAutomationCount;
                    return (
                      <button
                        key={slot}
                        onClick={() => {
                          setActiveAutomationCount(slot === activeAutomationCount ? slot - 1 : slot);
                          onAddLog('SYSTEM', `Automation workers pool updated to ${slot}`);
                        }}
                        title={`Worker slot ${slot} (${isActive ? 'Active' : 'Standby'}) - Click to toggle`}
                        className={`h-2.5 rounded-sm transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#98cbff] hover:bg-[#cfe5ff] shadow-[0_0_6px_rgba(152,203,255,0.5)]'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* SYSTEM COMPLEXITY */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono-tech text-xs text-[#bec7d4] block">
                    SYSTEM_COMPLEXITY
                  </span>
                  <button
                    onClick={() => {
                      const nextMap: Record<string, typeof complexityLevel> = {
                        OPTIMAL: 'HIGH_INTENSITY',
                        HIGH_INTENSITY: 'OVERCLOCK',
                        OVERCLOCK: 'THROTTLED',
                        THROTTLED: 'OPTIMAL',
                      };
                      const next = nextMap[complexityLevel];
                      setComplexityLevel(next);
                      onAddLog('WARN', `Complexity mode shifted to: ${next}`);
                    }}
                    className="text-[10px] font-mono-tech text-[#88919d] hover:text-[#e5e2e1] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 cursor-pointer"
                  >
                    CHANGE
                  </button>
                </div>
                <span
                  className={`font-mono-tech text-lg md:text-xl font-bold tracking-wider block ${
                    complexityLevel === 'HIGH_INTENSITY'
                      ? 'text-[#ffb4ab]'
                      : complexityLevel === 'OVERCLOCK'
                      ? 'text-[#f59e0b] animate-pulse'
                      : complexityLevel === 'OPTIMAL'
                      ? 'text-[#4edea3]'
                      : 'text-[#88919d]'
                  }`}
                >
                  {complexityLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-tech text-[#88919d]">
            <span>IOPS: 18.4K/s</span>
            <span className="text-[#4edea3]">● LIVE SYNC</span>
          </div>
        </div>

        {/* Card 3: Latest Log Terminal (Spans 6) */}
        <div
          id="card-terminal-stdout"
          className="md:col-span-6 glass-card p-0 rounded-2xl overflow-hidden border border-white/10 flex flex-col"
        >
          {/* Terminal Window Header */}
          <div className="bg-[#201f1f]/80 px-4 sm:px-6 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="font-mono-tech text-xs text-[#bec7d4] font-medium tracking-wide">
                TERMINAL_LOGS: STDOUT
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-black/40 rounded border border-white/10 p-0.5 text-[10px] font-mono-tech">
                {(['ALL', 'WARN', 'DATA', 'OK'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setLogFilter(f)}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${
                      logFilter === f ? 'bg-[#98cbff]/20 text-[#98cbff] font-bold' : 'text-[#88919d] hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsLogPaused(!isLogPaused)}
                className="text-[#88919d] hover:text-white p-1 rounded cursor-pointer"
                title={isLogPaused ? 'Resume stream' : 'Pause stream'}
              >
                {isLogPaused ? <Play className="w-3.5 h-3.5 text-[#4edea3]" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Terminal Logs Content Stream */}
          <div
            ref={terminalScrollRef}
            className="p-4 sm:p-6 font-mono-tech text-xs text-[#bec7d4] leading-relaxed h-60 overflow-y-auto space-y-1 bg-black/40 select-text"
          >
            {filteredLogs.map((log) => {
              let badgeColor = 'text-[#bec7d4]';
              if (log.type === 'BOOT' || log.type === 'OK') badgeColor = 'text-[#4edea3]';
              if (log.type === 'DATA') badgeColor = 'text-[#98cbff]';
              if (log.type === 'WARN' || log.type === 'ERROR') badgeColor = 'text-[#ffb4ab] font-bold';
              if (log.type === 'CMD') badgeColor = 'text-[#cfe5ff]';

              return (
                <div key={log.id} className="hover:bg-white/5 px-1 py-0.5 rounded transition-colors">
                  <span className="text-[#88919d]/70 text-[10px] mr-2">[{log.time}]</span>
                  <span className={badgeColor}>[{log.type}] </span>
                  <span>{log.text}</span>
                  {log.subtext && (
                    <p className="text-[#88919d] text-[11px] pl-4 opacity-75">{log.subtext}</p>
                  )}
                </div>
              );
            })}
            <div className="text-[#4edea3] flex items-center gap-1 pt-1">
              <span className="text-[10px] text-[#88919d]">kaiju@l0-core:~$</span>
              <span className="cursor-blink font-bold">_</span>
            </div>
          </div>

          {/* Interactive terminal command bar */}
          <form
            onSubmit={handleExecuteCommand}
            className="border-t border-white/5 bg-[#131313] px-4 py-2 flex items-center gap-2"
          >
            <span className="text-[#98cbff] font-mono-tech text-xs">&gt;</span>
            <input
              id="input-terminal-stdin"
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type command (e.g. status, ping, nodes, sync, help)..."
              className="bg-transparent border-none text-xs font-mono-tech text-[#e5e2e1] focus:ring-0 focus:outline-none flex-1 placeholder-[#88919d]/60"
            />
            <button
              type="submit"
              className="text-[#98cbff] hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
              title="Run command"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Card 4: Contact / Command Palette Interface (Spans 6) */}
        <div
          id="card-cmd-k-trigger"
          onClick={onOpenCommandPalette}
          className="md:col-span-6 glass-card p-6 sm:p-8 rounded-2xl flex items-center justify-center group cursor-pointer hover:border-[#98cbff]/50 transition-all duration-300 relative overflow-hidden"
        >
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 bg-[#98cbff]/0 group-hover:bg-[#98cbff]/5 transition-colors duration-300 pointer-events-none" />

          <div className="text-center relative z-10 py-4">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:border-[#98cbff]/50 group-hover:shadow-[0_0_24px_rgba(152,203,255,0.3)] transition-all duration-300">
              <Command className="text-[#98cbff] w-8 h-8 sm:w-10 sm:h-10 group-hover:text-white transition-colors" />
            </div>

            <h3 className="font-mono-tech text-xl sm:text-2xl text-[#e5e2e1] tracking-[0.2em] mb-2 uppercase font-bold group-hover:text-[#98cbff] transition-colors">
              CMD+K TO INTERFACE
            </h3>

            <p className="font-mono-tech text-xs text-[#88919d] uppercase tracking-widest opacity-80 flex items-center justify-center gap-2">
              <span>GLOBAL COMMAND PALETTE</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-white font-mono-tech">
                PRESS ⌘K
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
