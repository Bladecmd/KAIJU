import React from 'react';
import { experienceData } from '../../data/experienceData';
import { ScreenId } from '../../types';
import {
  Briefcase,
  GraduationCap,
  GitBranch,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Layers,
} from 'lucide-react';

interface ExperienceScreenProps {
  onSelectScreen: (screenId: ScreenId, caseStudySlug?: string) => void;
}

export const ExperienceScreen: React.FC<ExperienceScreenProps> = ({ onSelectScreen }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#1c2736] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-1 text-xs font-mono text-[#98cbff]">
          <Briefcase className="h-3.5 w-3.5" />
          TRACK_RECORD // SYSTEMS BUILDER & BUSINESS FINANCE BACKGROUND
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white font-mono">
          Career Experience & Engineering Philosophy
        </h1>
        <p className="text-sm text-[#a3b1c2]">
          Track record as an AI-native systems founder, product architect, and builder with formal academic roots in Business Finance.
        </p>
      </div>

      {/* 10-Step AI-Native Engineering Lifecycle */}
      <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6 shadow-xl font-mono">
        <div className="flex items-center gap-2 border-b border-[#1c2736] pb-4">
          <GitBranch className="h-5 w-5 text-[#4edea3]" />
          <h2 className="text-lg font-bold text-white uppercase">
            The 10-Stage AI-Native Engineering Lifecycle
          </h2>
        </div>

        <p className="text-xs text-[#a3b1c2] leading-relaxed">
          How I architect and deliver software: human architects define the requirements, state machine topology, and financial boundaries, while AI agents accelerate implementation and test suite generation under strict human verification.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {[
            { step: '01', title: 'Business Req.', desc: 'Unit margins & scope' },
            { step: '02', title: 'System Arch.', desc: 'Topology & schemas' },
            { step: '03', title: 'Decomposition', desc: 'Typed task prompts' },
            { step: '04', title: 'AI Code Gen.', desc: 'Accelerated dev' },
            { step: '05', title: 'Human Valid.', desc: 'Line-by-line review' },
            { step: '06', title: 'Testing Suite', desc: '100+ tests/module' },
            { step: '07', title: 'Security Audit', desc: 'Zero-trust review' },
            { step: '08', title: 'Deployment', desc: 'CI/CD & containers' },
            { step: '09', title: 'Monitoring', desc: 'FinOps telemetry' },
            { step: '10', title: 'Iteration', desc: 'Fast feedback loop' },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-[#1e2d3d] bg-[#080d14] p-3 space-y-1 hover:border-[#98cbff]/40 transition-all"
            >
              <span className="text-[10px] font-bold text-[#98cbff]">{item.step}</span>
              <div className="text-white font-bold text-xs">{item.title}</div>
              <p className="text-[10px] text-[#657a8e]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6">
        {experienceData.map((exp) => (
          <div
            key={exp.id}
            className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-5 shadow-xl font-mono text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#1c2736] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  {exp.type === 'EDUCATION' ? (
                    <GraduationCap className="h-4 w-4 text-[#4edea3]" />
                  ) : (
                    <Briefcase className="h-4 w-4 text-[#98cbff]" />
                  )}
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                </div>
                <div className="text-[#98cbff] text-xs mt-0.5">{exp.organization} • {exp.location}</div>
              </div>

              <span className="rounded-lg border border-[#223142] bg-[#141e2b] px-3 py-1 text-xs text-[#4edea3] self-start sm:self-auto">
                {exp.period}
              </span>
            </div>

            <p className="text-sm text-[#a3b1c2] leading-relaxed font-sans">{exp.overview}</p>

            {/* Key Outcomes */}
            <div className="space-y-2">
              <span className="text-white font-bold uppercase">Key Delivered Outcomes:</span>
              <ul className="space-y-1.5 text-[#a3b1c2]">
                {exp.keyOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#4edea3] shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Systems Delivered */}
            {exp.systemsDelivered && (
              <div className="space-y-2 pt-2">
                <span className="text-[#657a8e] uppercase">Key Systems & Deliverables:</span>
                <div className="flex flex-wrap gap-2">
                  {exp.systemsDelivered.map((sys) => (
                    <span
                      key={sys}
                      className="rounded bg-[#121c27] px-2.5 py-1 text-[11px] text-[#98cbff] border border-[#1e2d3d]"
                    >
                      {sys}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
