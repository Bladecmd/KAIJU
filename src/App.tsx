import React, { useState, useEffect, useCallback } from 'react';
import { ScreenId, LogItem, LogType } from './types';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { TopNav } from './components/TopNav';
import { SideNav } from './components/SideNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { ProjectsScreen } from './components/screens/ProjectsScreen';
import { CaseStudiesScreen } from './components/screens/CaseStudiesScreen';
import { ArchitectureScreen } from './components/screens/ArchitectureScreen';
import { SkillsScreen } from './components/screens/SkillsScreen';
import { ExperienceScreen } from './components/screens/ExperienceScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { GitHubScreen } from './components/screens/GitHubScreen';
import { ContactScreen } from './components/screens/ContactScreen';
import { CampaignLandingScreen } from './components/screens/CampaignLandingScreen';
import { L1NodesScreen } from './components/screens/L1_NodesScreen';
import { L2SensorsScreen } from './components/screens/L2_SensorsScreen';
import { L3LogsScreen } from './components/screens/L3_LogsScreen';
import { L4UserScreen } from './components/screens/L4_UserScreen';
import { CommandPalette } from './components/modals/CommandPalette';
import { ArchitectureModal } from './components/modals/ArchitectureModal';
import { DocsDrawer } from './components/modals/DocsDrawer';
import { DeployModal } from './components/modals/DeployModal';
import { PowerModal } from './components/modals/PowerModal';
import { analytics } from './services/analytics';
import { Plus, Download, FileText, Mail, Github, Layers } from 'lucide-react';
import { AudienceType } from './types';

const initialLogSeed: LogItem[] = [
  { id: '1', time: '04:10:01', type: 'BOOT', text: 'Initializing KAIJU_OS L0_CORE: OK' },
  { id: '2', time: '04:10:02', type: 'AUTH', text: 'Validating ARCHITECT_ADM credentials: OK' },
  { id: '3', time: '04:10:03', type: 'NET', text: 'Connecting to Co-located Redis cluster: ESTABLISHED' },
  { id: '4', time: '04:10:04', type: 'DATA', text: 'Syncing 6 Flagship Production System blueprints: LOADED' },
  { id: '5', time: '04:10:06', type: 'OK', text: 'Metro Task Force Redis atomic mutex active (<2ms)' },
  { id: '6', time: '04:10:08', type: 'OK', text: 'ComplianceLabs AST rule evaluation pipeline ready' },
  { id: '7', time: '04:10:11', type: 'SYSTEM', text: 'Zero-trust agent sandbox firewall: ENFORCING' },
  { id: '8', time: '04:10:14', type: 'CMD', text: 'Executing: kaiju telemetry verify --all', subtext: '> 6/6 systems operational. 0 regressions.' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('HOME');
  const [activeCaseStudySlug, setActiveCaseStudySlug] = useState<string>('metro-task-force');
  const [activeAudience, setActiveAudience] = useState<AudienceType>('recruiter');
  const [logs, setLogs] = useState<LogItem[]>(initialLogSeed);
  const [queryFilter, setQueryFilter] = useState<string>('');
  const [activeAutomationCount, setActiveAutomationCount] = useState<number>(6);
  const [complexityLevel, setComplexityLevel] = useState<
    'OPTIMAL' | 'HIGH_INTENSITY' | 'OVERCLOCK' | 'THROTTLED'
  >('HIGH_INTENSITY');

  // Parse initial URL hash or query params for campaign routing (e.g. #for=recruiter or #casestudy=nova)
  useEffect(() => {
    const handleHashRouting = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('for=recruiter') || hash.includes('/for/recruiter')) {
        setActiveAudience('recruiter');
        setCurrentScreen('LANDING');
      } else if (hash.includes('for=founder') || hash.includes('/for/founder')) {
        setActiveAudience('founder');
        setCurrentScreen('LANDING');
      } else if (hash.includes('for=ai') || hash.includes('for=automation')) {
        setActiveAudience('ai-automation');
        setCurrentScreen('LANDING');
      } else if (hash.includes('for=solutions') || hash.includes('/for/solutions')) {
        setActiveAudience('solutions');
        setCurrentScreen('LANDING');
      } else if (hash.includes('casestudy=') || hash.includes('casestudies')) {
        const parts = hash.split('casestudy=');
        if (parts[1]) {
          const slug = parts[1].split('&')[0];
          setActiveCaseStudySlug(slug);
        }
        setCurrentScreen('CASE_STUDIES');
      } else if (hash.includes('projects')) {
        setCurrentScreen('PROJECTS');
      } else if (hash.includes('architecture')) {
        setCurrentScreen('ARCHITECTURE');
      } else if (hash.includes('skills')) {
        setCurrentScreen('SKILLS');
      } else if (hash.includes('experience') || hash.includes('cv')) {
        setCurrentScreen('EXPERIENCE');
      } else if (hash.includes('contact')) {
        setCurrentScreen('CONTACT');
      }
    };

    handleHashRouting();
    window.addEventListener('hashchange', handleHashRouting);
    return () => window.removeEventListener('hashchange', handleHashRouting);
  }, []);

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isDocsDrawerOpen, setIsDocsDrawerOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isPowerModalOpen, setIsPowerModalOpen] = useState(false);

  const handleSelectScreen = (screenId: ScreenId, caseStudySlug?: string) => {
    setCurrentScreen(screenId);
    if (caseStudySlug) {
      setActiveCaseStudySlug(caseStudySlug);
    }
    analytics.track('PAGE_VIEW', screenId);
  };

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
          { type: 'DATA', text: `Metro Task Force: Redis atomic bid lock held for 42ms (Worker: field-node-09)` },
          { type: 'OK', text: `ComplianceLabs: 142 AST compliance rules validated across 4 repos (0 violations)` },
          { type: 'SYSTEM', text: `AudioBlue: WebRTC UDP ring buffer jitter: 0.08ms | WASM frame loss: 0%` },
          { type: 'NET', text: `Sovereign Security: Prompt injection payload rejected by ONNX vector filter` },
        ];
        const chosen = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
        addLog(chosen.type, chosen.text, chosen.subtext);
      }
    }, 5500);

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
    addLog('SYSTEM', 'KERNEL RESET: Terminating ring buffers and re-verifying schemas...');
    setTimeout(() => {
      setLogs([
        { id: '1', time: '00:00:01', type: 'BOOT', text: 'Initializing KAIJU_OS: OK' },
        { id: '2', time: '00:00:02', type: 'AUTH', text: 'Validating ARCHITECT_ADM: SUCCESS' },
        { id: '3', time: '00:00:03', type: 'NET', text: 'Reconnected to Redis & PostgreSQL cluster: OK' },
        { id: '4', time: '00:00:04', type: 'OK', text: 'All 6 flagship production engines loaded & verified.' },
      ]);
      addLog('OK', 'SYSTEM BOOT SEQUENCE COMPLETED. ALL ENGINES OPERATIONAL.');
    }, 600);
  };

  const handleDeployPipeline = (name: string, layer: string, desc: string) => {
    addLog('SYSTEM', `Deploying pipeline worker: ${name} [${layer}]`);
    setTimeout(() => {
      addLog('OK', `Pipeline ${name} initialized and scheduled on thread pool. (Ops/s: 6,200)`);
      setActiveAutomationCount((prev) => Math.min(8, prev + 1));
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#05080c] text-[#e5e2e1] relative flex flex-col font-sans selection:bg-[#98cbff]/30 selection:text-[#98cbff]">
      {/* Dynamic Cybernetic WebGL Canvas Shader Background */}
      <BackgroundCanvas />

      {/* Top Header Navigation */}
      <TopNav
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenTerminalDrawer={() => handleSelectScreen('HOME')}
        onOpenSettings={() => handleSelectScreen('CONTACT')}
        queryFilter={queryFilter}
        setQueryFilter={setQueryFilter}
        systemStatus="ONLINE"
      />

      {/* Left Collapsible & Hover-Expanding Side Navigation */}
      <SideNav
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenPowerModal={() => setIsPowerModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main
        id="kaiju-main-container"
        className="relative z-10 pt-24 pb-16 ml-16 md:ml-20 px-4 sm:px-8 md:px-12 max-w-[1440px] w-[calc(100%-4rem)] md:w-[calc(100%-5rem)] mx-auto flex-1 transition-all"
      >
        {(currentScreen === 'HOME' || currentScreen === 'SYSTEM') && (
          <HomeScreen
            logs={logs}
            onAddLog={addLog}
            onSelectScreen={handleSelectScreen}
            onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
            onOpenDocsDrawer={() => setIsDocsDrawerOpen(true)}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
        )}

        {currentScreen === 'PROJECTS' && (
          <ProjectsScreen onSelectScreen={handleSelectScreen} />
        )}

        {currentScreen === 'CASE_STUDIES' && (
          <CaseStudiesScreen
            initialSlug={activeCaseStudySlug}
            onSelectScreen={handleSelectScreen}
          />
        )}

        {currentScreen === 'ARCHITECTURE' && (
          <ArchitectureScreen onSelectScreen={handleSelectScreen} />
        )}

        {currentScreen === 'SKILLS' && (
          <SkillsScreen onSelectScreen={handleSelectScreen} />
        )}

        {currentScreen === 'EXPERIENCE' && (
          <ExperienceScreen onSelectScreen={handleSelectScreen} />
        )}

        {currentScreen === 'ANALYTICS' && (
          <AnalyticsScreen onSelectScreen={handleSelectScreen} />
        )}

        {currentScreen === 'GITHUB' && (
          <GitHubScreen onSelectScreen={handleSelectScreen} />
        )}

        {currentScreen === 'CONTACT' && (
          <ContactScreen onAddLog={addLog} onSelectScreen={handleSelectScreen} />
        )}

        {currentScreen === 'LANDING' && (
          <CampaignLandingScreen
            audienceId={activeAudience}
            onSelectScreen={handleSelectScreen}
            onSwitchAudience={(aud) => setActiveAudience(aud)}
          />
        )}

        {/* Legacy Screen Support */}
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
        className="relative z-10 w-full bg-[#070b10]/95 backdrop-blur-md border-t border-[#1c2736] py-6 px-6 sm:px-12 ml-16 md:ml-0 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono"
      >
        <div className="flex items-center gap-4">
          <span className="text-[#4edea3] font-bold tracking-wider">KAIJU_SYSTEMS</span>
          <span className="text-[#657a8e] uppercase tracking-widest hidden sm:inline">
            ENTERPRISE ENGINEERING EVIDENCE PLATFORM // 2026
          </span>
        </div>

        <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
          <button
            onClick={() => handleSelectScreen('CASE_STUDIES')}
            className="text-[#8ca3b8] hover:text-[#98cbff] transition-colors tracking-widest uppercase cursor-pointer"
          >
            CASE_STUDIES
          </button>
          <button
            onClick={() => handleSelectScreen('ARCHITECTURE')}
            className="text-[#8ca3b8] hover:text-[#98cbff] transition-colors tracking-widest uppercase cursor-pointer"
          >
            ARCHITECTURE
          </button>
          <button
            onClick={() => handleSelectScreen('SKILLS')}
            className="text-[#8ca3b8] hover:text-[#98cbff] transition-colors tracking-widest uppercase cursor-pointer"
          >
            SKILLS
          </button>
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="text-[#8ca3b8] hover:text-[#98cbff] transition-colors tracking-widest uppercase cursor-pointer"
          >
            COMMAND_PALETTE (⌘K)
          </button>
        </div>
      </footer>

      {/* Floating Action Button (FAB) for Quick Deployment */}
      <button
        id="btn-fab-deploy"
        onClick={() => setIsDeployModalOpen(true)}
        className="fixed bottom-8 right-8 w-13 h-13 bg-[#98cbff] text-[#001f3f] hover:bg-white rounded-full shadow-[0_0_24px_rgba(152,203,255,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 cursor-pointer group"
        title="Deploy New Automation Pipeline (+)"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Modals & Drawers */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectScreen={handleSelectScreen}
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
