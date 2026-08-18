export type ScreenId =
  | 'HOME'
  | 'PROJECTS'
  | 'CASE_STUDIES'
  | 'ARCHITECTURE'
  | 'SKILLS'
  | 'EXPERIENCE'
  | 'ANALYTICS'
  | 'GITHUB'
  | 'CONTACT'
  // Legacy aliases mapped gracefully to screens
  | 'SYSTEM'
  | 'NODES'
  | 'SENSORS'
  | 'LOGS'
  | 'USER';

export type LogType = 'BOOT' | 'AUTH' | 'NET' | 'DATA' | 'WARN' | 'OK' | 'SYSTEM' | 'CMD' | 'ERROR' | 'AI';

export interface LogItem {
  id: string;
  time: string;
  type: LogType;
  text: string;
  subtext?: string;
}

// -------------------------------------------------------------
// 1. PROJECT SHOWCASE MODEL
// -------------------------------------------------------------
export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  category: 'AI_ORCHESTRATION' | 'AUTOMATION_DISPATCH' | 'COMPLIANCE_SEC' | 'AUDIO_DSP' | 'SOVEREIGN_SYSTEMS' | 'SYSTEMS_ARCHITECTURE';
  status: 'PRODUCTION' | 'ACTIVE_PILOT' | 'STABLE_CORE' | 'UNDER_ACTIVE_DEV';
  tagline: string;
  shortDescription: string;
  businessPurpose: string;
  technologies: string[];
  architectureOverview: string;
  keyCapabilities: string[];
  evidenceHighlights: string[];
  caseStudyId: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  metricsHighlight?: { label: string; value: string };
  featured: boolean;
}

// -------------------------------------------------------------
// 2. MASTER 25-SECTION CASE STUDY MODEL
// -------------------------------------------------------------
export interface CaseStudyData {
  id: string;
  slug: string;
  
  // 01 - PROJECT IDENTITY
  identity: {
    projectName: string;
    projectType: string;
    status: string;
    myRole: string;
    technologyStack: string[];
    developmentPeriod: string;
    repositoryUrl?: string;
    liveApplicationUrl?: string;
  };

  // 02 - THE ONE-MINUTE STORY
  oneMinuteStory: {
    theProblem: string;
    theIdea: string;
    theSystem: string;
    theOutcome: string;
    whyItMatters: string;
  };

  // 03 - BUSINESS CONTEXT (Highlighting Business Finance background)
  businessContext: {
    businessModel: string;
    targetCustomer: string;
    valueProposition: string;
    revenueMechanism: string;
    costStructure: string;
    operationalModel: string;
    businessRisks: string[];
  };

  // 04 - SYSTEM OBJECTIVE
  systemObjective: {
    primaryObjective: string;
    secondaryObjectives: string[];
    constraints: string[];
    requirements: string[];
  };

  // 05 - SYSTEM ARCHITECTURE
  systemArchitecture: {
    diagramSummary: string;
    frontend: string;
    backend: string;
    database: string;
    authentication: string;
    infrastructure: string;
    externalServices: string[];
    aiComponents?: string[];
    eventQueueArchitecture: string;
  };

  // 06 - DATA FLOW
  dataFlow: {
    summary: string;
    steps: { stepNumber: number; actorOrService: string; action: string; output: string }[];
  };

  // 07 - HARD PROBLEMS
  hardProblems: {
    id: string;
    title: string;
    problem: string;
    analysis: string;
    solution: string;
    result: string;
  }[];

  // 08 - ARCHITECTURAL DECISIONS
  architecturalDecisions: {
    decision: string;
    problem: string;
    optionsConsidered: string[];
    chosenApproach: string;
    reason: string;
    tradeOffs: string;
    result: string;
  }[];

  // 09 - AI-NATIVE DEVELOPMENT
  aiNativeDevelopment: {
    humanResponsibilities: string[];
    aiResponsibilities: string[];
    workflowSummary: string;
  };

  // 10 - MY CONTRIBUTION
  myContribution: {
    iDefined: string[];
    iOrchestrated: string[];
    iValidated: string[];
    iOperated: string[];
  };

  // 11 - AUTOMATION
  automations: {
    name: string;
    trigger: string;
    logic: string;
    action: string;
    result: string;
  }[];

  // 12 - AI / AGENT ARCHITECTURE
  aiAgentArchitecture?: {
    model: string;
    input: string;
    contextStrategy: string;
    toolsAvailable: string[];
    decisionEngine: string;
    outputStructure: string;
    guardrails: string[];
    humanOversightMechanism: string;
  };

  // 13 - SECURITY
  security: {
    authentication: string;
    authorisation: string;
    secretsManagement: string;
    apiSecurity: string;
    databaseSecurity: string;
    inputValidation: string;
    rateLimiting: string;
    auditLogging: string;
    threatMitigations: { threat: string; mitigation: string; evidence: string }[];
  };

  // 14 - FINOPS & COST CONTROLS
  finOps: {
    costCentres: { name: string; allocation: string; note: string }[];
    costControls: string[];
    spendingLimits: string;
    monitoringApproach: string;
    costPerTransaction: string;
    costOptimisationStrategies: string[];
  };

  // 15 - TESTING
  testing: {
    unitTesting: string;
    integrationTesting: string;
    e2eTesting: string;
    stressTesting: string;
    recoveryTesting: string;
    securityTesting: string;
    regressionTesting: string;
  };

  // 16 - PRODUCTION EVIDENCE
  productionEvidence: {
    title: string;
    type: 'DASHBOARD' | 'ARCHITECTURE' | 'LOGS' | 'FINOPS' | 'SECURITY' | 'CODE';
    what: string;
    whyItMatters: string;
    whatItProves: string;
  }[];

  // 17 - PERFORMANCE METRICS (Real or marked 'Not yet measured')
  performance: {
    metric: string;
    value: string;
    benchmark?: string;
    status: 'MEASURED' | 'NOT_YET_MEASURED' | 'ESTIMATED';
  }[];

  // 18 - FAILURE & RECOVERY
  failureAndRecovery: {
    scenario: string;
    failureMechanism: string;
    recoveryFlow: string[];
    guarantee: string;
  };

  // 19 - RESULTS
  results: {
    beforeState: string;
    afterState: string;
    measuredImprovement: string;
    businessImpact: string;
    technicalImpact: string;
  };

  // 20 - WHAT I LEARNED
  whatILearned: {
    engineering: string;
    architecture: string;
    business: string;
    ai: string;
  };

  // 21 - ENGINEERING REALITY (Genuine production incidents)
  engineeringReality: {
    whatBroke: string;
    whyItBroke: string;
    howItWasDiagnosed: string;
    howItWasFixed: string;
    whatChanged: string;
    whatWasLearned: string;
  };

  // 22 - WHAT I WOULD DO DIFFERENTLY
  whatIWouldDoDifferently: string[];

  // 23 - FUTURE ARCHITECTURE ROADMAP
  futureArchitecture: {
    v1: string;
    v2: string;
    v3: string;
  };

  // 24 - INTERVIEW PREPARATION QUESTIONS
  interviewQuestions: {
    question: string;
    answerSummary: string;
  }[];

  // 25 - EXECUTIVE SUMMARY
  executiveSummary: {
    projectStatus: string;
    businessValue: string;
    technicalValue: string;
    aiCapabilityDemonstrated: string;
    automationCapabilityDemonstrated: string;
    securityCapabilityDemonstrated: string;
    finOpsCapabilityDemonstrated: string;
    primarySkillsDemonstrated: string[];
  };
}

// -------------------------------------------------------------
// 3. SKILLS & COMPETENCY MODEL
// -------------------------------------------------------------
export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: 'ARCHITECT' | 'EXPERT' | 'ADVANCED' | 'PRACTITIONER';
    evidence: string;
    tags: string[];
  }[];
}

// -------------------------------------------------------------
// 4. EXPERIENCE & CAREER MODEL
// -------------------------------------------------------------
export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'FOUNDER_ARCHITECT' | 'SYSTEMS_LEAD' | 'EDUCATION' | 'CONSULTING';
  overview: string;
  keyOutcomes: string[];
  technologies: string[];
  systemsDelivered: string[];
}

// -------------------------------------------------------------
// 5. GITHUB REPOSITORY SHOWCASE MODEL
// -------------------------------------------------------------
export interface GitHubRepoItem {
  id: string;
  name: string;
  description: string;
  technology: string[];
  purpose: string;
  githubUrl: string;
  status: 'PUBLIC_ACTIVE' | 'CORE_FRAMEWORK' | 'COMMUNITY_TEMPLATE' | 'SYSTEM_SPECS';
  relevantCaseStudySlug?: string;
  starsCount?: number;
  forksCount?: number;
  lastCommitTime?: string;
}

// -------------------------------------------------------------
// 6. ANALYTICS MODEL (Privacy-First)
// -------------------------------------------------------------
export type AnalyticsEventType =
  | 'PAGE_VIEW'
  | 'PROJECT_VIEW'
  | 'CASE_STUDY_VIEW'
  | 'SECTION_SCROLL'
  | 'GITHUB_CLICK'
  | 'DEMO_CLICK'
  | 'CV_DOWNLOAD'
  | 'CONTACT_SUBMIT'
  | 'COMMAND_PALETTE_TRIGGER';

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  type: AnalyticsEventType;
  target?: string;
  referrer: string;
  country: string;
  deviceType: 'DESKTOP' | 'MOBILE' | 'TABLET';
  sessionDuration: number;
}

export interface AnalyticsSummary {
  totalVisitors: number;
  totalSessions: number;
  avgTimeOnSite: string;
  topGeos: { country: string; percentage: number }[];
  trafficSources: { source: string; percentage: number }[];
  popularProjects: { name: string; views: number; caseStudyClicks: number }[];
  recruiterInteractions: {
    cvViews: number;
    caseStudyReads: number;
    githubDirectClicks: number;
    contactConversions: number;
  };
}

// -------------------------------------------------------------
// 7. LEGACY / TELEMETRY INTERFACES
// -------------------------------------------------------------
export interface AutomationNode {
  id: string;
  name: string;
  layer: string;
  status: 'ACTIVE' | 'STANDBY' | 'SYNCING' | 'MAINTENANCE';
  latency: number;
  throughput: number;
  memoryUsage: number;
  loadPercentage: number;
  uptime: string;
  description: string;
}

export interface SensorNode {
  id: string;
  code: string;
  region: string;
  location: string;
  status: 'ONLINE' | 'DEGRADED' | 'STANDBY';
  latency: number;
  jitter: number;
  packetLoss: number;
  throughput: string;
  coords: { x: number; y: number };
}

export interface CommandItem {
  id: string;
  title: string;
  shortcut?: string;
  category: 'NAVIGATION' | 'ACTIONS' | 'SYSTEM' | 'NETWORK' | 'PROJECTS';
  action: () => void;
  description?: string;
}
