import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    category: 'AI & Intelligent Systems Architecture',
    description: 'LLM orchestrations, model gateways, prompt defense, attention mechanisms, and bounded context management.',
    skills: [
      {
        name: 'Model Gateway & Fallback Engineering',
        level: 'ARCHITECT',
        evidence: 'Engineered multi-provider gateway in NOVA with dynamic failover (Gemini, Claude, OpenAI) and circuit breakers.',
        tags: ['Model Routing', 'Failover', 'Degraded Mode', 'Latency Optimization'],
        usedIn: ['NOVA', 'Sovereign Security'],
      },
      {
        name: 'Structured AI Workflows & Tool Calling',
        level: 'ARCHITECT',
        evidence: 'Engineered zero-trust proxy in Sovereign Security with dynamic token minting and strict JSON Schema validation.',
        tags: ['Tool Use', 'Function Calling', 'JSON Schema', 'Sub-Agents'],
        usedIn: ['NOVA', 'Sovereign Security', 'Metro Task Force'],
      },
      {
        name: 'Adversarial Prompt Defense & Guardrails',
        level: 'EXPERT',
        evidence: 'Built ONNX vector semantic anomaly classifier and structural isolation for indirect prompt injection defense.',
        tags: ['OWASP LLM Top 10', 'ONNX Runtime', 'Semantic Guardrails', 'Zero-Trust'],
        usedIn: ['Sovereign Security'],
      },
      {
        name: 'Local On-Device AI Models & VAD',
        level: 'ADVANCED',
        evidence: 'Integrated browser-local WebGPU LLM inference and client-side Silero VAD in AudioBlue.',
        tags: ['WebGPU', 'WASM', 'ONNX', 'Silero VAD'],
        usedIn: ['AudioBlue', 'NOVA'],
      },
    ],
  },
  {
    category: 'Automation & Process Orchestration',
    description: 'Robotic process automation, unattended enterprise workflows, browser automation, and scheduled task queues.',
    skills: [
      {
        name: 'UiPath Studio & REFramework',
        level: 'EXPERT',
        evidence: 'Implemented enterprise transactional workflows with robust selector engineering, exception handling, and asset vaults.',
        tags: ['UiPath Studio', 'REFramework', 'Orchestrator', 'VB.NET / C#'],
        usedIn: ['UiPath Automations'],
      },
      {
        name: 'Document Understanding & OCR Ingestion',
        level: 'EXPERT',
        evidence: 'Engineered automated document intake, OCR tabular data extraction, and ERP reconciliation pipelines.',
        tags: ['OCR', 'Document Understanding', 'Data Extraction', 'Excel Automation'],
        usedIn: ['UiPath Automations', 'Compliance Labs'],
      },
      {
        name: 'Process Queues & State Machine Dispatch',
        level: 'ARCHITECT',
        evidence: 'Built state-machine dispatch queues coordinating field contractor bidding and automated escalation.',
        tags: ['State Machines', 'BullMQ', 'Redis Streams', 'Async Workers'],
        usedIn: ['Metro Task Force', 'NOVA'],
      },
    ],
  },
  {
    category: 'Backend & Systems Engineering',
    description: 'High-throughput microservices, event-driven pipelines, transactional ledgers, and real-time protocols.',
    skills: [
      {
        name: 'Event-Driven Microservices (Node.js / Fastify / Python)',
        level: 'ARCHITECT',
        evidence: 'Built sub-300ms dispatch engine in Metro Task Force processing concurrent contractor intake requests.',
        tags: ['Fastify', 'TypeScript', 'BullMQ', 'Event Bus'],
        usedIn: ['Metro Task Force', 'Sovereign OS', 'NOVA'],
      },
      {
        name: 'ACID Relational Databases & Financial Ledgers',
        level: 'EXPERT',
        evidence: 'Designed double-entry financial ledger and escrow records in PostgreSQL with transactional guarantees.',
        tags: ['PostgreSQL', 'Prisma', 'Double-Entry Accounting', 'ACID Transactions'],
        usedIn: ['Metro Task Force', 'Sovereign OS'],
      },
      {
        name: 'High-Concurrency State & Atomic Locking (Redis)',
        level: 'EXPERT',
        evidence: 'Authored atomic Lua scripts for sub-2ms lock acquisition eliminating double-dispatch race conditions.',
        tags: ['Redis Pub/Sub', 'Lua Scripts', 'Distributed Locks', 'Token Bucket'],
        usedIn: ['Metro Task Force', 'Sovereign Security'],
      },
      {
        name: 'Real-Time Audio & WebRTC / WASM',
        level: 'ADVANCED',
        evidence: 'Developed sub-200ms low-latency DSP voice pipeline with Rust WASM AudioWorklet filters and WebRTC.',
        tags: ['WebRTC', 'WebAssembly', 'AudioWorklet', 'DSP'],
        usedIn: ['AudioBlue'],
      },
    ],
  },
  {
    category: 'Security, Governance & Defensive Controls',
    description: 'Static AST analysis, zero-trust policies, runtime sandboxing, secret handling, and cryptographic verification.',
    skills: [
      {
        name: 'Policy-as-Code & Declarative Compliance (OPA / Rego)',
        level: 'EXPERT',
        evidence: 'Authored declarative compliance rules in Rego evaluating heavy-industry certificates and cloud state.',
        tags: ['OPA / Rego', 'SOC2 Controls', 'Compliance Verification'],
        usedIn: ['Compliance Labs', 'Sovereign Security'],
      },
      {
        name: 'Runtime Sandboxing & Code Isolation',
        level: 'EXPERT',
        evidence: 'Isolated dynamic agent code execution using V8 micro-sandboxes (`isolated-vm`) with 50ms CPU bounds.',
        tags: ['V8 Isolates', 'Least Privilege', 'Memory Isolation', 'Resource Caps'],
        usedIn: ['Sovereign Security'],
      },
      {
        name: 'Secret Handling & Zero-Exposure Architecture',
        level: 'EXPERT',
        evidence: 'Strict environment boundary separation; zero hardcoded credentials, short-lived scoped JWT minting.',
        tags: ['Secret Rotation', 'mTLS', 'Scoped Tokens', 'Zero-Trust'],
        usedIn: ['Sovereign Security', 'NOVA', 'Kaiju'],
      },
    ],
  },
  {
    category: 'Business Systems & FinOps',
    description: 'Unit economics, margin guardrails, field service logistics, pricing engines, and executive reporting.',
    skills: [
      {
        name: 'Dynamic Pricing Engines & Margin Guards',
        level: 'ARCHITECT',
        evidence: 'Engineered emergency drainage pricing engine with dynamic distance, severity modifiers, and positive unit margin enforcement.',
        tags: ['Pricing Engines', 'Margin Protection', 'Unit Economics', 'Take-Rate Modeling'],
        usedIn: ['Metro Task Force'],
      },
      {
        name: 'Business Finance Modeling & Capital Allocation',
        level: 'ARCHITECT',
        evidence: 'Applied BSc Business Finance honors background to multi-venture holding governance, underwriting, and CAPEX/OPEX modeling.',
        tags: ['Financial Modeling', 'Holding Governance', 'Corporate Finance', 'Cost Center Allocation'],
        usedIn: ['Metro Task Force', 'Compliance Labs', 'GriDD Corp'],
      },
      {
        name: 'Operational Telemetry & Truth Ledger',
        level: 'ARCHITECT',
        evidence: 'Architected reality-first Truth Ledger separating verified operational milestones from speculative future targets.',
        tags: ['Truth Ledger', 'Operational KPIs', 'Telemetry Streaming', 'Executive Dashboards'],
        usedIn: ['Sovereign OS', 'NOVA', 'Kaiju'],
      },
    ],
  },
  {
    category: 'Cloud, Deployment & Modern Frontend',
    description: 'Edge distribution, container orchestration, React 19, TypeScript, and privacy-preserving telemetry.',
    skills: [
      {
        name: 'React 19 & Strict TypeScript Systems',
        level: 'ARCHITECT',
        evidence: 'Engineered Kaiju platform and sovereign web interfaces with 100% strict TypeScript types and zero layout shift.',
        tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'WebGL Shaders'],
        usedIn: ['Building Kaiju', 'Metro Task Force', 'Sovereign OS'],
      },
      {
        name: 'Containerization & Edge Deployment (Docker / Cloudflare)',
        level: 'EXPERT',
        evidence: 'Configured Dockerized microservice pipelines, Cloudflare Edge routing, and zero-downtime static builds.',
        tags: ['Docker Compose', 'Cloudflare Edge', 'GitHub Actions', 'CI/CD'],
        usedIn: ['Building Kaiju', 'Metro Task Force', 'NOVA'],
      },
      {
        name: 'Privacy-First Analytics & UTM Attribution',
        level: 'EXPERT',
        evidence: 'Designed client-side analytics service capturing campaign parameters and recruiter intent with zero cookie dependencies.',
        tags: ['Privacy-First', 'UTM Attribution', 'Conversion Funnel', 'GDPR Compliant'],
        usedIn: ['Building Kaiju'],
      },
    ],
  },
];

