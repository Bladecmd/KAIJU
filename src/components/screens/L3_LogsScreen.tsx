import React, { useState, useRef, useEffect } from 'react';
import { LogItem, LogType } from '../../types';
import {
  Terminal,
  Filter,
  Download,
  Trash2,
  Copy,
  Check,
  Play,
  Pause,
  Search,
  Sparkles,
  Zap,
} from 'lucide-react';

interface L3LogsScreenProps {
  logs: LogItem[];
  onAddLog: (type: LogType, text: string, subtext?: string) => void;
  onClearLogs: () => void;
}

export const L3LogsScreen: React.FC<L3LogsScreenProps> = ({
  logs,
  onAddLog,
  onClearLogs,
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isPaused && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isPaused]);

  const handleCopyLogs = () => {
    const text = logs
      .map((l) => `[${l.time}] [${l.type}] ${l.text} ${l.subtext || ''}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kaiju_os_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const simulateLogBatch = () => {
    onAddLog('NET', 'Connecting to Frankfurt Node Cluster: SYNC_ACK');
    setTimeout(() => {
      onAddLog('DATA', 'Aggregating orderbook depth across 12 venues...');
      onAddLog('OK', 'Zero-knowledge settlement proofs verified: Block #9,481,209');
    }, 300);
  };

  const simulateAnomaly = () => {
    onAddLog('WARN', 'High latency detected on cross-connect route SG1 -> NY4 (182ms)');
    setTimeout(() => {
      onAddLog('SYSTEM', 'Automatic reroute trigger: Activating low-jitter backup fiber');
      onAddLog('OK', 'Latency dropped back to normal: 1.15ms');
    }, 600);
  };

  const filteredLogs = logs.filter((log) => {
    if (filterType !== 'ALL' && log.type !== filterType) return false;
    if (searchTerm) {
      const match =
        log.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.subtext && log.subtext.toLowerCase().includes(searchTerm.toLowerCase())) ||
        log.type.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  const categories: (LogType | 'ALL')[] = [
    'ALL',
    'BOOT',
    'AUTH',
    'NET',
    'DATA',
    'WARN',
    'OK',
    'SYSTEM',
    'CMD',
  ];

  return (
    <div id="screen-l3-logs" className="w-full space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono-tech text-[#4edea3] uppercase tracking-widest px-2 py-0.5 rounded bg-[#4edea3]/10 border border-[#4edea3]/20 font-semibold">
              L3 // STDOUT & EVENT STREAMS
            </span>
            <span className="text-xs font-mono-tech text-[#88919d]">
              RECORDS: {logs.length}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono-tech text-[#e5e2e1] tracking-tight">
            SYSTEM_STDOUT_PIPELINE
          </h2>
        </div>

        {/* Quick simulator triggers */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={simulateLogBatch}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-[#98cbff] px-3 py-1.5 rounded-xl text-xs font-mono-tech flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>INJECT_TICK_BATCH</span>
          </button>
          <button
            onClick={simulateAnomaly}
            className="bg-white/5 hover:bg-white/10 border border-[#ffb4ab]/30 text-[#ffb4ab] px-3 py-1.5 rounded-xl text-xs font-mono-tech flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIMULATE_ANOMALY</span>
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 text-[#88919d] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stdout messages..."
            className="w-full bg-black/60 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs font-mono-tech text-[#e5e2e1] focus:border-[#98cbff] focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-2.5 py-1 rounded text-xs font-mono-tech transition-all cursor-pointer ${
                filterType === cat
                  ? 'bg-[#98cbff] text-[#003354] font-bold shadow-[0_0_8px_rgba(152,203,255,0.4)]'
                  : 'bg-white/5 text-[#88919d] hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`p-2 rounded-lg border text-xs font-mono-tech flex items-center gap-1 cursor-pointer transition-colors ${
              isPaused
                ? 'border-[#4edea3]/40 bg-[#4edea3]/10 text-[#4edea3]'
                : 'border-white/10 bg-white/5 text-[#88919d] hover:text-white'
            }`}
            title={isPaused ? 'Resume auto-scroll' : 'Pause stream'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleCopyLogs}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-[#88919d] hover:text-white transition-colors cursor-pointer"
            title="Copy logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#4edea3]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleExportJSON}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-[#88919d] hover:text-white transition-colors cursor-pointer"
            title="Export JSON"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClearLogs}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-[#88919d] hover:text-[#ffb4ab] transition-colors cursor-pointer"
            title="Clear logs buffer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Terminal Window */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="bg-[#201f1f] px-6 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono-tech text-xs text-[#bec7d4]">
            <Terminal className="w-4 h-4 text-[#98cbff]" />
            <span>KAIJU_KERNEL_V2 // STDOUT BUFFER [RING_0]</span>
          </div>
          <span className="text-[11px] font-mono-tech text-[#4edea3]">
            {isPaused ? '● STREAM PAUSED' : '● STREAM ACTIVE'}
          </span>
        </div>

        <div
          ref={logContainerRef}
          className="p-6 font-mono-tech text-xs text-[#bec7d4] leading-relaxed h-[480px] overflow-y-auto space-y-1.5 bg-black/60 select-text"
        >
          {filteredLogs.length === 0 ? (
            <div className="text-center py-20 text-[#88919d]">
              No log messages matching filter criteria.
            </div>
          ) : (
            filteredLogs.map((log) => {
              let badgeColor = 'text-[#bec7d4]';
              if (log.type === 'BOOT' || log.type === 'OK') badgeColor = 'text-[#4edea3] font-bold';
              if (log.type === 'DATA') badgeColor = 'text-[#98cbff]';
              if (log.type === 'WARN' || log.type === 'ERROR') badgeColor = 'text-[#ffb4ab] font-bold';
              if (log.type === 'CMD') badgeColor = 'text-[#cfe5ff]';

              return (
                <div key={log.id} className="hover:bg-white/5 px-2 py-1 rounded transition-colors flex items-start gap-3">
                  <span className="text-[#88919d]/60 text-[11px] shrink-0">[{log.time}]</span>
                  <span className={`${badgeColor} shrink-0 w-16`}>[{log.type}]</span>
                  <div className="flex-1">
                    <span>{log.text}</span>
                    {log.subtext && (
                      <p className="text-[#88919d] text-[11px] mt-0.5 opacity-80">{log.subtext}</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div className="text-[#4edea3] flex items-center gap-1 pt-2">
            <span className="text-[11px] text-[#88919d]">kaiju@l3-flow:~$</span>
            <span className="cursor-blink font-bold">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};
