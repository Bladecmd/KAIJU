import React from 'react';
import { AudienceType, ScreenId } from '../../types';
import { campaignsData } from '../../data/campaignsData';
import { getCaseStudyBySlug } from '../../data/caseStudies';
import { projectsData } from '../../data/projectsData';
import { analytics } from '../../services/analytics';
import {
  Briefcase,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  TrendingUp,
  Workflow,
  Server,
  Zap,
  CheckCircle2,
  FileText,
  Mail,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface CampaignLandingScreenProps {
  audienceId: AudienceType;
  onSelectScreen: (screenId: ScreenId, caseStudySlug?: string) => void;
  onSwitchAudience: (aud: AudienceType) => void;
}

export const CampaignLandingScreen: React.FC<CampaignLandingScreenProps> = ({
  audienceId,
  onSelectScreen,
  onSwitchAudience,
}) => {
  const config = campaignsData[audienceId] || campaignsData['recruiter'];
  const proofCaseStudy = getCaseStudyBySlug(config.primaryProofSlug);
  const matchedProject = projectsData.find((p) => p.slug === config.primaryProofSlug);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return <Server className="h-5 w-5 text-[#98cbff]" />;
      case 'Cpu':
        return <Cpu className="h-5 w-5 text-[#4edea3]" />;
      case 'Workflow':
        return <Workflow className="h-5 w-5 text-[#ffb4ab]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-5 w-5 text-[#98cbff]" />;
      case 'TrendingUp':
        return <TrendingUp className="h-5 w-5 text-[#4edea3]" />;
      case 'Zap':
        return <Zap className="h-5 w-5 text-[#f5a623]" />;
      case 'Layers':
      default:
        return <Layers className="h-5 w-5 text-[#98cbff]" />;
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-12">
      {/* Audience Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1c2736] pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#657a8e] uppercase">TAILORED VIEW FOR:</span>
          <span className="text-xs font-mono font-bold text-[#4edea3]">{config.title}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs font-mono">
          <span className="text-[#657a8e] self-center mr-1">Switch Perspective:</span>
          {(['recruiter', 'founder', 'ai-automation', 'solutions'] as AudienceType[]).map((aud) => (
            <button
              key={aud}
              onClick={() => {
                onSwitchAudience(aud);
                analytics.track('PAGE_VIEW', `Landing View Switched: ${aud}`);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                aud === audienceId
                  ? 'bg-[#98cbff] text-[#001f3f] font-bold shadow'
                  : 'border border-[#223142] bg-[#0c131d] text-[#8ca3b8] hover:text-white'
              }`}
            >
              {aud}
            </button>
          ))}
        </div>
      </div>

      {/* 1. IMMEDIATE PROPOSITION (HERO) */}
      <section className="relative overflow-hidden rounded-3xl border border-[#98cbff]/30 bg-[#090f17]/95 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-72 w-72 rounded-full bg-[#98cbff]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-72 w-72 rounded-full bg-[#4edea3]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3.5 py-1 text-xs font-mono tracking-wider text-[#98cbff]">
            <span className="h-2 w-2 rounded-full bg-[#4edea3] animate-pulse" />
            {config.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans leading-tight">
            {config.heroProposition}
          </h1>

          <p className="text-base sm:text-lg text-[#a3b1c2] leading-relaxed font-sans">
            {config.heroSubhead}
          </p>

          <div className="p-4 rounded-xl border border-[#223142] bg-[#070b10] text-sm text-[#d1e1f5] font-sans italic border-l-4 border-l-[#98cbff]">
            “{config.humanHook}”
          </div>

          {/* Direct Conversion CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                if (audienceId === 'recruiter') {
                  onSelectScreen('EXPERIENCE');
                } else if (audienceId === 'founder' || audienceId === 'solutions') {
                  onSelectScreen('CONTACT');
                } else {
                  onSelectScreen('CASE_STUDIES', config.primaryProofSlug);
                }
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#98cbff] px-6 py-3.5 text-sm font-semibold text-[#001f3f] shadow-lg shadow-[#98cbff]/25 hover:bg-white transition-all cursor-pointer font-sans"
            >
              {config.ctaText} <ArrowUpRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onSelectScreen('CONTACT')}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#223142] bg-[#111a26] px-6 py-3.5 text-sm font-mono text-[#d1e1f5] hover:text-white hover:border-[#4edea3]/50 transition-all cursor-pointer"
            >
              <Mail className="h-4 w-4 text-[#4edea3]" />
              Start a Conversation
            </button>

            <button
              onClick={() => onSelectScreen('HOME')}
              className="text-xs font-mono text-[#657a8e] hover:text-[#98cbff] px-3 py-2 cursor-pointer"
            >
              Explore Full Kaiju Flag &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES FOR THIS AUDIENCE */}
      <section className="space-y-4">
        <div className="border-b border-[#1c2736] pb-3">
          <span className="text-xs font-mono text-[#98cbff] uppercase tracking-wider font-bold">
            PRACTICAL FIT // WHAT I BRING TO THIS DOMAIN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.coreCapabilities.map((cap, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-2 hover:border-[#98cbff]/40 transition-all shadow-lg"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#111a26] border border-[#223142] flex items-center justify-center">
                  {renderIcon(cap.icon)}
                </div>
                <h3 className="text-base font-bold text-white font-sans">{cap.title}</h3>
              </div>
              <p className="text-xs text-[#8ca3b8] leading-relaxed font-sans">{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SELECTED PROOF & EVIDENCE */}
      {proofCaseStudy && (
        <section className="rounded-3xl border border-[#223142] bg-[#0c131d]/90 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#1c2736] pb-4 font-mono">
            <div>
              <span className="text-xs text-[#4edea3] uppercase font-bold">PRIMARY EVIDENCE SYSTEM</span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                {proofCaseStudy.identity.projectName}
              </h2>
            </div>
            <span className="text-xs font-mono text-[#98cbff] px-2.5 py-1 rounded bg-[#98cbff]/10 border border-[#98cbff]/20 self-start sm:self-auto">
              STATUS: {proofCaseStudy.identity.status.split(' ')[0]}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl border border-[#1e2d3d] bg-[#080d14] space-y-1.5">
              <span className="text-[#98cbff] uppercase block font-bold">The Problem:</span>
              <p className="text-[#a3b1c2] font-sans leading-relaxed text-xs">
                {proofCaseStudy.oneMinuteStory.theProblem}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#1e2d3d] bg-[#080d14] space-y-1.5">
              <span className="text-[#4edea3] uppercase block font-bold">What I Built:</span>
              <p className="text-[#a3b1c2] font-sans leading-relaxed text-xs">
                {proofCaseStudy.oneMinuteStory.theSystem}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#1e2d3d] bg-[#080d14] space-y-1.5">
              <span className="text-[#ffb4ab] uppercase block font-bold">The Outcome:</span>
              <p className="text-[#a3b1c2] font-sans leading-relaxed text-xs">
                {proofCaseStudy.oneMinuteStory.theOutcome}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-xs font-mono text-[#657a8e]">
              Complete 25-section engineering defense & technical briefs available:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectScreen('CASE_STUDIES', config.primaryProofSlug)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#142232] border border-[#98cbff]/30 px-4 py-2 text-xs font-mono text-[#98cbff] hover:bg-[#98cbff] hover:text-[#001f3f] transition-all cursor-pointer font-bold"
              >
                Read Case Study <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onSelectScreen('ARCHITECTURE')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0e1925] border border-[#23384c] px-3 py-2 text-xs font-mono text-[#8ca3b8] hover:text-white hover:border-[#98cbff]/40 transition-all cursor-pointer"
              >
                Level 2 Technical Briefs &rarr;
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. OPPORTUNITIES WHERE I FIT */}
      <section className="rounded-3xl border border-[#223142] bg-[#070b10] p-6 sm:p-8 space-y-5 font-mono text-xs">
        <div className="border-b border-[#1c2736] pb-3">
          <span className="text-[#98cbff] uppercase font-bold text-sm block">
            Target Opportunity Categories
          </span>
          <p className="text-[#8ca3b8] font-sans text-xs mt-0.5">
            I am actively open to discussing roles, projects, and collaborations in these specific spaces:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {config.targetOpportunities.map((opp, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-[#1a2636] bg-[#0b121a] text-white"
            >
              <CheckCircle2 className="h-4 w-4 text-[#4edea3] shrink-0" />
              <span className="font-bold">{opp}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LOW-FRICTION CONVERSION STRIP */}
      <section className="rounded-3xl border border-[#98cbff]/30 bg-gradient-to-b from-[#0e1724] to-[#070c12] p-8 sm:p-10 text-center space-y-5 shadow-2xl">
        <h2 className="text-2xl font-bold text-white font-sans">
          Have an interesting problem? Let's see if I can help.
        </h2>
        <p className="text-sm text-[#a3b1c2] font-sans max-w-xl mx-auto">
          Whether you need a systems architect, an AI automation builder, or someone who can turn a messy commercial process into reliable software.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onSelectScreen('CONTACT')}
            className="rounded-xl bg-[#98cbff] px-6 py-3 text-sm font-semibold text-[#001f3f] shadow-lg shadow-[#98cbff]/25 hover:bg-white transition-all cursor-pointer font-sans"
          >
            Start a Conversation
          </button>

          <button
            onClick={() => onSelectScreen('EXPERIENCE')}
            className="rounded-xl border border-[#223142] bg-[#121c27] px-6 py-3 text-sm font-mono text-[#d1e1f5] hover:text-white hover:border-[#98cbff]/40 transition-all cursor-pointer"
          >
            View Career Record & CV
          </button>
        </div>
      </section>
    </div>
  );
};
