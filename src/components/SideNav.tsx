import React, { useState } from 'react';
import { ScreenId } from '../types';
import {
  Boxes,
  Briefcase,
  FileText,
  Layers,
  Cpu,
  GraduationCap,
  Activity,
  Github,
  Mail,
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
      id: 'HOME',
      layer: 'L0_HOME',
      label: 'Overview & Ethos',
      icon: <Boxes className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'PROJECTS',
      layer: 'L1_WORK',
      label: 'Things I’ve Built',
      icon: <Briefcase className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'CASE_STUDIES',
      layer: 'L2_CASE',
      label: 'What Happened (Case Studies)',
      icon: <FileText className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'ARCHITECTURE',
      layer: 'L3_ARCH',
      label: 'System Blueprints',
      icon: <Layers className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'SKILLS',
      layer: 'L4_FIT',
      label: 'Where I Tend to Be Useful',
      icon: <Cpu className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'EXPERIENCE',
      layer: 'L5_CV',
      label: 'Track Record & CV',
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'ANALYTICS',
      layer: 'L6_METR',
      label: 'Platform Telemetry',
      icon: <Activity className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'GITHUB',
      layer: 'L7_REPO',
      label: 'Public Repositories',
      icon: <Github className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'CONTACT',
      layer: 'L8_COMM',
      label: 'Start a Conversation',
      icon: <Mail className="w-4 h-4 shrink-0" />,
    },
  ];

  return (
    <aside
      id="kaiju-sidenav"
      className={`fixed left-0 top-0 h-full ${
        isLocked ? 'w-64' : 'w-16 md:w-20 hover:w-64'
      } transition-all duration-300 z-40 bg-[#070b10]/95 backdrop-blur-xl border-r border-[#1c2736] shadow-2xl flex flex-col py-5 group`}
    >
      {/* Top Profile / ADM Badge */}
      <div
        id="sidenav-user-profile"
        onClick={() => onSelectScreen('HOME')}
        className="px-3 md:px-4 mb-4 flex items-center gap-3 cursor-pointer"
        title="Kaiju OS Systems Architect"
      >
        <div className="w-9 h-9 rounded-xl bg-[#98cbff]/10 border border-[#98cbff]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(152,203,255,0.15)]">
          <ShieldCheck className="w-5 h-5 text-[#98cbff]" />
        </div>
        <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <p className="font-mono text-xs text-[#e5e2e1] font-bold tracking-tight">
              BLADE // ARCHITECT
            </p>
            <span className="h-1.5 w-1.5 rounded-full bg-[#4edea3]" />
          </div>
          <p className="text-[10px] text-[#71879c] font-mono tracking-tighter">
            AI-NATIVE SYSTEMS BUILDER
          </p>
        </div>
      </div>

      {/* Layer Navigation */}
      <nav id="sidenav-nav-links" className="flex-1 space-y-1 px-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            currentScreen === item.id ||
            (item.id === 'HOME' && currentScreen === 'SYSTEM');
          return (
            <button
              key={item.id}
              id={`sidenav-item-${item.layer.toLowerCase()}`}
              onClick={() => onSelectScreen(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-left ${
                isActive
                  ? 'bg-[#98cbff] text-[#001f3f] font-bold shadow-[0_0_16px_rgba(152,203,255,0.3)]'
                  : 'text-[#8ca3b8] hover:text-white hover:bg-[#121c28]'
              }`}
            >
              <div className={isActive ? 'text-[#001f3f]' : 'text-[#8ca3b8]'}>
                {item.icon}
              </div>
              <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap leading-tight">
                <p className="font-mono text-xs font-bold tracking-wide">
                  {item.layer}
                </p>
                <p
                  className={`text-[10px] truncate ${
                    isActive ? 'text-[#002d59]' : 'text-[#5a7185]'
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
      <div className="mt-auto px-2 pt-3 border-t border-[#1c2736] space-y-1.5">
        {/* Quick CMD+K trigger */}
        <button
          id="btn-sidenav-cmdk"
          onClick={onOpenCommandPalette}
          className="w-full px-2 py-1.5 bg-[#0e1722] hover:bg-[#152334] rounded-lg border border-[#223142] text-center opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer font-mono"
        >
          <Command className="w-3 h-3 text-[#98cbff]" />
          <span className="text-[11px] text-[#88919d]">⌘K SEARCH</span>
        </button>

        {/* System State */}
        <button
          id="btn-sidenav-power"
          onClick={onOpenPowerModal}
          className="w-full flex items-center gap-3 px-3 py-2 text-[#8ca3b8] hover:text-[#ffb4ab] hover:bg-[#ffb4ab]/10 rounded-lg transition-colors cursor-pointer text-left font-mono"
          title="System State / Reboot"
        >
          <Power className="w-4 h-4 shrink-0" />
          <span className="text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap uppercase tracking-wider">
            KERNEL_REBOOT
          </span>
        </button>
      </div>
    </aside>
  );
};
