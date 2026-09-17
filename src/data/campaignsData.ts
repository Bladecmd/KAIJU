import { CampaignAudienceConfig } from '../types';

export const campaignsData: Record<string, CampaignAudienceConfig> = {
  recruiter: {
    id: 'recruiter',
    title: 'Technical Recruiters & Engineering Leads',
    badge: 'TARGET: TECHNICAL RECRUITMENT',
    heroProposition: 'AI-Native Systems Builder, Automation Engineer & Technical Operator',
    heroSubhead:
      'TypeScript, Node.js, Python, UiPath, and distributed systems architecture — backed by an honours degree in Business Finance (2:1).',
    humanHook:
      'I don’t just write code; I figure out what needs to exist, how the pieces fit together, what can fail, and how to verify it under pressure.',
    primaryProofSlug: 'metro-task-force',
    coreCapabilities: [
      {
        title: 'High-Concurrency Backends',
        desc: 'Fastify, Node.js, Redis Lua mutexes, PostgreSQL double-entry ledgers, and Docker containerization.',
        icon: 'Server',
      },
      {
        title: 'AI Gateway & Orchestration',
        desc: 'Model gateways with multi-provider failover, bounded memory partitions, and strict schema validation.',
        icon: 'Cpu',
      },
      {
        title: 'Enterprise Process Automation',
        desc: 'UiPath REFramework, state-machine dispatch queues, headless browser automation, and resilient retries.',
        icon: 'Workflow',
      },
      {
        title: 'Defensive Security & FinOps',
        desc: 'Zero-trust prompt injection firewalls, ephemeral token minting, and automated positive unit margin guards.',
        icon: 'ShieldCheck',
      },
    ],
    targetOpportunities: [
      'Senior / Staff AI-Native Software Engineer',
      'Solutions Architect / Technical Solutions Lead',
      'Automation & RPA Engineer (UiPath / Node.js / Python)',
      'Technical Operator / Systems Lead',
    ],
    ctaText: 'View Full CV / Technical Record',
  },
  founder: {
    id: 'founder',
    title: 'Founders & Business Owners',
    badge: 'TARGET: FOUNDERS & OPERATORS',
    heroProposition: 'Turning Commercial Ideas into Operating Systems That Don’t Break',
    heroSubhead:
      'I bridge the gap between business strategy, unit economics, automation, and technical execution. Some of what I’ve built aren’t portfolio projects; they’re operating businesses.',
    humanHook:
      'I understand what it costs when a manual process leaks margin, when an API drops a transaction, or when a customer cancels. I build systems to survive those realities.',
    primaryProofSlug: 'metro-task-force',
    coreCapabilities: [
      {
        title: 'Operational Workflow Automation',
        desc: 'Replacing manual dispatch, scheduling, pricing, and administrative bottlenecks with deterministic software.',
        icon: 'Workflow',
      },
      {
        title: 'FinOps & Commercial Pricing Engines',
        desc: 'Algorithms that enforce minimum profit margins before jobs are accepted and contracts are confirmed.',
        icon: 'TrendingUp',
      },
      {
        title: 'End-to-End Business Systems',
        desc: 'From customer lead intake through escrow authorization, contractor dispatch, and automated ledger settlement.',
        icon: 'Layers',
      },
      {
        title: 'Pragmatic AI Integration',
        desc: 'AI that reduces human triage overhead and classifies messy real-world data without hallucinations.',
        icon: 'Cpu',
      },
    ],
    targetOpportunities: [
      'Technical Co-Founder / Founding Systems Architect',
      'Head of Technology & Operations',
      'Internal Automation & Business Systems Consultant',
      'Commercial Technology Advisor / Strategic Partner',
    ],
    ctaText: 'Discuss a Problem / Start a Conversation',
  },
  'ai-automation': {
    id: 'ai-automation',
    title: 'AI & Automation Teams',
    badge: 'TARGET: AI & AUTOMATION',
    heroProposition: 'Practical AI Systems, Robust Gateways & Resilient Automation',
    heroSubhead:
      'Moving beyond toy chatbot demos into production model gateways, context attention filters, prompt injection firewalls, and enterprise RPA.',
    humanHook:
      'AI accelerates implementation; human judgement owns the architecture, safety envelopes, and operational outcome.',
    primaryProofSlug: 'nova',
    coreCapabilities: [
      {
        title: 'NOVA Executive Intelligence',
        desc: 'Multi-provider model gateways (Gemini / Claude) with circuit breaker failovers and isolated tenant memory.',
        icon: 'Cpu',
      },
      {
        title: 'Zero-Trust AI Guardrails',
        desc: 'Token sanitizers, prompt injection firewalls, and strict truth-provenance tagging via the Truth Ledger.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Enterprise UiPath & Workflow Automation',
        desc: 'Robotic process automation using UiPath REFramework, async event queues, and fault-tolerant retry loops.',
        icon: 'Workflow',
      },
      {
        title: 'Token Economics & Caching',
        desc: 'Aggressive prompt caching and model tiering to keep inference costs low and response latencies sub-second.',
        icon: 'Zap',
      },
    ],
    targetOpportunities: [
      'AI Implementation Engineer / Lead',
      'Agent Systems & Model Gateway Architect',
      'Automation Pipeline Engineer',
      'AI Defensive Security Consultant',
    ],
    ctaText: 'Inspect NOVA Architecture & Case Study',
  },
  solutions: {
    id: 'solutions',
    title: 'Solutions & Technical Problem Solving',
    badge: 'TARGET: SOLUTIONS & ARCHITECTURE',
    heroProposition: 'I Tend to Sit in the Gaps Between Technology, Money, and Operations',
    heroSubhead:
      'Where a manual process needs to become software. Where data needs to become an automated decision. Where an idea needs architecture.',
    humanHook:
      'I like difficult problems. Especially the ones that require understanding the balance sheet just as deeply as the database schema.',
    primaryProofSlug: 'sovereign-os',
    coreCapabilities: [
      {
        title: 'System Blueprinting & Schemas',
        desc: 'Translating messy ambiguous requirements into typed state machines, relational schemas, and APIs.',
        icon: 'Layers',
      },
      {
        title: 'Truth Ledger & Compliance',
        desc: 'Double-entry ACID accounting, tamper-evident audit logs, and regulatory compliance rule engines.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Cross-Venture Orchestration',
        desc: 'Central coordination across multiple commercial products, operational teams, and capital structures.',
        icon: 'Server',
      },
      {
        title: 'Rapid Prototyping to Production',
        desc: 'AI-accelerated development cycle taking validated concepts to deployed, tested software in days.',
        icon: 'Zap',
      },
    ],
    targetOpportunities: [
      'Solutions Architect / Technical Consultant',
      'Business Systems Architect',
      'Cross-Functional Project Lead',
      'Advisory / Strategic Implementation',
    ],
    ctaText: 'Explore System Blueprints',
  },
};
