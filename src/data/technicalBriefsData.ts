import { TechnicalBriefData } from '../types';

export const technicalBriefsData: Record<string, TechnicalBriefData> = {
  'metro-task-force': {
    id: 'brief-metro-task-force',
    projectSlug: 'metro-task-force',
    projectName: 'Metro Task Force',
    classification: 'RESTRICTED_TECHNICAL_BRIEF',
    status: 'ACTIVE_BRIEF',
    executiveSummary:
      'Detailed technical brief covering the sub-second dynamic bidding engine, atomic Redis Lua mutex locks, FinOps algorithmic margin guards, and PostGIS geospatial partitioning for Metro Task Force.',
    deepArchitectureTopology: `+-----------------------------------------------------------------------------------------------------------------+
| INGRESS & EDGE TRAFFIC ROUTING                                                                                  |
| Cloudflare Enterprise Edge -> DDoS Mitigation -> TLS 1.3 Termination -> Fastify API Gateway (Node.js 22 LTS)   |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| CORE EVENT-DRIVEN DISPATCH SERVICES (Async Workers)                                                             |
| +-------------------------------+    +------------------------------------+    +------------------------------+ |
| | Dynamic Booking Intake Worker | -> | FinOps Margin Evaluator (Algorith) | -> | Contractor Auction Emitter   | |
| | • GeoJSON parser              |    | • Distance Matrix (Cached Geohash) |    | • Redis Pub/Sub broadcast    | |
| | • Emergency severity classifier|   | • Floor margin gate (>15% locked)  |    | • 15s countdown heartbeat    | |
| +-------------------------------+    +------------------------------------+    +------------------------------+ |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| CONCURRENCY & LEDGER TRANSACTION PERIMETER                                                                      |
| [Redis Cluster (Memory-Optimized)]                                [PostgreSQL 16 Enterprise Cluster]            |
| • EVALSHA atomicity: "SETNX bid:lock:{id}"                        • Double-entry ledger journal table           |
| • 1.8ms TTL mutex expiration with auto-cleanup                    • PostGIS ST_DWithin geospatial spatial query |
| • WebSocket driver location subscription channel                  • Row-Level Security (RLS) contractor tenant  |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| PAYMENT & ESCROW SETTLEMENT ESCROW (Stripe Custom Connect Integration)                                         |
| Webhook idempotency ledger -> Pre-auth hold -> Geo-fence check-in signature -> Escrow release & split payout   |
+-----------------------------------------------------------------------------------------------------------------+`,
    componentSpecs: [
      {
        name: 'Redis Atomic Bid Arbitrator',
        responsibility: 'Prevents race conditions when hundreds of field contractors attempt to claim the same emergency booking.',
        tech: 'Redis 7.2 Cluster, Lua Scripts (EVALSHA), BullMQ',
        considerations:
          'Standard database row locking (SELECT FOR UPDATE) collapsed under 400+ concurrent websocket bids. Redis Lua executes atomically in memory with guaranteed sub-2ms response latency.',
      },
      {
        name: 'FinOps Margin Guard',
        responsibility: 'Enforces mathematical profitability on every emergency job before any contractor is dispatched.',
        tech: 'TypeScript, Pure Deterministic Functions, In-Memory Lookup Tables',
        considerations:
          'Calculates contractor travel cost, materials, credit card processing fees, and platform take-rate. If unit margin < 15%, booking is automatically requoted or re-routed.',
      },
      {
        name: 'Geospatial Cache (Geohash 6)',
        responsibility: 'Clusters contractors and customers to avoid continuous Google Maps Distance Matrix API billing spikes.',
        tech: 'PostGIS ST_GeoHash, Redis In-Memory Geospatial Spatial Indexes',
        considerations:
          'Reduced Google Maps API requests by 64% by grouping drivers within a 1.2km radius bucket before invoking billable distance matrix endpoints.',
      },
      {
        name: 'Double-Entry Escrow Ledger',
        responsibility: 'Maintains immutable accounting balance across customer pre-authorizations, platform fees, and contractor disbursements.',
        tech: 'PostgreSQL 16 ACID, Append-Only Transaction Log, Strict Check Constraints',
        considerations:
          'Zero-discrepancy balance enforcement: SUM(credits) = SUM(debits) verified on every ledger entry before any Stripe payout instruction is executed.',
      },
    ],
    sequenceFlowSummary:
      'The complete end-to-end dispatch sequence from emergency customer request to final Stripe escrow settlement.',
    sequenceSteps: [
      {
        step: 1,
        phase: 'Ingress & Normalization',
        service: 'API Gateway / Fastify',
        action: 'Ingests emergency lead payload, sanitizes inputs, and runs Zod schema validation.',
        securityCheck: 'Rate limiter verified (IP + fingerprint). Payload size bounded < 64KB.',
      },
      {
        step: 2,
        phase: 'Financial Pre-Flight',
        service: 'FinOps Engine',
        action: 'Calculates equipment surcharge, night-time multiplier, and validates minimum 15% unit margin threshold.',
        securityCheck: 'Pre-auth credit check; validates card authenticity via Stripe 3DS2.',
      },
      {
        step: 3,
        phase: 'Geospatial Discovery',
        service: 'PostGIS + Redis',
        action: 'Identifies qualified contractors within a 12-mile radius using spatial indexing.',
        securityCheck: 'Contractor insurance validity and credential expiration check.',
      },
      {
        step: 4,
        phase: 'Broadcast Auction',
        service: 'Redis Pub/Sub & WebSockets',
        action: 'Emits 15-second bidding window to qualified field contractor mobile nodes.',
        securityCheck: 'Ephemeral JWT token verification per mobile socket connection.',
      },
      {
        step: 5,
        phase: 'Atomic Lock Claim',
        service: 'Redis Lua Script',
        action: 'First valid bid executes atomic mutex lock; subsequent bids receive instant reject code.',
        securityCheck: 'Atomic lock verification with strict 2-second heartbeat lease.',
      },
      {
        step: 6,
        phase: 'Escrow Settlement',
        service: 'PostgreSQL & Stripe Connect',
        action: 'Captures pre-authorized funds upon customer digital sign-off and geo-fence departure, releasing contractor payout.',
        securityCheck: 'Dual cryptographic signature verification (Customer PIN + GPS Geo-fence timestamp).',
      },
    ],
    engineeringTradeOffs: [
      {
        decision: 'Redis Lua Mutex vs PostgreSQL Advisory Locks',
        whyChosen: 'Sub-millisecond execution time and elimination of PostgreSQL connection pool exhaustion during sudden surge traffic.',
        rejectedAlternatives: ['PostgreSQL SELECT FOR UPDATE', 'Optimistic Concurrency with Row Versioning'],
        failureModeMitigation: 'If Redis node fails, secondary Redis Sentinel initiates master failover in <800ms while Postgres acts as source-of-truth backup.',
      },
      {
        decision: 'Append-Only Double-Entry Ledger vs Single Balance Column',
        whyChosen: 'Guarantees auditability for regulatory and accounting compliance; prevents phantom funds in high-throughput partial refund flows.',
        rejectedAlternatives: ['Single customer_balance integer column', 'Third-party accounting SaaS webhook'],
        failureModeMitigation: 'Nightly automated balance reconciliation worker verifies SUM(debits) - SUM(credits) === 0 across all account types.',
      },
    ],
    securityAndDataPerimeter: [
      {
        area: 'Contractor Bank & PII Data',
        mechanism: 'Delegated entirely to Stripe Connect Custom tokens; zero raw banking details touch application servers.',
        confidentialityStatus: 'RESTRICTED_COMPLIANT',
      },
      {
        area: 'Location & Telemetry Streaming',
        mechanism: 'Contractor GPS coordinates stored only as volatile ephemeral keys in Redis with 10-minute TTL; historical logs anonymized.',
        confidentialityStatus: 'RESTRICTED_SAFE',
      },
      {
        area: 'Database Security',
        mechanism: 'PostgreSQL Row-Level Security (RLS) enforcing tenant isolation at SQL engine level; encrypted at rest with AES-256.',
        confidentialityStatus: 'RESTRICTED_SAFE',
      },
    ],
    withheldProprietaryNotes: [
      'Proprietary contractor retention heuristic formulas and internal scoring algorithms.',
      'Emergency pricing demand-curve coefficient lookup tables for regional UK zones.',
      'Production cluster VPC subnet configurations and private infrastructure deployment scripts.',
    ],
    ndaNotice:
      'Detailed financial performance metrics, proprietary surge coefficients, and complete source code are strictly reserved for direct partner or executive discussions under NDA.',
  },

  nova: {
    id: 'brief-nova',
    projectSlug: 'nova',
    projectName: 'NOVA Executive Intelligence',
    classification: 'RESTRICTED_TECHNICAL_BRIEF',
    status: 'ACTIVE_BRIEF',
    executiveSummary:
      'Technical brief detailing NOVA’s cognitive event ingestion, latency-aware model gateway failover, attention scoring matrix, and partitioned memory boundaries.',
    deepArchitectureTopology: `+-----------------------------------------------------------------------------------------------------------------+
| INCOMING MULTI-VENTURE EVENT INGRESS                                                                            |
| Webhooks from MTF, Compliance Labs, AudioBlue -> HMAC Verification -> Inbound Event Queue (Redis BullMQ)        |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| ATTENTION & PRIORITY FILTER ENGINE                                                                              |
| • Urgency & Impact Scoring Matrix (Mathematical Weights)                                                         |
| • Anomaly Detector (Threshold check)                                                                            |
| • Context Window Budget Manager (Token optimization)                                                            |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| MULTI-PROVIDER MODEL GATEWAY WITH DEGRADED-MODE HYBRID ROUTING                                                  |
| Primary: Gemini 2.5 Flash / Pro (Low-latency structured reasoning)                                              |
| Secondary Fallback: Claude 3.5 Sonnet (Deep synthesis & strategy)                                               |
| Emergency Offline Heuristic: Local deterministic rule parser (Zero external dependencies)                        |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| BOUNDED COGNITIVE MEMORY PARTITIONS                                                                             |
| [Venture Domain: MTF]         [Venture Domain: Compliance]      [Venture Domain: AudioBlue]     [Personal Core] |
| (Strict tenant-isolated vector namespaces with zero cross-venture context leakage or prompt contamination)     |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| TRUTH LEDGER & EXECUTIVE NOTIFICATION BUS                                                                       |
| • Mandatory Evidence Classification: VERIFIED | IMPLEMENTED | OBSERVED | TARGET                                 |
| • WebSocket Desktop HUD + SSE Mobile Stream + Optional Bidirectional Voice Gateway                              |
+-----------------------------------------------------------------------------------------------------------------+`,
    componentSpecs: [
      {
        name: 'Attention Scoring Matrix',
        responsibility: 'Eliminates executive alert fatigue by mathematically scoring every incoming operational event.',
        tech: 'TypeScript, Pure Algorithmic Matrix, Urgency/Impact Coefficients',
        considerations:
          'Separates urgent operational events (e.g. contractor failed to arrive) from non-urgent operational background updates, ensuring executive alerts fire only when human intervention is genuinely required.',
      },
      {
        name: 'Model Gateway & Failover Engine',
        responsibility: 'Maintains 99.99% system availability even during commercial LLM API outages or rate limits.',
        tech: 'Node.js, Custom Fetch Circuit Breaker, Exponential Backoff',
        considerations:
          'Routes structured, high-speed queries to lightweight models while dynamically switching to heavier models when high-order strategic synthesis is detected.',
      },
      {
        name: 'Domain Memory Partitions',
        responsibility: 'Guarantees that proprietary operational data from one company never contaminates prompts for another.',
        tech: 'PostgreSQL pgvector with tenant isolation metadata, Redis Namespaces',
        considerations:
          'Enforces strict partition keys on all vector embeddings. Even if a model requests broader context, the data retriever refuses to return cross-domain chunks.',
      },
      {
        name: 'Truth Ledger Provenance Engine',
        responsibility: 'Tags every assertion generated by the system with verifiable provenance status.',
        tech: 'JSON Schema Validation, Deterministic Claim Classifier',
        considerations:
          'Prevents AI hallucinations from being presented as operational fact. Claims must map directly to raw database logs or are labeled as MODELLED/INFERENCE.',
      },
    ],
    sequenceFlowSummary:
      'The multi-tier cognitive awareness flow from raw webhook arrival to executive decision briefing.',
    sequenceSteps: [
      {
        step: 1,
        phase: 'Event Ingestion',
        service: 'Webhook Receiver',
        action: 'Ingests raw telemetry from operating ventures, verifies HMAC-SHA256 signature.',
        securityCheck: 'Signature validation and timestamp drift check (< 300s).',
      },
      {
        step: 2,
        phase: 'Attention Triage',
        service: 'Attention Engine',
        action: 'Evaluates event against 12 priority vectors to generate an Attention Score (0-100).',
        securityCheck: 'Filters low-score noise into digest queue; escalates high scores.',
      },
      {
        step: 3,
        phase: 'Partitioned Retrieval',
        service: 'Cognitive Memory Store',
        action: 'Retrieves relevant past context exclusively within the active venture partition.',
        securityCheck: 'Strict tenant boundary check; rejects cross-domain vector query ids.',
      },
      {
        step: 4,
        phase: 'Synthesis & Reason',
        service: 'Model Gateway',
        action: 'Calls frontier model with bounded context to synthesize a concise decision briefing.',
        securityCheck: 'Pre-flight prompt injection scanner; output schema validation.',
      },
      {
        step: 5,
        phase: 'Truth Provenance Tagging',
        service: 'Truth Ledger',
        action: 'Appends deterministic claim metadata (VERIFIED, IMPLEMENTED, TARGET) to briefing items.',
        securityCheck: 'Verifies claims match source telemetry.',
      },
      {
        step: 6,
        phase: 'Executive Delivery',
        service: 'Real-Time Notification Bus',
        action: 'Pushes notification to desktop HUD and queues audio briefing summary.',
        securityCheck: 'Hardware WebAuthn session validation for privileged actions.',
      },
    ],
    engineeringTradeOffs: [
      {
        decision: 'Self-Hosted Gateway Architecture vs Commercial Agent Frameworks (LangChain/CrewAI)',
        whyChosen: 'Commercial frameworks introduce excessive abstraction, dependency bloat, non-deterministic latency, and unpredictable token consumption.',
        rejectedAlternatives: ['LangChain Python', 'LlamaIndex', 'AutoGPT'],
        failureModeMitigation: 'Custom typed gateway uses pure TypeScript with zero intermediate framework layers, achieving 3x lower latency.',
      },
      {
        decision: 'Strict Tenant Partitioning vs Unified Enterprise Vector Store',
        whyChosen: 'Completely eliminates prompt leakage and compliance risk between distinct commercial entities.',
        rejectedAlternatives: ['Global shared RAG index with metadata filters'],
        failureModeMitigation: 'Database row-level security and schema isolation make cross-partition queries syntactically impossible.',
      },
    ],
    securityAndDataPerimeter: [
      {
        area: 'Executive Credentials & Auth',
        mechanism: 'Hardware security keys (FIDO2 / WebAuthn); no password-based authentication paths exist.',
        confidentialityStatus: 'RESTRICTED_HARDENED',
      },
      {
        area: 'Model Provider Zero-Retention',
        mechanism: 'All external LLM API calls utilize enterprise zero-retention / opt-out data usage agreements.',
        confidentialityStatus: 'RESTRICTED_SAFE',
      },
      {
        area: 'Proprietary Prompts & Logic',
        mechanism: 'Stored in encrypted local keystores; never exposed to client-side bundles.',
        confidentialityStatus: 'CONFIDENTIAL_LOCKED',
      },
    ],
    withheldProprietaryNotes: [
      'Exact system instructions, core executive persona prompts, and cognitive reasoning templates.',
      'Attention scoring mathematical weights and proprietary anomaly detection thresholds.',
      'Voice synthesis model parameters and proprietary audio streaming endpoints.',
    ],
    ndaNotice:
      'System prompt architectures, private knowledge graphs, and strategic executive workflows are proprietary intellectual property and available only under formal NDA.',
  },

  'compliance-labs': {
    id: 'brief-compliance-labs',
    projectSlug: 'compliance-labs',
    projectName: 'Compliance Labs',
    classification: 'RESTRICTED_TECHNICAL_BRIEF',
    status: 'ACTIVE_BRIEF',
    executiveSummary:
      'Technical brief describing the deterministic AST code auditing engine, multi-repository policy enforcement pipeline, and automated pull-request remediation bot.',
    deepArchitectureTopology: `+-----------------------------------------------------------------------------------------------------------------+
| CODEBASE INGESTION & PARSER PIPELINE                                                                            |
| Git Webhook (GitHub/GitLab) -> Clone to Isolated Scratch Volume -> TypeScript / Python AST Parser              |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| DETERMINISTIC COMPLIANCE RULE ENGINE                                                                            |
| • 140+ Pre-compiled AST Inspection Rules (Secrets, License, OWASP Top 10, PII leakage)                          |
| • Zero-LLM Dependency for Core Auditing (100% deterministic, reproducible, sub-second execution)               |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| LLM ASSISTED REMEDIATION WORKER (Sandboxed Fix Generation)                                                      |
| AST Violation Context -> Local Diff Generator -> AST Syntax Verification -> Automated PR Suggestion             |
+-----------------------------------------------------------------------------------------------------------------+`,
    componentSpecs: [
      {
        name: 'Deterministic AST Visitor',
        responsibility: 'Parses Abstract Syntax Trees to detect security vulnerabilities without false positives.',
        tech: 'Babel / TypeScript Compiler API, Tree-sitter',
        considerations:
          'Regex-based linters produce excessive false positives. AST analysis inspects actual execution paths, ensuring 0% noise on semantic compliance rules.',
      },
      {
        name: 'Sandboxed PR Bot',
        responsibility: 'Generates minimal, surgical pull requests that fix violations without breaking existing unit tests.',
        tech: 'Node.js, Git Automation, GitHub REST & GraphQL API',
        considerations:
          'Runs test suite automatically inside isolated Docker container before submitting code diff to maintain repository integrity.',
      },
    ],
    sequenceFlowSummary:
      'Automated code commit compliance evaluation and automated remediation cycle.',
    sequenceSteps: [
      { step: 1, phase: 'Commit Trigger', service: 'GitHub App Webhook', action: 'Receives pull request opened or synchronize event.', securityCheck: 'Webhook secret cryptographic signature check.' },
      { step: 2, phase: 'AST Parsing', service: 'Compiler Worker', action: 'Constructs syntax tree across all modified source files.', securityCheck: 'Runs in ephemeral unprivileged container.' },
      { step: 3, phase: 'Rule Evaluation', service: 'Compliance Engine', action: 'Evaluates 140+ deterministic security rules.', securityCheck: 'Enforces zero external network calls during audit.' },
      { step: 4, phase: 'Remediation', service: 'Fix Generator', action: 'Formats compliant code replacement and posts inline PR review.', securityCheck: 'Verifies diff against strict linting boundaries.' },
    ],
    engineeringTradeOffs: [
      {
        decision: 'Deterministic AST Rules over LLM-Only Code Scanning',
        whyChosen: 'LLM scanners are non-deterministic, expensive at enterprise scale, and prone to hallucinations. AST parsing is mathematically reproducible and free of per-token costs.',
        rejectedAlternatives: ['Pure LLM prompt-based code review'],
        failureModeMitigation: 'Used LLMs exclusively for generating proposed fix diffs after deterministic AST rules identified the exact line and node violation.',
      },
    ],
    securityAndDataPerimeter: [
      {
        area: 'Customer Code Privacy',
        mechanism: 'Code repositories cloned strictly to ephemeral in-memory RAM disks (tmpfs); deleted immediately upon scan completion.',
        confidentialityStatus: 'RESTRICTED_SAFE',
      },
    ],
    withheldProprietaryNotes: [
      'Proprietary compliance rule definitions for specialized fintech and defense software frameworks.',
      'Automated pull request remediation patch generation models.',
    ],
    ndaNotice:
      'Enterprise rule catalogues and proprietary AST mapping schemas are available under commercial evaluation agreements.',
  },

  'audio-blue': {
    id: 'brief-audio-blue',
    projectSlug: 'audio-blue',
    projectName: 'Audio Blue',
    classification: 'RESTRICTED_TECHNICAL_BRIEF',
    status: 'ACTIVE_BRIEF',
    executiveSummary:
      'Technical brief detailing the low-latency WebRTC audio streaming pipeline, C++ WebAssembly DSP ring buffer architecture, and real-time noise reduction engine.',
    deepArchitectureTopology: `+-----------------------------------------------------------------------------------------------------------------+
| AUDIO CAPTURE & WEBAUDIO WORKLET                                                                                |
| 48kHz PCM Audio Input -> AudioWorkletNode (Dedicated Audio Thread) -> Zero-GC Circular Ring Buffer              |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| C++ WEBASSEMBLY DSP ENGINE                                                                                      |
| • SIMD-Optimized FFT Filter         • Adaptive Noise Suppressor          • Peak Limiter & DC Blocker             |
| (Processed in < 2.5ms per 128-sample buffer chunk directly on client browser CPU)                              |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| LOW-LATENCY TRANSMISSION LAYER                                                                                  |
| WebRTC DataChannel (UDP Mode) / Opus Codec -> Selective Forwarding Unit (SFU) -> Sub-50ms Global Delivery      |
+-----------------------------------------------------------------------------------------------------------------+`,
    componentSpecs: [
      {
        name: 'WebAudio Worklet Ring Buffer',
        responsibility: 'Maintains uninterrupted audio stream processing without JavaScript garbage collection hiccups.',
        tech: 'Web Audio API, SharedArrayBuffer, Atomics',
        considerations:
          'JavaScript garbage collection pauses cause audible audio dropouts. Offloading processing to a dedicated audio thread via SharedArrayBuffer guarantees zero jitter.',
      },
      {
        name: 'WASM SIMD Filter Pipeline',
        responsibility: 'Executes mathematical DSP filtering in real-time.',
        tech: 'C++, Emscripten, WebAssembly SIMD',
        considerations:
          'SIMD vectorization processes 4 audio samples per instruction cycle, reducing CPU usage from 18% down to 2.4% on standard laptops.',
      },
    ],
    sequenceFlowSummary:
      'Zero-latency capture, processing, and WebRTC streaming cycle.',
    sequenceSteps: [
      { step: 1, phase: 'Capture', service: 'AudioWorklet', action: 'Captures raw 32-bit float audio frames.', securityCheck: 'Validates audio sample rate.' },
      { step: 2, phase: 'DSP Process', service: 'C++ WASM Engine', action: 'Applies FFT filter, noise gate, and limiter.', securityCheck: 'Checks buffer bounds with memory safety.' },
      { step: 3, phase: 'Encoding & Send', service: 'WebRTC PeerConnection', action: 'Encodes Opus frames and broadcasts to SFU.', securityCheck: 'DTLS-SRTP end-to-end encryption.' },
    ],
    engineeringTradeOffs: [
      {
        decision: 'Client-Side WebAssembly DSP vs Server-Side Cloud Processing',
        whyChosen: 'Server-side audio processing incurs $1,000s/mo in cloud GPU/CPU costs and adds 40ms+ network latency. Client-side WASM is free to scale and executes with zero added network delay.',
        rejectedAlternatives: ['Server-side FFmpeg pipeline'],
        failureModeMitigation: 'Gracefully degrades DSP effects if client device reports high thread latency.',
      },
    ],
    securityAndDataPerimeter: [
      {
        area: 'Voice Encryption',
        mechanism: 'WebRTC DTLS-SRTP mandatory end-to-end media encryption.',
        confidentialityStatus: 'RESTRICTED_SAFE',
      },
    ],
    withheldProprietaryNotes: [
      'Proprietary spectral subtraction DSP noise gate C++ algorithms.',
      'SFU load-balancing and mesh orchestration source code.',
    ],
    ndaNotice:
      'Commercial DSP algorithm licenses and production SFU infrastructure scripts available upon request under NDA.',
  },

  'sovereign-os': {
    id: 'brief-sovereign-os',
    projectSlug: 'sovereign-os',
    projectName: 'Sovereign OS & Security',
    classification: 'RESTRICTED_TECHNICAL_BRIEF',
    status: 'ACTIVE_BRIEF',
    executiveSummary:
      'Technical brief explaining Sovereign OS’s zero-trust sandboxed tool execution engine, Merkle tree cryptographic audit logging, and prompt-injection firewall.',
    deepArchitectureTopology: `+-----------------------------------------------------------------------------------------------------------------+
| UNTRUSTED AI AGENT / TOOL INGRESS                                                                               |
| Agent Tool Call Request -> JSON Schema Gate -> Semantic Prompt Injection Classifier (ONNX)                      |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| ZERO-TRUST ISOLATION RUNTIME                                                                                    |
| • V8 Isolate Sandboxing (Restricted syscalls, memory hard-limit 64MB, execution timeout 500ms)                  |
| • Ephemeral Capability Tokens (60-second validity, strictly scoped permissions)                                 |
+-----------------------------------------------------------------------------------------------------------------+
                                                     |
                                                     v
+-----------------------------------------------------------------------------------------------------------------+
| CRYPTOGRAPHIC MERKLE AUDIT JOURNAL                                                                              |
| Every tool execution input/output hashed with SHA-256 and committed to an append-only tamper-evident Merkle log |
+-----------------------------------------------------------------------------------------------------------------+`,
    componentSpecs: [
      {
        name: 'V8 Isolate Sandbox',
        responsibility: 'Executes dynamic AI generated code without exposing host filesystem or environment variables.',
        tech: 'Isolated-VM, V8 Engine, C++ Bindings',
        considerations:
          'Docker containers take 200-500ms to cold start. V8 Isolates instantiate in < 5ms with strict memory and CPU consumption ceilings.',
      },
      {
        name: 'Merkle Audit Tree',
        responsibility: 'Provides mathematical proof that agent execution logs have not been altered post-facto.',
        tech: 'SHA-256 Merkle Tree, Append-Only Storage',
        considerations:
          'Guarantees non-repudiation for automated systems performing sensitive financial or infrastructure tasks.',
      },
    ],
    sequenceFlowSummary:
      'Tool execution security lifecycle from untrusted request to Merkle audit commit.',
    sequenceSteps: [
      { step: 1, phase: 'Ingress Verification', service: 'Firewall Filter', action: 'Scans tool payload for escape sequences or prompt injections.', securityCheck: 'ONNX semantic embedding comparison.' },
      { step: 2, phase: 'Capability Token', service: 'Token Minter', action: 'Issues single-use 60s cryptographic capability token.', securityCheck: 'Scope validation against executive policy.' },
      { step: 3, phase: 'Isolate Run', service: 'V8 Sandbox', action: 'Executes tool in bounded memory space.', securityCheck: 'Enforces 500ms timeout and memory ceiling.' },
      { step: 4, phase: 'Audit Commitment', service: 'Merkle Tree', action: 'Appends execution result hash to tamper-proof root.', securityCheck: 'Cryptographic SHA-256 hash chaining.' },
    ],
    engineeringTradeOffs: [
      {
        decision: 'V8 Isolates vs Ephemeral Docker Containers',
        whyChosen: 'Sub-5ms startup times vs 400ms container initialization, allowing real-time AI tool chaining.',
        rejectedAlternatives: ['Docker sandbox', 'Local eval() with proxy wrapper'],
        failureModeMitigation: 'Hard CPU time ceiling terminates runaway scripts after 500ms.',
      },
    ],
    securityAndDataPerimeter: [
      {
        area: 'Cryptographic Keystore',
        mechanism: 'Hardware HSM backed master signing key; ephemeral sub-keys rotated hourly.',
        confidentialityStatus: 'RESTRICTED_HARDENED',
      },
    ],
    withheldProprietaryNotes: [
      'Proprietary injection firewall vector weights and zero-day detection heuristics.',
      'Production HSM key rotation orchestration codebase.',
    ],
    ndaNotice:
      'Proprietary security firmware and enterprise sandboxing engines are restricted to verified security audits and NDA discussions.',
  },
};

export const getTechnicalBrief = (slug: string): TechnicalBriefData | undefined => {
  return technicalBriefsData[slug];
};
