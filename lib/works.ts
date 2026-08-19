import { workDirPath, workAssetByPath } from "@/lib/asset";

export type WorkDemoSource = {
  src: string;
  label: string;
};

export type WorkScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type WorkLink = {
  title: string;
  href: string;
};

export type PortfolioWork = {
  slug: string;
  owner: string;
  ownerRole: string;
  assetsDir: string;
  title: string;
  tagline: string;
  status: string;
  categories: string[];
  industries: string[];
  stackTags: string[];
  quoteService: string;
  problem: string[];
  solutionIntro: string;
  solution: string[];
  principles?: string[];
  capabilities: { title: string; desc: string }[];
  workflow: { title: string; desc: string }[];
  technology: { layer: string; items: string[] }[];
  validation: {
    summary: string;
    bullets: string[];
    security: string[];
    limitations: string[];
  };
  demo?: {
    intro: string;
    sources: WorkDemoSource[];
    poster?: string;
    note?: string;
  };
  screenshots: WorkScreenshot[];
  architecture?: { src: string; alt: string; caption?: string };
  documentation?: {
    intro: string;
    links: WorkLink[];
  };
  future: string[];
};

const work = (
  slug: string,
  owner: string,
  ownerRole: string,
  projectFolder: string | undefined,
): {
  slug: string;
  owner: string;
  ownerRole: string;
  assetsDir: string;
} => {
  const assetsDir = workDirPath(owner, projectFolder);
  return {
    slug,
    owner,
    ownerRole,
    assetsDir,
  };
};

export const WORKS: PortfolioWork[] = [
  {
    ...work("ai-contract-risk-analyser", "naman", "AI Developer Intern", "ai-contract-risk-analyser"),
    title: "AI Contract Analysis & Risk Detection",
    tagline:
      "Faster document review with traceable evidence — upload a contract and get risk findings with source-verified citations.",
    status: "Internally developed · MVP",
    categories: ["Document Intelligence", "AI Automation", "Enterprise Software"],
    industries: ["Legal", "Procurement", "HR", "Enterprise Automation"],
    stackTags: ["FastAPI", "React 18", "ChromaDB", "OpenRouter LLM", "Docker"],
    quoteService: "AI Document / PDF System",
    problem: [
      "Contract review is one of the most time-consuming and repetitive tasks in legal practice. Reviewers must manually read dense legal documents to identify unfavorable or one-sided terms, missing critical protections, ambiguous liability or IP clauses, unfavourable governing law or jurisdiction terms, and payment and termination risks.",
      "An AI-assisted system can accelerate this process by automatically extracting key information, identifying common risk patterns, and providing evidence-backed findings — all while maintaining traceability to the original source document.",
    ],
    solutionIntro:
      "We built a full-stack document-intelligence system — FastAPI backend with a React reviewer dashboard — that turns a raw contract PDF into a structured, evidence-backed analysis.",
    solution: [
      "A reviewer uploads a PDF. The system validates the file, extracts page-preserving text, normalizes and chunks the document, identifies clauses and sections, indexes it into a vector store, detects up to 12 predefined risk categories, and verifies every finding against the source.",
      "A built-in retrieval-based Q&A lets reviewers ask questions about the contract and get evidence-grounded answers that cite the exact page, section and chunk. Every risk finding carries its evidence quote, page number, section and confidence score, so the human makes the final call.",
    ],
    capabilities: [
      { title: "PDF upload with validation", desc: "Drag-and-drop upload with type, size and MIME checks, filename sanitization and safe temporary storage." },
      { title: "Page-preserving extraction", desc: "Text extraction via pdfplumber with a PyPDF2 fallback, keeping page boundaries intact." },
      { title: "Normalization & chunking", desc: "Clause-aware text normalization and chunking (size 500 / overlap 100) for reliable retrieval." },
      { title: "Vector retrieval", desc: "ChromaDB vector store with sentence-transformers (all-MiniLM-L6-v2) embeddings for semantic search." },
      { title: "Retrieval-based Q&A", desc: "Evidence-grounded question answering over the contract via an OpenRouter LLM, with source references." },
      { title: "12 risk categories", desc: "Termination, automatic renewal, indemnification, liability, IP, confidentiality, governing law, payment, notice and data privacy risks with severity levels." },
      { title: "Evidence tracing", desc: "Every finding links back to its source with page, section and chunk references for full traceability." },
      { title: "Security hardening", desc: "Path-traversal prevention, safe temp storage, prompt-injection defence and environment-only secrets." },
    ],
    workflow: [
      { title: "Upload", desc: "Reviewer uploads a PDF contract through the dashboard." },
      { title: "Document validation", desc: "Type, size and MIME are checked before anything is processed." },
      { title: "Text extraction", desc: "Page numbers and document structure are preserved during extraction." },
      { title: "Normalization & chunking", desc: "Text is cleaned and split into clause-aware chunks." },
      { title: "Clause identification", desc: "Sections and standard contract clauses are detected." },
      { title: "Vector indexing", desc: "Chunks are embedded and stored in ChromaDB for retrieval." },
      { title: "Risk detection", desc: "12 predefined risk categories are checked against retrieved evidence." },
      { title: "Evidence verification", desc: "Each finding is verified against the source passage before output." },
      { title: "Structured analysis", desc: "A Pydantic-validated summary, severity breakdown and findings are rendered for the reviewer." },
    ],
    technology: [
      { layer: "Language", items: ["Python 3.11+"] },
      { layer: "Backend", items: ["FastAPI", "Uvicorn"] },
      { layer: "Document processing", items: ["pdfplumber", "PyPDF2"] },
      { layer: "Embeddings", items: ["sentence-transformers (all-MiniLM-L6-v2)"] },
      { layer: "Vector database", items: ["ChromaDB"] },
      { layer: "LLM provider", items: ["OpenRouter API"] },
      { layer: "Validation", items: ["Pydantic v2"] },
      { layer: "Frontend", items: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Axios", "React Router v6"] },
      { layer: "Testing", items: ["pytest", "pytest-asyncio", "httpx"] },
      { layer: "Deployment", items: ["Docker", "Docker Compose"] },
    ],
    validation: {
      summary:
        "A reproducible test suite (32 tests) covers unit, integration, security and edge-case scenarios across the full pipeline.",
      bullets: [
        "Unit — text normalization, chunking, document validation, clause detection and hallucination checks",
        "Integration — health check, upload validation, analysis pipeline and question answering",
        "Security — path traversal, malicious filenames, unsupported extensions, oversized uploads, prompt injection and sensitive-data leakage",
        "Edge cases — valid / empty / corrupted PDFs and missing document handling",
        "Severity model — HIGH / MEDIUM / LOW findings based on financial and legal exposure",
      ],
      security: [
        "File validation: type, size and MIME before processing",
        "Safe storage: random, non-guessable names in temporary directories",
        "Path traversal prevention and strict filename sanitization",
        "Prompt-injection defence with clear separation of instructions, content and questions",
        "Secrets stored in environment variables only — never in version control",
        "Structured logging with sensitive data excluded",
        "All API endpoints validated via Pydantic schemas",
      ],
      limitations: [
        "Provides contract analysis assistance — not legal advice",
        "Analysis is limited to the uploaded document(s)",
        "Risk detection covers the 12 predefined categories only",
        "LLM-based analysis should be verified by a human reviewer",
        "PDF is the only supported format in the current MVP",
      ],
    },
    demo: {
      intro: "A walkthrough of the reviewer dashboard: contract upload, automatic analysis and evidence inspection.",
      sources: [{ src: workAssetByPath(workDirPath("naman", "ai-contract-risk-analyser"), "demo-video.mp4"), label: "Upload → analysis → evidence walkthrough" }],
      poster: workAssetByPath(workDirPath("naman", "ai-contract-risk-analyser"), "landing-page.png"),
      note: "Demo shows the landing page, contract upload, risk findings and source-passage inspection.",
    },
    screenshots: [
      { src: workAssetByPath(workDirPath("naman", "ai-contract-risk-analyser"), "landing-page.png"), alt: "AI Contract Analysis landing page with drag-and-drop upload", caption: "Landing & upload" },
      { src: workAssetByPath(workDirPath("naman", "ai-contract-risk-analyser"), "low-risk-output.png"), alt: "Analysis output for a low-risk sample contract", caption: "Low-risk contract output" },
      { src: workAssetByPath(workDirPath("naman", "ai-contract-risk-analyser"), "high-risk-output.png"), alt: "Risk findings for a high-risk contract", caption: "High-risk findings" },
      { src: workAssetByPath(workDirPath("naman", "ai-contract-risk-analyser"), "high-risk-output-2.png"), alt: "Evidence-backed risk finding with severity and source reference", caption: "Evidence-backed finding" },
    ],
    architecture: {
      src: workAssetByPath(workDirPath("naman", "ai-contract-risk-analyser"), "architecture.png"),
      alt: "System architecture of the AI contract analysis system: reviewer → frontend → backend API → document pipeline, retrieval system and risk detection",
      caption: "Reviewer → React frontend → FastAPI backend → document pipeline, retrieval system and risk detection over extraction, vector store and LLM analysis.",
    },
    future: [
      "Multi-contract search and comparison",
      "Contract version diffing",
      "Clause rewrite suggestions",
      "Export analysis as PDF and JSON",
      "Additional risk categories and severity tuning",
      "Multi-language support",
      "OCR for scanned PDFs, multi-user collaboration and CLM platform integration (stretch)",
    ],
  },
  {
    ...work("nl-to-sql-analytics-assistant", "naman", "AI Developer Intern", "nl-to-sql"),
    title: "Natural Language → SQL Analytics Assistant",
    tagline: "Ask business data questions in plain English — get safe, validated SQL with grounded explanations.",
    status: "Internally developed · MVP",
    categories: ["Analytics Automation", "LLM Guardrails", "Data Access"],
    industries: ["Data Teams", "Analytics Automation", "Non-Technical Business Users"],
    stackTags: ["FastAPI", "PostgreSQL 16", "sqlglot", "React 18", "Docker"],
    quoteService: "AI Business Assistant",
    problem: [
      "Business users often need answers from data but should not (and cannot) write SQL directly. Hand-built dashboards only ever cover predefined questions.",
      "Users want to ask questions in plain language and receive trustworthy, well-explained answers — without ever exposing the database to destructive queries or privileged credentials.",
    ],
    solutionIntro:
      "We built an AI analytics assistant that converts natural-language business questions into safe, validated SQL, executes it against a read-only relational database, and returns structured results with natural-language explanations.",
    solution: [
      "Under the hood, the system discovers the live schema, selects only the relevant tables and join paths, and asks an LLM to write SQL within that authorized boundary. Every query is parsed to an AST (via sqlglot) and rejected if it is destructive, malformed, multi-statement or touches an unauthorized table.",
      "Validated SQL runs through a dedicated SELECT-only PostgreSQL role with time and row limits, so read-only execution is enforced at the database layer — the LLM is never treated as a security boundary.",
    ],
    principles: [
      "Security by defense in depth: prompt rules + AST-based SQL validation + allowed-schema boundary + a dedicated read-only database role + query limits.",
      "The LLM is never treated as a security boundary.",
    ],
    capabilities: [
      { title: "Dynamic schema discovery", desc: "Introspects live tables, columns, types, primary keys and foreign keys automatically." },
      { title: "Relevant schema selection", desc: "Join-aware selection of the tables and columns that matter for each question." },
      { title: "LLM SQL generation", desc: "Provider-agnostic generation limited to the authorized schema and permitted operations." },
      { title: "AST-based SQL validation", desc: "sqlglot parses every query and rejects destructive, malformed, multi-statement or unauthorized queries." },
      { title: "Read-only execution", desc: "A dedicated SELECT-only PostgreSQL role with configurable timeout and row limits." },
      { title: "Grounded explanations", desc: "The LLM summarizes results strictly from the returned data — no invented metrics." },
      { title: "Structured query logging", desc: "Every query is logged with errors handled gracefully and sanitized responses." },
      { title: "Analytics chat frontend", desc: "Dark/light theme, collapsible sidebar, SQL syntax highlighting, provider/model settings and live processing stages." },
    ],
    workflow: [
      { title: "Schema discovery", desc: "Introspects the live database — tables, columns, types, primary and foreign keys." },
      { title: "Relevant schema selection", desc: "Picks the tables and columns that matter for the question, including join paths." },
      { title: "SQL generation", desc: "The LLM writes SQL limited to the authorized schema and permitted operations." },
      { title: "Validation", desc: "Every query is parsed to an AST and checked for destructive, malformed, multi-statement or unauthorized queries." },
      { title: "Read-only execution", desc: "Validated SQL runs through a dedicated SELECT-only role with time and row limits." },
      { title: "Result processing", desc: "Rows are normalized into a structured, JSON-safe format." },
      { title: "Explanation", desc: "The LLM summarizes results grounded strictly in the returned data." },
    ],
    technology: [
      { layer: "Backend", items: ["Python 3.11", "FastAPI", "Pydantic v2", "SQLAlchemy", "Uvicorn"] },
      { layer: "SQL safety", items: ["sqlglot (AST validation)", "dedicated read-only DB role"] },
      { layer: "Database", items: ["PostgreSQL 16 (Docker)"] },
      { layer: "LLM calls", items: ["httpx", "OpenRouter (OpenAI-compatible)", "mock provider for tests"] },
      { layer: "Frontend", items: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "react-syntax-highlighter", "lucide-react"] },
      { layer: "Testing", items: ["pytest — 130 tests, 129 passing, 1 skipped (needs live PostgreSQL)"] },
      { layer: "Deployment", items: ["Docker", "docker-compose", "nginx reverse proxy"] },
    ],
    validation: {
      summary:
        "A 130-test suite verifies success paths, failure handling and security rejections end-to-end (129 passing, 1 skipped without a live database).",
      bullets: [
        "Success — query execution with result verification (e.g. revenue question → SUM(quantity × unit_price) → $8,400,050.00)",
        "Failure — invalid SQL, unknown tables and execution errors handled cleanly",
        "Security — DELETE, DROP, UPDATE, INSERT, multi-statement, SELECT INTO and unauthorized tables all rejected",
        "Sanitization — error messages never leak SQL or table names",
        "Health endpoint reports live schema tables for quick verification",
      ],
      security: [
        "Prompt rules — system instructions plus a strict schema boundary",
        "AST-based SQL validation (sqlglot) rejects destructive and multi-statement queries",
        "Allowed-schema boundary — only relevance-selected tables are exposed to the LLM",
        "Dedicated read-only role — execution runs as a SELECT-only user with no DDL/DML privileges",
        "Query limits — configurable timeout (default 10s) and max result rows (default 1000)",
        "No secrets in code — all credentials in environment variables; .env is git-ignored",
      ],
      limitations: [
        "Open-ended natural-language questions require a real LLM API key; the mock provider is deterministic (tests/demos only)",
        "Explanation accuracy is bounded by the LLM and the returned data",
        "Single, first-party database instance (one schema namespace)",
      ],
    },
    demo: {
      intro: "Ask a business question in plain English and watch it become validated SQL, a result and a grounded explanation.",
      sources: [{ src: workAssetByPath(workDirPath("naman", "nl-to-sql"), "demo-video-nl-sql.mp4"), label: "Question → SQL → result → explanation" }],
      poster: workAssetByPath(workDirPath("naman", "nl-to-sql"), "Screenshot 2026-08-15 114220.png"),
      note: "The demo shows the chat interface converting real questions into validated SQL.",
    },
    screenshots: [
      { src: workAssetByPath(workDirPath("naman", "nl-to-sql"), "Screenshot 2026-08-12 204403.png"), alt: "NL to SQL chat interface showing a natural-language question and generated SQL", caption: "Chat → SQL flow" },
      { src: workAssetByPath(workDirPath("naman", "nl-to-sql"), "Screenshot 2026-08-15 114211.png"), alt: "Analytics assistant sidebar and conversation history", caption: "Sidebar & history" },
      { src: workAssetByPath(workDirPath("naman", "nl-to-sql"), "Screenshot 2026-08-15 114220.png"), alt: "Settings modal to switch LLM provider and model", caption: "Provider & model settings" },
    ],
    architecture: {
      src: workAssetByPath(workDirPath("naman", "nl-to-sql"), "arch.png"),
      alt: "NL to SQL system architecture: user question through schema discovery, SQL generation, validation and read-only execution to explanation",
      caption: "Question → schema discovery → LLM SQL generation → validation → read-only execution → grounded explanation.",
    },
    future: [
      "Query repair loop with bounded retries",
      "Chart generation (line, bar, pie) when appropriate",
      "Query history and saved questions",
      "Role-based access control",
      "Multi-database and multi-tenant support",
      "Semantic business metrics layer",
    ],
  },
  {
    ...work("security-log-anomaly-detection", "pragna", "Cybersecurity Engineer Intern", undefined),
    title: "SentinelAI — Security Log Anomaly Detection",
    tagline: "Risk-scored alerts from security events — a full-stack Mini-SIEM with ML detection, attack-chain correlation and explainable alerts.",
    status: "Internally developed · Mini-SIEM platform",
    categories: ["Security Analytics", "Detection Engineering", "SOC Platform"],
    industries: ["Cybersecurity", "SOC Operations", "Enterprise Security"],
    stackTags: ["FastAPI", "scikit-learn", "SHAP", "React 18", "SQLite", "JWT + RBAC"],
    quoteService: "Custom AI Solution",
    problem: [
      "Security teams face overwhelming volumes of login and access logs. Manual review does not scale, and early indicators of compromise — logins from high-risk geographies, unknown devices, credential-stuffing patterns — are often missed until damage is done.",
      "Defenders need a system that can ingest events at API scale, score risk automatically, surface actionable alerts and give analysts enough evidence to trust and act on them.",
    ],
    solutionIntro:
      "SentinelAI is a full-stack Mini-SIEM that ingests authentication logs, detects anomalies using hybrid rule + ML detection, correlates multi-step attack chains, enriches events with threat intelligence and visualizes everything on a modern SOC dashboard.",
    solution: [
      "Each incoming event is scored by location and device rules, then passed through a hybrid detection stage that combines Isolation Forest anomalies with per-user behavioural baselines. Alerts fire when the composite risk reaches ≥ 80 and are automatically mapped to MITRE ATT&CK techniques.",
      "A correlation engine identifies multi-step attack patterns per user, threat-intelligence feeds enrich events with IOC matches, and SHAP attribution explains why the ML model flagged a particular event — giving analysts evidence they can actually investigate.",
    ],
    capabilities: [
      { title: "Log ingestion", desc: "REST API (POST /log) with Pydantic validation for security events." },
      { title: "Rule-based scoring", desc: "Location and device risk signals scored instantly on ingestion." },
      { title: "Hybrid ML detection", desc: "Isolation Forest anomalies combined with per-user behavioural baselines." },
      { title: "Alert generation", desc: "Automatic alerts at hybrid risk ≥ 80 with MITRE ATT&CK mapping." },
      { title: "Threat intelligence", desc: "IOC feed enrichment from JSON, CSV or mock feeds (17 default IOCs)." },
      { title: "Correlation engine", desc: "Detects credential stuffing, account takeover, insider threat and impossible-travel chains." },
      { title: "Explainable AI", desc: "SHAP feature attribution with natural-language summaries for every ML anomaly." },
      { title: "JWT + RBAC", desc: "ADMIN / ANALYST / VIEWER roles plus guest sessions for demos." },
      { title: "Investigation workflow", desc: "Alert triage, timelines, incident reports and MITRE-based SOC actions." },
      { title: "Real-time dashboard", desc: "SentinelAI SOC UI with live metrics and 5-second polling." },
    ],
    workflow: [
      { title: "Ingest", desc: "Security event arrives via POST /log with Pydantic validation." },
      { title: "Rule risk scoring", desc: "Location + device risk signals are scored immediately." },
      { title: "Store", desc: "Event is inserted into the security_logs store." },
      { title: "Hybrid detection", desc: "ML (Isolation Forest) + behavioural baseline + rule signals combine into a composite risk score." },
      { title: "Alert", desc: "If hybrid risk ≥ 80, an alert fires with MITRE ATT&CK mapping." },
      { title: "Correlate", desc: "The correlation engine checks 4 attack-chain patterns per user." },
      { title: "Enrich", desc: "IPs and locations are matched against IOC threat-intelligence feeds." },
      { title: "Explain", desc: "SHAP generates feature attribution for ML anomalies." },
      { title: "Respond", desc: "Analysts triage alerts, inspect evidence and build incident reports in the dashboard." },
    ],
    technology: [
      { layer: "Backend", items: ["Python 3.9+", "FastAPI", "Uvicorn"] },
      { layer: "Storage", items: ["SQLite"] },
      { layer: "ML & explainability", items: ["scikit-learn (Isolation Forest)", "SHAP", "behavioural baselines"] },
      { layer: "Auth", items: ["JWT", "RBAC (ADMIN / ANALYST / VIEWER)", "guest sessions"] },
      { layer: "Threat intel", items: ["IOC feeds (JSON / CSV / mock)", "IP and location enrichment"] },
      { layer: "Frontend", items: ["React 18", "SentinelAI SOC dashboard"] },
      { layer: "Testing", items: ["38 backend unit tests (unittest)", "frontend test"] },
      { layer: "Deployment", items: ["Docker", "docker-compose", "log generator + ML training scripts"] },
    ],
    validation: {
      summary:
        "Validated with 38 backend unit tests plus a curated demo dataset, seeded accounts and a comprehensive set of phase-level reports covering architecture, detection logic, security hardening and audits.",
      bullets: [
        "Suspicious login detection — Russia/China logins and unknown devices flagged",
        "Behavioral deviation — events compared against per-user baselines",
        "Attack-chain detection — credential stuffing, account takeover, insider threat and impossible travel",
        "Threat enrichment — IPs/locations matched against IOC feeds",
        "Explanability — SHAP shows why the ML model flagged each event",
        "SOC visibility — real-time dashboard with MITRE ATT&CK mapping",
        "Demo guide — 5-minute and 10-minute demo scripts plus an analyst presentation checklist",
      ],
      security: [
        "Rule + ML hybrid scoring with composite risk thresholds (alert at ≥ 80)",
        "Correlation rules: credential stuffing (failed → failed → success), account takeover (new device → high risk → privileged access), insider threat (≥5 high-risk events in 24h), impossible travel (multiple locations within 2h)",
        "MITRE ATT&CK mapping — failed logins → T1110 Brute Force; successful logins → T1078 Valid Accounts; privileged access → T1078.004 Cloud Accounts",
        "Phase reports cover hardening, remediation, validation and a final release audit",
      ],
      limitations: [
        "Demo mode uses seeded accounts and a guest VIEWER session",
        "ML model artifact stored as a pickle (ONNX/skops planned)",
        "SQLite is fine for demo scale; PostgreSQL is planned for production workloads",
        "Threat feed is bundled/mock-based; external feeds (AbuseIPDB, AlienVault OTX) are on the roadmap",
      ],
    },
    screenshots: [
      { src: workAssetByPath("/works/pragna", "PAGE 1.png"), alt: "SentinelAI presentation slide 1 — title", caption: "Overview" },
      { src: workAssetByPath("/works/pragna", "PAGE 2.png"), alt: "SentinelAI slide — problem statement", caption: "Problem" },
      { src: workAssetByPath("/works/pragna", "PAGE 3.png"), alt: "SentinelAI slide — system overview", caption: "System" },
      { src: workAssetByPath("/works/pragna", "PAGE 4.png"), alt: "SentinelAI slide — architecture", caption: "Architecture" },
      { src: workAssetByPath("/works/pragna", "PAGE 5.png"), alt: "SentinelAI slide — detection pipeline", caption: "Detection" },
      { src: workAssetByPath("/works/pragna", "PAGE 6.png"), alt: "SentinelAI slide — ML detection", caption: "ML detection" },
      { src: workAssetByPath("/works/pragna", "PAGE 7.png"), alt: "SentinelAI slide — correlation engine", caption: "Correlation" },
      { src: workAssetByPath("/works/pragna", "PAGE 8.png"), alt: "SentinelAI slide — threat intelligence", caption: "Threat intel" },
      { src: workAssetByPath("/works/pragna", "PAGE 9.png"), alt: "SentinelAI slide — explainable AI", caption: "Explainability" },
      { src: workAssetByPath("/works/pragna", "PAGE 10.png"), alt: "SentinelAI slide — SOC dashboard", caption: "SOC dashboard" },
      { src: workAssetByPath("/works/pragna", "PAGE 11.png"), alt: "SentinelAI slide — RBAC and auth", caption: "Auth & RBAC" },
      { src: workAssetByPath("/works/pragna", "PAGE 12.png"), alt: "SentinelAI slide — validation and testing", caption: "Validation" },
      { src: workAssetByPath("/works/pragna", "PAGE 13.png"), alt: "SentinelAI slide — release and audit", caption: "Release" },
      { src: workAssetByPath("/works/pragna", "PAGE 14.png"), alt: "SentinelAI slide — conclusion and roadmap", caption: "Roadmap" },
    ],
    architecture: {
      src: workAssetByPath("/works/pragna", "sentinelai-arch.png"),
      alt: "SentinelAI architecture: log generator → FastAPI backend → rule scoring, hybrid detection, threat intelligence, correlation engine and SHAP → analytics API → React dashboard",
      caption: "Log generator → FastAPI backend → rule scoring, hybrid detection, threat intelligence, correlation engine and SHAP → React SOC dashboard.",
    },
    documentation: {
      intro:
        "SentinelAI ships with an extensive documentation set covering architecture, detection logic, ML, phases, audits and demo scripts.",
      links: [
        { title: "Architecture", href: workAssetByPath("/works/pragna", "docs/architecture.md") },
        { title: "Detection logic", href: workAssetByPath("/works/pragna", "docs/detection_logic.md") },
        { title: "ML detection", href: workAssetByPath("/works/pragna", "docs/ml_detection.md") },
        { title: "Technical report", href: workAssetByPath("/works/pragna", "docs/technical_report.md") },
        { title: "Correlation engine", href: workAssetByPath("/works/pragna", "docs/phase14_correlation_engine.md") },
        { title: "Explainable ML", href: workAssetByPath("/works/pragna", "docs/phase15_explainable_ml.md") },
        { title: "Threat intelligence", href: workAssetByPath("/works/pragna", "docs/phase13_threat_intelligence.md") },
        { title: "SOC features", href: workAssetByPath("/works/pragna", "docs/phase12_soc_features.md") },
        { title: "Demo script", href: workAssetByPath("/works/pragna", "docs/demo_script.md") },
        { title: "5-minute demo", href: workAssetByPath("/works/pragna", "docs/5_minute_demo.md") },
        { title: "10-minute demo", href: workAssetByPath("/works/pragna", "docs/10_minute_demo.md") },
        { title: "Final release audit", href: workAssetByPath("/works/pragna", "docs/final_release_audit.md") },
      ],
    },
    future: [
      "ONNX / skops model format to replace pickle",
      "Rate limiting on POST /log",
      "External threat feeds (AbuseIPDB, AlienVault OTX)",
      "PostgreSQL support for production scale",
      "E2E integration tests with Playwright",
      "Email / Slack alert notifications",
      "Geo-velocity impossible-travel detection",
    ],
  },
  {
    ...work("ai-data-analyst-bi-agent", "priyanka", "ML Engineer & Data Analyst Intern", "ai-data-analyst-bi-agent"),
    title: "AI Data Analyst & Business Intelligence Agent",
    tagline: "Evidence-grounded business intelligence from spreadsheets — upload CSV/XLSX, get analysis, visualizations and explained answers.",
    status: "Internally developed · MVP in development",
    categories: ["Business Intelligence", "Data Analytics", "LLM Interpretation"],
    industries: ["BI & Analytics", "Management Reporting", "Business Operations"],
    stackTags: ["Streamlit", "Pandas", "NumPy", "Plotly", "OpenAI API", "ReportLab"],
    quoteService: "Predictive ML System",
    problem: [
      "Businesses often store valuable information in spreadsheets and structured datasets — but extracting useful answers from that data usually requires manual preparation, analysis and interpretation.",
      "Non-technical users need an assistant that can accept structured data, validate and clean it, profile its quality, run descriptive analysis, generate visualizations, answer natural-language questions and export a business-ready report.",
    ],
    solutionIntro:
      "We built an AI-assisted analytics platform that combines deterministic analytics with an LLM interpretation layer, so business users can move from raw data to meaningful insights and recommendations.",
    solution: [
      "The design follows one strict rule: analytics calculates the numbers, the LLM interprets the evidence. Metrics are computed deterministically with Pandas and NumPy before any result is handed to the LLM, so the AI can never invent numbers.",
      "Users upload a CSV or XLSX (or use the bundled sample dataset, indian_saas_customers.csv), the system cleans and profiles it, generates Plotly visualizations, answers natural-language questions with computed evidence, produces insights and recommendations, and exports a PDF report via ReportLab.",
    ],
    principles: [
      "Analytics calculates the numbers. The LLM interprets the evidence.",
      "The LLM is never the source of numerical truth — it receives computed evidence and is instructed to use only that evidence, avoid inventing metrics and state clearly when information is unavailable.",
      "Build the reliable analytics foundation first, then add AI on top of verified evidence.",
    ],
    capabilities: [
      { title: "CSV / XLSX ingestion", desc: "Upload structured business data or load the bundled sample dataset (indian_saas_customers.csv — 300 Indian SaaS customers)." },
      { title: "Validation & cleaning", desc: "Missing values, duplicates and invalid structures are detected and handled." },
      { title: "Data profiling", desc: "Rows, columns, types, quality metrics, unique values and a clear data dictionary." },
      { title: "Deterministic analytics", desc: "Revenue, profit, orders, customers, average order value, profit margin and category/region/time breakdowns." },
      { title: "Visualizations", desc: "Revenue trend, revenue by category, profit by region and profit-margin-by-product charts via Plotly." },
      { title: "Natural-language questions", desc: "Ask “Which category generated the highest revenue?” and get a computed answer." },
      { title: "Grounded LLM interpretation", desc: "The model explains results strictly from the supplied evidence." },
      { title: "Insights & recommendations", desc: "Business observations and recommendations supported by the available analysis." },
      { title: "Report export", desc: "A downloadable analytical report generated with ReportLab." },
    ],
    workflow: [
      { title: "Upload", desc: "CSV/XLSX dataset or the bundled sample (indian_saas_customers.csv, 300 customers) is accepted." },
      { title: "Validate", desc: "Structure, types and completeness are checked." },
      { title: "Clean", desc: "Cleaning log records every correction applied." },
      { title: "Profile", desc: "Data dictionary and quality summary are generated." },
      { title: "Calculate metrics", desc: "Deterministic business metrics are computed with Pandas/NumPy." },
      { title: "Chart & tabulate", desc: "Plots and analytical tables are generated." },
      { title: "Ask a question", desc: "The user asks a business question in natural language." },
      { title: "Compute evidence", desc: "A deterministic evidence bundle is built for the question." },
      { title: "Interpret", desc: "The LLM explains the evidence in business language." },
      { title: "Insights", desc: "Practical observations are derived from the analysis." },
      { title: "Recommendations", desc: "Next-step suggestions grounded in computed results." },
      { title: "Export", desc: "A summary report is downloaded." },
    ],
    technology: [
      { layer: "Language", items: ["Python 3.10+"] },
      { layer: "Web application", items: ["Streamlit"] },
      { layer: "Data processing", items: ["Pandas"] },
      { layer: "Numerical analysis", items: ["NumPy"] },
      { layer: "Visualization", items: ["Plotly"] },
      { layer: "LLM", items: ["OpenAI API"] },
      { layer: "Report generation", items: ["ReportLab"] },
      { layer: "Testing", items: ["Pytest"] },
      { layer: "Version control", items: ["Git / GitHub"] },
    ],
    validation: {
      summary:
        "The system is designed and tested against representative scenarios covering happy paths, failure handling and numerical correctness.",
      bullets: [
        "Happy path — upload, validation, cleaning, profiling, analytics, visualization, business questions, grounded AI interpretation and report generation",
        "Failure & edge cases — empty files, unsupported file types, missing values, duplicate records, invalid data, missing metrics, unsupported questions and LLM/API failures",
        "Numerical answer verification — computed metrics are the source of truth",
        "Example questions — highest-revenue category, highest-profit region, monthly revenue change, low-margin products, business recommendations",
      ],
      security: [
        "API keys stored through environment variables",
        "No credentials committed to GitHub; .env excluded via .gitignore",
        ".env.example provided as a configuration template",
        "Only authorized, owned or sandboxed data used during development",
      ],
      limitations: [
        "Initial MVP focuses on structured business datasets",
        "Multiple datasets, automatic chart selection, forecasting, anomaly detection, conversational follow-ups and SQL database support are stretch features",
        "ReportLab PDF is the current export format",
      ],
    },
    demo: {
      intro: "A demo of the AI Data Analyst interface built on Streamlit — from dataset upload through grounded answers and report export.",
      sources: [
        { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "demo video ai analyst bi intelligence .mp4"), label: "Full workflow walkthrough" },
        { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "AI DEMO WITH EXPLANATION (1).mp4"), label: "Walkthrough with explanation" },
      ],
      poster: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Dataset upload option.png"),
      note: "Two demo recordings are included — a full workflow and an explained walkthrough.",
    },
    screenshots: [
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Dataset upload option.png"), alt: "Dataset upload screen in the AI Data Analyst app", caption: "Dataset upload" },
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "streamlit run.png"), alt: "The Streamlit application running from the terminal", caption: "App launch" },
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Cleaned dataset preview.png"), alt: "Cleaned dataset preview shown to the user", caption: "Cleaned dataset" },
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Cleaning log preview.png"), alt: "Cleaning log recording every data correction", caption: "Cleaning log" },
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Data dictionary preview.png"), alt: "Data dictionary preview for the uploaded dataset", caption: "Data dictionary" },
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Profile summary preview.png"), alt: "Profile and quality summary of the dataset", caption: "Profile summary" },
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Ask a question option.png"), alt: "Natural-language question interface", caption: "Ask a question" },
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Answer option.png"), alt: "Computed answer to a business question", caption: "Answer" },
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Evidence for answer option.png"), alt: "Evidence bundle backing an answer", caption: "Evidence" },
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Insight and recommendation option.png"), alt: "Insights and recommendations generated from analysis", caption: "Insights & recommendations" },
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Visualization.png"), alt: "Plotly visualization generated from the dataset", caption: "Visualization" },
      { src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "Dataset option correction.png"), alt: "Dataset option correction behavior", caption: "Option correction" },
    ],
    architecture: {
      src: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "architecture.png"),
      alt: "AI Data Analyst architecture: ingestion, cleaning, profiling, analytics, visualization, NLQ and LLM interpretation over session state and reporting",
      caption: "Ingestion → cleaning → profiling → deterministic analytics → visualization → NLQ with computed evidence → LLM interpretation → report export.",
    },
    documentation: {
      intro:
        "Supporting references including a ready-to-use sample dataset so the workflow can be tried end to end.",
      links: [
        { title: "Sample dataset — Indian SaaS customers (CSV, 300 rows)", href: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "indian_saas_customers.csv") },
        { title: "AI structure diagram", href: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "docs/AI structure.png") },
        { title: "Report preview (PDF)", href: workAssetByPath(workDirPath("priyanka", "ai-data-analyst-bi-agent"), "zenera_ai_data_analyst_report preview.pdf") },
      ],
    },
    future: [
      "Forecasting",
      "Anomaly detection",
      "Automatic chart recommendations",
      "Multiple dataset analysis",
      "Conversational follow-up questions",
      "SQL database integration",
      "Additional business domains",
    ],
  },
  {
    ...work("ai-project-workflow-automation", "sanjay", "Software Developer Intern", "ai-project-workflow"),
    title: "AI Project & Workflow Automation Agent",
    tagline: "Turn project briefs into actionable delivery plans — AI plans, humans review, structured and editable.",
    status: "Internally developed · built for Zenera Labs",
    categories: ["Project Planning", "Workflow Automation", "LLM Agents"],
    industries: ["Delivery Operations", "Project Management", "Internal Workflow Automation"],
    stackTags: ["FastAPI", "React 19", "Gemini API", "Pydantic v2", "SQLAlchemy", "SQLite"],
    quoteService: "Workflow Automation",
    problem: [
      "Project planning is typically manual and slow, and AI chat output is free-form text that is hard to review, track or act on.",
      "The goal is to make AI plan rather than just chat: convert a brief into structured project data (never raw text), validate that data against strict schemas, persist it and put a human-review workflow in front of it — so AI assists with planning without blindly executing external actions.",
    ],
    solutionIntro:
      "An internal project-planning and workflow-automation application for Zenera Labs that turns a natural-language project brief into a structured, editable project plan using AI.",
    solution: [
      "A user pastes a brief (for example an e-commerce build). The LLM planning assistant produces a validated, structured plan — project summary, requirements, modules, tasks with priorities and statuses, acceptance criteria and task dependencies — validated by Pydantic before anything is stored.",
      "The plan lands in a dashboard where a human reviews, edits and approves tasks. Optionally, a reviewed task can be exported to a GitHub issue — only after explicit confirmation.",
    ],
    capabilities: [
      { title: "Natural-language planning", desc: "Brief → structured ProjectPlan via Google's Gemini API (official google-genai SDK), validated by Pydantic before storage." },
      { title: "Structured plan", desc: "Summary, requirements, modules, tasks (priority HIGH/MEDIUM/LOW, status TODO/IN_PROGRESS/BLOCKED/DONE), acceptance criteria and dependency edges." },
      { title: "Strict validation", desc: "Required fields, priority values, data types, unique ids, resolvable references and a hard no-self-dependency rule." },
      { title: "Project home", desc: "Create a project from a name + brief and generate its plan in one action; live requirement/module/task counts." },
      { title: "Dashboard", desc: "Statistics cards plus Overview / Requirements / Modules / Tasks / Dependencies tabs with filtering and deep-linkable ?tab=." },
      { title: "Task review & editing", desc: "Every task shows an “AI-generated, editable” notice; edits persist across reloads." },
      { title: "Reliability", desc: "Friendly errors for empty/short/long briefs, AI failures, timeouts, invalid output, DB failures and missing resources — never raw stack traces." },
      { title: "GitHub export (optional)", desc: "Create a GitHub issue from a reviewed task with explicit confirmation; the issue URL is stored on the task." },
      { title: "Deterministic fallback", desc: "AI_USE_FALLBACK=1 generates plans locally with no API key, so the whole stack is testable offline." },
    ],
    workflow: [
      { title: "Paste a brief", desc: "A user enters a natural-language project brief." },
      { title: "AI planning", desc: "The LLM planning assistant analyzes the brief (temperature 0.2, strict JSON schema)." },
      { title: "Validate", desc: "The reply is parsed and validated against the ProjectPlan schema — invalid output is never stored." },
      { title: "Persist", desc: "The structured plan is stored in SQLite." },
      { title: "Review", desc: "The dashboard lets a human review, edit and approve tasks." },
      { title: "Export (optional)", desc: "A reviewed task can be exported to a GitHub issue after explicit user confirmation." },
    ],
    technology: [
      { layer: "Frontend", items: ["React 19", "Vite 8", "TypeScript", "react-router-dom 7", "plain CSS"] },
      { layer: "Backend", items: ["Python 3.9+", "FastAPI", "Pydantic v2", "SQLAlchemy 2.x"] },
      { layer: "Database", items: ["SQLite (dev app.db; in-memory for tests)"] },
      { layer: "AI", items: ["Google Gemini API via google-genai SDK", "gemini-3.5-flash default, temperature 0.2"] },
      { layer: "GitHub", items: ["GitHub REST API via standard-library urllib"] },
      { layer: "Testing", items: ["Pytest (backend)", "TypeScript + oxlint + Vite build (frontend)"] },
    ],
    validation: {
      summary:
        "The suite covers the database, schemas, AI planner, all API endpoints, error handling, GitHub export and complete end-to-end workflows.",
      bullets: [
        "Schemas — required fields, priority/status enums, unique ids, resolvable references and no-self-dependency (schema + DB CHECK constraint)",
        "API — project create/list/get, plan generation, task update/delete and GitHub issue export, all with consistent error responses (404/422/502/503, never stack traces)",
        "Error handling — empty/short/long briefs, AI failures, timeouts, invalid output, DB failures and missing resources",
        "Fallback planner — deterministic and separated from the real planner for offline testing",
        "End-to-end — brief → validated plan → dashboard → task edit → GitHub issue",
      ],
      security: [
        "API keys and provider error details are never exposed to the frontend",
        "Error responses are always {\"detail\": \"<friendly message>\"} — no stack traces",
        "Issues are only created after explicit user confirmation; existing session flow guarded",
        "Deterministic fallback keeps full-stack behavior testable without credentials",
      ],
      limitations: [
        "Real Gemini not exercised live here — fully unit-tested with a mocked client; a live key + model are needed to verify output quality",
        "Single-user, no authentication or authorization (explicitly out of scope)",
        "SQLite fine for an internal tool, not designed for concurrent multi-user workloads",
        "No schema migrations — schema changes require recreating app.db",
        "GitHub export requires a personal access token and a sandbox repository",
        "Automatic fallback is silent to the user, and regenerating a plan replaces the previous plan (manual edits lost)",
      ],
    },
    demo: {
      intro: "A walkthrough of the planning agent: paste a brief, generate a validated plan, review tasks in the dashboard and export to GitHub issues.",
      sources: [{ src: workAssetByPath(workDirPath("sanjay", "ai-project-workflow"), "ai-project-workflow-automation-demo.mp4"), label: "Brief → plan → dashboard → GitHub export" }],
      poster: workAssetByPath(workDirPath("sanjay", "ai-project-workflow"), "dashboard.png"),
      note: "The demo shows the project home, plan generation, dashboard tabs and GitHub issue creation.",
    },
    screenshots: [
      { src: workAssetByPath(workDirPath("sanjay", "ai-project-workflow"), "dashboard.png"), alt: "AI project workflow dashboard with statistics cards and plan tabs", caption: "Dashboard" },
      { src: workAssetByPath(workDirPath("sanjay", "ai-project-workflow"), "plans.png"), alt: "Generated project plan with requirements, modules and tasks", caption: "Generated plan" },
      { src: workAssetByPath(workDirPath("sanjay", "ai-project-workflow"), "github issue created.png"), alt: "GitHub issue created from a reviewed task", caption: "GitHub issue created" },
      { src: workAssetByPath(workDirPath("sanjay", "ai-project-workflow"), "githubissue and edit.png"), alt: "Editing a task and exporting it to a GitHub issue", caption: "Task edit + export" },
    ],
    architecture: {
      src: workAssetByPath(workDirPath("sanjay", "ai-project-workflow"), "docs/architecture.png"),
      alt: "AI project workflow architecture: React frontend → FastAPI API → AI planner, SQLite database and GitHub integration",
      caption: "React frontend → FastAPI API → AI planner, persisted plans in SQLite and optional GitHub issue export.",
    },
    documentation: {
      intro: "Supporting internal design docs for the AI Project & Workflow Automation agent.",
      links: [
        { title: "Architecture", href: workAssetByPath(workDirPath("sanjay", "ai-project-workflow"), "docs/architecture.md") },
        { title: "API reference", href: workAssetByPath(workDirPath("sanjay", "ai-project-workflow"), "docs/api.md") },
        { title: "Testing", href: workAssetByPath(workDirPath("sanjay", "ai-project-workflow"), "docs/testing.md") },
      ],
    },
    future: [
      "Validate real-model planning quality and tune the prompt/schema",
      "Add authentication and per-user project ownership",
      "Introduce Alembic migrations instead of recreating the database",
      "Plan export (Markdown/JSON) and a regenerate flow that preserves human edits",
      "GitHub OAuth-based auth, issue templates and status sync back to tasks",
      "Plan versioning/diffing and richer dashboards (charts, burndown)",
      "Containerize the app for easy deployment",
    ],
  },
  {
    ...work("deep-research-multi-agent-system", "subhraneel", "AI Engineer", "deep-research-multi-agent-system"),
    title: "Deep Research Multi-Agent System",
    tagline: "Planning, retrieval, critique and citation-aware synthesis — autonomous evidence-backed research reports.",
    status: "Internally developed · LangGraph system",
    categories: ["Advanced AI / RAG", "Multi-Agent Systems", "Research Automation"],
    industries: ["Enterprise Knowledge Workflows", "Research Automation", "Analyst Teams"],
    stackTags: ["LangGraph", "Exa", "Firecrawl", "litellm", "FastAPI", "Next.js"],
    quoteService: "AI Agent / Multi-Agent",
    problem: [
      "Complex research questions demand more than a single chatbot answer — they need structured, evidence-backed reports with traceable sources.",
      "Manual research doesn't scale, and black-box answers can't be validated, cited or trusted for analyst and knowledge-work contexts.",
    ],
    solutionIntro:
      "We built a multi-agent deep research system with LangGraph that autonomously transforms complex research questions into structured, evidence-backed reports with claim-level traceability.",
    solution: [
      "The system decomposes a question into research tasks, searches and fetches sources with Exa and Firecrawl, scores and organizes evidence by quality, analyzes each sub-question, and runs a critique agent that flags unsupported claims, missing evidence, contradictions and research gaps.",
      "When research is insufficient, it performs bounded follow-up research before synthesizing the final report. Every claim links back to specific evidence IDs and source URLs, and live progress is streamed to a Next.js frontend over SSE.",
    ],
    capabilities: [
      { title: "Intent understanding", desc: "Extracts target URL, entity, objective, domain, scope, constraints and expected output from the question." },
      { title: "Planning agent", desc: "Decomposes the objective into researchable sub-questions and a research strategy." },
      { title: "Task generation", desc: "Converts each sub-question into a concrete research task with an executable search query." },
      { title: "Search & fetch", desc: "Exa for search, Firecrawl for page content, plus direct fetch of a provided target URL as primary evidence." },
      { title: "Evidence store", desc: "Normalizes, deduplicates and queries evidence with quality scores (relevance 35%, freshness 25%, author 20%, content 20%)." },
      { title: "Analyst agent", desc: "Answers each sub-question from the top-N evidence by quality score with inline citations." },
      { title: "Critique agent", desc: "Checks unsupported claims, missing evidence, weak sources, contradictions and research gaps; generates real follow-up queries." },
      { title: "Synthesis agent", desc: "Produces a final report with claim-level evidence IDs, references, confidence scores, limitations and executive summary." },
      { title: "Real-time streaming", desc: "SSE events broadcast intent, planning, tasks, search, analysis, critique, follow-up and synthesis as they happen." },
    ],
    workflow: [
      { title: "Understand intent", desc: "Extract target URL, entity, objective, domain, scope, constraints and expected output." },
      { title: "Plan", desc: "Decompose the objective into sub-questions and a research strategy." },
      { title: "Generate tasks", desc: "Turn sub-questions into concrete research tasks with search queries." },
      { title: "Search & fetch", desc: "Run Exa search, fetch top pages with Firecrawl, and store quality-scored evidence." },
      { title: "Analyze", desc: "Answer each sub-question from the top-N evidence items with inline citations." },
      { title: "Critique", desc: "Review all analyses for unsupported claims, missing evidence, weak sources, contradictions and gaps." },
      { title: "Follow up", desc: "If research is insufficient and loops remain, run follow-up searches, append evidence and re-analyze." },
      { title: "Synthesize", desc: "Produce the final structured report with traceable claims, references and confidence scores." },
    ],
    technology: [
      { layer: "Orchestration", items: ["LangGraph 1.2.11", "RetryPolicy (3 attempts) on graph nodes"] },
      { layer: "Backend", items: ["Python", "FastAPI", "Pydantic 2.13", "Uvicorn"] },
      { layer: "LLM", items: ["gpt-4o-mini via litellm 1.96.2 with structured response_format"] },
      { layer: "Search & retrieval", items: ["Exa (exa-py)", "Firecrawl (firecrawl-py)"] },
      { layer: "Frontend", items: ["Next.js 16.3.1", "React 19", "Tailwind v4", "@microsoft/fetch-event-source (SSE)"] },
      { layer: "Testing", items: ["pytest — 70 tests in ~5s, fully mocked"] },
    ],
    validation: {
      summary:
        "A 70-test suite (all mocked — no real API calls) verifies every node, the evidence store, source scoring and the full chat pipeline.",
      bullets: [
        "Intent (6) — URL detection, objective/domain/scope extraction",
        "Planning (4) and task generation (4) — sub-question decomposition",
        "Search & fetch (5) — Exa + Firecrawl integration points",
        "Analyst (5) — evidence-grounded answers with citations",
        "Critique (6) — quality review and routing decisions",
        "Follow-up search (3) — incremental evidence append without data loss",
        "Synthesis (4) — report generation with traceable claims",
        "Evidence store (14) — ingest, query, dedup and indexing (pure logic)",
        "Source scoring (15) — scoring components and composite math (pure logic)",
        "Chat endpoint (4) — async integration tests for POST /chat",
        "Retry on parse errors — nodes self-retry with a 3-attempt policy",
      ],
      security: [
        "API keys read only from the environment (EXA_API_KEY, FIRECRAWL_API_KEY, LLM keys)",
        "Pydantic output models constrain every LLM response; invalid responses are rejected and retried",
        "Unsupported evidence IDs are stripped during synthesis post-processing",
        "Evidence is deduplicated and deterministically keyed (source_url + task_id hash)",
      ],
      limitations: [
        "Requires real API keys for live unrestricted research (Exa, Firecrawl, LLM)",
        "Bounded to a single follow-up research iteration by design",
        "Report quality is bounded by search coverage and source quality scoring",
        "Synthesis export is currently JSON/Markdown; PDF/DOCX formatters are a future step",
      ],
    },
    demo: {
      intro: "Watch the pipeline unfold in real time — from intent extraction through critique and synthesis, with SSE progress in the frontend.",
      sources: [
        { src: workAssetByPath(workDirPath("subhraneel", "deep-research-multi-agent-system"), "demo of the multi agent system.mp4"), label: "The complete research pipeline — planning, retrieval, critique, follow-up and synthesis" },
      ],
      poster: workAssetByPath(workDirPath("subhraneel", "deep-research-multi-agent-system"), "Screenshot 2026-08-19 at 1.59.44\u202fAM.png"),
      note: "The main demo shows the complete research flow end to end.",
    },
    screenshots: [
      { src: workAssetByPath(workDirPath("subhraneel", "deep-research-multi-agent-system"), "Screenshot 2026-08-19 at 1.59.23\u202fAM.png"), alt: "Deep research system — planning stage with sub-questions", caption: "Planning stage" },
      { src: workAssetByPath(workDirPath("subhraneel", "deep-research-multi-agent-system"), "Screenshot 2026-08-19 at 1.59.32\u202fAM.png"), alt: "Deep research system — evidence and analysis view", caption: "Evidence & analysis" },
      { src: workAssetByPath(workDirPath("subhraneel", "deep-research-multi-agent-system"), "Screenshot 2026-08-19 at 1.59.44\u202fAM.png"), alt: "Deep research system — final synthesized report with references", caption: "Synthesized report" },
    ],
    architecture: {
      src: workAssetByPath(workDirPath("subhraneel", "deep-research-multi-agent-system"), "high-level-architecture.png"),
      alt: "Multi-agent research architecture: user question through intent, planning, tasks, search/fetch, analyst, critique and synthesis to the final report",
      caption: "START → intent → planning → tasks → search & fetch → analyst → critique → (follow-up loop) → synthesis → END.",
    },
    future: [
      "PDF and DOCX report export formatters",
      "Parallel fan-out across research tasks",
      "Pluggable search and fetch backends",
      "Human-in-the-loop review at the critique stage",
      "Deeper evidence deduplication and per-claim confidence tuning",
    ],
  },
];

export function getWork(slug: string): PortfolioWork | undefined {
  return WORKS.find((item) => item.slug === slug);
}

export function getRelatedWorks(slug: string, count = 3): PortfolioWork[] {
  const current = getWork(slug);
  if (!current) return [];
  const rest = WORKS.filter((item) => item.slug !== slug);
  const order = ["ai-contract-risk-analyser", "security-log-anomaly-detection", "ai-data-analyst-bi-agent", "nl-to-sql-analytics-assistant", "ai-project-workflow-automation", "deep-research-multi-agent-system"];
  rest.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
  return rest.slice(0, count);
}

export const ALL_SLUGS = WORKS.map((item) => item.slug);