import { BriefAccessRequest, UTMParameters } from '../types';
import { analytics } from './analytics';

const STORAGE_REQUESTS_KEY = 'kaiju_brief_access_requests_v1';
const STORAGE_SESSIONS_KEY = 'kaiju_brief_sessions_v1';

export interface AccessSession {
  token: string;
  projectSlug: string;
  userEmail: string;
  expiresAt: number; // Unix epoch ms
  createdAt: number;
}

class AccessControlService {
  private requests: BriefAccessRequest[] = [];
  private sessions: Record<string, AccessSession> = {}; // keyed by projectSlug

  constructor() {
    this.loadState();
  }

  private loadState() {
    try {
      const storedReqs = localStorage.getItem(STORAGE_REQUESTS_KEY);
      if (storedReqs) {
        this.requests = JSON.parse(storedReqs);
      }
      const storedSessions = localStorage.getItem(STORAGE_SESSIONS_KEY);
      if (storedSessions) {
        this.sessions = JSON.parse(storedSessions);
      }
    } catch {
      this.requests = [];
      this.sessions = {};
    }
  }

  private saveState() {
    try {
      localStorage.setItem(STORAGE_REQUESTS_KEY, JSON.stringify(this.requests));
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(this.sessions));
    } catch (e) {
      console.warn('Failed to persist access control state', e);
    }
  }

  /**
   * Checks if user has a valid, non-expired access session for a project
   */
  public hasAccess(projectSlug: string): boolean {
    const session = this.sessions[projectSlug];
    if (!session) return false;

    // Check expiration (default 24h validity)
    if (Date.now() > session.expiresAt) {
      delete this.sessions[projectSlug];
      this.saveState();
      return false;
    }

    return true;
  }

  /**
   * Request access to a restricted technical brief
   */
  public submitAccessRequest(
    data: Omit<BriefAccessRequest, 'id' | 'timestamp' | 'status' | 'accessToken'>
  ): { success: boolean; session?: AccessSession; message: string } {
    const now = Date.now();
    const requestId = `req_${Math.random().toString(36).substring(2, 9)}_${now}`;
    const token = `token_brief_${Math.random().toString(36).substring(2, 12)}_${now}`;

    // Auto-approve standard technical inquiries for high friction reduction
    // while logging complete lead telemetry
    const newRequest: BriefAccessRequest = {
      ...data,
      id: requestId,
      timestamp: new Date().toISOString(),
      status: 'AUTO_APPROVED',
      accessToken: token,
      utm: analytics.getUTM(),
    };

    this.requests.unshift(newRequest);

    // Create 24-hour session
    const session: AccessSession = {
      token,
      projectSlug: data.projectSlug,
      userEmail: data.workEmail,
      createdAt: now,
      expiresAt: now + 24 * 60 * 60 * 1000,
    };

    this.sessions[data.projectSlug] = session;
    this.saveState();

    // Track analytics lead event
    analytics.track(
      'TECHNICAL_BRIEF_REQUEST',
      `${data.projectName} | ${data.workEmail} (${data.organization || 'Private'})`
    );

    return {
      success: true,
      session,
      message: 'Access granted. Technical brief unlocked for 24 hours.',
    };
  }

  public revokeAccess(projectSlug: string) {
    if (this.sessions[projectSlug]) {
      delete this.sessions[projectSlug];
      this.saveState();
    }
  }

  public getAllRequests(): BriefAccessRequest[] {
    return [...this.requests];
  }
}

export const accessControl = new AccessControlService();
