import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-kaiju-founder',
    role: 'Founder & AI Systems Architect',
    organization: 'Kaiju Systems',
    period: '2024 — Present',
    location: 'Remote / London, UK',
    type: 'FOUNDER_ARCHITECT',
    overview:
      'Designing, orchestrating, and deploying enterprise-grade autonomous systems, AI runtime security gateways, field dispatch automation engines, and compliance verification pipelines.',
    keyOutcomes: [
      'Built Metro Task Force, automating 92% of manual field dispatch actions and reducing dispatch latency to 240ms.',
      'Developed ComplianceLabs, automating 140+ discrete SOC2 Type II compliance checks and cutting audit prep from 6 weeks to 4 minutes.',
      'Engineered Sovereign Security, a zero-trust AI runtime proxy blocking 99.4% of OWASP LLM prompt injection attacks.',
      'Created AudioBlue, an ultra low-latency WebAssembly DSP voice streaming pipeline achieving 168ms roundtrip latency.',
      'Applied a formal Business Finance degree background to enforce strict FinOps margin controls across all built systems.',
    ],
    technologies: [
      'TypeScript',
      'Python',
      'Rust / WASM',
      'Fastify',
      'PostgreSQL',
      'Redis',
      'Open Policy Agent',
      'Docker / AWS ECS',
      'Stripe Connect',
    ],
    systemsDelivered: [
      'Metro Task Force',
      'ComplianceLabs',
      'AudioBlue',
      'Sovereign OS',
      'Sovereign Security',
      'Kaiju OS Platform',
    ],
  },
  {
    id: 'exp-systems-consultant',
    role: 'Systems Architecture & Automation Lead',
    organization: 'Independent Technology Advisory',
    period: '2022 — 2024',
    location: 'Hybrid / Remote',
    type: 'SYSTEMS_LEAD',
    overview:
      'Advised venture-backed startups and growth-stage enterprises on high-throughput backend architecture, database optimization, CI/CD automation, and cloud cost management.',
    keyOutcomes: [
      'Re-architected transactional database queries for mid-market clients, reducing p99 latency by 75%.',
      'Implemented automated regression and integration testing pipelines, increasing release velocity by 3x.',
      'Conducted FinOps audits on AWS infrastructure, identifying and reducing redundant cloud spend by an average of 35%.',
    ],
    technologies: [
      'Node.js',
      'PostgreSQL',
      'Redis',
      'AWS (ECS, RDS, S3)',
      'GitHub Actions',
      'Terraform',
      'Docker',
    ],
    systemsDelivered: [
      'High-Concurrency Ledger Sync',
      'Automated Test Automation Harness',
      'FinOps Cost Telemetry Engine',
    ],
  },
  {
    id: 'exp-education',
    role: 'BSc in Business Finance & Economics',
    organization: 'University Degree',
    period: 'Completed with Honors',
    location: 'United Kingdom',
    type: 'EDUCATION',
    overview:
      'Rigorous academic training in corporate finance, quantitative financial modeling, unit economics, econometric regression, capital budgeting, and risk mitigation.',
    keyOutcomes: [
      'Deep quantitative foundation in financial ledger integrity, double-entry bookkeeping, and margin analysis.',
      'Directly bridges the gap between software engineering architecture and executive business profitability.',
      'Applies formal financial risk frameworks to software system reliability, threat modeling, and Cloud FinOps.',
    ],
    technologies: [
      'Quantitative Econometrics',
      'Financial Statement Modeling',
      'Unit Economics Analysis',
      'Risk Modeling',
      'Statistical Analysis',
    ],
    systemsDelivered: [
      'Econometric Regression Models',
      'Corporate Valuation & Capital Budgeting Frameworks',
    ],
  },
];
