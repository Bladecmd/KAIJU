import React, { useState, useEffect, useRef } from 'react';
import { LogItem, ScreenId } from '../../types';
import { projectsData } from '../../data/projectsData';
import { analytics } from '../../services/analytics';
import {
  Terminal,
  FileText,
  Layers,
  Sparkles,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  TrendingUp,
  Activity,
  Code2,
  Lock,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Server,
  Database,
  Briefcase,
  GitBranch,
} from 'lucide-react';

interface HomeScreenProps {
  logs: LogItem[];
  onAddLog: (type: LogItem['type'], text: string, subtext?: string) => void;
  onSelectScreen: (screenId: ScreenId, caseStudySlug?: string) => void;
  onOpenArchitectureModal: () => void;
  onOpenDocsDrawer: () => void;
  onOpenCommandPalette: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  logs,
  onAddLog,
  onSelectScreen,
  onOpenArchitectureModal,
  onOpenDocsDrawer,
  onOpenCommandPalette,
}) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [isLogPaused, setIsLogPaused] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const terminalScrollRef = useRef<HTMLDivElement | null>(null);

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
        onAddLog(
          'SYSTEM',
          'Commands: projects, casestudies, arch, skills, exp, analytics, github, contact, clear'
        );
      }, 150);
    } else if (lower === 'projects') {
      onSelectScreen('PROJECTS');
    } else if (lower === 'casestudies' || lower === 'case') {
      onSelectScreen('CASE_STUDIES');
    } else if (lower === 'arch') {
      onSelectScreen('ARCHITECTURE');
    } else if (lower === 'skills') {
      onSelectScreen('SKILLS');
    } else if (lower === 'exp') {
      onSelectScreen('EXPERIENCE');
    } else if (lower === 'analytics') {
      onSelectScreen('ANALYTICS');
    } else if (lower === 'github') {
      onSelectScreen('GITHUB');
    } else if (lower === 'contact') {
      onSelectScreen('CONTACT');
    } else if (lower === 'clear') {
      onAddLog('SYSTEM', 'Terminal output buffer refreshed.');
    } else {
      setTimeout(() => {
        onAddLog('WARN', `Unknown command: ${cmd}. Type 'help' for available directives.`);
      }, 150);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('architect@kaiju-systems.com');
    setCopiedEmail(true);
    analytics.track('CONTACT_SUBMIT', 'Email Copied');
    onAddLog('OK', 'Copied direct contact email to clipboard: architect@kaiju-systems.com');
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ------------------------------------------------------------- */}
      {/* 1. EXECUTIVE POSITIONING HERO                                 */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-2xl border border-[#98cbff]/20 bg-[#0d131a]/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[#98cbff]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-[#4edea3]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-1 text-xs font-mono tracking-wider text-[#98cbff]">
              <span className="h-2 w-2 rounded-full bg-[#4edea3] animate-pulse" />
              SYSTEM_ONLINE // AI-NATIVE SYSTEMS ARCHITECT & BUILDER
            </div>

            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white font-mono">
              Engineering High-Throughput Autonomous Systems, FinOps & AI Infrastructure
            </h1>

            <p className="text-sm md:text-base text-[#a3b1c2] leading-relaxed">
              Founder, Systems Architect, and Full-Stack Engineer bridging <strong className="text-white">Business Finance</strong> rigor with <strong className="text-[#98cbff]">AI-Native Development</strong>. Delivering low-latency microservices, zero-trust AI security firewalls, autonomous dispatch engines, and deterministic compliance verification pipelines.
            </p>

            {/* Core Capability Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#223142] bg-[#131b26] px-2.5 py-1 text-xs font-mono text-[#d1e1f5]">
                <Cpu className="h-3.5 w-3.5 text-[#98cbff]" /> AI Orchestration
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#223142] bg-[#131b26] px-2.5 py-1 text-xs font-mono text-[#d1e1f5]">
                <TrendingUp className="h-3.5 w-3.5 text-[#4edea3]" /> Cloud FinOps & Unit Economics
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#223142] bg-[#131b26] px-2.5 py-1 text-xs font-mono text-[#d1e1f5]">
                <Server className="h-3.5 w-3.5 text-[#98cbff]" /> Event-Driven Microservices
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#223142] bg-[#131b26] px-2.5 py-1 text-xs font-mono text-[#d1e1f5]">
                <Lock className="h-3.5 w-3.5 text-[#ffb4ab]" /> Zero-Trust AI Security
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#223142] bg-[#131b26] px-2.5 py-1 text-xs font-mono text-[#d1e1f5]">
                <Database className="h-3.5 w-3.5 text-[#4edea3]" /> ACID Ledgers & CRDTs
              </span>
            </div>
          </div>

          {/* Quick CTA Action Block */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
            <button
              onClick={() => {
                analytics.track('CASE_STUDY_VIEW', 'Hero CTA');
                onSelectScreen('CASE_STUDIES');
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#98cbff] to-[#76aae6] px-5 py-3 text-sm font-semibold text-[#001f3f] shadow-lg shadow-[#98cbff]/20 hover:opacity-95 transition-all"
            >
              <FileText className="h-4 w-4" />
              Explore 25-Sec Case Studies
            </button>

            <button
              onClick={() => {
                analytics.track('PAGE_VIEW', 'Architecture Hero CTA');
                onSelectScreen('ARCHITECTURE');
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#98cbff]/30 bg-[#131c28] px-5 py-3 text-sm font-medium text-[#98cbff] hover:bg-[#1a2636] transition-all font-mono"
            >
              <Layers className="h-4 w-4" />
              System Blueprints
            </button>

            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#2a3a4f] bg-[#0d141e] px-5 py-2.5 text-xs text-[#a3b1c2] hover:text-white hover:border-[#4edea3]/40 transition-all font-mono"
            >
              <CheckCircle2 className={`h-3.5 w-3.5 ${copiedEmail ? 'text-[#4edea3]' : 'text-slate-400'}`} />
              {copiedEmail ? 'Email Copied to Clipboard!' : 'Copy Direct Contact Email'}
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. REAL-TIME METRICS & CREDENTIAL STRIP                       */}
      {/* ------------------------------------------------------------- */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="rounded-xl border border-[#223142] bg-[#0e1620]/90 p-4">
          <div className="flex items-center justify-between text-xs text-[#7e8f9f] mb-1">
            <span>DISPATCH SPEED</span>
            <Zap className="h-3.5 w-3.5 text-[#4edea3]" />
          </div>
          <div className="text-2xl font-bold text-white">240ms</div>
          <div className="text-[11px] text-[#4edea3] mt-1">Metro Task Force Sub-Second</div>
        </div>

        <div className="rounded-xl border border-[#223142] bg-[#0e1620]/90 p-4">
          <div className="flex items-center justify-between text-xs text-[#7e8f9f] mb-1">
            <span>PROMPT FIREWALL</span>
            <ShieldCheck className="h-3.5 w-3.5 text-[#98cbff]" />
          </div>
          <div className="text-2xl font-bold text-white">99.4%</div>
          <div className="text-[11px] text-[#98cbff] mt-1">OWASP LLM Mitigation</div>
        </div>

        <div className="rounded-xl border border-[#223142] bg-[#0e1620]/90 p-4">
          <div className="flex items-center justify-between text-xs text-[#7e8f9f] mb-1">
            <span>SOC2 COMPLIANCE</span>
            <Code2 className="h-3.5 w-3.5 text-[#4edea3]" />
          </div>
          <div className="text-2xl font-bold text-white">4.2s / 100k</div>
          <div className="text-[11px] text-[#4edea3] mt-1">AST Tree-sitter Scan Speed</div>
        </div>

        <div className="rounded-xl border border-[#223142] bg-[#0e1620]/90 p-4">
          <div className="flex items-center justify-between text-xs text-[#7e8f9f] mb-1">
            <span>VOICE LATENCY</span>
            <Activity className="h-3.5 w-3.5 text-[#ffb4ab]" />
          </div>
          <div className="text-2xl font-bold text-white">168ms</div>
          <div className="text-[11px] text-[#ffb4ab] mt-1">WebAssembly DSP Voice</div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. PRIMARY PRODUCTION PROJECTS (6 Flagship Systems)           */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#98cbff]" />
            <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wide">
              Flagship Production Systems
            </h2>
          </div>
          <button
            onClick={() => onSelectScreen('PROJECTS')}
            className="text-xs font-mono text-[#98cbff] hover:underline flex items-center gap-1"
          >
            View Complete Catalog ({projectsData.length}) <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-xl border border-[#223142] bg-[#0d151f]/80 p-5 hover:border-[#98cbff]/50 hover:bg-[#111a26] transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-[#98cbff]/20 bg-[#98cbff]/10 px-2 py-0.5 text-[11px] font-mono text-[#98cbff]">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-[#4edea3]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4edea3]" />
                    {project.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white font-mono group-hover:text-[#98cbff] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs font-mono text-[#7e8f9f] mt-0.5">{project.tagline}</p>
                </div>

                <p className="text-xs text-[#a3b1c2] leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-[#16202c] px-2 py-0.5 text-[10px] font-mono text-[#8ca3b8] border border-[#223142]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] font-mono text-[#5c7082] px-1 self-center">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 mt-4 border-t border-[#1c2736] flex items-center justify-between">
                {project.metricsHighlight && (
                  <div className="text-[11px] font-mono text-[#d1e1f5]">
                    <span className="text-[#657a8e]">{project.metricsHighlight.label}: </span>
                    <span className="text-[#4edea3] font-bold">{project.metricsHighlight.value}</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    analytics.track('CASE_STUDY_VIEW', project.name);
                    onSelectScreen('CASE_STUDIES', project.slug);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#98cbff] hover:text-white transition-colors"
                >
                  Read 25-Sec Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. AI-NATIVE WORKFLOW & METHODOLOGY (Human vs AI Roles)       */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-xl border border-[#223142] bg-[#0c131d]/90 p-6">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="h-5 w-5 text-[#4edea3]" />
          <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide">
            AI-Native Engineering Methodology // Human-in-the-Loop Workflow
          </h2>
        </div>

        <p className="text-xs md:text-sm text-[#a3b1c2] leading-relaxed mb-6">
          I operate as a high-leverage <strong>Product Architect and Systems Designer</strong>. Software is not written through uncontrolled AI generation; rather, it follows a rigorous 10-step lifecycle where humans define the mathematical models, schemas, and security guardrails, while AI agents accelerate implementation and test generation under strict human validation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="rounded-lg border border-[#25394f] bg-[#0e1824] p-4 space-y-2">
            <div className="flex items-center gap-2 text-[#98cbff] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#98cbff]" />
              MY RESPONSIBILITIES (HUMAN ARCHITECT)
            </div>
            <ul className="space-y-1.5 text-[#a3b1c2]">
              <li>• Business requirements, unit economics & margin formulas</li>
              <li>• System architecture, state machine topology & database schemas</li>
              <li>• Security perimeter definition, threat modeling & compliance rules</li>
              <li>• Line-by-line code reviews, regression testing & load validation</li>
              <li>• Production deployment, FinOps cost monitoring & incident response</li>
            </ul>
          </div>

          <div className="rounded-lg border border-[#25394f] bg-[#0e1824] p-4 space-y-2">
            <div className="flex items-center gap-2 text-[#4edea3] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#4edea3]" />
              AI AGENT RESPONSIBILITIES (ORCHESTRATION)
            </div>
            <ul className="space-y-1.5 text-[#a3b1c2]">
              <li>• Rapid scaffolding of typed route handlers and schema bindings</li>
              <li>• Generating comprehensive unit & edge-case test suites (100+ tests/module)</li>
              <li>• Fast AST parser visitor generation and regex optimization</li>
              <li>• Drafting OpenAPI specs, TypeScript types, and documentation</li>
              <li>• Fuzzing and synthetic adversarial security test payload generation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. LIVE SYSTEM STDOUT TERMINAL & COMMAND LINE                 */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-xl border border-[#223142] bg-[#070b10] overflow-hidden font-mono shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1722] border-b border-[#1c2736]">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#98cbff]" />
            <span className="text-xs font-bold text-[#98cbff]">KAIJU_OS // L0_CORE_TELEMETRY_STREAM</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#657a8e]">
            <button
              onClick={() => setIsLogPaused(!isLogPaused)}
              className="hover:text-white transition-colors"
            >
              {isLogPaused ? '[RESUME STREAM]' : '[PAUSE STREAM]'}
            </button>
            <span className="text-[#4edea3]">• LIVE (48 events/min)</span>
          </div>
        </div>

        {/* Scrollable Terminal Output */}
        <div
          ref={terminalScrollRef}
          className="h-48 overflow-y-auto p-4 space-y-1 text-xs text-[#a3b1c2] bg-[#05080c]"
        >
          {logs.slice(-30).map((log) => (
            <div key={log.id} className="flex items-start gap-2 leading-relaxed">
              <span className="text-[#4b5e70] shrink-0">[{log.time}]</span>
              <span
                className={`font-bold shrink-0 ${
                  log.type === 'OK'
                    ? 'text-[#4edea3]'
                    : log.type === 'WARN'
                    ? 'text-[#f5a623]'
                    : log.type === 'ERROR'
                    ? 'text-[#ffb4ab]'
                    : log.type === 'CMD'
                    ? 'text-[#98cbff]'
                    : 'text-[#8ba2b8]'
                }`}
              >
                [{log.type}]
              </span>
              <span className="text-[#d1e1f5] break-all">{log.text}</span>
              {log.subtext && <span className="text-[#5f7488] text-[11px]">({log.subtext})</span>}
            </div>
          ))}
        </div>

        {/* Interactive CLI Input */}
        <form
          onSubmit={handleExecuteCommand}
          className="flex items-center border-t border-[#1c2736] bg-[#0a1017] px-4 py-2"
        >
          <span className="text-[#98cbff] mr-2 text-xs font-bold">kaiju@core:~$</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Type 'help', 'projects', 'casestudies', 'arch', 'skills'..."
            className="flex-1 bg-transparent text-xs text-white placeholder-[#455768] outline-none font-mono"
          />
          <button
            type="submit"
            className="text-xs bg-[#162230] text-[#98cbff] hover:text-white px-2.5 py-1 rounded border border-[#223142] transition-colors"
          >
            EXECUTE
          </button>
        </form>
      </section>
    </div>
  );
};
