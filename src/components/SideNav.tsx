import React, { useState } from 'react';
import { ScreenId } from '../types';
import {
  Boxes,
  Cpu,
  Database,
  GitFork,
  Fingerprint,
  Power,
  Command,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface SideNavProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenCommandPalette: () => void;
  onOpenPowerModal: () => void;
}

export const SideNav: React.FC<SideNavProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenCommandPalette,
  onOpenPowerModal,
}) => {
  const [isLocked, setIsLocked] = useState(false);

  const menuItems: {
    id: ScreenId;
    layer: string;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'SYSTEM',
      layer: 'L0_CORE',
      label: 'Core Dashboard',
      icon: <Boxes className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'NODES',
      layer: 'L1_AUTO',
      label: 'Automation Pipelines',
      icon: <Cpu className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'SENSORS',
      layer: 'L2_DATA',
      label: 'Telemetry & Grid',
      icon: <Database className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'LOGS',
      layer: 'L3_FLOW',
      label: 'Event Streams',
      icon: <GitFork className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'USER',
      layer: 'L4_USER',
      label: 'Security & Access',
      icon: <Fingerprint className="w-5 h-5 shrink-0" />,
    },
  ];

  return (
    <aside
      id="kaiju-sidenav"
      className={`fixed left-0 top-0 h-full ${
        isLocked ? 'w-64' : 'w-16 md:w-20 hover:w-64'
      } transition-all duration-300 z-40 bg-[#0e0e0e]/95 backdrop-blur-xl border-r border-white/5 shadow-2xl flex flex-col py-6 group`}
    >
      {/* Top Profile / ADM Badge */}
      <div
        id="sidenav-user-profile"
        onClick={() => onSelectScreen('USER')}
        className="px-3 md:px-5 mb-8 flex items-center gap-3.5 cursor-pointer"
        title="Admin Profile (L4_USER)"
      >
        <div className="w-9 h-9 rounded-xl bg-[#00a3ff]/20 border border-[#00a3ff]/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(0,163,255,0.25)]">
          <Fingerprint className="w-5 h-5 text-[#98cbff]" />
        </div>
        <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <p className="font-mono-tech text-xs text-[#e5e2e1] font-bold tracking-tight">
              ADM_KAIJU
            </p>
            <ShieldCheck className="w-3 h-3 text-[#4edea3]" />
          </div>
          <p className="text-[10px] text-[#88919d] font-mono-tech tracking-tighter">
            V.2.0.4_STABLE
          </p>
        </div>
      </div>

      {/* Layer Navigation */}
      <nav id="sidenav-nav-links" className="flex-1 space-y-2 px-2">
        {menuItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              id={`sidenav-item-${item.layer.toLowerCase()}`}
              onClick={() => onSelectScreen(item.id)}
              className={`w-full flex items-center gap-3.5 px-3 md:px-3.5 py-3 rounded-xl cursor-pointer transition-all duration-200 text-left ${
                isActive
                  ? 'bg-[#00a3ff] text-[#001d33] font-semibold shadow-[0_0_16px_rgba(0,163,255,0.35)]'
                  : 'text-[#bec7d4] hover:text-[#e5e2e1] hover:bg-[#201f1f]'
              }`}
            >
              <div className={isActive ? 'text-[#001d33]' : 'text-[#bec7d4]'}>
                {item.icon}
              </div>
              <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap leading-tight">
                <p className="font-mono-tech text-xs font-bold tracking-wide">
                  {item.layer}
                </p>
                <p
                  className={`text-[10px] truncate ${
                    isActive ? 'text-[#00375a]' : 'text-[#88919d]'
                  }`}
                >
                  {item.label}
                </p>
              </div>
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom controls */}
      <div className="mt-auto px-3 md:px-4 pt-4 border-t border-white/5 space-y-2">
        {/* Power Off / Restart */}
        <button
          id="btn-sidenav-power"
          onClick={onOpenPowerModal}
          className="w-full flex items-center gap-3.5 px-3 py-2.5 text-[#bec7d4] hover:text-[#ffb4ab] hover:bg-[#ffb4ab]/10 rounded-lg transition-colors cursor-pointer text-left"
          title="System State / Reboot"
        >
          <Power className="w-5 h-5 shrink-0" />
          <span className="font-mono-tech text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap uppercase tracking-wider">
            SYSTEM_POWER
          </span>
        </button>

        {/* Quick CMD+K trigger */}
        <button
          id="btn-sidenav-cmdk"
          onClick={onOpenCommandPalette}
          className="w-full px-2 py-1.5 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-center opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Command className="w-3 h-3 text-[#98cbff]" />
          <span className="font-mono-tech text-[11px] text-[#88919d] tracking-widest">
            CMD+K
          </span>
        </button>
      </div>
    </aside>
  );
};
