import React from 'react';
import { ScreenId } from '../types';
import { Search, Terminal, Settings, Activity, ShieldCheck } from 'lucide-react';

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
  const navTabs: { id: ScreenId; label: string }[] = [
    { id: 'SYSTEM', label: 'SYSTEM' },
    { id: 'NODES', label: 'NODES' },
    { id: 'SENSORS', label: 'SENSORS' },
    { id: 'LOGS', label: 'LOGS' },
  ];

  return (
    <header
      id="kaiju-header"
      className="fixed top-0 left-0 w-full z-40 bg-[#131313]/85 backdrop-blur-xl border-b border-white/10 flex justify-between items-center h-16 px-4 md:px-10 transition-colors"
    >
      <div className="flex items-center gap-6 md:gap-10">
        <button
          id="btn-brand-logo"
          onClick={() => onSelectScreen('SYSTEM')}
          className="flex items-center gap-2 text-left group focus:outline-none"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#4edea3] group-hover:scale-125 transition-transform animate-pulse shadow-[0_0_8px_#4edea3]" />
          <span className="font-bold text-xl md:text-2xl tracking-tighter text-[#e5e2e1] group-hover:text-white font-mono-tech transition-colors">
            KAIJU_OS
          </span>
          <span className="text-[10px] text-[#98cbff] px-1.5 py-0.5 rounded bg-[#98cbff]/10 border border-[#98cbff]/20 font-mono-tech hidden sm:inline-block">
            L0_CORE
          </span>
        </button>

        {/* Screen Switcher Tabs */}
        <nav id="top-nav-screens" className="hidden md:flex items-center gap-2">
          {navTabs.map((tab) => {
            const isActive = currentScreen === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-nav-${tab.id.toLowerCase()}`}
                onClick={() => onSelectScreen(tab.id)}
                className={`font-mono-tech text-xs tracking-wider px-3 py-1.5 rounded transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#4edea3] border-b-2 border-[#4edea3] bg-[#4edea3]/5 font-semibold'
                    : 'text-[#bec7d4] hover:text-[#e5e2e1] hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Search input with shortcut */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#88919d] w-3.5 h-3.5 pointer-events-none" />
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
            placeholder="QUERY_CORE..."
            className="bg-black/90 border border-[#3f4852] rounded-lg pl-8 pr-12 py-1.5 text-xs text-[#e5e2e1] placeholder-[#88919d] font-mono-tech focus:border-[#98cbff] focus:ring-1 focus:ring-[#98cbff] focus:outline-none w-44 md:w-56 transition-all"
          />
          <kbd
            onClick={onOpenCommandPalette}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-[#88919d] bg-white/10 px-1.5 py-0.5 rounded border border-white/10 font-mono-tech cursor-pointer hover:text-white"
          >
            ⌘K
          </kbd>
        </div>

        {/* Mobile search trigger */}
        <button
          id="btn-mobile-search"
          onClick={onOpenCommandPalette}
          className="sm:hidden text-[#bec7d4] hover:text-[#e5e2e1] p-2 rounded hover:bg-white/5 transition-all"
          title="Search / Command Palette"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Terminal quick-drawer trigger */}
        <button
          id="btn-toggle-terminal-drawer"
          onClick={onOpenTerminalDrawer}
          className="text-[#bec7d4] hover:text-[#98cbff] p-2 rounded hover:bg-white/5 transition-all cursor-pointer relative group"
          title="Open Terminal Stdin (CMD+`)"
        >
          <Terminal className="w-4 h-4" />
          <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#98cbff] group-hover:animate-ping" />
        </button>

        {/* Live cluster indicator */}
        <div
          id="chip-system-health"
          onClick={() => onSelectScreen('SENSORS')}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1c1b1b] border border-white/5 text-[11px] font-mono-tech text-[#bec7d4] hover:border-[#4edea3]/40 cursor-pointer transition-colors"
          title="Cluster US-EAST Health"
        >
          <Activity className="w-3 h-3 text-[#4edea3]" />
          <span className="text-[#4edea3]">14ms</span>
          <span className="text-[#88919d]">|</span>
          <span>US_CLUSTER_01</span>
        </div>

        {/* Settings button */}
        <button
          id="btn-top-settings"
          onClick={onOpenSettings}
          className="text-[#bec7d4] hover:text-[#e5e2e1] p-2 rounded hover:bg-white/5 transition-all cursor-pointer"
          title="System Settings & Security (L4_USER)"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
