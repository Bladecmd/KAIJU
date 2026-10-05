import { OpportunityItem, OpportunityStage, OpportunitySource, UTMParameters } from '../types';

const STORAGE_KEY = 'kaiju_opportunity_inbox_v1';

class OpportunityService {
  private opportunities: OpportunityItem[] = [];

  constructor() {
    this.loadOpportunities();
  }

  private loadOpportunities() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        this.opportunities = JSON.parse(data);
      } else {
        // Initialize with default or empty
        this.opportunities = [];
      }
    } catch {
      this.opportunities = [];
    }
  }

  private save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.opportunities));
    } catch {
      // ignore storage failure
    }
  }

  public getOpportunities(): OpportunityItem[] {
    return [...this.opportunities].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public addOpportunity(params: {
    contactName: string;
    contactEmail: string;
    company?: string;
    roleInterest?: string;
    message: string;
    source?: OpportunitySource;
    utm?: UTMParameters;
  }): OpportunityItem {
    const newOpp: OpportunityItem = {
      id: 'opp-' + Math.random().toString(36).substring(2, 9),
      contactName: params.contactName,
      contactEmail: params.contactEmail,
      company: params.company,
      roleInterest: params.roleInterest,
      message: params.message,
      stage: 'NEW',
      source: params.source || (params.utm?.utm_source ? 'ORGANIC_SEARCH' : 'DIRECT_OUTREACH'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      utm: params.utm,
      notes: [],
      archived: false,
    };

    this.opportunities.unshift(newOpp);
    this.save();

    // Also forward to server if running
    this.syncToServer(newOpp);

    return newOpp;
  }

  public updateStage(id: string, stage: OpportunityStage): boolean {
    const opp = this.opportunities.find((o) => o.id === id);
    if (opp) {
      opp.stage = stage;
      opp.updatedAt = new Date().toISOString();
      this.save();
      return true;
    }
    return false;
  }

  public addNote(id: string, note: string): boolean {
    const opp = this.opportunities.find((o) => o.id === id);
    if (opp) {
      if (!opp.notes) opp.notes = [];
      opp.notes.push(`[${new Date().toLocaleDateString()}] ${note}`);
      opp.updatedAt = new Date().toISOString();
      this.save();
      return true;
    }
    return false;
  }

  public archive(id: string): boolean {
    const opp = this.opportunities.find((o) => o.id === id);
    if (opp) {
      opp.archived = true;
      opp.updatedAt = new Date().toISOString();
      this.save();
      return true;
    }
    return false;
  }

  public getPipelineSummary() {
    const active = this.opportunities.filter((o) => !o.archived);
    const stages: Record<OpportunityStage, number> = {
      NEW: 0,
      CONTACTED: 0,
      CONVERSATION: 0,
      INTERVIEW: 0,
      DISCOVERY: 0,
      PROPOSAL: 0,
      WON: 0,
      LOST: 0,
    };

    active.forEach((opp) => {
      if (stages[opp.stage] !== undefined) {
        stages[opp.stage]++;
      }
    });

    return {
      totalOpportunities: active.length,
      stages,
      wonCount: stages.WON,
      interviewCount: stages.INTERVIEW,
    };
  }

  private async syncToServer(opp: OpportunityItem) {
    try {
      await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opp),
      });
    } catch {
      // Local storage serves as primary cache in offline or static environments
    }
  }
}

export const opportunityService = new OpportunityService();
