import { HistoricalBenchmark, SearchPerformanceData, SearchConsoleMetricRow, SearchConsoleQueryRow, SearchConsolePageRow } from '../types';

const BENCHMARK_STORAGE_KEY = 'kaiju_search_benchmark_v1';
const LIVE_SEARCH_DATA_KEY = 'kaiju_search_live_data_v1';

// Strict Historical Benchmark (28-day period ending 30 September 2026)
// Stored as an uneditable historical benchmark, strictly separated from live telemetry.
export const HISTORICAL_120_BENCHMARK: HistoricalBenchmark = {
  id: 'benchmark-sept-2026-120',
  label: 'Q3 2026 Organic Search Breakthrough',
  period: '28 days (Ending 30 Sep 2026)',
  startDate: '2026-09-02',
  endDate: '2026-09-30',
  clicks: 120,
  impressions: 2840,
  ctr: 4.22,
  avgPosition: 14.8,
  status: 'HISTORICAL BENCHMARK',
  verifiedSource: 'Google Search Console (Export Snapshot / Archived Record)',
  notes: 'Historical milestone: organic discovery for systems architecture, enterprise RPA, and sovereign intelligence queries.'
};

class SearchConsoleService {
  private benchmark: HistoricalBenchmark = HISTORICAL_120_BENCHMARK;

  public getBenchmark(): HistoricalBenchmark {
    return this.benchmark;
  }

  /**
   * Fetch current Search Performance data.
   * If backend API /api/search-console/performance is reachable, it uses live Google Search Console data.
   * Otherwise returns disconnected/historical state with setup instructions, ensuring zero fabricated live data.
   */
  public async getPerformanceData(range: '7d' | '28d' | '3m' | '6m' | '12m' = '28d'): Promise<SearchPerformanceData> {
    try {
      const response = await fetch(`/api/search-console/performance?range=${range}`, {
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        const liveData = await response.json();
        return {
          ...liveData,
          benchmark: this.benchmark
        };
      }
    } catch {
      // Backend not running or in static deployment mode
    }

    // Diagnostic fallback state: Live Search Console is disconnected until credentials are provided in .env
    return {
      status: 'DISCONNECTED',
      siteUrl: 'https://kaiju-systems.onrender.com',
      lastSyncedAt: undefined,
      lastError: 'Live Google Search Console API not configured or awaiting credentials. To connect live telemetry, configure SEARCH_CONSOLE_SITE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN.',
      dataFreshness: 'HISTORICAL_ONLY',
      dateRange: range,
      metrics: [],
      topQueries: [],
      topPages: [],
      summary: {
        totalClicks: 0,
        totalImpressions: 0,
        averageCtr: 0,
        averagePosition: 0,
      },
      benchmark: this.benchmark
    };
  }

  /**
   * Trigger a manual sync against the backend Google Search Console sync worker.
   */
  public async triggerSync(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/search-console/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      return data;
    } catch (err: any) {
      return {
        success: false,
        message: 'Backend sync endpoint unreachable. Ensure the backend worker is running or env secrets are loaded.'
      };
    }
  }
}

export const searchConsoleService = new SearchConsoleService();
