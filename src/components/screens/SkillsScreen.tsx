import React, { useState } from 'react';
import { skillsData } from '../../data/skillsData';
import { ScreenId } from '../../types';
import {
  Cpu,
  Server,
  TrendingUp,
  ShieldCheck,
  Code2,
  CheckCircle2,
  Filter,
  Search,
  Zap,
  Sparkles,
} from 'lucide-react';

interface SkillsScreenProps {
  onSelectScreen: (screenId: ScreenId, caseStudySlug?: string) => void;
}

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onSelectScreen }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');

  const filteredCategories = skillsData.map((category) => {
    const filteredSkills = category.skills.filter((skill) => {
      const matchesLevel = levelFilter === 'ALL' || skill.level === levelFilter;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.evidence.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesLevel && matchesSearch;
    });

    return {
      ...category,
      skills: filteredSkills,
    };
  }).filter((category) => category.skills.length > 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#1c2736] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-1 text-xs font-mono text-[#98cbff] mb-2">
            <Cpu className="h-3.5 w-3.5" />
            COMPETENCY_MATRIX // AI-NATIVE ORCHESTRATION & FINOPS DEPTH
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-mono">
            Engineering Skills & Architectural Depth
          </h1>
          <p className="text-sm text-[#a3b1c2] mt-1">
            Every technical capability is paired with verified production evidence from built systems.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="rounded-xl border border-[#223142] bg-[#0c141e] px-3 py-2 text-xs font-mono text-white outline-none focus:border-[#98cbff]/50"
          >
            <option value="ALL">All Proficiency Levels</option>
            <option value="ARCHITECT">Architect Level</option>
            <option value="EXPERT">Expert Level</option>
            <option value="ADVANCED">Advanced Level</option>
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, tech, tags..."
            className="rounded-xl border border-[#223142] bg-[#0c141e] px-4 py-2 text-xs text-white placeholder-[#5c7287] outline-none focus:border-[#98cbff]/50 font-mono"
          />
        </div>
      </div>

      {/* Skills Categories Grid */}
      <div className="space-y-8">
        {filteredCategories.map((cat, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6 shadow-xl"
          >
            <div className="border-b border-[#1c2736] pb-4">
              <h2 className="text-lg md:text-xl font-bold text-white font-mono flex items-center gap-2">
                <span className="text-[#98cbff]">#</span> {cat.category}
              </h2>
              <p className="text-xs text-[#8ca3b8] font-mono mt-1">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-xl border border-[#1e2d3d] bg-[#080d14] p-4 flex flex-col justify-between space-y-3 hover:border-[#98cbff]/40 transition-all font-mono text-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-sm">{skill.name}</span>
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          skill.level === 'ARCHITECT'
                            ? 'bg-[#98cbff]/20 text-[#98cbff] border border-[#98cbff]/30'
                            : skill.level === 'EXPERT'
                            ? 'bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/30'
                            : 'bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/30'
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-[#a3b1c2] leading-relaxed">
                      <strong className="text-[#657a8e]">Evidence:</strong> {skill.evidence}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#151f2b]">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-[#121c27] px-2 py-0.5 text-[10px] text-[#768c9f] border border-[#1e2d3d]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
