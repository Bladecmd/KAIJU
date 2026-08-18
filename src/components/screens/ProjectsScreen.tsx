import React, { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { ProjectItem, ScreenId } from '../../types';
import { analytics } from '../../services/analytics';
import {
  Briefcase,
  Layers,
  ArrowUpRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Filter,
  Search,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

interface ProjectsScreenProps {
  onSelectScreen: (screenId: ScreenId, caseStudySlug?: string) => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ onSelectScreen }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'ALL', label: 'All Systems' },
    { id: 'AUTOMATION_DISPATCH', label: 'Automation & Dispatch' },
    { id: 'COMPLIANCE_SEC', label: 'Compliance & Security' },
    { id: 'AUDIO_DSP', label: 'Audio DSP & WebRTC' },
    { id: 'SOVEREIGN_SYSTEMS', label: 'Sovereign Systems' },
    { id: 'SYSTEMS_ARCHITECTURE', label: 'Systems Architecture' },
  ];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === 'ALL' || project.category === selectedCategory;
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.keyCapabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#1c2736] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-1 text-xs font-mono text-[#98cbff] mb-2">
            <Briefcase className="h-3.5 w-3.5" />
            ENGINEERING_CATALOG // 6 FLAGSHIP PRODUCTION SYSTEMS
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-mono">
            Production Software & Systems
          </h1>
          <p className="text-sm text-[#a3b1c2] mt-1">
            Real systems architected, orchestrated, tested, and deployed across high-throughput dispatch, regulatory compliance, and low-latency audio.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7287]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search systems, tech, or capabilities..."
            className="w-full rounded-xl border border-[#223142] bg-[#0c141e] pl-9 pr-4 py-2 text-xs text-white placeholder-[#5c7287] outline-none focus:border-[#98cbff]/50 font-mono"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-mono transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#98cbff] text-[#001f3f] font-bold shadow-md shadow-[#98cbff]/20'
                : 'border border-[#223142] bg-[#0d151f] text-[#8ca3b8] hover:text-white hover:border-[#3b5168]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 hover:border-[#98cbff]/40 transition-all shadow-xl space-y-6"
          >
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="rounded-md border border-[#98cbff]/20 bg-[#98cbff]/10 px-2.5 py-0.5 text-xs font-mono text-[#98cbff]">
                  {project.category}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4edea3]">
                  <span className="h-2 w-2 rounded-full bg-[#4edea3]" />
                  {project.status}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white font-mono">{project.name}</h2>
                <p className="text-xs font-mono text-[#98cbff] mt-0.5">{project.tagline}</p>
              </div>

              <p className="text-xs md:text-sm text-[#a3b1c2] leading-relaxed">
                {project.shortDescription}
              </p>

              {/* Business Purpose */}
              <div className="rounded-lg border border-[#1e2d3d] bg-[#080d14] p-3 text-xs space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#98cbff] uppercase">
                  Business Purpose & Unit Economics:
                </span>
                <p className="text-[#8ca3b8] leading-relaxed">{project.businessPurpose}</p>
              </div>

              {/* Architecture Overview */}
              <div className="rounded-lg border border-[#1e2d3d] bg-[#080d14] p-3 text-xs space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#4edea3] uppercase">
                  Architecture Overview:
                </span>
                <p className="text-[#8ca3b8] leading-relaxed">{project.architectureOverview}</p>
              </div>

              {/* Key Capabilities */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono font-bold text-white uppercase">
                  Core Technical Capabilities:
                </span>
                <ul className="space-y-1 text-xs text-[#a3b1c2]">
                  {project.keyCapabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#4edea3] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Evidence Highlights */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono font-bold text-[#ffb4ab] uppercase">
                  Production Evidence Highlights:
                </span>
                <ul className="space-y-1 text-xs text-[#a3b1c2]">
                  {project.evidenceHighlights.map((ev, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#ffb4ab] font-mono">•</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono text-[#657a8e] uppercase">
                  Technologies Used:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[#141e2b] px-2 py-0.5 text-[11px] font-mono text-[#98cbff] border border-[#223142]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#1a2533] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    analytics.track('CASE_STUDY_VIEW', project.name);
                    onSelectScreen('CASE_STUDIES', project.slug);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#98cbff] px-4 py-2 text-xs font-semibold font-mono text-[#001f3f] hover:bg-white transition-all shadow-md shadow-[#98cbff]/20"
                >
                  Read 25-Section Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => {
                    analytics.track('PAGE_VIEW', `Architecture of ${project.name}`);
                    onSelectScreen('ARCHITECTURE');
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#223142] bg-[#111a26] px-3 py-2 text-xs font-mono text-[#98cbff] hover:bg-[#182536] transition-all"
                >
                  <Layers className="h-3.5 w-3.5" /> Blueprint
                </button>
              </div>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.track('GITHUB_CLICK', project.name)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#7e8f9f] hover:text-white transition-colors"
                >
                  <Github className="h-3.5 w-3.5" /> Source Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
