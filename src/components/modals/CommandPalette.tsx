import React, { useState, useEffect, useRef } from 'react';
import { ScreenId } from '../../types';
import {
  Command,
  Search,
  Boxes,
  Cpu,
  Database,
  GitFork,
  Fingerprint,
  Layers,
  FileText,
  RotateCw,
  Zap,
  ShieldAlert,
  ArrowRight,
  Terminal,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenArchitectureModal: () => void;
  onOpenDocsDrawer: () => void;
  onAddLog: (type: any, text: string, subtext?: string) => void;
  onOpenDeployModal: () => void;
  onOpenPowerModal: () => void;
}

interface PaletteAction {
  id: string;
  category: 'NAVIGATION' | 'ACTIONS' | 'SYSTEM' | 'DOCS';
  label: string;
  sublabel?: string;
  shortcut?: string;
  icon: React.ReactNode;
  perform: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectScreen,
  onOpenArchitectureModal,
  onOpenDocsDrawer,
  onAddLog,
  onOpenDeployModal,
  onOpenPowerModal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const actions: PaletteAction[] = [
    {
      id: 'nav-system',
      category: 'NAVIGATION',
      label: 'Switch to L0_CORE (SYSTEM)',
      sublabel: 'Executive Overview and System Metrics',
      shortcut: '1',
      icon: <Boxes className="w-4 h-4 text-[#98cbff]" />,
      perform: () => {
        onSelectScreen('SYSTEM');
        onClose();
      },
    },
    {
      id: 'nav-nodes',
      category: 'NAVIGATION',
      label: 'Switch to L1_AUTO (NODES)',
      sublabel: 'Execution Pipelines & Worker Nodes',
      shortcut: '2',
      icon: <Cpu className="w-4 h-4 text-[#4edea3]" />,
      perform: () => {
        onSelectScreen('NODES');
        onClose();
      },
    },
    {
      id: 'nav-sensors',
      category: 'NAVIGATION',
      label: 'Switch to L2_DATA (SENSORS)',
      sublabel: 'Global Radar & Low-Latency Feeds',
      shortcut: '3',
      icon: <Database className="w-4 h-4 text-[#98cbff]" />,
      perform: () => {
        onSelectScreen('SENSORS');
        onClose();
      },
    },
    {
      id: 'nav-logs',
      category: 'NAVIGATION',
      label: 'Switch to L3_FLOW (LOGS)',
      sublabel: 'High-Throughput STDOUT Ring Buffer',
      shortcut: '4',
      icon: <GitFork className="w-4 h-4 text-[#cfe5ff]" />,
      perform: () => {
        onSelectScreen('LOGS');
        onClose();
      },
    },
    {
      id: 'nav-user',
      category: 'NAVIGATION',
      label: 'Switch to L4_USER (ACCESS)',
      sublabel: 'Cryptographic Security & System Preferences',
      shortcut: '5',
      icon: <Fingerprint className="w-4 h-4 text-[#98cbff]" />,
      perform: () => {
        onSelectScreen('USER');
        onClose();
      },
    },
    {
      id: 'act-arch',
      category: 'DOCS',
      label: 'VIEW_ARCHITECTURE',
      sublabel: 'Open Full Systems Blueprints & Layer Topology',
      shortcut: 'A',
      icon: <Layers className="w-4 h-4 text-[#98cbff]" />,
      perform: () => {
        onClose();
        onOpenArchitectureModal();
      },
    },
    {
      id: 'act-docs',
      category: 'DOCS',
      label: 'READ_DOCUMENTATION',
      sublabel: 'Executive Manual on Capital Automation',
      shortcut: 'D',
      icon: <FileText className="w-4 h-4 text-[#88919d]" />,
      perform: () => {
        onClose();
        onOpenDocsDrawer();
      },
    },
    {
      id: 'act-deploy',
      category: 'ACTIONS',
      label: 'DEPLOY_NEW_PIPELINE',
      sublabel: 'Launch a new algorithmic execution worker',
      shortcut: 'N',
      icon: <Zap className="w-4 h-4 text-[#4edea3]" />,
      perform: () => {
        onClose();
        onOpenDeployModal();
      },
    },
    {
      id: 'act-sync',
      category: 'ACTIONS',
      label: 'TRIGGER_GLOBAL_SYNC',
      sublabel: 'Re-align state across JP/US/EU node clusters',
      icon: <RotateCw className="w-4 h-4 text-[#98cbff]" />,
      perform: () => {
        onAddLog('DATA', 'Global sync triggered from CMD+K palette...');
        setTimeout(() => onAddLog('OK', 'All 6 cross-connects verified in sync.'), 400);
        onClose();
      },
    },
    {
      id: 'act-power',
      category: 'SYSTEM',
      label: 'SYSTEM_POWER & REBOOT',
      sublabel: 'Initiate graceful cluster reboot sequence',
      icon: <ShieldAlert className="w-4 h-4 text-[#ffb4ab]" />,
      perform: () => {
        onClose();
        onOpenPowerModal();
      },
    },
  ];

  const filtered = actions.filter((act) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      act.label.toLowerCase().includes(q) ||
      (act.sublabel && act.sublabel.toLowerCase().includes(q)) ||
      act.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].perform();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-command-palette-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 sm:pt-28 px-4 animate-in fade-in duration-200"
    >
      <div
        id="modal-command-palette"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl glass-card rounded-2xl border border-[#98cbff]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
      >
        {/* Search input header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#131313]">
          <Search className="w-5 h-5 text-[#98cbff]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="TYPE_COMMAND_OR_SEARCH..."
            className="w-full bg-transparent border-none text-base sm:text-lg font-mono-tech text-[#e5e2e1] focus:ring-0 focus:outline-none placeholder-[#88919d]"
          />
          <kbd className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/10 text-[#88919d] border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Action list */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 bg-black/40">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm font-mono-tech text-[#88919d]">
              No commands found for "{query}"
            </div>
          ) : (
            filtered.map((action, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={action.id}
                  onClick={() => action.perform()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-4 py-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#00a3ff]/20 border border-[#00a3ff]/40 text-white'
                      : 'hover:bg-white/5 text-[#bec7d4] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-[#00a3ff]/30' : 'bg-white/5'
                      }`}
                    >
                      {action.icon}
                    </div>
                    <div>
                      <p className="font-mono-tech text-xs sm:text-sm font-bold tracking-wide">
                        {action.label}
                      </p>
                      {action.sublabel && (
                        <p className="text-[11px] text-[#88919d] font-sans">
                          {action.sublabel}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-tech text-[#88919d] uppercase px-1.5 py-0.5 rounded bg-white/5">
                      {action.category}
                    </span>
                    {action.shortcut && (
                      <kbd className="text-[10px] font-mono-tech text-[#88919d] px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
                        {action.shortcut}
                      </kbd>
                    )}
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-[#98cbff]' : 'text-transparent'
                      }`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-[#0e0e0e] border-t border-white/5 flex items-center justify-between text-[11px] font-mono-tech text-[#88919d]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Dismiss</span>
          </div>
          <span className="text-[#4edea3]">KAIJU_OS_INTERPRETER_V2</span>
        </div>
      </div>
    </div>
  );
};
