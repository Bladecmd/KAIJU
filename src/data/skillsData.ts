import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    category: 'AI-Native Development & Orchestration',
    description: 'Autonomous AI agent workflows, prompt engineering, evaluation harnesses, and LLM tool calling.',
    skills: [
      {
        name: 'AI Agent Architecture & Tool Calling',
        level: 'ARCHITECT',
        evidence: 'Engineered zero-trust proxy in Sovereign Security with dynamic token minting and schema validation.',
        tags: ['Tool Use', 'Function Calling', 'JSON Schema', 'Sub-Agents'],
      },
      {
        name: 'AI-Assisted Engineering Workflow',
        level: 'ARCHITECT',
        evidence: 'Orchestrated 10-step AI engineering cycle from task decomposition to human security review.',
        tags: ['Requirements', 'Decomposition', 'Verification', 'Human-in-the-Loop'],
      },
      {
        name: 'Adversarial Prompt Defense & Guardrails',
        level: 'EXPERT',
        evidence: 'Built ONNX vector semantic anomaly classifier blocking 99.4% of OWASP LLM prompt injection payloads.',
        tags: ['OWASP LLM Top 10', 'ONNX Runtime', 'Semantic Guardrails'],
      },
      {
        name: 'Local On-Device AI Models (WebLLM / ONNX)',
        level: 'ADVANCED',
        evidence: 'Integrated browser-local WebGPU LLM inference and client-side Silero VAD in AudioBlue & Sovereign OS.',
        tags: ['WebGPU', 'WASM', 'ONNX', 'Local RAG'],
      },
    ],
  },
  {
    category: 'Systems Architecture & Backend Engineering',
    description: 'High-throughput microservices, event-driven pipelines, transactional ledgers, and real-time protocols.',
    skills: [
      {
        name: 'Event-Driven Microservices (Fastify / Node.js)',
        level: 'ARCHITECT',
        evidence: 'Built sub-250ms dispatch engine in Metro Task Force processing concurrent contractor auction bids.',
        tags: ['Fastify', 'TypeScript', 'BullMQ', 'Event Bus'],
      },
      {
        name: 'ACID Relational Databases & Double-Entry Ledgers',
        level: 'EXPERT',
        evidence: 'Designed zero-discrepancy double-entry financial ledger in PostgreSQL with Row Level Security.',
        tags: ['PostgreSQL', 'Prisma', 'PostGIS', 'Double-Entry Accounting'],
      },
      {
        name: 'High-Concurrency In-Memory State (Redis)',
        level: 'EXPERT',
        evidence: 'Authored atomic Lua scripts for sub-2ms lock acquisition eliminating dispatch race conditions.',
        tags: ['Redis Pub/Sub', 'Lua Scripts', 'Distributed Locks', 'Token Bucket'],
      },
      {
        name: 'Distributed Systems & CRDTs',
        level: 'ADVANCED',
        evidence: 'Engineered local-first multi-device synchronization engine using Yjs CRDTs and SQLite WASM with OPFS.',
        tags: ['Yjs', 'CRDTs', 'Local-First', 'SQLite WASM', 'OPFS'],
      },
      {
        name: 'Real-Time Audio & WebRTC / WASM',
        level: 'ADVANCED',
        evidence: 'Developed 168ms low-latency DSP voice pipeline with Rust WASM AudioWorklet filters and WebRTC.',
        tags: ['WebRTC', 'WebAssembly', 'AudioWorklet', 'DSP'],
      },
    ],
  },
  {
    category: 'Cloud FinOps & Infrastructure Economics',
    description: 'Unit economic modeling, real-time cost guardrails, serverless optimization, and margin protection.',
    skills: [
      {
        name: 'Unit Economic Guardrails & Margin Protection',
        level: 'ARCHITECT',
        evidence: 'Engineered real-time FinOps pricing checks in Metro Task Force ensuring 100% positive unit margins.',
        tags: ['Gross Margin Guards', 'Dynamic Pricing', 'Take-Rate Optimization'],
      },
      {
        name: 'Cloud Infrastructure Cost Optimization',
        level: 'EXPERT',
        evidence: 'Cut API and infrastructure COGS by 64% through Redis Geohash caching and ARM64 Graviton instances.',
        tags: ['AWS ECS Fargate', 'ARM64 Graviton', 'Caching Strategy', 'Serverless'],
      },
      {
        name: 'Business Finance & Cost Allocation',
        level: 'ARCHITECT',
        evidence: 'Applied formal Business Finance background to allocate infrastructure cost centers and per-transaction metrics.',
        tags: ['Cost Center Tagging', 'Cost per Transaction', 'CAPEX / OPEX Modeling'],
      },
    ],
  },
  {
    category: 'Cybersecurity, Compliance & Zero-Trust',
    description: 'Static AST analysis, declarative policy engines, cryptographic verification, and runtime sandboxing.',
    skills: [
      {
        name: 'Policy-as-Code & Open Policy Agent (Rego)',
        level: 'EXPERT',
        evidence: 'Created 140+ automated SOC2 / ISO27001 compliance rules in Rego evaluating code ASTs and Terraform.',
        tags: ['OPA / Rego', 'SOC2 Type II', 'ISO27001', 'HIPAA'],
      },
      {
        name: 'Abstract Syntax Tree (AST) Static Analysis',
        level: 'EXPERT',
        evidence: 'Built Tree-sitter AST visitor parsers in ComplianceLabs scanning 100k LOC in 4.2s with 0.4% false positives.',
        tags: ['Tree-sitter', 'Babel AST', 'Static Analysis', 'Secret Scanning'],
      },
      {
        name: 'Cryptographic Integrity & Hardware Security',
        level: 'ADVANCED',
        evidence: 'Implemented Merkle tree audit chains in S3 Object Lock and FIDO2 WebAuthn key derivation.',
        tags: ['Merkle Trees', 'AWS KMS', 'WebAuthn', 'AES-256-GCM', 'S3 Object Lock'],
      },
      {
        name: 'Runtime Sandboxing & Code Isolation',
        level: 'EXPERT',
        evidence: 'Isolated dynamic agent code execution using V8 isolates (`isolated-vm`) with 50ms CPU bounds.',
        tags: ['V8 Isolates', 'gVisor', 'Least Privilege', 'Memory Isolation'],
      },
    ],
  },
  {
    category: 'Modern Frontend & Visual Systems',
    description: 'High-density cybernetic UI, performant rendering, responsive design systems, and privacy-first analytics.',
    skills: [
      {
        name: 'React 19 & TypeScript Systems',
        level: 'ARCHITECT',
        evidence: 'Engineered Kaiju OS platform with 100/100 Lighthouse score and sub-0.8s First Contentful Paint.',
        tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Motion'],
      },
      {
        name: 'Privacy-First Analytics Engineering',
        level: 'EXPERT',
        evidence: 'Designed client-side analytics tracker with zero cookie dependencies and local intelligence visualizers.',
        tags: ['Local State', 'Zero Cookies', 'GDPR Compliant', 'Telemetry Aggregation'],
      },
    ],
  },
];
