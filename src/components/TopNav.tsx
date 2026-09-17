import React from 'react';
import { ScreenId } from '../types';
import {
  Search,
  Terminal,
  Settings,
  Activity,
  ShieldCheck,
  FileText,
  Briefcase,
  Layers,
  Cpu,
  TrendingUp,
  Github,
  Mail,
} from 'lucide-react';

interface TopNavProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenCommandPalette: () => void;
  onOpenTerminalDrawer: () => void;
  onOpenSettings: () => void;
  queryFilter: string;
  setQueryFilter: (val: string) => void;
  systemStatus: 'ONLINE' | 'MAINTENANCE' | 'ALERT';
}

export const TopNav: React.FC<TopNavProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenCommandPalette,
  onOpenTerminalDrawer,
  onOpenSettings,
  queryFilter,
  setQueryFilter,
  systemStatus,
}) => {
  const navTabs: { id: ScreenId; label: string; badge?: string }[] = [
    { id: 'HOME', label: 'OVERVIEW' },
    { id: 'PROJECTS', label: 'THINGS I’VE BUILT' },
    { id: 'CASE_STUDIES', label: 'CASE STUDIES', badge: '25-SEC' },
    { id: 'ARCHITECTURE', label: 'ARCHITECTURE' },
    { id: 'SKILLS', label: 'WHERE I FIT' },
    { id: 'EXPERIENCE', label: 'TRACK RECORD & CV' },
    { id: 'ANALYTICS', label: 'ANALYTICS' },
    { id: 'GITHUB', label: 'GITHUB' },
    { id: 'CONTACT', label: 'CONVERSATION' },
  ];

  return (
    <header
      id="kaiju-header"
      className="fixed top-0 left-0 w-full z-40 bg-[#0a0f16]/90 backdrop-blur-xl border-b border-white/10 flex justify-between items-center h-16 px-4 md:px-8 transition-colors"
    >
      <div className="flex items-center gap-4 lg:gap-8">
        <button
          id="btn-brand-logo"
          onClick={() => onSelectScreen('HOME')}
          className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#4edea3] group-hover:scale-125 transition-transform animate-pulse shadow-[0_0_8px_#4edea3]" />
          <span className="font-bold text-lg md:text-xl tracking-tighter text-[#e5e2e1] group-hover:text-white font-mono transition-colors">
            KAIJU // BLADE
          </span>
          <span className="text-[10px] text-[#98cbff] px-1.5 py-0.5 rounded bg-[#98cbff]/10 border border-[#98cbff]/20 font-mono hidden sm:inline-block">
            SYSTEMS_BUILDER
          </span>
        </button>

        {/* Screen Switcher Tabs */}
        <nav id="top-nav-screens" className="hidden xl:flex items-center gap-1">
          {navTabs.map((tab) => {
            const isActive =
              currentScreen === tab.id ||
              (tab.id === 'HOME' && currentScreen === 'SYSTEM');
            return (
              <button
                key={tab.id}
                id={`tab-nav-${tab.id.toLowerCase()}`}
                onClick={() => onSelectScreen(tab.id)}
                className={`relative font-mono text-[11px] tracking-wider px-2.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#98cbff] bg-[#98cbff]/15 font-bold border border-[#98cbff]/30 shadow-[0_0_12px_rgba(152,203,255,0.15)]'
                    : 'text-[#9cb1c9] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="rounded bg-[#4edea3]/20 px-1 py-0.2 text-[9px] font-bold text-[#4edea3] border border-[#4edea3]/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search input with shortcut */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c7287] w-3.5 h-3.5 pointer-events-none" />
          <input
            id="input-query-core"
            type="text"
            value={queryFilter}
            onChange={(e) => setQueryFilter(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && queryFilter.trim()) {
                onOpenCommandPalette();
              }
            }}
            placeholder="Search systems & evidence..."
            className="bg-[#05080c] border border-[#223142] rounded-lg pl-8 pr-12 py-1.5 text-xs text-[#e5e2e1] placeholder-[#5c7287] font-mono focus:border-[#98cbff] focus:ring-1 focus:ring-[#98cbff] focus:outline-none w-36 lg:w-48 transition-all"
          />
          <kbd
            onClick={onOpenCommandPalette}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-[#88919d] bg-white/10 px-1.5 py-0.5 rounded border border-white/10 font-mono cursor-pointer hover:text-white"
          >
            ⌘K
          </kbd>
        </div>

        {/* Mobile search trigger */}
        <button
          id="btn-mobile-search"
          onClick={onOpenCommandPalette}
          className="md:hidden text-[#bec7d4] hover:text-white p-2 rounded hover:bg-white/5 transition-all"
          title="Search / Command Palette"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Persistent Tasteful View CV Button */}
        <button
          onClick={() => onSelectScreen('EXPERIENCE')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#4edea3]/40 bg-[#4edea3]/10 px-2.5 py-1.5 text-xs font-mono font-bold text-[#4edea3] hover:bg-[#4edea3] hover:text-[#001f3f] transition-all cursor-pointer shadow-sm"
          title="View Experience & Download CV"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View CV</span>
        </button>

        {/* Contact CTA */}
        <button
          onClick={() => onSelectScreen('CONTACT')}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#98cbff] to-[#76aae6] px-3 py-1.5 text-xs font-mono font-bold text-[#001f3f] hover:opacity-90 transition-all cursor-pointer shadow-md shadow-[#98cbff]/10"
        >
          <Mail className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Let's Talk</span>
        </button>
      </div>
    </header>
  );
};
