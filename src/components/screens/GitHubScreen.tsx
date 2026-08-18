import React from 'react';
import { githubReposData } from '../../data/githubData';
import { ScreenId } from '../../types';
import { analytics } from '../../services/analytics';
import {
  Github,
  Star,
  GitFork,
  ArrowUpRight,
  Code2,
  CheckCircle2,
  ExternalLink,
  GitBranch,
} from 'lucide-react';

interface GitHubScreenProps {
  onSelectScreen: (screenId: ScreenId, caseStudySlug?: string) => void;
}

export const GitHubScreen: React.FC<GitHubScreenProps> = ({ onSelectScreen }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#1c2736] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-1 text-xs font-mono text-[#98cbff]">
          <Github className="h-3.5 w-3.5" />
          SOURCE_CODE // VERIFIED REPOSITORIES & REPRODUCIBLE BUILDS
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white font-mono">
          Public GitHub Repositories
        </h1>
        <p className="text-sm text-[#a3b1c2]">
          Inspect clean, production-grade repositories featuring typed Fastify backends, Open Policy Agent bundles, WebAssembly audio streaming, and CRDT synchronizers.
        </p>
      </div>

      {/* Repo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {githubReposData.map((repo) => (
          <div
            key={repo.id}
            className="flex flex-col justify-between rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 hover:border-[#98cbff]/40 transition-all shadow-xl space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-white font-bold text-sm">
                  <Github className="h-4 w-4 text-[#98cbff]" /> {repo.name}
                </span>
                <span className="rounded bg-[#131f2c] px-2.5 py-0.5 text-[11px] text-[#4edea3] border border-[#223142]">
                  {repo.status}
                </span>
              </div>

              <p className="text-[#a3b1c2] leading-relaxed font-sans">{repo.description}</p>

              {/* Purpose */}
              <div className="rounded-lg border border-[#1e2d3d] bg-[#080d14] p-3 text-[11px] space-y-1">
                <span className="text-[#657a8e] block uppercase font-bold">Purpose:</span>
                <p className="text-[#98cbff]">{repo.purpose}</p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {repo.technology.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-[#121c27] px-2 py-0.5 text-[10px] text-[#8ca3b8] border border-[#1e2d3d]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions & Metrics Footer */}
            <div className="pt-4 border-t border-[#1c2736] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3 text-[#8ca3b8]">
                {repo.starsCount && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-[#f5a623]" /> {repo.starsCount}
                  </span>
                )}
                {repo.forksCount && (
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5 text-[#657a8e]" /> {repo.forksCount}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {repo.relevantCaseStudySlug && (
                  <button
                    onClick={() => {
                      analytics.track('CASE_STUDY_VIEW', repo.name);
                      onSelectScreen('CASE_STUDIES', repo.relevantCaseStudySlug);
                    }}
                    className="text-[#98cbff] hover:underline flex items-center gap-1"
                  >
                    Read Case Study <ArrowUpRight className="h-3 w-3" />
                  </button>
                )}

                <a
                  href={repo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.track('GITHUB_CLICK', repo.name)}
                  className="rounded-lg border border-[#223142] bg-[#14202e] px-3 py-1.5 text-white hover:bg-white hover:text-[#001f3f] transition-all flex items-center gap-1 font-bold"
                >
                  GitHub <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
