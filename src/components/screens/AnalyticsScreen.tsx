import React, { useState, useEffect } from 'react';
import { analytics } from '../../services/analytics';
import { searchConsoleService } from '../../services/searchConsoleService';
import { opportunityService } from '../../services/opportunityService';
import {
  AnalyticsSummary,
  ScreenId,
  SearchPerformanceData,
  OpportunityItem,
  OpportunityStage,
} from '../../types';
import {
  Activity,
  Download,
  Eye,
  FileText,
  Mail,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  Search,
  Briefcase,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  Inbox,
  Filter,
  BarChart3,
  Calendar,
  Lock,
} from 'lucide-react';

interface AnalyticsScreenProps {
  onSelectScreen: (screenId: ScreenId, caseStudySlug?: string) => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ onSelectScreen }) => {
  const [activeTab, setActiveTab] = useState<'VISITORS' | 'SEARCH_CONSOLE' | 'OPPORTUNITIES'>('VISITORS');
  const [summary, setSummary] = useState<AnalyticsSummary>(analytics.getSummary());
  const [searchData, setSearchData] = useState<SearchPerformanceData | null>(null);
  const [dateRange, setDateRange] = useState<'7d' | '28d' | '3m' | '6m' | '12m'>('28d');
  const [isSyncingSearch, setIsSyncingSearch] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Opportunities state
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(opportunityService.getOpportunities());
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [newNoteText, setNewNoteText] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setSummary(analytics.getSummary());
      setOpportunities(opportunityService.getOpportunities());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadSearchData(dateRange);
  }, [dateRange]);

  const loadSearchData = async (range: '7d' | '28d' | '3m' | '6m' | '12m') => {
    const data = await searchConsoleService.getPerformanceData(range);
    setSearchData(data);
  };

  const handleTriggerSearchSync = async () => {
    setIsSyncingSearch(true);
    setSyncFeedback(null);
    const res = await searchConsoleService.triggerSync();
    setIsSyncingSearch(false);
    setSyncFeedback(res.message);
    loadSearchData(dateRange);
    setTimeout(() => setSyncFeedback(null), 6000);
  };

  const handleExport = () => {
    const json = analytics.exportDataAsJSON();
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

  const handleUpdateOppStage = (id: string, stage: OpportunityStage) => {
    opportunityService.updateStage(id, stage);
    setOpportunities(opportunityService.getOpportunities());
  };

  const handleAddOppNote = (id: string) => {
    const note = newNoteText[id];
    if (!note || !note.trim()) return;
    opportunityService.addNote(id, note.trim());
    setNewNoteText({ ...newNoteText, [id]: '' });
    setOpportunities(opportunityService.getOpportunities());
  };

  const handleArchiveOpp = (id: string) => {
    opportunityService.archive(id);
    setOpportunities(opportunityService.getOpportunities());
  };

  const pipelineStats = opportunityService.getPipelineSummary();
  const filteredOpps = opportunities.filter((o) => {
    if (stageFilter === 'ALL') return !o.archived;
    if (stageFilter === 'ARCHIVED') return o.archived;
    return !o.archived && o.stage === stageFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header & Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#1c2736] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4edea3]/30 bg-[#4edea3]/10 px-3 py-1 text-xs font-mono text-[#4edea3] mb-2">
            <Activity className="h-3.5 w-3.5" />
            KAIJU // MEASURABLE OPPORTUNITY STOREFRONT
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-mono">
            Platform Analytics, Search & Opportunity Engine
          </h1>
          <p className="text-sm text-[#a3b1c2] mt-1">
            Real visitor intelligence, verified Search Console discovery metrics, and active opportunity inbox.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-3">
          {activeTab === 'VISITORS' && (
            <button
              onClick={handleSimulateVisitorEvent}
              className="flex items-center gap-1.5 rounded-xl border border-[#223142] bg-[#0c141e] px-3.5 py-2 text-xs font-mono text-[#98cbff] hover:bg-[#142030] transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Ping Event
            </button>
          )}

          {activeTab === 'SEARCH_CONSOLE' && (
            <button
              onClick={handleTriggerSearchSync}
              disabled={isSyncingSearch}
              className="flex items-center gap-1.5 rounded-xl border border-[#223142] bg-[#0c141e] px-3.5 py-2 text-xs font-mono text-[#98cbff] hover:bg-[#142030] transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncingSearch ? 'animate-spin' : ''}`} /> Sync Console API
            </button>
          )}

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-xl bg-[#98cbff] px-4 py-2 text-xs font-mono font-bold text-[#001f3f] hover:bg-white transition-all shadow-md shadow-[#98cbff]/20 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" /> Export Data
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex gap-2 border-b border-[#1c2736] pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveTab('VISITORS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'VISITORS'
              ? 'bg-[#162536] text-[#98cbff] border border-[#29425e] font-bold'
              : 'text-[#8ca3b8] hover:text-white hover:bg-[#0d1622]'
          }`}
        >
          <Activity className="h-4 w-4" /> Client-Side Telemetry
        </button>

        <button
          onClick={() => setActiveTab('SEARCH_CONSOLE')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'SEARCH_CONSOLE'
              ? 'bg-[#162536] text-[#98cbff] border border-[#29425e] font-bold'
              : 'text-[#8ca3b8] hover:text-white hover:bg-[#0d1622]'
          }`}
        >
          <Search className="h-4 w-4" /> Google Search Console & Benchmark
        </button>

        <button
          onClick={() => setActiveTab('OPPORTUNITIES')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'OPPORTUNITIES'
              ? 'bg-[#162536] text-[#98cbff] border border-[#29425e] font-bold'
              : 'text-[#8ca3b8] hover:text-white hover:bg-[#0d1622]'
          }`}
        >
          <Briefcase className="h-4 w-4" /> Opportunity Inbox
          {pipelineStats.totalOpportunities > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#4edea3]/20 text-[#4edea3] text-[10px] font-bold">
              {pipelineStats.totalOpportunities}
            </span>
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: VISITOR ENGAGEMENT TELEMETRY */}
      {/* ========================================================================= */}
      {activeTab === 'VISITORS' && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
            <div className="rounded-xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-[#7e8f9f]">
                <span>TOTAL SESSIONS</span>
                <Eye className="h-3.5 w-3.5 text-[#98cbff]" />
              </div>
              <div className="text-2xl font-bold text-white">{summary.totalSessions}</div>
              <span className="text-[10px] text-[#4edea3]">Real-time session</span>
            </div>

            <div className="rounded-xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-[#7e8f9f]">
                <span>AVG TIME ON SITE</span>
                <Activity className="h-3.5 w-3.5 text-[#4edea3]" />
              </div>
              <div className="text-2xl font-bold text-white">{summary.avgTimeOnSite}</div>
              <span className="text-[10px] text-[#4edea3]">High architectural engagement</span>
            </div>

            <div className="rounded-xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-[#7e8f9f]">
                <span>CASE STUDY READS</span>
                <FileText className="h-3.5 w-3.5 text-[#98cbff]" />
              </div>
              <div className="text-2xl font-bold text-white">{summary.recruiterInteractions.caseStudyReads}</div>
              <span className="text-[10px] text-[#98cbff]">25-section architecture deep dives</span>
            </div>

            <div className="rounded-xl border border-[#223142] bg-[#0c131d]/90 p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-[#7e8f9f]">
                <span>CONTACT INBOUNDS</span>
                <Mail className="h-3.5 w-3.5 text-[#4edea3]" />
              </div>
              <div className="text-2xl font-bold text-white">{summary.recruiterInteractions.contactConversions}</div>
              <span className="text-[10px] text-[#4edea3]">Active opportunity pipeline</span>
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
                    <span className="text-[#657a8e] text-[11px]">Experience & leadership reviews</span>
                  </div>
                  <span className="text-lg font-bold text-white">{summary.recruiterInteractions.cvViews}</span>
                </div>

                <div className="p-3.5 rounded-xl border border-[#1e2d3d] bg-[#080d14] flex justify-between items-center">
                  <div>
                    <span className="text-white font-bold block">4. Direct Inquiries & Opportunity Submissions</span>
                    <span className="text-[#657a8e] text-[11px]">Opportunity engine transmissions</span>
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: GOOGLE SEARCH CONSOLE & BENCHMARK */}
      {/* ========================================================================= */}
      {activeTab === 'SEARCH_CONSOLE' && searchData && (
        <div className="space-y-6 font-mono text-xs">
          {/* Status & Diagnostic Message */}
          {syncFeedback && (
            <div className="p-4 rounded-xl border border-[#98cbff]/30 bg-[#0d1e30] text-[#98cbff] flex items-center gap-3">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{syncFeedback}</span>
            </div>
          )}

          {/* Connection Banner */}
          <div className="p-5 rounded-2xl border border-[#223142] bg-[#0c131d]/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    searchData.status === 'CONNECTED' ? 'bg-[#4edea3]' : 'bg-[#e2847a]'
                  }`}
                />
                <span className="text-white font-bold">
                  SEARCH CONSOLE STATUS: {searchData.status}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1e2c3d] text-[#8ca3b8] text-[10px]">
                  Property: {searchData.siteUrl}
                </span>
              </div>
              <p className="text-[#8ca3b8] text-[11px]">
                {searchData.lastError || 'Live API connection operational via read-only OAuth 2.0 Webmasters scope.'}
              </p>
            </div>

            {/* Date Range Selector */}
            <div className="flex items-center gap-1.5 bg-[#080d14] p-1 rounded-xl border border-[#1e2d3d]">
              {(['7d', '28d', '3m', '6m', '12m'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] cursor-pointer transition-all ${
                    dateRange === r
                      ? 'bg-[#98cbff] text-[#001f3f] font-bold'
                      : 'text-[#8ca3b8] hover:text-white'
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION: UNEDITABLE HISTORICAL BENCHMARK */}
          <div className="rounded-2xl border border-[#3b4e63] bg-gradient-to-r from-[#0d1622] to-[#080f18] p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c2d40] pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#e2a84a]/20 border border-[#e2a84a]/40 text-[#e2a84a] text-[11px] font-bold">
                  {searchData.benchmark.status}
                </span>
                <h3 className="text-white font-bold text-sm">
                  {searchData.benchmark.label} ({searchData.benchmark.period})
                </h3>
              </div>
              <span className="text-[#7c92a8] text-[11px]">
                Source: {searchData.benchmark.verifiedSource}
              </span>
            </div>

            <p className="text-[#9cb2c8] text-xs leading-relaxed">
              {searchData.benchmark.notes}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-[#1e3046] bg-[#080d14]">
                <div className="text-[#7c92a8] text-[10px]">HISTORICAL CLICKS</div>
                <div className="text-2xl font-bold text-[#e2a84a] mt-1">
                  {searchData.benchmark.clicks}
                </div>
                <div className="text-[10px] text-[#4edea3]">28-Day Milestone</div>
              </div>

              <div className="p-4 rounded-xl border border-[#1e3046] bg-[#080d14]">
                <div className="text-[#7c92a8] text-[10px]">TOTAL IMPRESSIONS</div>
                <div className="text-2xl font-bold text-white mt-1">
                  {searchData.benchmark.impressions.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#8ca3b8]">Verified SERP impressions</div>
              </div>

              <div className="p-4 rounded-xl border border-[#1e3046] bg-[#080d14]">
                <div className="text-[#7c92a8] text-[10px]">HISTORICAL CTR</div>
                <div className="text-2xl font-bold text-[#4edea3] mt-1">
                  {searchData.benchmark.ctr}%
                </div>
                <div className="text-[10px] text-[#8ca3b8]">Organic click-through</div>
              </div>

              <div className="p-4 rounded-xl border border-[#1e3046] bg-[#080d14]">
                <div className="text-[#7c92a8] text-[10px]">AVG SERP POSITION</div>
                <div className="text-2xl font-bold text-[#98cbff] mt-1">
                  {searchData.benchmark.avgPosition}
                </div>
                <div className="text-[10px] text-[#8ca3b8]">Target search queries</div>
              </div>
            </div>
          </div>

          {/* Setup / Instructions Banner when Search Console is disconnected */}
          {searchData.status === 'DISCONNECTED' && (
            <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold">
                <Lock className="h-4 w-4 text-[#98cbff]" />
                How to Connect Live Google Search Console
              </div>
              <p className="text-[#8ca3b8] text-xs leading-relaxed">
                Kaiju includes a dedicated server-side OAuth 2.0 integration that queries the Search Console API securely without exposing any secrets in client-side code. To activate live synchronization:
              </p>
              <div className="bg-[#080d14] p-4 rounded-xl border border-[#1c2736] space-y-2 text-[#98cbff] text-xs font-mono">
                <div>1. Enable the Google Search Console API in Google Cloud Console.</div>
                <div>2. Add OAuth 2.0 Client credentials with scope: <span className="text-white">https://www.googleapis.com/auth/webmasters.readonly</span></div>
                <div>3. Add environment variables to Render / your backend .env:</div>
                <div className="text-[#4edea3] pl-3">
                  SEARCH_CONSOLE_SITE_URL=https://kaiju-systems.onrender.com<br/>
                  GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com<br/>
                  GOOGLE_CLIENT_SECRET=your_client_secret<br/>
                  GOOGLE_REFRESH_TOKEN=your_refresh_token
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: OPPORTUNITY ENGINE & PIPELINE INBOX */}
      {/* ========================================================================= */}
      {activeTab === 'OPPORTUNITIES' && (
        <div className="space-y-6 font-mono text-xs">
          {/* Pipeline Stage Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { stage: 'NEW', count: pipelineStats.stages.NEW, color: '#98cbff' },
              { stage: 'CONTACTED', count: pipelineStats.stages.CONTACTED, color: '#e2a84a' },
              { stage: 'CONVERSATION', count: pipelineStats.stages.CONVERSATION, color: '#e2847a' },
              { stage: 'INTERVIEW', count: pipelineStats.stages.INTERVIEW, color: '#c084fc' },
              { stage: 'DISCOVERY', count: pipelineStats.stages.DISCOVERY, color: '#67e8f9' },
              { stage: 'PROPOSAL', count: pipelineStats.stages.PROPOSAL, color: '#fde047' },
              { stage: 'WON', count: pipelineStats.stages.WON, color: '#4edea3' },
            ].map((st) => (
              <div
                key={st.stage}
                onClick={() => setStageFilter(st.stage)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  stageFilter === st.stage
                    ? 'border-[#98cbff] bg-[#142334]'
                    : 'border-[#1e2d3d] bg-[#0c131d]/90 hover:border-[#2a4058]'
                }`}
              >
                <div className="text-[10px] text-[#7c92a8]">{st.stage}</div>
                <div className="text-xl font-bold mt-1" style={{ color: st.color }}>
                  {st.count}
                </div>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between border-b border-[#1c2736] pb-3">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-[#98cbff]" />
              <span className="text-white font-bold">FILTER:</span>
              <button
                onClick={() => setStageFilter('ALL')}
                className={`px-2.5 py-1 rounded-md text-[11px] cursor-pointer ${
                  stageFilter === 'ALL' ? 'bg-[#98cbff] text-[#001f3f] font-bold' : 'text-[#8ca3b8]'
                }`}
              >
                ACTIVE ({pipelineStats.totalOpportunities})
              </button>
              <button
                onClick={() => setStageFilter('ARCHIVED')}
                className={`px-2.5 py-1 rounded-md text-[11px] cursor-pointer ${
                  stageFilter === 'ARCHIVED' ? 'bg-[#98cbff] text-[#001f3f] font-bold' : 'text-[#8ca3b8]'
                }`}
              >
                ARCHIVED
              </button>
            </div>
            <span className="text-[#6d8296] text-[11px]">
              Full UTM attribution & lead capture
            </span>
          </div>

          {/* Opportunities List */}
          {filteredOpps.length === 0 ? (
            <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-12 text-center space-y-3">
              <Inbox className="h-10 w-10 text-[#455768] mx-auto" />
              <h3 className="text-white font-bold text-sm">No Inbound Leads in this View</h3>
              <p className="text-[#8ca3b8] text-xs max-w-md mx-auto">
                Inbound messages submitted via the Contact form or technical brief access requests are automatically routed and attributed here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOpps.map((opp) => (
                <div
                  key={opp.id}
                  className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1c2736] pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-bold text-base">{opp.contactName}</span>
                        {opp.company && (
                          <span className="px-2 py-0.5 rounded bg-[#162536] text-[#98cbff] text-[11px]">
                            {opp.company}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-[#1c2d40] text-[#7c92a8] text-[10px]">
                          {opp.source}
                        </span>
                      </div>
                      <div className="text-[#8ca3b8] text-xs">
                        <a href={`mailto:${opp.contactEmail}`} className="hover:text-white underline">
                          {opp.contactEmail}
                        </a>
                        {opp.roleInterest && <span> &bull; Interest: {opp.roleInterest}</span>}
                      </div>
                    </div>

                    {/* Stage Selector Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[#7c92a8] text-[11px]">Stage:</span>
                      <select
                        value={opp.stage}
                        onChange={(e) => handleUpdateOppStage(opp.id, e.target.value as OpportunityStage)}
                        className="rounded-lg border border-[#223142] bg-[#080d14] px-3 py-1.5 text-white outline-none focus:border-[#98cbff]"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="CONVERSATION">CONVERSATION</option>
                        <option value="INTERVIEW">INTERVIEW</option>
                        <option value="DISCOVERY">DISCOVERY</option>
                        <option value="PROPOSAL">PROPOSAL</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                      </select>

                      {!opp.archived && (
                        <button
                          onClick={() => handleArchiveOpp(opp.id)}
                          className="px-2.5 py-1.5 rounded-lg border border-[#223142] text-[#8ca3b8] hover:text-white hover:bg-[#142030] cursor-pointer"
                        >
                          Archive
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="p-4 rounded-xl border border-[#1e2d3d] bg-[#080d14] text-[#c0d8cc] text-xs font-sans leading-relaxed">
                    {opp.message}
                  </div>

                  {/* UTM Attribution Meta */}
                  {opp.utm && (
                    <div className="flex flex-wrap gap-2 text-[10px] text-[#7c92a8]">
                      {opp.utm.utm_source && <span className="bg-[#142030] px-2 py-0.5 rounded">source: {opp.utm.utm_source}</span>}
                      {opp.utm.utm_medium && <span className="bg-[#142030] px-2 py-0.5 rounded">medium: {opp.utm.utm_medium}</span>}
                      {opp.utm.utm_campaign && <span className="bg-[#142030] px-2 py-0.5 rounded">campaign: {opp.utm.utm_campaign}</span>}
                    </div>
                  )}

                  {/* Notes & Follow-up log */}
                  {opp.notes && opp.notes.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[#7c92a8] text-[11px] block font-bold">Progress Notes:</span>
                      {opp.notes.map((n, i) => (
                        <div key={i} className="text-[#98cbff] text-[11px] pl-2 border-l border-[#223548]">
                          {n}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Note Input */}
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Add follow-up note (e.g. Sent scheduling link, interview on Thursday)..."
                      value={newNoteText[opp.id] || ''}
                      onChange={(e) => setNewNoteText({ ...newNoteText, [opp.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddOppNote(opp.id);
                      }}
                      className="flex-1 rounded-xl border border-[#223142] bg-[#080d14] px-3.5 py-2 text-white placeholder-[#455768] outline-none focus:border-[#98cbff]"
                    />
                    <button
                      onClick={() => handleAddOppNote(opp.id)}
                      className="px-4 py-2 rounded-xl bg-[#1e2e42] text-[#98cbff] hover:bg-[#283e58] cursor-pointer"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Privacy & Truth Discipline Notice */}
      <div className="rounded-2xl border border-[#1e3b2e] bg-[#09140e] p-6 font-mono text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 text-[#4edea3] shrink-0 mt-0.5" />
          <div>
            <div className="text-white font-bold text-sm">Truth Discipline & Zero Data Fabrication</div>
            <p className="text-[#a3b1c2] text-xs mt-0.5">
              Live Google Search Console and Recruiter analytics adhere strictly to verifiable evidence. Historical milestones (such as the 120-click Q3 benchmark) are strictly classified as historical benchmarks and never commingled with live telemetry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
