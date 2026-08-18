import React, { useState, useEffect } from 'react';
import { analytics } from '../../services/analytics';
import { AnalyticsSummary, ScreenId } from '../../types';
import {
  Activity,
  Download,
  Eye,
  Github,
  Globe,
  Lock,
  FileText,
  Mail,
  RefreshCw,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

interface AnalyticsScreenProps {
  onSelectScreen: (screenId: ScreenId, caseStudySlug?: string) => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ onSelectScreen }) => {
  const [summary, setSummary] = useState<AnalyticsSummary>(analytics.getSummary());
  const [exportedJson, setExportedJson] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSummary(analytics.getSummary());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    const json = analytics.exportDataAsJSON();
    setExportedJson(json);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kaiju-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleSimulateVisitorEvent = () => {
    analytics.track('PAGE_VIEW', 'Live Test Trigger');
    setSummary(analytics.getSummary());
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#1c2736] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4edea3]/30 bg-[#4edea3]/10 px-3 py-1 text-xs font-mono text-[#4edea3] mb-2">
            <Activity className="h-3.5 w-3.5" />
            PRIVACY_FIRST // CLIENT-SIDE VISITOR INTELLIGENCE
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-mono">
            Platform Analytics & Recruiter Engagement
          </h1>
          <p className="text-sm text-[#a3b1c2] mt-1">
            Real-time engagement telemetry tracked locally with zero third-party tracking cookies or personal data collection.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateVisitorEvent}
            className="flex items-center gap-1.5 rounded-xl border border-[#223142] bg-[#0c141e] px-3.5 py-2 text-xs font-mono text-[#98cbff] hover:bg-[#142030] transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Ping Event
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-xl bg-[#98cbff] px-4 py-2 text-xs font-mono font-bold text-[#001f3f] hover:bg-white transition-all shadow-md shadow-[#98cbff]/20"
          >
            <Download className="h-3.5 w-3.5" /> Export JSON
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="rounded-xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#7e8f9f]">
            <span>TOTAL SESSIONS</span>
            <Eye className="h-3.5 w-3.5 text-[#98cbff]" />
          </div>
          <div className="text-2xl font-bold text-white">{summary.totalSessions}</div>
          <span className="text-[10px] text-[#4edea3]">+14% vs last period</span>
        </div>

        <div className="rounded-xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#7e8f9f]">
            <span>AVG TIME ON SITE</span>
            <Activity className="h-3.5 w-3.5 text-[#4edea3]" />
          </div>
          <div className="text-2xl font-bold text-white">{summary.avgTimeOnSite}</div>
          <span className="text-[10px] text-[#4edea3]">High technical engagement</span>
        </div>

        <div className="rounded-xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#7e8f9f]">
            <span>CASE STUDY READS</span>
            <FileText className="h-3.5 w-3.5 text-[#98cbff]" />
          </div>
          <div className="text-2xl font-bold text-white">{summary.recruiterInteractions.caseStudyReads}</div>
          <span className="text-[10px] text-[#98cbff]">25-section deep dives</span>
        </div>

        <div className="rounded-xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#7e8f9f]">
            <span>CONTACT INBOUNDS</span>
            <Mail className="h-3.5 w-3.5 text-[#4edea3]" />
          </div>
          <div className="text-2xl font-bold text-white">{summary.recruiterInteractions.contactConversions}</div>
          <span className="text-[10px] text-[#4edea3]">3.2% conversion rate</span>
        </div>
      </div>

      {/* Recruiter Conversion Funnel & Project Interest */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recruiter Actions Funnel */}
        <div className="lg:col-span-6 rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 space-y-6 font-mono text-xs shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1c2736] pb-3">
            <span className="text-white font-bold uppercase">Recruiter Intent & Conversion Funnel</span>
            <ShieldCheck className="h-4 w-4 text-[#4edea3]" />
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-[#1e2d3d] bg-[#080d14] flex justify-between items-center">
              <div>
                <span className="text-white font-bold block">1. Full Case Study Deep Dives</span>
                <span className="text-[#657a8e] text-[11px]">Architectural inspections & trade-offs</span>
              </div>
              <span className="text-lg font-bold text-[#98cbff]">{summary.recruiterInteractions.caseStudyReads}</span>
            </div>

            <div className="p-3.5 rounded-xl border border-[#1e2d3d] bg-[#080d14] flex justify-between items-center">
              <div>
                <span className="text-white font-bold block">2. GitHub Source Code Clicks</span>
                <span className="text-[#657a8e] text-[11px]">Direct public repo inspections</span>
              </div>
              <span className="text-lg font-bold text-[#4edea3]">{summary.recruiterInteractions.githubDirectClicks}</span>
            </div>

            <div className="p-3.5 rounded-xl border border-[#1e2d3d] bg-[#080d14] flex justify-between items-center">
              <div>
                <span className="text-white font-bold block">3. CV & Engineering Evidence Views</span>
                <span className="text-[#657a8e] text-[11px]">Experience & education reviews</span>
              </div>
              <span className="text-lg font-bold text-white">{summary.recruiterInteractions.cvViews}</span>
            </div>

            <div className="p-3.5 rounded-xl border border-[#1e2d3d] bg-[#080d14] flex justify-between items-center">
              <div>
                <span className="text-white font-bold block">4. Direct Inquiries & Scheduling</span>
                <span className="text-[#657a8e] text-[11px]">Email copy & calendar clicks</span>
              </div>
              <span className="text-lg font-bold text-[#4edea3]">{summary.recruiterInteractions.contactConversions}</span>
            </div>
          </div>
        </div>

        {/* Popular Projects Breakdown */}
        <div className="lg:col-span-6 rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 space-y-6 font-mono text-xs shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1c2736] pb-3">
            <span className="text-white font-bold uppercase">Popular Systems Engagement</span>
            <TrendingUp className="h-4 w-4 text-[#98cbff]" />
          </div>

          <div className="space-y-3">
            {summary.popularProjects.map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-[#1e2d3d] bg-[#080d14] flex justify-between items-center">
                <span className="text-white font-bold">{p.name}</span>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="text-[#8ca3b8]">{p.views} views</span>
                  <span className="text-[#4edea3] font-bold">{p.caseStudyClicks} case reads</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Guarantee Banner */}
      <div className="rounded-2xl border border-[#1e3b2e] bg-[#09140e] p-6 font-mono text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 text-[#4edea3] shrink-0 mt-0.5" />
          <div>
            <div className="text-white font-bold text-sm">100% Privacy-Preserving Architecture</div>
            <p className="text-[#a3b1c2] text-xs mt-0.5">
              Zero Google Analytics tracking scripts, zero third-party cookie beacons, and zero cross-site fingerprinting. All metrics aggregate strictly in your browser session memory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
