import React, { useState } from 'react';
import { TechnicalBriefData, ScreenId } from '../types';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Server,
  FileCode2,
  AlertTriangle,
  GitCommit,
  CheckCircle2,
  ArrowLeft,
  Copy,
  Check,
  Briefcase,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface TechnicalBriefViewerProps {
  brief: TechnicalBriefData;
  onBackToCaseStudy: () => void;
  onContactBlade: () => void;
}

export const TechnicalBriefViewer: React.FC<TechnicalBriefViewerProps> = ({
  brief,
  onBackToCaseStudy,
  onContactBlade,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(`${brief.projectName} Technical Brief:\n${brief.executiveSummary}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-xs font-mono">
      {/* Navigation and Top Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#1c2736] pb-4">
        <button
          onClick={onBackToCaseStudy}
          className="inline-flex items-center gap-2 text-[#98cbff] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Public Case Study</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#223142] bg-[#0c141e] text-[#8ca3b8] hover:text-white transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#4edea3]" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Summary'}</span>
          </button>
          <button
            onClick={onContactBlade}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#98cbff] text-[#001f3f] font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span>Discuss Under NDA</span>
          </button>
        </div>
      </div>

      {/* Hero Header with Active Disclosure Level */}
      <div className="rounded-2xl border border-[#98cbff]/30 bg-[#0d1622]/95 p-6 md:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4edea3]/40 bg-[#4edea3]/10 px-3 py-1 text-[11px] text-[#4edea3]">
            <Unlock className="h-3.5 w-3.5" />
            LEVEL 2 ACCESS UNLOCKED // TECHNICAL SPECIFICATION RECORD
          </div>
          <span className="text-[#657a8e] text-[11px]">
            Classification: RESTRICTED_BRIEF // EVALUATION ONLY
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white font-mono">
          {brief.projectName} // Deep Technical Specification
        </h1>
        <p className="text-sm font-sans text-[#cbd5e1] max-w-4xl leading-relaxed">
          {brief.executiveSummary}
        </p>
      </div>

      {/* 1. Deep Architectural Topology Diagram */}
      <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1c2736] pb-3">
          <h2 className="text-sm font-bold text-[#98cbff] uppercase flex items-center gap-2">
            <Layers className="h-4 w-4" /> 01 // High-Resolution Microservice & Bus Topology
          </h2>
          <span className="text-[10px] text-[#657a8e]">SPEC_ID: {brief.id}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#06090e] border border-[#16212d] text-[#c0d4ec] overflow-x-auto whitespace-pre leading-relaxed font-mono">
          {brief.deepArchitectureTopology}
        </div>
      </div>

      {/* 2. Critical Component Specifications */}
      <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-4">
        <h2 className="text-sm font-bold text-[#98cbff] uppercase flex items-center gap-2 border-b border-[#1c2736] pb-3">
          <Server className="h-4 w-4" /> 02 // Core Architectural Component Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {brief.componentSpecs.map((comp, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#1e2d3d] bg-[#080d14] p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm">{comp.name}</span>
                <span className="text-[10px] text-[#4edea3] bg-[#14231b] px-2 py-0.5 rounded border border-[#23432f]">
                  {comp.tech}
                </span>
              </div>
              <p className="text-[#a3b1c2] text-xs font-sans leading-relaxed">
                {comp.responsibility}
              </p>
              <div className="p-2.5 rounded-lg bg-[#0e1722] border border-[#1e2e40] text-[11px] text-[#98cbff] font-sans">
                <strong className="font-mono text-[#98cbff]">Engineering Reality:</strong> {comp.considerations}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Sequence Flow Execution */}
      <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-4">
        <h2 className="text-sm font-bold text-[#98cbff] uppercase flex items-center gap-2 border-b border-[#1c2736] pb-3">
          <FileCode2 className="h-4 w-4" /> 03 // Execution Sequence & Invariant Hand-offs
        </h2>
        <p className="text-[#a3b1c2] text-xs font-sans">{brief.sequenceFlowSummary}</p>
        <div className="space-y-3">
          {brief.sequenceSteps.map((step) => (
            <div
              key={step.step}
              className="flex items-start gap-4 rounded-xl border border-[#1e2d3d] bg-[#080d14] p-4 hover:border-[#98cbff]/30 transition-all"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#98cbff]/10 text-[#98cbff] font-bold">
                {step.step}
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-white font-bold text-xs">{step.phase}</span>
                  <span className="text-[10px] text-[#98cbff] bg-[#142232] px-2 py-0.5 rounded">
                    Service: {step.service}
                  </span>
                </div>
                <p className="text-[#c0d4ec] text-xs font-sans">{step.action}</p>
                <div className="text-[10px] text-[#4edea3] flex items-center gap-1.5 pt-0.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Security & Invariant Gate: {step.securityCheck}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Engineering Trade-Offs & Failure Mitigations */}
      <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-4">
        <h2 className="text-sm font-bold text-[#98cbff] uppercase flex items-center gap-2 border-b border-[#1c2736] pb-3">
          <GitCommit className="h-4 w-4" /> 04 // Architectural Trade-offs & Failure Modes
        </h2>
        <div className="space-y-4">
          {brief.engineeringTradeOffs.map((trade, idx) => (
            <div key={idx} className="rounded-xl border border-[#1e2d3d] bg-[#080d14] p-5 space-y-3">
              <h3 className="text-sm font-bold text-white">{trade.decision}</h3>
              <p className="text-[#a3b1c2] text-xs font-sans">
                <strong className="text-[#98cbff] font-mono">Why Chosen:</strong> {trade.whyChosen}
              </p>
              <div className="flex flex-wrap gap-1.5 items-center text-[11px] text-[#657a8e]">
                <span>Rejected Alternatives:</span>
                {trade.rejectedAlternatives.map((alt, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-[#162230] text-[#a3b1c2]">
                    {alt}
                  </span>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-[#141b24] border border-[#243344] text-[#4edea3] text-[11px] font-sans">
                <strong className="font-mono text-[#4edea3]">Failure Mode Mitigation:</strong> {trade.failureModeMitigation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. LEVEL 3 CONFIDENTIALITY & PROPRIETARY IP PERIMETER */}
      <div className="rounded-2xl border border-[#ffb4ab]/30 bg-[#170e0e]/90 p-6 md:p-8 space-y-4 shadow-2xl">
        <div className="flex items-center gap-2 text-[#ffb4ab]">
          <Lock className="h-4 w-4" />
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Level 3 // Confidential Proprietary Perimeter (Withheld Material)
          </h2>
        </div>
        <p className="text-[#d8c0c0] text-xs font-sans leading-relaxed">
          In adherence to professional IP protection and commercial security standards, the following blueprints are withheld from this electronic brief:
        </p>
        <ul className="space-y-1.5 text-xs text-[#ffb4ab]/90 pl-2">
          {brief.withheldProprietaryNotes.map((note, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#ffb4ab] font-bold">•</span>
              <span className="font-sans">{note}</span>
            </li>
          ))}
        </ul>
        <div className="pt-2 border-t border-[#3b2020] flex items-center justify-between flex-wrap gap-4">
          <p className="text-[11px] text-[#a3b1c2] font-sans max-w-xl">
            {brief.ndaNotice}
          </p>
          <button
            onClick={onContactBlade}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#98cbff] to-[#76aae6] text-[#001f3f] font-bold hover:opacity-95 transition-opacity cursor-pointer"
          >
            Initiate Direct Discussion Under NDA
          </button>
        </div>
      </div>
    </div>
  );
};
