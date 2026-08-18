import React, { useState, useEffect, useRef } from 'react';
import { ScreenId } from '../../types';
import { allCaseStudies } from '../../data/caseStudies';
import {
  Command,
  Search,
  Boxes,
  Briefcase,
  FileText,
  Layers,
  Cpu,
  GraduationCap,
  Activity,
  Github,
  Mail,
  RotateCw,
  Zap,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScreen: (screen: ScreenId, caseStudySlug?: string) => void;
  onOpenArchitectureModal: () => void;
  onOpenDocsDrawer: () => void;
  onAddLog: (type: any, text: string, subtext?: string) => void;
  onOpenDeployModal: () => void;
  onOpenPowerModal: () => void;
}

interface PaletteAction {
  id: string;
  category: 'NAVIGATION' | 'CASE_STUDIES' | 'ACTIONS' | 'SYSTEM';
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

  const baseActions: PaletteAction[] = [
    {
      id: 'nav-home',
      category: 'NAVIGATION',
      label: 'Executive Overview & Live Telemetry',
      sublabel: 'L0_CORE: System summary, active telemetry stream and stats',
      shortcut: '1',
      icon: <Boxes className="w-4 h-4 text-[#98cbff]" />,
      perform: () => {
        onSelectScreen('HOME');
        onClose();
      },
    },
    {
      id: 'nav-projects',
      category: 'NAVIGATION',
      label: 'Production Systems Catalog',
      sublabel: 'L1_PROJ: 6 flagship software systems with unit economics',
      shortcut: '2',
      icon: <Briefcase className="w-4 h-4 text-[#4edea3]" />,
      perform: () => {
        onSelectScreen('PROJECTS');
        onClose();
      },
    },
    {
      id: 'nav-casestudies',
      category: 'NAVIGATION',
      label: 'Master 25-Section Case Study Engine',
      sublabel: 'L2_CASE: Deep architectural proofs, incident post-mortems, and trade-offs',
      shortcut: '3',
      icon: <FileText className="w-4 h-4 text-[#98cbff]" />,
      perform: () => {
        onSelectScreen('CASE_STUDIES');
        onClose();
      },
    },
    {
      id: 'nav-arch',
      category: 'NAVIGATION',
      label: 'System Architecture Explorer',
      sublabel: 'L3_ARCH: Blueprints, Redis Lua mutexes, and zero-trust perimeters',
      shortcut: '4',
      icon: <Layers className="w-4 h-4 text-[#cfe5ff]" />,
      perform: () => {
        onSelectScreen('ARCHITECTURE');
        onClose();
      },
    },
    {
      id: 'nav-skills',
      category: 'NAVIGATION',
      label: 'Engineering Competency Matrix',
      sublabel: 'L4_SKIL: AI orchestration, FinOps, zero-trust security & frontend depth',
      shortcut: '5',
      icon: <Cpu className="w-4 h-4 text-[#4edea3]" />,
      perform: () => {
        onSelectScreen('SKILLS');
        onClose();
      },
    },
    {
      id: 'nav-exp',
      category: 'NAVIGATION',
      label: 'Track Record & Business Finance Background',
      sublabel: 'L5_EXPR: Founder history, 10-stage AI-native lifecycle, and education',
      shortcut: '6',
      icon: <GraduationCap className="w-4 h-4 text-[#98cbff]" />,
      perform: () => {
        onSelectScreen('EXPERIENCE');
        onClose();
      },
    },
    {
      id: 'nav-analytics',
      category: 'NAVIGATION',
      label: 'Platform Analytics & Recruiter Telemetry',
      sublabel: 'L6_METR: Privacy-preserving local metrics, time-on-site, and conversion funnel',
      shortcut: '7',
      icon: <Activity className="w-4 h-4 text-[#4edea3]" />,
      perform: () => {
        onSelectScreen('ANALYTICS');
        onClose();
      },
    },
    {
      id: 'nav-github',
      category: 'NAVIGATION',
      label: 'Public GitHub Repositories',
      sublabel: 'L7_REPO: Clean, typed source code repositories and verifiable builds',
      shortcut: '8',
      icon: <Github className="w-4 h-4 text-[#98cbff]" />,
      perform: () => {
        onSelectScreen('GITHUB');
        onClose();
      },
    },
    {
      id: 'nav-contact',
      category: 'NAVIGATION',
      label: 'Initiate Contact & Engineering Inbound',
      sublabel: 'L8_COMM: Direct email copy and encrypted message portal',
      shortcut: '9',
      icon: <Mail className="w-4 h-4 text-[#4edea3]" />,
      perform: () => {
        onSelectScreen('CONTACT');
        onClose();
      },
    },
    {
      id: 'act-sync',
      category: 'ACTIONS',
      label: 'Trigger Cluster Telemetry Sync',
      sublabel: 'Re-align state and ping across all edge nodes',
      icon: <RotateCw className="w-4 h-4 text-[#98cbff]" />,
      perform: () => {
        onAddLog('DATA', 'Cluster synchronization triggered via Command Palette...');
        setTimeout(() => onAddLog('OK', 'All telemetry nodes verified in sync.'), 300);
        onClose();
      },
    },
    {
      id: 'act-power',
      category: 'SYSTEM',
      label: 'System Kernel Reboot',
      sublabel: 'Initiate graceful cluster reboot sequence',
      icon: <ShieldAlert className="w-4 h-4 text-[#ffb4ab]" />,
      perform: () => {
        onClose();
        onOpenPowerModal();
      },
    },
  ];

  // Dynamic Case Studies Actions
  const caseStudyActions: PaletteAction[] = allCaseStudies.map((cs) => ({
    id: `cs-${cs.slug}`,
    category: 'CASE_STUDIES',
    label: `Case Study: ${cs.identity.projectName}`,
    sublabel: `${cs.identity.projectType} • ${cs.identity.status}`,
    icon: <FileText className="w-4 h-4 text-[#4edea3]" />,
    perform: () => {
      onSelectScreen('CASE_STUDIES', cs.slug);
      onClose();
    },
  }));

  const allActions = [...baseActions, ...caseStudyActions];

  const filtered = allActions.filter((act) => {
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
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 sm:pt-28 px-4 animate-in fade-in duration-200 font-mono"
    >
      <div
        id="modal-command-palette"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0c131d] rounded-2xl border border-[#98cbff]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
      >
        {/* Search input header */}
        <div className="p-4 border-b border-[#1c2736] flex items-center gap-3 bg-[#080d14]">
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
            placeholder="Search systems, case studies, blueprints, skills..."
            className="w-full bg-transparent border-none text-sm font-mono text-[#e5e2e1] focus:ring-0 focus:outline-none placeholder-[#5c7287]"
          />
          <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#88919d] border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Action list */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 bg-[#090f17]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#88919d]">
              No direct commands found for "{query}"
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
                      ? 'bg-[#98cbff]/15 border border-[#98cbff]/40 text-white'
                      : 'hover:bg-white/5 text-[#bec7d4] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-[#98cbff]/20' : 'bg-white/5'
                      }`}
                    >
                      {action.icon}
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold tracking-wide">
                        {action.label}
                      </p>
                      {action.sublabel && (
                        <p className="text-[11px] text-[#71879c] font-sans">
                          {action.sublabel}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-[#657a8e] uppercase px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                      {action.category}
                    </span>
                    {action.shortcut && (
                      <kbd className="text-[10px] font-mono text-[#88919d] px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
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
        <div className="px-4 py-2.5 bg-[#060a0e] border-t border-[#1c2736] flex items-center justify-between text-[11px] font-mono text-[#657a8e]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Dismiss</span>
          </div>
          <span className="text-[#4edea3]">KAIJU_OS_INTERPRETER_V2.5</span>
        </div>
      </div>
    </div>
  );
};
