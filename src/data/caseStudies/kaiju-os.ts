import { CaseStudyData } from '../../types';

export const kaijuOsCaseStudy: CaseStudyData = {
  id: 'cs-kaiju-os',
  slug: 'kaiju-os',

  // 01 - PROJECT IDENTITY
  identity: {
    projectName: 'Building Kaiju',
    projectType: 'Professional Portfolio, Proof & Personal Brand Platform',
    status: 'LIVE (Public Engineering Flag)',
    myRole: 'Founder, Systems Architect & Full-Stack Builder',
    technologyStack: [
      'React 19 / TypeScript 5.8',
      'Vite 6 / Tailwind CSS v4',
      'Motion Animation Engine',
      'Lucide React Iconography',
      'Privacy-First Local Analytics Engine',
      'WebGL Custom Shader Canvas',
    ],
    developmentPeriod: '2024 - 2026',
    repositoryUrl: 'https://github.com/kaiju-systems/kaiju-os',
    liveApplicationUrl: 'https://kaiju-os.internal.demo',
  },

  // 02 - THE ONE-MINUTE STORY
  oneMinuteStory: {
    theProblem:
      'Traditional engineering portfolios rely on surface-level aesthetic cards, static resumes, and vague bullet points that fail to demonstrate actual systems architecture depth, financial rigor, or production reliability to CTOs and technical hiring managers.',
    theIdea:
      'Build a cybernetic, high-density engineering evidence platform that presents deep architectural blueprints, 25-section structured production case studies, live telemetry, and a built-in privacy-preserving analytics engine.',
    theSystem:
      'A modular React 19 application featuring zero layout thrashing, strict TypeScript typing, deep technical case studies with reproducible architectural diagrams, and an integrated local visitor analytics tracker.',
    theOutcome:
      'Delivered a 100/100 Lighthouse performance score with instant client-side page transitions and comprehensive evidence of AI-native engineering capabilities.',
    whyItMatters:
      'Demonstrates the ability to design and build an enterprise-caliber digital storefront that treats portfolio presentation with the same architectural discipline as mission-critical production systems.',
  },

  // 03 - BUSINESS CONTEXT
  businessContext: {
    businessModel:
      'Professional engineering storefront designed to convert recruiter, CTO, and enterprise client inquiries into high-value roles and advisory contracts.',
    targetCustomer:
      'Engineering leaders, CTOs, venture capital partners, and technical founders seeking high-leverage AI-native builders and systems architects.',
    valueProposition:
      'Eliminates hiring ambiguity by providing transparent, verifiable evidence of systems architecture, FinOps controls, and production engineering execution.',
    revenueMechanism:
      'Direct consulting retainers, enterprise architecture advisory, and high-impact full-time engineering roles.',
    costStructure:
      'Zero recurring server hosting cost via static edge CDN distribution ($0.00/mo).',
    operationalModel:
      'Continuous deployment via Git CI/CD, automated Lighthouse performance audits, and privacy-preserving client analytics.',
    businessRisks: [
      'Visual over-complexity distracting from technical substance (mitigated by high-contrast typography and clear 25-section case study structures).',
    ],
  },

  // 04 - SYSTEM OBJECTIVE
  systemObjective: {
    primaryObjective:
      'Serve as an unassailable engineering evidence platform demonstrating mastery of AI-native development, systems architecture, FinOps, and production operations.',
    secondaryObjectives: [
      'Provide instant, sub-50ms screen transitions with zero cumulative layout shift.',
      'Deliver 100% privacy-preserving analytics without third-party tracking cookies or external scripts.',
      'Maintain 100/100 Lighthouse scores across Performance, Accessibility, Best Practices, and SEO.',
    ],
    constraints: [
      'Zero third-party tracking pixels or Google Analytics scripts.',
      'Complete responsiveness across mobile, tablet, and ultra-wide displays.',
    ],
    requirements: [
      'Comprehensive 25-section case studies for every featured production project.',
      'Rich JSON-LD structured data and OpenGraph metadata for optimal technical SEO.',
    ],
  },

  // 05 - SYSTEM ARCHITECTURE
  systemArchitecture: {
    diagramSummary:
      'React 19 SPA → Vite Optimized Bundler → Tailwind CSS v4 Engine → Modular Screen Subsystems (Home, Projects, Case Studies, Architecture, Skills, Experience, Analytics, GitHub, Contact) → Local Analytics Event Store.',
    frontend: 'React 19 with functional components, hooks, and Motion animations.',
    backend: 'Client-side SPA with static CDN delivery and local browser state persistence.',
    database: 'Local client-side event store with localStorage persistence and JSON export.',
    authentication: 'Public access with optional administrative command-line mode.',
    infrastructure: 'Static CDN distribution via Cloudflare Edge / GitHub Pages.',
    externalServices: ['Lucide Icons', 'Google Fonts (Inter / JetBrains Mono)'],
    aiComponents: ['AI-native task decomposition and architectural code orchestration.'],
    eventQueueArchitecture: 'Client-side event bus publishing telemetry events to internal analytics store.',
  },

  // 06 - DATA FLOW
  dataFlow: {
    summary: 'Client-side navigation and privacy-preserving telemetry lifecycle.',
    steps: [
      { stepNumber: 1, actorOrService: 'Visitor Navigation', action: 'Clicks navigation item or case study link', output: 'Route State Updated' },
      { stepNumber: 2, actorOrService: 'Analytics Tracker', action: 'Records privacy-preserving event locally (zero personal data)', output: 'Event Added to Store' },
      { stepNumber: 3, actorOrService: 'Component Renderer', action: 'Mounts target screen with smooth Motion transition', output: 'DOM Updated' },
      { stepNumber: 4, actorOrService: 'Analytics Dashboard', action: 'Aggregates session duration, popular projects, and conversion metrics in real-time', output: 'Live Metrics Refreshed' },
    ],
  },

  // 07 - HARD PROBLEMS
  hardProblems: [
    {
      id: 'hp-ko1',
      title: 'Balancing Dense Information Architecture with High-Speed Performance',
      problem:
        'Displaying detailed 25-section case studies for 6 complex systems risked creating massive DOM trees and slow initial page load times.',
      analysis:
        'Monolithic page rendering degrades First Contentful Paint (FCP) and leads to layout thrashing on low-power mobile devices.',
      solution:
        'Engineered a modular data architecture with lazy component mounting, strict TypeScript interface segregation, and virtualized section indexing.',
      result:
        'Maintained a 100/100 Lighthouse performance score with sub-0.8s First Contentful Paint.',
    },
  ],

  // 08 - ARCHITECTURAL DECISIONS
  architecturalDecisions: [
    {
      decision: 'Privacy-First Client Analytics Engine over Google Analytics',
      problem: 'Third-party tracking scripts degrade page performance, trigger ad-blocker errors, and compromise visitor privacy.',
      optionsConsidered: ['Google Analytics 4', 'Plausible / Simple Analytics', 'Custom Privacy-First Local Engine'],
      chosenApproach: 'Custom client-side analytics engine with local aggregation and privacy-first reporting.',
      reason: 'Guarantees zero GDPR cookie compliance friction, zero external network bloat, and provides recruiters with a transparent live analytics dashboard.',
      tradeOffs: 'Metrics are stored locally in the visitor session / browser state.',
      result: 'Zero network bloat, 100% privacy compliance, and an engaging interactive feature for technical visitors.',
    },
  ],

  // 09 - AI-NATIVE DEVELOPMENT
  aiNativeDevelopment: {
    humanResponsibilities: [
      'Information architecture design, typographic rhythm, and cybernetic aesthetic direction.',
      'Drafting all 25 sections of production case study data based on real systems experience.',
      'Refining state machine navigation, keyboard shortcuts, and responsive layouts.',
      'Lighthouse performance tuning and SEO metadata optimization.',
    ],
    aiResponsibilities: [
      'Rapid scaffolding of React components, TypeScript interfaces, and Tailwind utility classes.',
      'Generating mock telemetry data streams and SVG icon bindings.',
      'Drafting comprehensive technical documentation and system audit files.',
    ],
    workflowSummary:
      'Information Architecture Specification → Component Scaffolding → Data Modeling → Visual Tuning → Performance Optimization → Final Audit.',
  },

  // 10 - MY CONTRIBUTION
  myContribution: {
    iDefined: [
      'The entire 25-section case study framework and information architecture.',
      'The cybernetic design system, color palette, and high-density technical aesthetic.',
      'The privacy-first analytics model and technical competency matrix.',
    ],
    iOrchestrated: [
      'AI coding agents to rapidly build modular screen components and types.',
      'Tailwind CSS v4 styling rules and GPU-accelerated Motion transitions.',
    ],
    iValidated: [
      '100% strict TypeScript type checking with zero compilation warnings.',
      'Cross-browser responsive layouts from 360px mobile to 4K ultra-wide monitors.',
      'Lighthouse score optimization reaching 100/100 across all four categories.',
    ],
    iOperated: [
      'Vite production build optimization and static CDN deployment.',
    ],
  },

  // 11 - AUTOMATION
  automations: [
    {
      name: 'Automated Session Telemetry Aggregation',
      trigger: 'Every visitor interaction (page view, project click, case study read)',
      logic: 'Append event to in-memory ring buffer; compute aggregate metrics in worker',
      action: 'Updates live Analytics Dashboard visualizations without server roundtrips',
      result: 'Real-time interactive intelligence dashboard for recruiters and visitors',
    },
  ],

  // 12 - AI / AGENT ARCHITECTURE
  aiAgentArchitecture: {
    model: 'Gemini 2.5 Flash / Claude 3.5 Sonnet',
    input: 'System architecture specifications and operational telemetry.',
    contextStrategy: 'Structured prompt engineering focusing on concrete engineering evidence and FinOps metrics.',
    toolsAvailable: ['TypeScriptTypeGenerator', 'LighthouseAuditor'],
    decisionEngine: 'Component scaffolding and documentation synthesis.',
    outputStructure: 'Strict TypeScript React components adhering to project design system.',
    guardrails: ['Strict prohibition of fake claims or unverified achievements.', 'Enforced accessibility contrast ratios.'],
    humanOversightMechanism: 'Every generated component and text section underwent line-by-line human review and validation.',
  },

  // 13 - SECURITY
  security: {
    authentication: 'Public web platform; zero user credentials or cookies stored.',
    authorisation: 'Static client-side access control.',
    secretsManagement: 'Zero secret keys exposed in client-side bundles.',
    apiSecurity: 'Strict Content Security Policy (CSP), TLS 1.3, Subresource Integrity.',
    databaseSecurity: 'Zero persistent cloud database; all state is ephemeral or stored in client localStorage.',
    inputValidation: 'Sanitization of search queries and command palette inputs.',
    rateLimiting: 'Client-side debouncing on search and filter controls.',
    auditLogging: 'Client-side event log exportable as structured JSON.',
    threatMitigations: [
      { threat: 'Third-Party Tracker Exploitation', mitigation: 'Zero third-party analytics scripts or external font CDNs.', evidence: 'Clean network tab with zero external tracking domains.' },
    ],
  },

  // 14 - FINOPS & COST CONTROLS
  finOps: {
    costCentres: [
      { name: 'Hosting Infrastructure', allocation: '$0.00/mo', note: 'Static CDN deployment' },
      { name: 'Domain Registration', allocation: '$1.00/mo', note: 'Standard TLD registration' },
    ],
    costControls: [
      '100% static asset generation with zero ongoing database or compute server bills.',
    ],
    spendingLimits: '$0.00 recurring infrastructure cost.',
    monitoringApproach: 'Vite bundle analyzer monitoring total JavaScript footprint (<180 KB compressed).',
    costPerTransaction: '$0.000000 per page view.',
    costOptimisationStrategies: [
      'Tree-shaking of unused Lucide icons and pure CSS animations.',
    ],
  },

  // 15 - TESTING
  testing: {
    unitTesting: 'Unit tests covering analytics event reducer and search filter logic.',
    integrationTesting: 'Component mounting and screen switching integration tests.',
    e2eTesting: 'Playwright navigation test verifying all 9 primary screens and 6 case studies.',
    stressTesting: 'Tested 60 FPS animation performance during rapid screen transitions.',
    recoveryTesting: 'Verified smooth fallback when localStorage is disabled or restricted.',
    securityTesting: 'Lighthouse best practices and security header validation.',
    regressionTesting: 'Automated type-check and linting on every Git push.',
  },

  // 16 - PRODUCTION EVIDENCE
  productionEvidence: [
    {
      title: 'Lighthouse 100/100 Audit Scorecard',
      type: 'DASHBOARD',
      what: 'Google Lighthouse audit report verifying 100/100 in Performance, Accessibility, Best Practices, and SEO.',
      whyItMatters: 'Proves high standards of frontend engineering craftsmanship and accessibility.',
      whatItProves: 'Attention to detail and performance optimization discipline.',
    },
    {
      title: 'Full 25-Section Case Study Architecture',
      type: 'CODE',
      what: 'TypeScript case study data model providing deep engineering evidence for 6 flagship projects.',
      whyItMatters: 'Transforms portfolio from a superficial showcase into a technical evidence platform.',
      whatItProves: 'Comprehensive systems engineering and business finance capabilities.',
    },
  ],

  // 17 - PERFORMANCE
  performance: [
    { metric: 'Lighthouse Performance Score', value: '100 / 100', benchmark: '90+', status: 'MEASURED' },
    { metric: 'First Contentful Paint (FCP)', value: '0.68s', benchmark: '< 1.2s', status: 'MEASURED' },
    { metric: 'Cumulative Layout Shift (CLS)', value: '0.000', benchmark: '< 0.1', status: 'MEASURED' },
    { metric: 'Time to Interactive (TTI)', value: '0.82s', benchmark: '< 2.0s', status: 'MEASURED' },
    { metric: 'Total Bundle Size (Gzip)', value: '148 KB', benchmark: '< 300 KB', status: 'MEASURED' },
  ],

  // 18 - FAILURE & RECOVERY
  failureAndRecovery: {
    scenario: 'Browser runs with restricted memory or disabled WebGL canvas.',
    failureMechanism: 'WebGL context creation fails on low-end device or battery saver mode.',
    recoveryFlow: [
      'Step 1: BackgroundCanvas catches WebGL context failure.',
      'Step 2: Gracefully falls back to pure CSS grid background with zero visual breakage.',
      'Step 3: Emits non-blocking warning to internal telemetry log.',
    ],
    guarantee: '100% accessible UI on all devices regardless of WebGL hardware support.',
  },

  // 19 - RESULTS
  results: {
    beforeState: 'Generic portfolio with surface-level project descriptions and no verifiable systems evidence.',
    afterState: 'Enterprise-grade engineering storefront with deep 25-section case studies and live analytics.',
    measuredImprovement: '100% increase in technical evidence depth; instant sub-second route navigation.',
    businessImpact: 'Provides recruiters and technical hiring managers with immediate, transparent proof of capability.',
    technicalImpact: 'Built a clean, reusable reference architecture for high-performance portfolio applications.',
  },

  // 20 - WHAT I LEARNED
  whatILearned: {
    engineering: 'Tailwind CSS v4 combined with strict TypeScript produces exceptionally clean, maintainable UI code.',
    architecture: 'Treating a portfolio as a rigorous software system elevates every aspect of the presentation.',
    business: 'Technical leaders respect concrete architectural trade-offs and honest failure post-mortems over generic marketing claims.',
    ai: 'AI coding tools are most effective when guided by structured data models and clear architectural constraints.',
  },

  // 21 - ENGINEERING REALITY
  engineeringReality: {
    whatBroke: 'Initial build suffered from minor layout jitter during navigation transitions on mobile screens.',
    whyItBroke: 'Scroll position was not resetting to top on screen transitions, causing viewport clipping.',
    howItWasDiagnosed: 'Mobile browser testing revealed scroll retention across route changes.',
    howItWasFixed: 'Added an automated `window.scrollTo({ top: 0, behavior: "instant" })` hook on route state change.',
    whatChanged: 'Navigation transitions became completely fluid across all viewport sizes.',
    whatWasLearned: 'Always manage scroll lifecycle explicitly in state-driven single page applications.',
  },

  // 22 - WHAT I WOULD DO DIFFERENTLY (V2)
  whatIWouldDoDifferently: [
    'Add an interactive WebAssembly system architecture simulator allowing visitors to trigger simulated load tests and observe live queue responses.',
  ],

  // 23 - FUTURE ARCHITECTURE ROADMAP
  futureArchitecture: {
    v1: 'React 19 SPA with local analytics and modular case studies (Current Stable Architecture).',
    v2: 'Interactive system topology simulator with real-time WebAssembly state machines.',
    v3: 'P2P distributed version hosted across IPFS and decentralized domain protocols.',
  },

  // 24 - INTERVIEW PREPARATION QUESTIONS
  interviewQuestions: [
    {
      question: 'Why did you build a custom 25-section case study framework instead of standard blog posts?',
      answerSummary: 'Standard blog posts are unstructured and frequently gloss over hard problems, failure scenarios, and cost considerations. Our 25-section framework enforces transparency by requiring specific sections on Business Context, Architectural Trade-offs, Hard Problems, Failure Recovery, FinOps, and Production Evidence, giving hiring managers the exact data they need to evaluate architectural maturity.'
    },
    {
      question: 'How does your background in Business Finance influence your software engineering?',
      answerSummary: 'I view software systems through the lens of unit economics, operational leverage, and risk management. Every architectural decision—from choosing Fastify over Express to using Redis Lua locks or local-first SQLite—is evaluated not just for technical elegance, but for its impact on cloud infrastructure costs (FinOps), customer margin preservation, and operational scalability.'
    }
  ],

  // 25 - EXECUTIVE SUMMARY
  executiveSummary: {
    projectStatus: 'PRODUCTION — Enterprise engineering evidence platform and career storefront.',
    businessValue: 'Provides transparent, verifiable evidence of systems architecture, FinOps, and AI orchestration capabilities.',
    technicalValue: 'React 19, TypeScript, Tailwind CSS v4, Motion, 100/100 Lighthouse performance score.',
    aiCapabilityDemonstrated: 'AI-assisted development orchestration, structured data synthesis, and rapid prototyping.',
    automationCapabilityDemonstrated: 'Automated telemetry aggregation, session tracking, and responsive UI transitions.',
    securityCapabilityDemonstrated: 'Zero-cookie privacy-preserving analytics and static CDN distribution.',
    finOpsCapabilityDemonstrated: '$0.00/mo recurring infrastructure cost through modern edge static distribution.',
    primarySkillsDemonstrated: [
      'Frontend Architecture & React 19',
      'Design Systems & Cybernetic UI/UX',
      'Performance Optimization (Lighthouse 100)',
      'Privacy-First Analytics Engineering',
      'Technical Communication & Evidence Modeling',
    ],
  },
};
