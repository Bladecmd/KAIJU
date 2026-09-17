import React, { useState } from 'react';
import { LogItem, ScreenId, ProjectItem } from '../../types';
import { projectsData } from '../../data/projectsData';
import { analytics } from '../../services/analytics';
import {
  FileText,
  Layers,
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
  Terminal,
  Clock,
  Zap,
  Network,
  Share2,
  Eye,
  Workflow,
  Sparkles,
  Award,
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
  onSelectScreen,
  onOpenCommandPalette,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('blade@kaiju-systems.com');
    setCopiedEmail(true);
    analytics.track('CONTACT_SUBMIT', 'Email Copied (Homepage Hero)');
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const filteredProjects = projectsData.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'LIVE') return p.status === 'LIVE';
    if (selectedFilter === 'AI') return p.category === 'AI_ORCHESTRATION' || p.category === 'COMPLIANCE_SEC';
    if (selectedFilter === 'AUTOMATION') return p.category === 'AUTOMATION_DISPATCH' || p.category === 'ENTERPRISE_RPA';
    return true;
  });

  return (
    <div className="space-y-12 animate-fadeIn pb-12">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION (CLARITY + GROUNDED HUMAN PERSONALITY)        */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-3xl border border-[#98cbff]/25 bg-[#090f17]/90 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-[#98cbff]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-[#4edea3]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-5 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3.5 py-1 text-xs font-mono tracking-wider text-[#98cbff]">
              <span className="h-2 w-2 rounded-full bg-[#4edea3] animate-pulse" />
              BLADE // SYSTEMS ARCHITECT & BUILDER
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans leading-tight">
              I build intelligent systems for real-world problems.
            </h1>

            <p className="text-base sm:text-lg text-[#a3b1c2] leading-relaxed font-sans">
              AI, automation, software, and business systems — with a bias toward figuring out what actually needs building and making sure it survives reality.
            </p>

            {/* Human Personality Hook */}
            <div className="text-xs sm:text-sm font-mono text-[#4edea3] bg-[#070b10] border border-[#1a2636] p-3 rounded-xl">
              &gt; Business degree. Operating companies. A slightly unreasonable interest in automation.
            </div>

            {/* Credibility Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#223142] bg-[#111924] px-3 py-1 text-xs font-mono text-[#d1e1f5]">
                <Cpu className="h-3.5 w-3.5 text-[#98cbff]" /> AI-Native Producer
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#223142] bg-[#111924] px-3 py-1 text-xs font-mono text-[#d1e1f5]">
                <TrendingUp className="h-3.5 w-3.5 text-[#4edea3]" /> BSc Business Finance (2:1)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#223142] bg-[#111924] px-3 py-1 text-xs font-mono text-[#d1e1f5]">
                <Workflow className="h-3.5 w-3.5 text-[#ffb4ab]" /> Automation (UiPath / Node)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#223142] bg-[#111924] px-3 py-1 text-xs font-mono text-[#d1e1f5]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#98cbff]" /> Zero-Trust Defenses
              </span>
            </div>
          </div>

          {/* Quick CTA Action Block */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
            <button
              onClick={() => {
                analytics.track('CASE_STUDY_VIEW', 'Hero CTA Explore Work');
                onSelectScreen('PROJECTS');
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#98cbff] px-6 py-3.5 text-sm font-semibold text-[#001f3f] shadow-lg shadow-[#98cbff]/25 hover:bg-white transition-all cursor-pointer font-sans"
            >
              <FileText className="h-4 w-4" />
              Explore the Work
            </button>

            <button
              onClick={() => {
                analytics.track('PAGE_VIEW', 'Hero CTA Experience CV');
                onSelectScreen('EXPERIENCE');
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#4edea3]/40 bg-[#102018] px-6 py-3.5 text-sm font-bold text-[#4edea3] hover:bg-[#4edea3] hover:text-[#001f3f] transition-all cursor-pointer font-mono shadow-sm"
            >
              <Award className="h-4 w-4" />
              View CV / Credentials
            </button>

            <button
              onClick={() => onSelectScreen('CONTACT')}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#223142] bg-[#0c141f] px-5 py-2.5 text-xs text-[#a3b1c2] hover:text-white hover:border-[#98cbff]/40 transition-all font-mono cursor-pointer"
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE MEANING OF KAIJU // WHY KAIJU?                         */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[#223142] bg-[#080d14]/95 p-6 sm:p-10 space-y-6 shadow-xl font-sans">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-0.5 text-xs font-mono text-[#98cbff]">
            <Sparkles className="h-3 w-3" />
            THE IDENTITY // WHY KAIJU?
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
            A collection of things that don't normally belong together.
          </h2>
          <p className="text-sm sm:text-base text-[#a3b1c2] leading-relaxed">
            Kaiju isn't a monster gimmick or a corporate slogan. It’s a metaphor for an unconventional combination of abilities that came from building real things, breaking things, studying business, writing software, automating manual processes, and following problems wherever they led.
          </p>
          <p className="text-sm text-[#8ca3b8] leading-relaxed">
            Most people specialize inside one narrow lane. Blade works where multiple disciplines collide:
          </p>
        </div>

        {/* The Compound Range Formula Strip */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#04070a] border border-[#16212d] text-xs font-mono text-[#98cbff] flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
          <span className="px-2.5 py-1 rounded bg-[#101b28] border border-[#1c2e44] text-white">BUSINESS</span>
          <span className="text-[#657a8e]">×</span>
          <span className="px-2.5 py-1 rounded bg-[#101b28] border border-[#1c2e44] text-[#4edea3]">FINANCE</span>
          <span className="text-[#657a8e]">×</span>
          <span className="px-2.5 py-1 rounded bg-[#101b28] border border-[#1c2e44] text-white">AI</span>
          <span className="text-[#657a8e]">×</span>
          <span className="px-2.5 py-1 rounded bg-[#101b28] border border-[#1c2e44] text-[#ffb4ab]">AUTOMATION</span>
          <span className="text-[#657a8e]">×</span>
          <span className="px-2.5 py-1 rounded bg-[#101b28] border border-[#1c2e44] text-white">SOFTWARE</span>
          <span className="text-[#657a8e]">×</span>
          <span className="px-2.5 py-1 rounded bg-[#101b28] border border-[#1c2e44] text-[#98cbff]">SECURITY</span>
          <span className="text-[#657a8e]">×</span>
          <span className="px-2.5 py-1 rounded bg-[#101b28] border border-[#1c2e44] text-white">OPERATIONS</span>
          <span className="text-[#657a8e]">×</span>
          <span className="px-2.5 py-1 rounded bg-[#101b28] border border-[#1c2e44] text-[#f5a623]">SALES</span>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. "I TEND TO SIT IN THE GAPS" // WHAT I ACTUALLY DO          */}
      {/* ------------------------------------------------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 rounded-3xl border border-[#223142] bg-[#0c131d]/90 p-6 sm:p-8 space-y-4 shadow-xl flex flex-col justify-between font-sans">
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#4edea3] uppercase tracking-wider font-bold">
              02 // HOW I OPERATE
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight font-sans">
              I tend to sit in the gaps.
            </h2>
            <div className="space-y-2 text-sm text-[#a3b1c2] leading-relaxed">
              <p>• Where business strategy meets technical reality.</p>
              <p>• Where a slow, manual process needs to become an autonomous workflow.</p>
              <p>• Where a rough commercial idea becomes a working, tested software system.</p>
              <p>• Where messy operational data needs to become an automated decision.</p>
            </div>
            <p className="text-xs text-[#8ca3b8] pt-2 leading-relaxed">
              I'm not just a pure coder in a dark room, and I'm not a PowerPoint consultant. I understand the balance sheet, unit margins, and user friction — and I have the engineering skills to build the solution.
            </p>
          </div>

          <div className="pt-4 border-t border-[#1c2736] flex items-center justify-between">
            <span className="text-xs font-mono text-[#98cbff]">COMMERCIAL INTENT + TECHNICAL DEPTH</span>
            <button
              onClick={() => onSelectScreen('SKILLS')}
              className="text-xs font-mono text-[#4edea3] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Capability Matrix <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-2 hover:border-[#98cbff]/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#98cbff]/10 border border-[#98cbff]/30 flex items-center justify-center text-[#98cbff]">
              <Cpu className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">AI & Intelligent Systems</h3>
            <p className="text-xs text-[#8ca3b8] leading-relaxed font-sans">
              Multi-provider model gateways (Gemini / Claude), attention filtering, bounded memory partitions, and schema enforcement without hallucinations.
            </p>
            <span className="text-[11px] font-mono text-[#98cbff] block pt-1">USED IN: NOVA / Sovereign Security</span>
          </div>

          <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-2 hover:border-[#4edea3]/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#4edea3]/10 border border-[#4edea3]/30 flex items-center justify-center text-[#4edea3]">
              <Workflow className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">Operational Automation & RPA</h3>
            <p className="text-xs text-[#8ca3b8] leading-relaxed font-sans">
              UiPath REFramework, field service dispatch engines, dynamic quotation pricing, SMS/WhatsApp alerts, and automated escrow payouts.
            </p>
            <span className="text-[11px] font-mono text-[#4edea3] block pt-1">USED IN: Metro Task Force / UiPath</span>
          </div>

          <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-2 hover:border-[#ffb4ab]/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 flex items-center justify-center text-[#ffb4ab]">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">Defensive Security & Guardrails</h3>
            <p className="text-xs text-[#8ca3b8] leading-relaxed font-sans">
              Zero-trust prompt injection firewalls, egress token sanitizers, isolated V8 sandboxes, and immutable cryptographic audit logging.
            </p>
            <span className="text-[11px] font-mono text-[#ffb4ab] block pt-1">USED IN: Sovereign Security / Compliance Labs</span>
          </div>

          <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-2 hover:border-[#98cbff]/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#98cbff]/10 border border-[#98cbff]/30 flex items-center justify-center text-[#98cbff]">
              <TrendingUp className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">FinOps & Business Systems</h3>
            <p className="text-xs text-[#8ca3b8] leading-relaxed font-sans">
              Positive unit-margin enforcement, double-entry ledgers, commercial finance underwriting checks, and operational cash flow attribution.
            </p>
            <span className="text-[11px] font-mono text-[#98cbff] block pt-1">USED IN: MTF / Sovereign OS / GriDD</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. REAL-WORLD BUILDING DIFFERENTIATOR                         */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[#1e3b2e] bg-gradient-to-r from-[#09140e] to-[#070b10] p-6 sm:p-10 shadow-xl font-sans">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono text-[#4edea3] uppercase font-bold tracking-wider">
            COMMERCIAL REALITY // NOT JUST TOY PROJECTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Some of these aren't portfolio projects. They're businesses.
          </h2>
          <p className="text-sm text-[#a3b1c2] leading-relaxed">
            That changes the questions completely:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-[#d1e1f5]">
            <div className="p-3 rounded-xl bg-black/40 border border-[#1c2e22]">
              <span className="text-[#4edea3] font-bold block">• Does someone actually pay for it?</span>
              <p className="text-[#8ca3b8] text-[11px] mt-0.5">Commercial viability & pricing model validation.</p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-[#1c2e22]">
              <span className="text-[#4edea3] font-bold block">• Can it survive a bad API response?</span>
              <p className="text-[#8ca3b8] text-[11px] mt-0.5">Circuit breakers, degraded mode, and graceful recovery.</p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-[#1c2e22]">
              <span className="text-[#4edea3] font-bold block">• What does it cost to operate?</span>
              <p className="text-[#8ca3b8] text-[11px] mt-0.5">FinOps discipline: token optimization & positive margins.</p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-[#1c2e22]">
              <span className="text-[#4edea3] font-bold block">• Can non-technical people use it?</span>
              <p className="text-[#8ca3b8] text-[11px] mt-0.5">PWA offline clients for field service crews in Greater London.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SELECTED SYSTEMS & HONEST PROJECT STATUS                   */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#1c2736] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-0.5 text-xs font-mono text-[#98cbff] mb-1">
              <Briefcase className="h-3.5 w-3.5" />
              THE CONNECTED PORTFOLIO // STRICT TRUTH MODEL
            </div>
            <h2 className="text-2xl font-bold text-white font-mono">
              Selected Systems & Engineering Evidence
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['ALL', 'LIVE', 'AI', 'AUTOMATION'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedFilter === f
                    ? 'bg-[#98cbff] text-[#001f3f] font-bold shadow'
                    : 'border border-[#223142] bg-[#0d141e] text-[#8ca3b8] hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 hover:border-[#98cbff]/50 transition-all shadow-xl space-y-5 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-[#121c28] border border-[#1e2d3d] px-2 py-0.5 text-[10px] font-mono text-[#98cbff]">
                    {project.category}
                  </span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
                      project.status === 'LIVE'
                        ? 'bg-[#4edea3]/15 text-[#4edea3] border border-[#4edea3]/30'
                        : project.status === 'PRODUCTION'
                        ? 'bg-[#98cbff]/15 text-[#98cbff] border border-[#98cbff]/30'
                        : project.status === 'VALIDATION'
                        ? 'bg-[#f5a623]/15 text-[#f5a623] border border-[#f5a623]/30'
                        : 'bg-[#657a8e]/15 text-[#8ca3b8] border border-[#657a8e]/30'
                    }`}
                  >
                    STATUS: {project.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-mono group-hover:text-[#98cbff] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#7e8f9f] font-mono mt-0.5">{project.tagline}</p>
                </div>

                <p className="text-xs text-[#a3b1c2] leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Provenance Claims */}
                {project.claims && project.claims.length > 0 && (
                  <div className="rounded-xl border border-[#1a2636] bg-[#070b10] p-3 space-y-1.5 font-mono text-[11px]">
                    <span className="text-[#657a8e] uppercase font-bold text-[10px] block">
                      Truth-Ledger Claim Verification:
                    </span>
                    <div className="flex items-start gap-2">
                      <span className="text-[#4edea3] font-bold shrink-0">
                        [{project.claims[0].status}]
                      </span>
                      <span className="text-[#d1e1f5] line-clamp-2">{project.claims[0].text}</span>
                    </div>
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-[#121c27] px-2 py-0.5 text-[10px] font-mono text-[#8ca3b8] border border-[#1e2d3d]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] font-mono text-[#5c7287] self-center">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1c2736] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#657a8e]">
                  {project.metricsHighlight ? `${project.metricsHighlight.label}: ${project.metricsHighlight.value}` : 'Architecture Verified'}
                </span>
                <button
                  onClick={() => {
                    analytics.track('CASE_STUDY_VIEW', project.name);
                    onSelectScreen('CASE_STUDIES', project.slug);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#98cbff] hover:text-white transition-colors cursor-pointer"
                >
                  Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. SOVEREIGN ECOSYSTEM ARCHITECTURAL TOPOLOGY                 */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[#223142] bg-[#070b10] p-6 sm:p-8 space-y-6 shadow-2xl font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#1c2736] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-0.5 text-xs text-[#98cbff] mb-1">
              <Network className="h-3.5 w-3.5" />
              SYSTEM TOPOLOGY // ARCHITECTURAL BOUNDARIES
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Sovereign Ecosystem Architecture
            </h2>
          </div>
          <button
            onClick={() => onSelectScreen('ARCHITECTURE')}
            className="text-xs text-[#98cbff] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Open Blueprint Explorer <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#a3b1c2] font-sans leading-relaxed">
          The sovereign ecosystem preserves strict separation of concerns across public, executive, defensive, operational, and commercial entities. Kaiju serves as the public flag and does not control internal infrastructure.
        </p>

        {/* Visual ASCII / Topology Block */}
        <div className="p-5 rounded-2xl bg-[#04070a] border border-[#16212d] text-xs text-[#d1e1f5] overflow-x-auto whitespace-pre leading-relaxed font-mono">
{`KAIJU (Public Portfolio & Evidence Flag)
    │
    ▼
BLADE (Producer / Systems Architect & Operator)
    │
    ▼
NOVA (Personal Executive Intelligence)
    │   • Model Gateway (Gemini / Claude failover)
    │   • Memory Partitions & Attention Engine
    │
    ▼
SOVEREIGN SECURITY (Defensive Security & Policy Governance)
    │   • Zero-Trust Inline Tool Proxy
    │   • Prompt Injection Mitigation (OWASP LLM)
    │   • Ephemeral Scoped Token Minting
    │
    ▼
SOVEREIGN OS (Executive Intelligence & Truth Ledger)
    │
    ├── METRO TASK FORCE (Operational Field Service Business & Platform) [LIVE]
    ├── COMPLIANCE LABS & CAPITAL (Heavy-Industry Compliance & Finance) [BUILDING]
    └── AUDIOBLUE (Subscription Audio Media & Low-Latency DSP) [DEVELOPMENT]

GRIDD CORP (Ownership, Corporate Governance & Capital Allocation Infrastructure) [HISTORICAL]`}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. "HOW I BUILD" // THE PRODUCER METHODOLOGY                  */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[#223142] bg-[#0c131d]/90 p-6 sm:p-8 space-y-6 shadow-xl font-mono">
        <div className="flex items-center gap-2 border-b border-[#1c2736] pb-4">
          <GitBranch className="h-5 w-5 text-[#4edea3]" />
          <h2 className="text-xl font-bold text-white uppercase tracking-wide">
            How I Build // The 10-Stage Systems Production Methodology
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#a3b1c2] font-sans leading-relaxed">
          Operating as an AI-native producer means taking responsibility for the end-to-end outcome: <strong>direction + architecture + orchestration + validation + deployment + business understanding</strong>. AI accelerates code implementation and test harness construction, but the human architect strictly defines the business problem, security perimeter, and truth criteria.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {[
            { step: '01', title: 'IDENTIFY', desc: 'Pinpoint operational bottleneck & margin leak' },
            { step: '02', title: 'DEFINE', desc: 'Specify inputs, outputs, and financial boundaries' },
            { step: '03', title: 'ARCHITECT', desc: 'Design state machine, schemas & data flow' },
            { step: '04', title: 'BUILD', desc: 'Accelerated implementation via AI engineering' },
            { step: '05', title: 'INTEGRATE', desc: 'Connect APIs, webhooks, and legacy systems' },
            { step: '06', title: 'SECURE', desc: 'Enforce zero-trust rules & isolated sandboxes' },
            { step: '07', title: 'TEST', desc: 'Automated unit, integration, and fuzz suites' },
            { step: '08', title: 'DEPLOY', desc: 'Containerized staging and edge distribution' },
            { step: '09', title: 'MEASURE', desc: 'Real telemetry, unit margins & error rates' },
            { step: '10', title: 'ITERATE', desc: 'Refine from live operational field feedback' },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-[#1e2d3d] bg-[#080d14] p-3 space-y-1 hover:border-[#98cbff]/40 transition-all"
            >
              <span className="text-[10px] font-bold text-[#98cbff]">{item.step}</span>
              <div className="text-white font-bold text-xs">{item.title}</div>
              <p className="text-[10px] text-[#657a8e] font-sans leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. PROOF & OPERATING EVIDENCE // TRUTH LEDGER                 */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[#223142] bg-[#0c131d]/90 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#1c2736] pb-4 font-mono">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[#4edea3]" />
            <h2 className="text-xl font-bold text-white uppercase">
              Verifiable Operational Proof & Evidence
            </h2>
          </div>
          <span className="text-xs text-[#657a8e]">STRICT PROVENANCE ENFORCEMENT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
          <div className="rounded-2xl border border-[#1e2d3d] bg-[#080d14] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#4edea3] font-bold text-sm">METRO TASK FORCE</span>
              <span className="rounded bg-[#4edea3]/10 text-[#4edea3] px-2 py-0.5 text-[10px] border border-[#4edea3]/30">
                LIVE OPERATION
              </span>
            </div>
            <p className="text-[#a3b1c2] font-sans text-xs">
              Automated emergency pricing engine and contractor dispatch queue operating in production. Tested with explicit equipment/severity pricing and UK timezone routing.
            </p>
            <div className="pt-2 border-t border-[#162230] text-[#71879c] text-[11px]">
              EVIDENCE: Production deployment + automated test suite passed.
            </div>
          </div>

          <div className="rounded-2xl border border-[#1e2d3d] bg-[#080d14] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#98cbff] font-bold text-sm">NOVA & SOVEREIGN SEC</span>
              <span className="rounded bg-[#98cbff]/10 text-[#98cbff] px-2 py-0.5 text-[10px] border border-[#98cbff]/30">
                TEST BENCHMARKS
              </span>
            </div>
            <p className="text-[#a3b1c2] font-sans text-xs">
              Model Gateway failover tested under synthetic API outages. Zero-trust proxy evaluated against simulated OWASP Top 10 for LLMs prompt injection test suites.
            </p>
            <div className="pt-2 border-t border-[#162230] text-[#71879c] text-[11px]">
              EVIDENCE: Benchmark suites + JSON schema compilation tests.
            </div>
          </div>

          <div className="rounded-2xl border border-[#1e2d3d] bg-[#080d14] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#d1e1f5] font-bold text-sm">FINANCE & GOVERNANCE</span>
              <span className="rounded bg-[#f5a623]/10 text-[#f5a623] px-2 py-0.5 text-[10px] border border-[#f5a623]/30">
                ACADEMIC HONOURS
              </span>
            </div>
            <p className="text-[#a3b1c2] font-sans text-xs">
              BSc Business Finance & Economics honors degree provides formal grounding in double-entry bookkeeping, corporate valuation, cash flow waterfalls, and FinOps margin controls.
            </p>
            <div className="pt-2 border-t border-[#162230] text-[#71879c] text-[11px]">
              EVIDENCE: Verified degree credentials + financial models.
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. WHERE I FIT & WHAT I'M LOOKING FOR (OPPORTUNITY ENGINE)    */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[#98cbff]/30 bg-[#080d14]/95 p-6 sm:p-10 space-y-8 shadow-2xl font-sans">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1c2736] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#98cbff] uppercase tracking-wider font-bold">
              OPPORTUNITIES & COLLABORATION // WHERE I FIT
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Open to conversations around:
            </h2>
            <p className="text-sm text-[#a3b1c2] max-w-2xl leading-relaxed">
              If you need someone who only performs one narrow, predefined task inside a rigid box, there may be better specialists. But if you need someone who can understand the commercial problem, design the state machine, work across technology and AI, and make the pieces operate together in the real world — let's talk.
            </p>
          </div>

          <button
            onClick={() => onSelectScreen('CONTACT')}
            className="rounded-xl bg-[#98cbff] px-5 py-3 text-xs font-bold font-mono text-[#001f3f] hover:bg-white transition-all self-start md:self-auto cursor-pointer shadow-md"
          >
            Start a Conversation &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl border border-[#1e2d3d] bg-[#0c141f] space-y-2 hover:border-[#98cbff]/40 transition-all">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Cpu className="h-4 w-4 text-[#98cbff]" /> AI & Automation Engineering
            </div>
            <p className="text-[#8ca3b8] font-sans text-xs leading-relaxed">
              Building and deploying practical agent gateways, prompt injection firewalls, and UiPath REFramework process automation.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#1e2d3d] bg-[#0c141f] space-y-2 hover:border-[#4edea3]/40 transition-all">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Layers className="h-4 w-4 text-[#4edea3]" /> Technical Solutions & Systems
            </div>
            <p className="text-[#8ca3b8] font-sans text-xs leading-relaxed">
              Translating messy, ambiguous commercial requirements into deterministic state machines, schemas, and robust microservices.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#1e2d3d] bg-[#0c141f] space-y-2 hover:border-[#ffb4ab]/40 transition-all">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <TrendingUp className="h-4 w-4 text-[#ffb4ab]" /> Business Systems & FinOps
            </div>
            <p className="text-[#8ca3b8] font-sans text-xs leading-relaxed">
              Internal tools, automated quotation/pricing engines, double-entry financial ledgers, and operational margin controls.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#1e2d3d] bg-[#0c141f] space-y-2 hover:border-[#98cbff]/40 transition-all">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Zap className="h-4 w-4 text-[#98cbff]" /> Early-Stage Build Teams
            </div>
            <p className="text-[#8ca3b8] font-sans text-xs leading-relaxed">
              High-ownership startup environments where cross-functional problem solving, speed, and real-world execution matter.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#1e2d3d] bg-[#0c141f] space-y-2 hover:border-[#4edea3]/40 transition-all">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="h-4 w-4 text-[#4edea3]" /> Technical Consulting & Advisory
            </div>
            <p className="text-[#8ca3b8] font-sans text-xs leading-relaxed">
              Helping businesses identify high-ROI automation opportunities and implement AI workflows that don't leak confidential data.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#1e2d3d] bg-[#0c141f] space-y-2 hover:border-[#f5a623]/40 transition-all">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Workflow className="h-4 w-4 text-[#f5a623]" /> Partnerships & New Ventures
            </div>
            <p className="text-[#8ca3b8] font-sans text-xs leading-relaxed">
              Collaborating with founders, operators, and subject-matter experts to co-build software that solves painful industry problems.
            </p>
          </div>
        </div>

        {/* The Honest AI Disclosure Callout */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[#1c2e44] bg-[#04080e] font-sans text-xs text-[#a3b1c2] space-y-2">
          <div className="flex items-center gap-2 text-[#98cbff] font-bold font-mono text-sm">
            <Sparkles className="h-4 w-4" /> THE AI-NATIVE PRODUCER MODEL // HONEST DISCLOSURE
          </div>
          <p className="leading-relaxed">
            I use AI heavily during development. But the important part isn't asking a model to write code. It's deciding what should exist, how the pieces fit together, what can go wrong, how it should be tested, and whether the result actually works in the real world.
          </p>
          <p className="text-white font-bold font-mono pt-1">
            AI accelerates implementation. Human judgement owns the system.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. CONTACT & INBOUND CONVERSION (HUMAN & DIRECT)              */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[#98cbff]/30 bg-gradient-to-b from-[#0e1724] to-[#070c12] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono text-[#98cbff] uppercase tracking-wider font-bold">
            LET'S SEE IF I CAN HELP
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
            Have an interesting problem?
          </h2>
          <p className="text-sm text-[#a3b1c2] font-sans leading-relaxed">
            Whether you're a recruiter filling a high-impact technical role, a founder needing systems that scale, or an engineering lead looking for a builder who understands the commercial picture — I'd be glad to hear from you.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onSelectScreen('CONTACT')}
            className="rounded-xl bg-[#98cbff] px-6 py-3.5 text-sm font-semibold text-[#001f3f] shadow-lg shadow-[#98cbff]/25 hover:bg-white transition-all cursor-pointer font-sans"
          >
            Start a Conversation
          </button>

          <button
            onClick={() => onSelectScreen('EXPERIENCE')}
            className="rounded-xl border border-[#4edea3]/40 bg-[#102018] px-6 py-3.5 text-sm font-mono text-[#4edea3] font-bold hover:bg-[#4edea3] hover:text-[#001f3f] transition-all cursor-pointer shadow-sm"
          >
            Download Full CV / Credentials
          </button>
        </div>
      </section>
    </div>
  );
};

