import React, { useState, useEffect, useCallback } from 'react';
import { ScreenId, LogItem, LogType } from './types';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { TopNav } from './components/TopNav';
import { SideNav } from './components/SideNav';
import { L0CoreScreen } from './components/screens/L0_CoreScreen';
import { L1NodesScreen } from './components/screens/L1_NodesScreen';
import { L2SensorsScreen } from './components/screens/L2_SensorsScreen';
import { L3LogsScreen } from './components/screens/L3_LogsScreen';
import { L4UserScreen } from './components/screens/L4_UserScreen';
import { CommandPalette } from './components/modals/CommandPalette';
import { ArchitectureModal } from './components/modals/ArchitectureModal';
import { DocsDrawer } from './components/modals/DocsDrawer';
import { DeployModal } from './components/modals/DeployModal';
import { PowerModal } from './components/modals/PowerModal';
import { Plus } from 'lucide-react';

const initialLogSeed: LogItem[] = [
  { id: '1', time: '03:12:01', type: 'BOOT', text: 'Initializing L0_CORE: OK' },
  { id: '2', time: '03:12:02', type: 'AUTH', text: 'Validating ADM_KAIJU: SUCCESS' },
  { id: '3', time: '03:12:03', type: 'NET', text: 'Connecting to Global Node Cluster: ESTABLISHED' },
  { id: '4', time: '03:12:04', type: 'DATA', text: 'Pulling Market Liquidity Indices...' },
  { id: '5', time: '03:12:06', type: 'WARN', text: 'High latency detected in Sensor_09_JP' },
  { id: '6', time: '03:12:08', type: 'OK', text: 'Auto-rerouting via Sensor_12_US' },
  { id: '7', time: '03:12:11', type: 'SYSTEM', text: 'Memory pressure: 14.2%' },
  { id: '8', time: '03:12:14', type: 'CMD', text: 'Executing: node scripts/sync_v2.js', subtext: '> sync_v2: starting batch 4,201... hash: 0x82...a9f2' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('SYSTEM');
  const [logs, setLogs] = useState<LogItem[]>(initialLogSeed);
  const [queryFilter, setQueryFilter] = useState<string>('');
  const [activeAutomationCount, setActiveAutomationCount] = useState<number>(5);
  const [complexityLevel, setComplexityLevel] = useState<
    'OPTIMAL' | 'HIGH_INTENSITY' | 'OVERCLOCK' | 'THROTTLED'
  >('HIGH_INTENSITY');

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isDocsDrawerOpen, setIsDocsDrawerOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isPowerModalOpen, setIsPowerModalOpen] = useState(false);

  // Helper to add logs
  const addLog = useCallback(
    (type: LogType, text: string, subtext?: string) => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newLog: LogItem = {
        id: Math.random().toString(36).substring(2, 9),
        time: timeStr,
        type,
        text,
        subtext,
      };
      setLogs((prev) => [...prev.slice(-150), newLog]);
    },
    []
  );

  // Background ticker simulation for real-time cybernetic feel
  useEffect(() => {
    const streamInterval = setInterval(() => {
      const randomSeed = Math.random();
      if (randomSeed > 0.7) {
        const sampleLogs: { type: LogType; text: string; subtext?: string }[] = [
          { type: 'DATA', text: `Tick ingested: block #${Math.floor(Math.random() * 800000 + 9400000)} | Arb delta +0.038%` },
          { type: 'OK', text: `Cross-DEX atomic swap verified on Sensor_12_US` },
          { type: 'SYSTEM', text: `Jitter sample: 0.03ms (Median 0.04ms) across 6 gateways` },
          { type: 'NET', text: `Heartbeat acknowledged by TY3 (Tokyo) & FR2 (Frankfurt)` },
        ];
        const chosen = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
        addLog(chosen.type, chosen.text, chosen.subtext);
      }
    }, 6000);

    return () => clearInterval(streamInterval);
  }, [addLog]);

  // Global Keyboard shortcuts: CMD+K or CTRL+K opens Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsArchitectureModalOpen(false);
        setIsDocsDrawerOpen(false);
        setIsDeployModalOpen(false);
        setIsPowerModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleReboot = () => {
    addLog('SYSTEM', 'KERNEL RESET: Terminating worker ring buffers...');
    setTimeout(() => {
      setLogs([
        { id: '1', time: '00:00:01', type: 'BOOT', text: 'Initializing L0_CORE: OK' },
        { id: '2', time: '00:00:02', type: 'AUTH', text: 'Validating ADM_KAIJU: SUCCESS' },
        { id: '3', time: '00:00:03', type: 'NET', text: 'Reconnected to Global Node Cluster: ESTABLISHED' },
        { id: '4', time: '00:00:04', type: 'OK', text: 'All 6 co-located sensors synchronized.' },
      ]);
      addLog('OK', 'SYSTEM BOOT SEQUENCE COMPLETED. ALL SYSTEMS GO.');
    }, 600);
  };

  const handleDeployPipeline = (name: string, layer: string, desc: string) => {
    addLog('SYSTEM', `Deploying pipeline worker: ${name} [${layer}]`);
    setTimeout(() => {
      addLog('OK', `Pipeline ${name} initialized and scheduled on thread pool. (Ops/s: 6,200)`);
      setActiveAutomationCount((prev) => Math.min(6, prev + 1));
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black text-[#e5e2e1] relative flex flex-col font-sans selection:bg-[#98cbff]/30 selection:text-[#98cbff]">
      {/* Dynamic Cybernetic WebGL Canvas Shader Background */}
      <BackgroundCanvas />

      {/* Top Header Navigation */}
      <TopNav
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenTerminalDrawer={() => setCurrentScreen('LOGS')}
        onOpenSettings={() => setCurrentScreen('USER')}
        queryFilter={queryFilter}
        setQueryFilter={setQueryFilter}
        systemStatus="ONLINE"
      />

      {/* Left Collapsible & Hover-Expanding Side Navigation */}
      <SideNav
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenPowerModal={() => setIsPowerModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main
        id="kaiju-main-container"
        className="relative z-10 pt-24 pb-16 ml-16 md:ml-20 px-4 sm:px-8 md:px-12 max-w-[1440px] w-[calc(100%-4rem)] md:w-[calc(100%-5rem)] mx-auto flex-1 transition-all"
      >
        {currentScreen === 'SYSTEM' && (
          <L0CoreScreen
            logs={logs}
            onAddLog={addLog}
            onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
            onOpenDocsDrawer={() => setIsDocsDrawerOpen(true)}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onSelectScreen={setCurrentScreen}
            activeAutomationCount={activeAutomationCount}
            setActiveAutomationCount={setActiveAutomationCount}
            complexityLevel={complexityLevel}
            setComplexityLevel={setComplexityLevel}
          />
        )}

        {currentScreen === 'NODES' && (
          <L1NodesScreen
            onAddLog={addLog}
            onOpenDeployModal={() => setIsDeployModalOpen(true)}
          />
        )}

        {currentScreen === 'SENSORS' && (
          <L2SensorsScreen onAddLog={addLog} />
        )}

        {currentScreen === 'LOGS' && (
          <L3LogsScreen
            logs={logs}
            onAddLog={addLog}
            onClearLogs={() => setLogs([])}
          />
        )}

        {currentScreen === 'USER' && (
          <L4UserScreen
            onAddLog={addLog}
            onOpenPowerModal={() => setIsPowerModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        id="kaiju-footer"
        className="relative z-10 w-full bg-[#131313]/90 backdrop-blur-md border-t border-white/5 py-6 px-6 sm:px-12 ml-16 md:ml-0 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono-tech"
      >
        <div className="flex items-center gap-4">
          <span className="text-[#4edea3] font-bold tracking-wider">KAIJU_LABS</span>
          <span className="text-[#88919d] uppercase tracking-widest hidden sm:inline">
            SYSTEMS ARCHITECTURE // 2026
          </span>
        </div>

        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="#architecture"
            onClick={(e) => {
              e.preventDefault();
              setIsArchitectureModalOpen(true);
            }}
            className="text-[#bec7d4] hover:text-[#98cbff] transition-colors tracking-widest uppercase"
          >
            ARCHITECTURE
          </a>
          <a
            href="#docs"
            onClick={(e) => {
              e.preventDefault();
              setIsDocsDrawerOpen(true);
            }}
            className="text-[#bec7d4] hover:text-[#98cbff] transition-colors tracking-widest uppercase"
          >
            DOCS
          </a>
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="text-[#bec7d4] hover:text-[#98cbff] transition-colors tracking-widest uppercase cursor-pointer"
          >
            COMMAND_PALETTE (⌘K)
          </button>
        </div>
      </footer>

      {/* Floating Action Button (FAB) for Quick Deployment */}
      <button
        id="btn-fab-deploy"
        onClick={() => setIsDeployModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#98cbff] text-[#003354] hover:bg-[#cfe5ff] rounded-full shadow-[0_0_24px_rgba(152,203,255,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 cursor-pointer group"
        title="Deploy New Automation Pipeline (+)"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Modals & Drawers */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectScreen={setCurrentScreen}
        onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
        onOpenDocsDrawer={() => setIsDocsDrawerOpen(true)}
        onAddLog={addLog}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onOpenPowerModal={() => setIsPowerModalOpen(true)}
      />

      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      <DocsDrawer
        isOpen={isDocsDrawerOpen}
        onClose={() => setIsDocsDrawerOpen(false)}
      />

      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onDeploy={handleDeployPipeline}
      />

      <PowerModal
        isOpen={isPowerModalOpen}
        onClose={() => setIsPowerModalOpen(false)}
        onReboot={handleReboot}
      />
    </div>
  );
}
