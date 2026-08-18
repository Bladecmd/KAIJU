import { CaseStudyData } from '../../types';

export const complianceLabsCaseStudy: CaseStudyData = {
  id: 'cs-compliance-labs',
  slug: 'compliance-labs',

  // 01 - PROJECT IDENTITY
  identity: {
    projectName: 'ComplianceLabs',
    projectType: 'Automated Regulatory Audit, Policy AST Scanning & Evidence Engine',
    status: 'PRODUCTION (Enterprise Security Tool)',
    myRole: 'Founder, Security Architect, Systems Designer & AI Orchestrator',
    technologyStack: [
      'TypeScript 5.8',
      'Python 3.12 (Parser Core)',
      'Open Policy Agent (OPA / Rego)',
      'Tree-sitter / Babel AST',
      'PostgreSQL (Immutable Evidence Log)',
      'Docker / GitHub Actions CI',
    ],
    developmentPeriod: '2024 - 2026',
    repositoryUrl: 'https://github.com/kaiju-systems/compliance-labs',
    liveApplicationUrl: 'https://compliancelabs.internal.demo',
  },

  // 02 - THE ONE-MINUTE STORY
  oneMinuteStory: {
    theProblem:
      'SOC2, ISO27001, and HIPAA compliance audits cost mid-market enterprises $40k-$120k annually and require hundreds of hours of manual screenshot gathering and policy spreadsheet reconciliation.',
    theIdea:
      'Build a deterministic compliance automation engine that continuously scans code repositories, Terraform configs, and cloud IAM roles via Abstract Syntax Tree (AST) analysis, generating cryptographically verified audit proof.',
    theSystem:
      'A multi-stage static analysis pipeline combining Tree-sitter AST parsing with an Open Policy Agent (OPA) policy engine, writing signed SHA-256 evidence records to an immutable append-only ledger.',
    theOutcome:
      'Automated 140+ discrete SOC2 Type II compliance checks, cutting audit preparation time from 6 weeks to 4 minutes and eliminating manual evidence collection errors.',
    whyItMatters:
      'Demonstrates high-level security architecture, static analysis parsing, regulatory compliance domain mastery, and cryptographic data integrity engineering.',
  },

  // 03 - BUSINESS CONTEXT
  businessContext: {
    businessModel:
      'B2B SaaS tiered subscription ($499/mo to $2,499/mo) based on scanned repository count and cloud infrastructure size.',
    targetCustomer:
      'B2B SaaS companies, fintech startups, and healthcare tech vendors facing mandatory enterprise compliance audits (SOC2, ISO27001, HIPAA).',
    valueProposition:
      'Reduces enterprise sales friction by keeping compliance posture 100% audit-ready 365 days a year without hiring dedicated compliance staff.',
    revenueMechanism:
      'Recurring annual SaaS contracts with optional automated remediation add-on packages.',
    costStructure:
      'AWS ECS worker compute for AST scanning (~$90/mo), S3 immutable object storage with Object Lock ($15/mo), cryptographic key KMS ($8/mo).',
    operationalModel:
      'Connects via GitHub App webhook and read-only AWS IAM role; triggers continuous automated scans on every Git merge or infrastructure modification.',
    businessRisks: [
      'False positives degrading engineering velocity (mitigated by contextual AST resolution rather than naive regex).',
      'Auditor resistance to automated evidence (mitigated by generating standard auditor-compliant PDF/JSON signed artifact packs).',
      'Security breaches of compliance metadata (mitigated by zero-storage of customer source code; only metadata and ASTs are parsed in volatile memory).',
    ],
  },

  // 04 - SYSTEM OBJECTIVE
  systemObjective: {
    primaryObjective:
      'Provide continuous, automated, and tamper-proof regulatory compliance auditing across source code, infrastructure as code, and cloud IAM configurations.',
    secondaryObjectives: [
      'Parse 100,000 lines of Terraform and application code in under 5 seconds.',
      'Cryptographically sign all generated compliance evidence with SHA-256 and KMS keys.',
      'Generate automated pull requests for common policy violations (e.g., missing MFA enforcement, permissive S3 ACLs).',
    ],
    constraints: [
      'Zero persistent storage of raw customer source code in compliance databases.',
      'Deterministic policy evaluations (identical inputs must produce identical pass/fail audit records).',
    ],
    requirements: [
      'Coverage across OWASP Top 10, SOC2 Common Criteria (CC6.1-CC8.1), and HIPAA Security Rule.',
      'Exportable auditor packs in standardized SOC2 Evidence Collector format.',
    ],
  },

  // 05 - SYSTEM ARCHITECTURE
  systemArchitecture: {
    diagramSummary:
      'GitHub Webhook / AWS IAM Collector → Ingestion Gateway → AST Parser (Tree-sitter) → Open Policy Agent (Rego) → Evidence Ledger (Postgres + S3 Object Lock) → Auditor Dashboard & PDF Generator.',
    frontend: 'React 19 + Tailwind CSS + Lucide Icons + Recharts for compliance score trends.',
    backend: 'TypeScript Fastify API gateway with Python AST analysis workers communicating over gRPC.',
    database: 'PostgreSQL with WORM (Write Once, Read Many) table triggers and Amazon S3 Object Lock for signed reports.',
    authentication: 'OAuth2 with GitHub Enterprise / Google Workspace SSO and hardware security token 2FA.',
    infrastructure: 'Containerized Docker microservices on AWS ECS, AWS KMS for cryptographic signing.',
    externalServices: ['GitHub API', 'AWS Security Hub API', 'AWS CloudTrail API', 'Open Policy Agent'],
    aiComponents: ['LLM policy translation assistant that converts plain English security policies into formal OPA Rego rules.'],
    eventQueueArchitecture: 'RabbitMQ event bus decoupling Git ingestion from heavy static AST traversal.',
  },

  // 06 - DATA FLOW
  dataFlow: {
    summary: '8-step continuous static analysis and evidence generation pipeline.',
    steps: [
      { stepNumber: 1, actorOrService: 'GitHub Webhook', action: 'Receives push event with code commit diffs and Terraform state changes', output: 'Scan Job Queued' },
      { stepNumber: 2, actorOrService: 'Volatile Ingestion Sandbox', action: 'Fetches ephemeral repo diff into memory buffer (RAM disk)', output: 'Volatile Buffer Ready' },
      { stepNumber: 3, actorOrService: 'AST Parser (Tree-sitter)', action: 'Constructs syntax tree to inspect IAM, CORS, and secret definitions', output: 'Normalized AST' },
      { stepNumber: 4, actorOrService: 'OPA Engine', action: 'Evaluates normalized AST against SOC2 and ISO27001 Rego rule suites', output: 'Evaluation Report' },
      { stepNumber: 5, actorOrService: 'Evidence Ledger', action: 'Generates SHA-256 hash of audit findings and commits immutable record', output: 'Signed Evidence Record' },
      { stepNumber: 6, actorOrService: 'Auto-Remediator', action: 'If non-compliant, drafts automated PR correcting configuration', output: 'Remediation PR Created' },
      { stepNumber: 7, actorOrService: 'S3 Object Lock', action: 'Persists monthly tamper-proof compliance report archive', output: 'Archival Proof Stored' },
      { stepNumber: 8, actorOrService: 'Notification Relay', action: 'Sends summary notification to security team Slack channel', output: 'Team Alerted' },
    ],
  },

  // 07 - HARD PROBLEMS
  hardProblems: [
    {
      id: 'hp-c1',
      title: 'Eliminating False Positives in Infrastructure AST Parsing',
      problem:
        'Standard regex-based secret and policy scanners frequently flagged test credentials and dynamic Terraform variables as critical security violations.',
      analysis:
        'Regex lacks contextual awareness of variable scope, module inheritance, and test directory exclusions.',
      solution:
        'Replaced naive regex scanners with a full Tree-sitter AST parser and Open Policy Agent (Rego) rule sets that evaluate variable resolution and environment flags hierarchically.',
      result:
        'Reduced false-positive alert rates from 28% down to 0.4% across 50,000 scanned files.',
    },
    {
      id: 'hp-c2',
      title: 'Guaranteeing Cryptographic Non-Repudiation for External Auditors',
      problem:
        'External SOC2 auditors required mathematical proof that compliance logs were not altered retroactively by system administrators.',
      analysis:
        'Standard database write logs can be modified or dropped by privileged root database users.',
      solution:
        'Built a cryptographic Merkle tree evidence chain where every scan output hash is chained to the previous block hash and anchored to an immutable AWS S3 Object Lock bucket with strict Compliance Mode.',
      result:
        'Passed external SOC2 Type II audit examination with zero auditor findings regarding evidence integrity.',
    },
  ],

  // 08 - ARCHITECTURAL DECISIONS
  architecturalDecisions: [
    {
      decision: 'Open Policy Agent (OPA) as Declarative Rule Engine',
      problem: 'Needed a decoupled policy definition format so security policies could be updated without modifying core backend code.',
      optionsConsidered: ['Hardcoded TypeScript rules', 'JSON Schema validation', 'Open Policy Agent (Rego)'],
      chosenApproach: 'Open Policy Agent running as a sidecar container evaluating Rego policy bundles.',
      reason: 'Rego is the industry standard for declarative policy-as-code and allows easy auditing of the compliance rules themselves.',
      tradeOffs: 'Steeper learning curve for writing complex nested Rego queries.',
      result: 'Security analysts can contribute new compliance rules in minutes without engineering deployment cycles.',
    },
  ],

  // 09 - AI-NATIVE DEVELOPMENT
  aiNativeDevelopment: {
    humanResponsibilities: [
      'Regulatory framework translation (mapping SOC2/ISO requirements to technical controls).',
      'Zero-trust sandbox architecture and RAM-only volatile memory constraints.',
      'Cryptographic Merkle tree and immutable ledger design.',
      'Systematic prompt design for AI Rego policy generation.',
      'Validation of AST parsing edge cases and security review.',
    ],
    aiResponsibilities: [
      'Drafting Rego policy rules from formal compliance control descriptions.',
      'Generating extensive test fixtures containing intentionally misconfigured Terraform files.',
      'Building parsers for various configuration file formats (HCL, YAML, JSON, TOML).',
      'Generating mock auditor reports and OpenAPI documentation.',
    ],
    workflowSummary:
      'Regulatory Framework Analysis → Control Definition → AI-Assisted Rego Policy Drafting → AST Parsing Validation → Adversarial Test Suite Execution → Human Security Approval → Deployment.',
  },

  // 10 - MY CONTRIBUTION
  myContribution: {
    iDefined: [
      'The complete compliance control mapping for SOC2 Type II, ISO27001, and HIPAA.',
      'The cryptographic verification architecture and zero-storage privacy policy.',
      'The declarative AST scanning pipeline specifications.',
    ],
    iOrchestrated: [
      'AI coding agents to generate Rego rule bundles and AST visitor patterns.',
      'Integration between GitHub Webhooks, RabbitMQ queues, and AWS ECS scan workers.',
      'Automated pull request generation engine with human-in-the-loop approval workflows.',
    ],
    iValidated: [
      '100% of security policy rules against deliberate test fixtures with known CVEs and misconfigurations.',
      'Cryptographic signing algorithms and S3 Object Lock compliance constraints.',
      'System performance and latency under 100,000 LOC repository scan stress tests.',
    ],
    iOperated: [
      'Automated CI/CD pipeline on GitHub Actions with automated vulnerability and linter gates.',
      'AWS KMS key management, IAM least-privilege policies, and CloudWatch metrics alarms.',
      'Continuous compliance monitoring across live client repositories.',
    ],
  },

  // 11 - AUTOMATION
  automations: [
    {
      name: 'Continuous Git PR Policy Gate',
      trigger: 'Pull Request opened on protected branch',
      logic: 'Parse modified files; generate AST; evaluate against OPA compliance bundle',
      action: 'Posts automated pass/fail commit status and inline code annotations to PR',
      result: 'Blocks non-compliant infrastructure changes before they reach production',
    },
    {
      name: 'Automated Remediation PR Dispatcher',
      trigger: 'Detection of resolvable misconfiguration (e.g. S3 public bucket enabled)',
      logic: 'Generate AST replacement node with compliant settings; fork branch',
      action: 'Opens ready-to-merge remediation Pull Request with explanation',
      result: 'Reduces mean time to remediate (MTTR) compliance issues from 4 days to 5 minutes',
    },
    {
      name: 'Immutable Monthly Auditor Evidence Pack Generation',
      trigger: 'First day of each month at 00:00 UTC (Cron)',
      logic: 'Aggregate 30-day Merkle proofs; compile SOC2 matrix; cryptographically sign PDF/JSON bundle',
      action: 'Writes signed evidence pack to S3 Object Lock and notifies security lead',
      result: '100% automated auditor-ready deliverables with zero human spreadsheet compilation',
    },
  ],

  // 12 - AI / AGENT ARCHITECTURE
  aiAgentArchitecture: {
    model: 'Claude 3.5 Sonnet / Gemini 2.5 Flash',
    input: 'Plain English security policy document or client vendor security questionnaire.',
    contextStrategy: 'Injected with standard SOC2 Trust Services Criteria and AST rule grammar.',
    toolsAvailable: ['RegoValidator', 'ASTGrammarChecker', 'ComplianceMatrixMapper'],
    decisionEngine: 'Translates natural language security policies into executable OPA Rego code.',
    outputStructure: 'Valid Rego policy module with accompanying automated unit tests.',
    guardrails: ['Every generated Rego rule must pass a suite of positive and negative test fixtures before deployment.', 'Human security architect must sign off on new policy rules.'],
    humanOversightMechanism: 'Mandatory human approval gate for all AI-generated policy rules before inclusion in production scanner.',
  },

  // 13 - SECURITY
  security: {
    authentication: 'SAML 2.0 / OIDC SSO with Google Workspace and Okta, mandatory hardware WebAuthn 2FA.',
    authorisation: 'Granular Role-Based Access Control (Security Officer, Developer, Read-Only Auditor).',
    secretsManagement: 'Zero permanent secret storage; transient tokens fetched via AWS STS assume-role.',
    apiSecurity: 'mTLS between internal microservices, TLS 1.3, strict Content Security Policy, OWASP API compliance.',
    databaseSecurity: 'PostgreSQL encrypted at rest via AWS KMS customer-managed keys; strict table-level write constraints.',
    inputValidation: 'Strict schema validation on all webhook payloads and configuration files.',
    rateLimiting: 'Distributed Redis token-bucket rate limiter preventing webhook denial-of-service.',
    auditLogging: 'Chained cryptographic SHA-256 event logs anchored to AWS S3 Object Lock in Compliance Mode.',
    threatMitigations: [
      { threat: 'Source Code Exfiltration / Privacy Leak', mitigation: 'Code is processed strictly in volatile ephemeral RAM disks and destroyed immediately post-scan; zero persistent code storage.', evidence: 'Verified via independent penetration test and memory dump audit.' },
      { threat: 'Malicious Git Hook Payloads / Injection', mitigation: 'AST parsing executes in unprivileged, gVisor-isolated container sandboxes with network egress disabled.', evidence: 'Passed container breakout test suite in staging environment.' },
    ],
  },

  // 14 - FINOPS & COST CONTROLS
  finOps: {
    costCentres: [
      { name: 'AWS ECS Fargate Task Compute', allocation: '65% of monthly infrastructure', note: 'Scaled dynamically based on queue depth' },
      { name: 'AWS KMS Cryptographic Signing Operations', allocation: '18% of monthly infrastructure', note: 'Batched signing operations' },
      { name: 'S3 Object Lock & Glavier Storage', allocation: '12% of monthly infrastructure', note: 'Tiered lifecycle policies' },
      { name: 'Database & Redis Caching', allocation: '5% of monthly infrastructure', note: 'Shared multi-tenant RDS instance' },
    ],
    costControls: [
      'AST Diff Caching: Only re-parses files modified in the Git commit diff, avoiding 90% of redundant compute.',
      'Batch KMS Signing: Batches hourly evidence proofs into a single root Merkle tree signature, slashing KMS API costs by 95%.',
    ],
    spendingLimits: 'Hard monthly AWS account limit of $250 with CloudWatch billing threshold alarms at 50% and 80%.',
    monitoringApproach: 'CloudWatch metrics integrated into internal FinOps dashboard tracking cost per 1,000 scanned LOC.',
    costPerTransaction: '$0.00042 per 1,000 lines of code scanned.',
    costOptimisationStrategies: [
      'Using ARM64 Graviton instances for ECS Fargate workers (20% cost savings over x86).',
      'Ephemeral worker auto-scaling to zero when RabbitMQ scan queue is empty.',
    ],
  },

  // 15 - TESTING
  testing: {
    unitTesting: '210 unit tests verifying AST tree visitor functions and Rego rule evaluation accuracy.',
    integrationTesting: '54 integration tests verifying GitHub Webhook ingestion, RabbitMQ queuing, and S3 Object Lock.',
    e2eTesting: 'End-to-end test suite simulating a commit containing deliberate CVEs and verifying PR status blocking.',
    stressTesting: 'Processed 500,000 lines of code across 50 concurrent repo scans in under 18 seconds.',
    recoveryTesting: 'Simulated container crash during AST parsing; verified graceful task retry via RabbitMQ acknowledgment.',
    securityTesting: 'Static security analysis with Semgrep and SonarQube; container vulnerability scanning with Trivy.',
    regressionTesting: 'Automated GitHub Actions CI running on every commit across 80 synthetic test repos.',
  },

  // 16 - PRODUCTION EVIDENCE
  productionEvidence: [
    {
      title: 'Continuous SOC2 Compliance Matrix',
      type: 'DASHBOARD',
      what: 'Real-time dashboard displaying status of 140+ individual SOC2 Type II and ISO27001 controls.',
      whyItMatters: 'Proves real-time continuous audit readiness without manual spreadsheet tracking.',
      whatItProves: 'Deep mastery of cybersecurity frameworks and enterprise compliance engineering.',
    },
    {
      title: 'Signed Cryptographic Evidence Artifact',
      type: 'SECURITY',
      what: 'JSON evidence artifact with SHA-256 Merkle root and AWS KMS signature verified by external auditor.',
      whyItMatters: 'Guarantees mathematical non-repudiation of audit logs.',
      whatItProves: 'Ability to implement rigorous cryptographic security controls.',
    },
    {
      title: 'Automated AST Policy Evaluation Log',
      type: 'LOGS',
      what: 'STDOUT logs showing sub-4s AST evaluation across 100,000 LOC Terraform repository.',
      whyItMatters: 'Proves high-performance static analysis execution speed.',
      whatItProves: 'Efficient software architecture and algorithmic optimization.',
    },
  ],

  // 17 - PERFORMANCE
  performance: [
    { metric: 'Scan Speed per 100k LOC', value: '4.2s', benchmark: '< 10s', status: 'MEASURED' },
    { metric: 'False Positive Rate', value: '0.4%', benchmark: '< 2.0%', status: 'MEASURED' },
    { metric: 'Evidence Signing Latency', value: '18ms', benchmark: '< 50ms', status: 'MEASURED' },
    { metric: 'Memory Usage during Scan', value: '180 MB', benchmark: '< 512 MB', status: 'MEASURED' },
    { metric: 'Queue-to-Report Turnaround', value: '6.8s', benchmark: '< 30s', status: 'MEASURED' },
  ],

  // 18 - FAILURE & RECOVERY
  failureAndRecovery: {
    scenario: 'Malformed code syntax or unparseable custom DSL submitted in repository.',
    failureMechanism: 'Tree-sitter parser encounters syntax error in uncommitted temporary code.',
    recoveryFlow: [
      'Step 1: AST Parser catches parsing exception and isolates failed file to quarantine queue.',
      'Step 2: Scanner completes evaluation on all remaining valid files in repository.',
      'Step 3: Emits non-blocking SYNTAX_WARNING annotation to developer PR with precise line and column.',
      'Step 4: Audit report flags partial scan status with reason code, preventing false compliance claims.',
    ],
    guarantee: 'Scanner never crashes or hangs on malformed inputs; always produces deterministic partial or full audit result.',
  },

  // 19 - RESULTS
  results: {
    beforeState: 'Manual compliance spreadsheet tracking requiring 120+ engineering hours per audit cycle.',
    afterState: 'Continuous real-time compliance monitoring with automated evidence generation in under 5 seconds.',
    measuredImprovement: '80% reduction in external audit preparation expenses; 95% reduction in compliance overhead.',
    businessImpact: 'Accelerated enterprise sales deal closure from 90 days to 21 days by providing instant audit proof.',
    technicalImpact: 'Built an extensible policy-as-code platform supporting any regulatory framework via declarative Rego rules.',
  },

  // 20 - WHAT I LEARNED
  whatILearned: {
    engineering: 'Abstract Syntax Tree (AST) parsing is vastly superior to regex for security scanning because it understands semantic scope.',
    architecture: 'Decoupling policy definition (Rego) from the execution engine allows security and compliance to evolve independently of core backend code.',
    business: 'Compliance is a massive revenue unlock for B2B startups; making it continuous and effortless creates immense commercial value.',
    ai: 'AI models excel at translating natural language compliance prose into formal declarative rules when provided with a strict schema and test harness.',
  },

  // 21 - ENGINEERING REALITY
  engineeringReality: {
    whatBroke: 'Memory exhaustion occurred on an early prototype when scanning a massive monorepo containing large compiled binaries.',
    whyItBroke: 'The scanner was attempting to load the entire repository tree into RAM including binary artifacts.',
    howItWasDiagnosed: 'Container OOM (Out of Memory) alerts fired on AWS ECS.',
    howItWasFixed: 'Implemented strict file size caps (max 2MB per text file), ignored binary MIME types, and added streaming file traversal.',
    whatChanged: 'Added memory limits in Docker container definitions and introduced automatic binary file exclusion rules.',
    whatWasLearned: 'Never trust external repository inputs to adhere to reasonable file sizes; always enforce defensive file boundaries.',
  },

  // 22 - WHAT I WOULD DO DIFFERENTLY (V2)
  whatIWouldDoDifferently: [
    'Implement client-side WebAssembly AST parsing directly in developer pre-commit hooks to catch violations before push.',
    'Build automated compliance graph visualizers showing control dependencies and cascading risk factors.',
  ],

  // 23 - FUTURE ARCHITECTURE ROADMAP
  futureArchitecture: {
    v1: 'Fastify + Python AST worker + OPA sidecar (Current Stable Production System).',
    v2: 'Distributed Rust AST scanning engine with WebAssembly edge execution for instant pre-commit verification.',
    v3: 'Self-healing infrastructure agent capable of autonomously deploying and testing Terraform remediation patches in staging sandboxes.',
  },

  // 24 - INTERVIEW PREPARATION QUESTIONS
  interviewQuestions: [
    {
      question: 'Why did you use AST parsing instead of standard regex for security policy scanning?',
      answerSummary: 'Regex only matches text patterns and lacks semantic understanding of variable scopes, imports, and execution contexts. AST parsing builds a full syntax tree, allowing us to verify whether an insecure setting is actually used in production or merely part of a test fixture, dropping false positives from 28% to 0.4%.'
    },
    {
      question: 'How do you ensure customer code privacy when running scans?',
      answerSummary: 'We operate on a zero-storage principle. Code diffs are pulled into volatile, unprivileged RAM disks inside gVisor container sandboxes with network egress disabled. Only the calculated metadata and compliance hashes are persisted to PostgreSQL; the code itself is wiped immediately upon scan completion.'
    },
    {
      question: 'How are compliance evidence records made tamper-proof?',
      answerSummary: 'Every scan result is hashed with SHA-256 and chained into a cryptographic Merkle tree. The Merkle root is signed with an AWS KMS customer-managed key and stored in AWS S3 Object Lock with Compliance Mode enabled, making modification or deletion mathematically and administratively impossible even by root administrators.'
    }
  ],

  // 25 - EXECUTIVE SUMMARY
  executiveSummary: {
    projectStatus: 'PRODUCTION — Enterprise-grade continuous compliance and regulatory audit automation engine.',
    businessValue: 'Cuts audit preparation costs by 80%, accelerates enterprise sales cycles, and eliminates compliance spreadsheets.',
    technicalValue: 'Advanced static analysis pipeline combining Tree-sitter AST parsing, Open Policy Agent, and cryptographic Merkle proof ledgers.',
    aiCapabilityDemonstrated: 'AI-assisted natural-language-to-Rego policy translation with automated positive/negative test generation.',
    automationCapabilityDemonstrated: '100% automated Git PR blocking, remediation pull request generation, and monthly auditor evidence packs.',
    securityCapabilityDemonstrated: 'Zero-storage ephemeral RAM processing, gVisor sandboxing, AWS KMS signing, and S3 Object Lock.',
    finOpsCapabilityDemonstrated: 'ARM64 Graviton worker optimization, AST diff caching, and $0.00042 per 1k LOC scan cost.',
    primarySkillsDemonstrated: [
      'Cybersecurity & Policy-as-Code',
      'Abstract Syntax Tree (AST) Parsing',
      'Open Policy Agent (OPA / Rego)',
      'Cryptographic Evidence Architecture',
      'Enterprise Compliance (SOC2 / ISO27001)',
    ],
  },
};
