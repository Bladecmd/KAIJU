import React, { useState, useEffect } from 'react';
import { allCaseStudies, getCaseStudyBySlug } from '../../data/caseStudies';
import { CaseStudyData, ScreenId } from '../../types';
import { analytics } from '../../services/analytics';
import { getTechnicalBrief } from '../../data/technicalBriefsData';
import { accessControl } from '../../services/accessControl';
import { TechnicalBriefModal } from '../TechnicalBriefModal';
import { TechnicalBriefViewer } from '../TechnicalBriefViewer';
import {
  FileText,
  Layers,
  ArrowUpRight,
  Github,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Server,
  Database,
  Lock,
  Unlock,
  ChevronDown,
  ChevronUp,
  Search,
  Share2,
  ExternalLink,
  Code2,
  GitBranch,
  HelpCircle,
  Clock,
  Activity,
  DollarSign,
  Copy,
  Check,
} from 'lucide-react';

interface CaseStudiesScreenProps {
  initialSlug?: string;
  onSelectScreen: (screenId: ScreenId, caseStudySlug?: string) => void;
}

export const CaseStudiesScreen: React.FC<CaseStudiesScreenProps> = ({
  initialSlug,
  onSelectScreen,
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialSlug || 'metro-task-force'
  );
  const [activeSection, setActiveSection] = useState<string>('01');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [isViewingBrief, setIsViewingBrief] = useState(false);

  useEffect(() => {
    if (initialSlug) {
      setSelectedSlug(initialSlug);
    }
  }, [initialSlug]);

  const currentStudy: CaseStudyData =
    getCaseStudyBySlug(selectedSlug) || allCaseStudies[0];
  const technicalBrief = getTechnicalBrief(selectedSlug);
  const hasUnlockedBrief = accessControl.hasAccess(selectedSlug);

  const handleCopySectionLink = (secId: string) => {
    const url = `${window.location.origin}/#casestudy=${selectedSlug}&section=${secId}`;
    navigator.clipboard.writeText(url);
    setCopiedSection(secId);
    analytics.track('CASE_STUDY_VIEW', `${currentStudy.identity.projectName} Sec ${secId}`);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const sectionsList = [
    { id: '01', title: '01. Project Identity' },
    { id: '02', title: '02. One-Minute Story' },
    { id: '03', title: '03. Business Context (FinOps)' },
    { id: '04', title: '04. System Objectives' },
    { id: '05', title: '05. Architecture Spec' },
    { id: '06', title: '06. End-to-End Data Flow' },
    { id: '07', title: '07. Hard Problems Solved' },
    { id: '08', title: '08. Architectural Decisions' },
    { id: '09', title: '09. AI-Native Development' },
    { id: '10', title: '10. My Contribution' },
    { id: '11', title: '11. Automation Matrix' },
    { id: '12', title: '12. AI / Agent Architecture' },
    { id: '13', title: '13. Security & Threats' },
    { id: '14', title: '14. FinOps & Cost Controls' },
    { id: '15', title: '15. Testing Suite' },
    { id: '16', title: '16. Production Evidence' },
    { id: '17', title: '17. Performance Metrics' },
    { id: '18', title: '18. Failure & Recovery' },
    { id: '19', title: '19. Results & Impact' },
    { id: '20', title: '20. What I Learned' },
    { id: '21', title: '21. Engineering Reality (Incidents)' },
    { id: '22', title: '22. What I Would Do Differently' },
    { id: '23', title: '23. Future Roadmap' },
    { id: '24', title: '24. Interview Q&A Defense' },
    { id: '25', title: '25. Executive Summary' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`sec-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Technical Brief Modal */}
      <TechnicalBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        projectSlug={selectedSlug}
        projectName={currentStudy.identity.projectName}
        onAccessGranted={() => {
          setIsBriefModalOpen(false);
          setIsViewingBrief(true);
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* 1. PROJECT SELECTOR TABS                                      */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-2xl border border-[#223142] bg-[#0c141e]/90 p-4 md:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-1 text-xs font-mono text-[#98cbff]">
            <FileText className="h-3.5 w-3.5" />
            PROGRESSIVE DISCLOSURE EVIDENCE // LEVEL 1 PUBLIC & LEVEL 2 RESTRICTED
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#657a8e] hidden md:inline">
              Select system:
            </span>
            {hasUnlockedBrief && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] flex items-center gap-1">
                <Unlock className="h-3 w-3" /> Level 2 Active
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {allCaseStudies.map((cs) => {
            const isSelected = cs.slug === selectedSlug;
            return (
              <button
                key={cs.id}
                onClick={() => {
                  setSelectedSlug(cs.slug);
                  setIsViewingBrief(false);
                  analytics.track('CASE_STUDY_VIEW', cs.identity.projectName);
                }}
                className={`flex flex-col items-start p-3 rounded-xl text-left font-mono transition-all ${
                  isSelected
                    ? 'border border-[#98cbff] bg-[#142334] text-white shadow-lg shadow-[#98cbff]/10'
                    : 'border border-[#223142] bg-[#0d151f] text-[#8ca3b8] hover:text-white hover:border-[#35485e]'
                }`}
              >
                <span className="text-xs font-bold leading-tight">
                  {cs.identity.projectName}
                </span>
                <span className="text-[10px] text-[#4edea3] mt-1 truncate w-full">
                  {cs.identity.status.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* If User Is Actively Viewing Unlocked Level 2 Brief */}
      {isViewingBrief && technicalBrief ? (
        <TechnicalBriefViewer
          brief={technicalBrief}
          onBackToCaseStudy={() => setIsViewingBrief(false)}
          onContactBlade={() => onSelectScreen('CONTACT')}
        />
      ) : (
        <>
          {/* Level 2 Disclosure Banner */}
          {technicalBrief && (
            <div className="rounded-2xl border border-[#233548] bg-gradient-to-r from-[#0d1622] to-[#091018] p-5 md:p-6 flex items-center justify-between flex-wrap gap-4 shadow-lg font-mono">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#98cbff]/10 border border-[#98cbff]/30 text-[#98cbff] font-bold">
                    LEVEL 2 TECHNICAL BRIEF AVAILABLE
                  </span>
                  <span className="text-[11px] text-[#657a8e]">
                    Sequence flows, atomic locks, failure modes & trade-offs
                  </span>
                </div>
                <h3 className="text-sm md:text-base font-bold text-white">
                  Want the deeper technical breakdown for {currentStudy.identity.projectName}?
                </h3>
                <p className="text-xs text-[#a3b1c2] font-sans">
                  Inspect high-resolution microservice topology, atomic mutex scripts, and production trade-offs without proprietary IP exposure.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {hasUnlockedBrief ? (
                  <button
                    onClick={() => setIsViewingBrief(true)}
                    className="flex items-center gap-2 rounded-xl bg-[#98cbff] px-4 py-2.5 text-xs font-bold text-[#001f3f] hover:opacity-90 transition-all cursor-pointer shadow-md shadow-[#98cbff]/15"
                  >
                    <Unlock className="h-4 w-4" /> View Unlocked Technical Brief
                  </button>
                ) : (
                  <button
                    onClick={() => setIsBriefModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-[#142334] border border-[#98cbff]/40 px-4 py-2.5 text-xs font-bold text-[#98cbff] hover:bg-[#98cbff] hover:text-[#001f3f] transition-all cursor-pointer shadow-md"
                  >
                    <Lock className="h-3.5 w-3.5" /> Request Technical Brief
                  </button>
                )}
              </div>
            </div>
          )}

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN CASE STUDY CONTAINER WITH SIDEBAR JUMP MATRIX         */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky 25-Section Jump Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 rounded-2xl border border-[#223142] bg-[#0a1017]/90 p-4 font-mono max-h-[calc(100vh-8rem)] overflow-y-auto text-xs space-y-1">
          <div className="text-[11px] font-bold text-[#657a8e] uppercase px-2 py-1 mb-2 border-b border-[#1c2736]">
            25-Section Blueprint Index
          </div>
          {sectionsList.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all ${
                activeSection === sec.id
                  ? 'bg-[#98cbff]/20 text-[#98cbff] font-bold border border-[#98cbff]/40'
                  : 'text-[#8ca3b8] hover:text-white hover:bg-[#121c27]'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </aside>

        {/* Main 25-Section Content Area */}
        <main className="lg:col-span-9 space-y-10">
          {/* SEC 01: PROJECT IDENTITY */}
          <section id="sec-01" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                01 // PROJECT IDENTITY
              </span>
              <button
                onClick={() => handleCopySectionLink('01')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '01' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h1 className="text-2xl md:text-4xl font-bold text-white font-mono">
                  {currentStudy.identity.projectName}
                </h1>
                <span className="rounded-md border border-[#4edea3]/30 bg-[#4edea3]/10 px-3 py-1 text-xs font-mono text-[#4edea3]">
                  {currentStudy.identity.status}
                </span>
              </div>

              <p className="text-sm font-mono text-[#98cbff]">
                {currentStudy.identity.projectType}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                <div className="rounded-lg border border-[#1e2d3d] bg-[#080d14] p-3">
                  <span className="text-[#657a8e] block">My Role:</span>
                  <span className="text-white font-bold">{currentStudy.identity.myRole}</span>
                </div>
                <div className="rounded-lg border border-[#1e2d3d] bg-[#080d14] p-3">
                  <span className="text-[#657a8e] block">Development Period:</span>
                  <span className="text-white font-bold">{currentStudy.identity.developmentPeriod}</span>
                </div>
              </div>

              {/* Technology Stack Pills */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-[#657a8e] uppercase">Primary Technology Stack:</span>
                <div className="flex flex-wrap gap-2">
                  {currentStudy.identity.technologyStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-[#223142] bg-[#121c27] px-3 py-1 text-xs font-mono text-[#98cbff]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SEC 02: THE ONE-MINUTE STORY */}
          <section id="sec-02" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                02 // THE ONE-MINUTE STORY (Executive Brief)
              </span>
              <button
                onClick={() => handleCopySectionLink('02')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '02' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="rounded-xl border border-[#3b2020] bg-[#1a0e0e]/80 p-4 space-y-2">
                <span className="text-[#ffb4ab] font-bold uppercase">The Problem:</span>
                <p className="text-[#d8c0c0] leading-relaxed">{currentStudy.oneMinuteStory.theProblem}</p>
              </div>

              <div className="rounded-xl border border-[#1e3b2e] bg-[#0e1a14]/80 p-4 space-y-2">
                <span className="text-[#4edea3] font-bold uppercase">The Idea:</span>
                <p className="text-[#c0d8cc] leading-relaxed">{currentStudy.oneMinuteStory.theIdea}</p>
              </div>

              <div className="rounded-xl border border-[#203144] bg-[#0e1620]/80 p-4 space-y-2">
                <span className="text-[#98cbff] font-bold uppercase">The System:</span>
                <p className="text-[#c0cfdf] leading-relaxed">{currentStudy.oneMinuteStory.theSystem}</p>
              </div>

              <div className="rounded-xl border border-[#382f18] bg-[#1a160b]/80 p-4 space-y-2">
                <span className="text-[#f5a623] font-bold uppercase">The Outcome:</span>
                <p className="text-[#dfd5bf] leading-relaxed">{currentStudy.oneMinuteStory.theOutcome}</p>
              </div>
            </div>

            <div className="rounded-xl border border-[#223142] bg-[#080d14] p-4 text-xs">
              <span className="font-mono text-[#98cbff] font-bold uppercase block mb-1">
                Why It Matters:
              </span>
              <p className="text-[#a3b1c2] leading-relaxed font-sans">{currentStudy.oneMinuteStory.whyItMatters}</p>
            </div>
          </section>

          {/* SEC 03: BUSINESS CONTEXT (Highlighting Business Finance Background) */}
          <section id="sec-03" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#4edea3] font-bold uppercase tracking-wider">
                03 // BUSINESS CONTEXT & UNIT ECONOMICS (Finance Rigor)
              </span>
              <button
                onClick={() => handleCopySectionLink('03')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '03' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1 rounded-lg border border-[#1e2d3d] bg-[#080d14] p-3.5">
                <span className="text-[#657a8e] block">Target Customer:</span>
                <span className="text-white font-medium">{currentStudy.businessContext.targetCustomer}</span>
              </div>

              <div className="space-y-1 rounded-lg border border-[#1e2d3d] bg-[#080d14] p-3.5">
                <span className="text-[#657a8e] block">Business Model:</span>
                <span className="text-white font-medium">{currentStudy.businessContext.businessModel}</span>
              </div>

              <div className="space-y-1 rounded-lg border border-[#1e2d3d] bg-[#080d14] p-3.5">
                <span className="text-[#657a8e] block">Revenue Mechanism:</span>
                <span className="text-[#4edea3] font-medium">{currentStudy.businessContext.revenueMechanism}</span>
              </div>

              <div className="space-y-1 rounded-lg border border-[#1e2d3d] bg-[#080d14] p-3.5">
                <span className="text-[#657a8e] block">Cost Structure (COGS):</span>
                <span className="text-[#ffb4ab] font-medium">{currentStudy.businessContext.costStructure}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-mono text-white font-bold uppercase">Business & Operational Risks Mitigated:</span>
              <ul className="space-y-1.5 font-mono text-[#a3b1c2]">
                {currentStudy.businessContext.businessRisks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#ffb4ab]">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* SEC 04: SYSTEM OBJECTIVE */}
          <section id="sec-04" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                04 // SYSTEM OBJECTIVE & CONSTRAINTS
              </span>
              <button
                onClick={() => handleCopySectionLink('04')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '04' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="rounded-xl border border-[#223142] bg-[#080d14] p-4">
                <span className="text-[#98cbff] font-bold uppercase block mb-1">Primary Objective:</span>
                <p className="text-white text-sm leading-relaxed">{currentStudy.systemObjective.primaryObjective}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 rounded-xl border border-[#223142] bg-[#080d14] p-4">
                  <span className="text-[#4edea3] font-bold uppercase block">Secondary Objectives:</span>
                  <ul className="space-y-1 text-[#a3b1c2]">
                    {currentStudy.systemObjective.secondaryObjectives.map((obj, i) => (
                      <li key={i}>• {obj}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 rounded-xl border border-[#223142] bg-[#080d14] p-4">
                  <span className="text-[#ffb4ab] font-bold uppercase block">Architectural Constraints:</span>
                  <ul className="space-y-1 text-[#a3b1c2]">
                    {currentStudy.systemObjective.constraints.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SEC 05: SYSTEM ARCHITECTURE */}
          <section id="sec-05" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                05 // SYSTEM ARCHITECTURE SPECIFICATION
              </span>
              <button
                onClick={() => handleCopySectionLink('05')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '05' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="rounded-xl border border-[#223142] bg-[#080d14] p-4">
                <span className="text-[#98cbff] font-bold uppercase block mb-1">Architecture Topology:</span>
                <p className="text-white text-sm font-mono leading-relaxed">{currentStudy.systemArchitecture.diagramSummary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                  <span className="text-[#657a8e] block">Frontend Layer:</span>
                  <span className="text-white font-medium">{currentStudy.systemArchitecture.frontend}</span>
                </div>
                <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                  <span className="text-[#657a8e] block">Backend Services:</span>
                  <span className="text-white font-medium">{currentStudy.systemArchitecture.backend}</span>
                </div>
                <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                  <span className="text-[#657a8e] block">Database & Storage:</span>
                  <span className="text-white font-medium">{currentStudy.systemArchitecture.database}</span>
                </div>
                <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                  <span className="text-[#657a8e] block">Auth & Identity:</span>
                  <span className="text-white font-medium">{currentStudy.systemArchitecture.authentication}</span>
                </div>
                <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                  <span className="text-[#657a8e] block">Infrastructure & Cloud:</span>
                  <span className="text-white font-medium">{currentStudy.systemArchitecture.infrastructure}</span>
                </div>
                <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                  <span className="text-[#657a8e] block">Event / Queue Bus:</span>
                  <span className="text-white font-medium">{currentStudy.systemArchitecture.eventQueueArchitecture}</span>
                </div>
              </div>
            </div>
          </section>

          {/* SEC 06: DATA FLOW */}
          <section id="sec-06" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                06 // END-TO-END DATA FLOW (Sequence)
              </span>
              <button
                onClick={() => handleCopySectionLink('06')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '06' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <p className="text-xs font-mono text-[#a3b1c2]">{currentStudy.dataFlow.summary}</p>

            <div className="space-y-3 font-mono text-xs">
              {currentStudy.dataFlow.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="flex items-start gap-4 rounded-xl border border-[#1c2736] bg-[#080d14] p-3.5 hover:border-[#98cbff]/30 transition-all"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#98cbff]/10 text-[#98cbff] font-bold text-xs">
                    {step.stepNumber}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-white font-bold">{step.actorOrService}</span>
                      <span className="rounded bg-[#162230] px-2 py-0.5 text-[10px] text-[#4edea3]">
                        Output: {step.output}
                      </span>
                    </div>
                    <p className="text-[#a3b1c2]">{step.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEC 07: HARD PROBLEMS */}
          <section id="sec-07" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#ffb4ab] font-bold uppercase tracking-wider">
                07 // HARD PROBLEMS SOLVED (Problem → Analysis → Solution → Result)
              </span>
              <button
                onClick={() => handleCopySectionLink('07')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '07' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="space-y-6">
              {currentStudy.hardProblems.map((hp) => (
                <div
                  key={hp.id}
                  className="rounded-xl border border-[#2d3a4b] bg-[#080e16] p-5 space-y-4 font-mono text-xs"
                >
                  <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    <span className="text-[#ffb4ab]">⚡</span> {hp.title}
                  </h3>

                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-[#140c0c] border border-[#3b2020]">
                      <span className="text-[#ffb4ab] font-bold uppercase block mb-0.5">Problem:</span>
                      <p className="text-[#d8c0c0] leading-relaxed">{hp.problem}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0e1620] border border-[#203144]">
                      <span className="text-[#98cbff] font-bold uppercase block mb-0.5">Root Cause Analysis:</span>
                      <p className="text-[#c0cfdf] leading-relaxed">{hp.analysis}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0e1a14] border border-[#1e3b2e]">
                      <span className="text-[#4edea3] font-bold uppercase block mb-0.5">Engineered Solution:</span>
                      <p className="text-[#c0d8cc] leading-relaxed">{hp.solution}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#14140c] border border-[#383318]">
                      <span className="text-[#f5a623] font-bold uppercase block mb-0.5">Measured Result:</span>
                      <p className="text-[#dfd9bf] leading-relaxed">{hp.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEC 08: ARCHITECTURAL DECISIONS */}
          <section id="sec-08" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                08 // ARCHITECTURAL DECISIONS & TRADE-OFFS
              </span>
              <button
                onClick={() => handleCopySectionLink('08')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '08' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {currentStudy.architecturalDecisions.map((ad, idx) => (
                <div key={idx} className="rounded-xl border border-[#1e2d3d] bg-[#080d14] p-5 space-y-3">
                  <h3 className="text-sm font-bold text-white font-mono">{ad.decision}</h3>
                  <p className="text-[#a3b1c2]"><strong className="text-[#657a8e]">Context:</strong> {ad.problem}</p>
                  <p className="text-[#98cbff]"><strong className="text-[#657a8e]">Chosen Approach:</strong> {ad.chosenApproach}</p>
                  <p className="text-[#4edea3]"><strong className="text-[#657a8e]">Reason:</strong> {ad.reason}</p>
                  <p className="text-[#ffb4ab]"><strong className="text-[#657a8e]">Trade-offs Accepted:</strong> {ad.tradeOffs}</p>
                  <p className="text-white font-bold"><strong className="text-[#657a8e]">Result:</strong> {ad.result}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SEC 09: AI-NATIVE DEVELOPMENT */}
          <section id="sec-09" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                09 // AI-NATIVE ENGINEERING WORKFLOW
              </span>
              <button
                onClick={() => handleCopySectionLink('09')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '09' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <p className="text-xs font-mono text-white bg-[#080d14] p-4 rounded-xl border border-[#1e2d3d]">
              {currentStudy.aiNativeDevelopment.workflowSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl border border-[#203144] bg-[#0e1620] space-y-2">
                <span className="text-[#98cbff] font-bold uppercase block">Human Architect Responsibilities:</span>
                <ul className="space-y-1.5 text-[#a3b1c2]">
                  {currentStudy.aiNativeDevelopment.humanResponsibilities.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-[#1e3b2e] bg-[#0e1a14] space-y-2">
                <span className="text-[#4edea3] font-bold uppercase block">AI Agent Responsibilities:</span>
                <ul className="space-y-1.5 text-[#a3b1c2]">
                  {currentStudy.aiNativeDevelopment.aiResponsibilities.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SEC 10: MY CONTRIBUTION */}
          <section id="sec-10" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                10 // MY DIRECT CONTRIBUTION (Defined, Orchestrated, Validated, Operated)
              </span>
              <button
                onClick={() => handleCopySectionLink('10')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '10' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl border border-[#223142] bg-[#080d14] space-y-2">
                <span className="text-[#98cbff] font-bold uppercase block">I DEFINED:</span>
                <ul className="space-y-1.5 text-[#a3b1c2]">
                  {currentStudy.myContribution.iDefined.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-[#223142] bg-[#080d14] space-y-2">
                <span className="text-[#4edea3] font-bold uppercase block">I ORCHESTRATED:</span>
                <ul className="space-y-1.5 text-[#a3b1c2]">
                  {currentStudy.myContribution.iOrchestrated.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-[#223142] bg-[#080d14] space-y-2">
                <span className="text-[#f5a623] font-bold uppercase block">I VALIDATED:</span>
                <ul className="space-y-1.5 text-[#a3b1c2]">
                  {currentStudy.myContribution.iValidated.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-[#223142] bg-[#080d14] space-y-2">
                <span className="text-[#ffb4ab] font-bold uppercase block">I OPERATED:</span>
                <ul className="space-y-1.5 text-[#a3b1c2]">
                  {currentStudy.myContribution.iOperated.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SEC 11: AUTOMATION */}
          <section id="sec-11" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                11 // AUTOMATION PIPELINE MATRIX (Trigger → Logic → Action → Result)
              </span>
              <button
                onClick={() => handleCopySectionLink('11')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '11' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {currentStudy.automations.map((auto, idx) => (
                <div key={idx} className="rounded-xl border border-[#1e2d3d] bg-[#080d14] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{auto.name}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                    <p className="text-[#657a8e]">Trigger: <span className="text-[#98cbff]">{auto.trigger}</span></p>
                    <p className="text-[#657a8e]">Action: <span className="text-[#4edea3]">{auto.action}</span></p>
                    <p className="text-[#657a8e] col-span-1 md:col-span-2">Logic: <span className="text-[#a3b1c2]">{auto.logic}</span></p>
                    <p className="text-[#657a8e] col-span-1 md:col-span-2">Result: <span className="text-white font-bold">{auto.result}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEC 13: SECURITY */}
          <section id="sec-13" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#ffb4ab] font-bold uppercase tracking-wider">
                13 // SECURITY ARCHITECTURE & THREAT MITIGATION
              </span>
              <button
                onClick={() => handleCopySectionLink('13')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '13' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                  <span className="text-[#657a8e] block">Authentication:</span>
                  <span className="text-white">{currentStudy.security.authentication}</span>
                </div>
                <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                  <span className="text-[#657a8e] block">Authorisation & RBAC:</span>
                  <span className="text-white">{currentStudy.security.authorisation}</span>
                </div>
                <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                  <span className="text-[#657a8e] block">Secrets Management:</span>
                  <span className="text-white">{currentStudy.security.secretsManagement}</span>
                </div>
                <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                  <span className="text-[#657a8e] block">Audit Logging:</span>
                  <span className="text-white">{currentStudy.security.auditLogging}</span>
                </div>
              </div>

              {/* Threat Matrix */}
              <div className="space-y-2 pt-2">
                <span className="text-white font-bold uppercase">Threat vs Mitigation vs Evidence Matrix:</span>
                <div className="space-y-2">
                  {currentStudy.security.threatMitigations.map((tm, idx) => (
                    <div key={idx} className="rounded-xl border border-[#3b2020] bg-[#140b0b] p-3.5 space-y-1.5">
                      <div className="text-[#ffb4ab] font-bold">Threat: {tm.threat}</div>
                      <div className="text-[#c0d8cc]"><span className="text-[#4edea3]">Mitigation:</span> {tm.mitigation}</div>
                      <div className="text-[#c0cfdf] text-[11px]"><span className="text-[#98cbff]">Evidence:</span> {tm.evidence}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SEC 14: FINOPS & COST CONTROLS */}
          <section id="sec-14" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#4edea3] font-bold uppercase tracking-wider">
                14 // CLOUD FINOPS & COST CONTROL ENGINE
              </span>
              <button
                onClick={() => handleCopySectionLink('14')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '14' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[#1e3b2e] bg-[#0c1711] space-y-1">
                  <span className="text-[#657a8e] block">Cost Per Unit Transaction:</span>
                  <span className="text-lg font-bold text-[#4edea3]">{currentStudy.finOps.costPerTransaction}</span>
                </div>
                <div className="p-4 rounded-xl border border-[#1e3b2e] bg-[#0c1711] space-y-1">
                  <span className="text-[#657a8e] block">Hard Spending Limit:</span>
                  <span className="text-lg font-bold text-white">{currentStudy.finOps.spendingLimits}</span>
                </div>
              </div>

              {/* Cost Centres */}
              <div className="space-y-2">
                <span className="text-white font-bold uppercase">Cost Centres Breakdown:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStudy.finOps.costCentres.map((cc, i) => (
                    <div key={i} className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14] space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>{cc.name}</span>
                        <span className="text-[#4edea3]">{cc.allocation}</span>
                      </div>
                      <p className="text-[11px] text-[#657a8e]">{cc.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SEC 15: TESTING SUITE */}
          <section id="sec-15" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                15 // TESTING & VERIFICATION SUITE
              </span>
              <button
                onClick={() => handleCopySectionLink('15')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '15' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                <span className="text-[#657a8e] block">Unit Testing:</span>
                <span className="text-white">{currentStudy.testing.unitTesting}</span>
              </div>
              <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                <span className="text-[#657a8e] block">Integration Testing:</span>
                <span className="text-white">{currentStudy.testing.integrationTesting}</span>
              </div>
              <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                <span className="text-[#657a8e] block">Stress & Concurrency:</span>
                <span className="text-white">{currentStudy.testing.stressTesting}</span>
              </div>
              <div className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14]">
                <span className="text-[#657a8e] block">Recovery & Fault Injection:</span>
                <span className="text-white">{currentStudy.testing.recoveryTesting}</span>
              </div>
            </div>
          </section>

          {/* SEC 16: PRODUCTION EVIDENCE */}
          <section id="sec-16" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                16 // PRODUCTION EVIDENCE ARTIFACTS
              </span>
              <button
                onClick={() => handleCopySectionLink('16')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '16' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {currentStudy.productionEvidence.map((ev, idx) => (
                <div key={idx} className="rounded-xl border border-[#223142] bg-[#080d14] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{ev.title}</span>
                    <span className="rounded bg-[#162230] px-2 py-0.5 text-[10px] text-[#98cbff]">{ev.type}</span>
                  </div>
                  <p className="text-[#a3b1c2]"><strong className="text-[#657a8e]">What:</strong> {ev.what}</p>
                  <p className="text-[#4edea3]"><strong className="text-[#657a8e]">Why It Matters:</strong> {ev.whyItMatters}</p>
                  <p className="text-white font-bold"><strong className="text-[#657a8e]">Proves:</strong> {ev.whatItProves}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SEC 17: PERFORMANCE METRICS */}
          <section id="sec-17" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                17 // VERIFIED PERFORMANCE BENCHMARKS
              </span>
              <button
                onClick={() => handleCopySectionLink('17')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '17' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
              {currentStudy.performance.map((perf, idx) => (
                <div key={idx} className="rounded-xl border border-[#1e2d3d] bg-[#080d14] p-3.5 space-y-1">
                  <span className="text-[#657a8e] text-[11px] block">{perf.metric}</span>
                  <div className="text-lg font-bold text-white">{perf.value}</div>
                  {perf.benchmark && (
                    <span className="text-[10px] text-[#4edea3] block">Target: {perf.benchmark}</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SEC 18: FAILURE & RECOVERY */}
          <section id="sec-18" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#ffb4ab] font-bold uppercase tracking-wider">
                18 // FAILURE SCENARIOS & DETERMINISTIC RECOVERY
              </span>
              <button
                onClick={() => handleCopySectionLink('18')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '18' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="rounded-xl border border-[#3b2020] bg-[#140b0b] p-4">
                <span className="text-[#ffb4ab] font-bold uppercase block mb-1">Scenario:</span>
                <p className="text-white text-sm">{currentStudy.failureAndRecovery.scenario}</p>
                <p className="text-[#a3b1c2] text-xs mt-1">{currentStudy.failureAndRecovery.failureMechanism}</p>
              </div>

              <div className="space-y-2">
                <span className="text-white font-bold uppercase">Recovery Sequence:</span>
                <div className="space-y-1.5">
                  {currentStudy.failureAndRecovery.recoveryFlow.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-[#1e2d3d] bg-[#080d14] text-[#a3b1c2]">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[#1e3b2e] bg-[#0e1a14] text-[#4edea3] font-bold">
                Guarantee: {currentStudy.failureAndRecovery.guarantee}
              </div>
            </div>
          </section>

          {/* SEC 21: ENGINEERING REALITY (Incidents) */}
          <section id="sec-21" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#f5a623] font-bold uppercase tracking-wider">
                21 // ENGINEERING REALITY (Honest Production Incidents & Post-Mortem)
              </span>
              <button
                onClick={() => handleCopySectionLink('21')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '21' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="rounded-xl border border-[#382f18] bg-[#120f08] p-5 space-y-3 font-mono text-xs">
              <p className="text-[#ffb4ab]"><strong className="text-[#f5a623]">What Broke:</strong> {currentStudy.engineeringReality.whatBroke}</p>
              <p className="text-[#d8c0c0]"><strong className="text-[#f5a623]">Why It Broke:</strong> {currentStudy.engineeringReality.whyItBroke}</p>
              <p className="text-[#98cbff]"><strong className="text-[#f5a623]">How It Was Diagnosed:</strong> {currentStudy.engineeringReality.howItWasDiagnosed}</p>
              <p className="text-[#4edea3]"><strong className="text-[#f5a623]">How It Was Fixed:</strong> {currentStudy.engineeringReality.howItWasFixed}</p>
              <p className="text-white font-bold"><strong className="text-[#f5a623]">Key Takeaway:</strong> {currentStudy.engineeringReality.whatWasLearned}</p>
            </div>
          </section>

          {/* SEC 24: INTERVIEW Q&A DEFENSE */}
          <section id="sec-24" className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#98cbff] font-bold uppercase tracking-wider">
                24 // INTERVIEW PREPARATION & ARCHITECTURAL DEFENSE
              </span>
              <button
                onClick={() => handleCopySectionLink('24')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '24' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {currentStudy.interviewQuestions.map((iq, idx) => (
                <div key={idx} className="rounded-xl border border-[#1e2d3d] bg-[#080d14] p-5 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <HelpCircle className="h-4 w-4 text-[#98cbff] shrink-0" />
                    <span>{iq.question}</span>
                  </div>
                  <p className="text-[#a3b1c2] leading-relaxed pt-1 pl-6 font-sans">
                    {iq.answerSummary}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SEC 25: EXECUTIVE SUMMARY */}
          <section id="sec-25" className="rounded-2xl border border-[#98cbff]/40 bg-[#0d1622]/95 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1c2736] pb-4">
              <span className="text-xs font-mono text-[#4edea3] font-bold uppercase tracking-wider">
                25 // EXECUTIVE EVALUATION SUMMARY
              </span>
              <button
                onClick={() => handleCopySectionLink('25')}
                className="text-xs font-mono text-[#657a8e] hover:text-white flex items-center gap-1"
              >
                {copiedSection === '25' ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Link
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-[#080d14] border border-[#1e2d3d]">
                  <span className="text-[#657a8e] block">Project Status:</span>
                  <span className="text-white font-bold">{currentStudy.executiveSummary.projectStatus}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#080d14] border border-[#1e2d3d]">
                  <span className="text-[#657a8e] block">Commercial Value:</span>
                  <span className="text-[#4edea3] font-bold">{currentStudy.executiveSummary.businessValue}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#080d14] border border-[#1e2d3d]">
                <span className="text-[#657a8e] block">Technical Capabilities Verified:</span>
                <p className="text-[#d1e1f5] mt-1">{currentStudy.executiveSummary.technicalValue}</p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[#657a8e] uppercase block">Primary Skills Demonstrated:</span>
                <div className="flex flex-wrap gap-2">
                  {currentStudy.executiveSummary.primarySkillsDemonstrated.map((sk) => (
                    <span
                      key={sk}
                      className="rounded-lg border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-1 text-xs font-mono text-[#98cbff]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      </>
      )}
    </div>
  );
};
