# Zenera Labs Capability / Portfolio Deck

**Purpose:** Sales calls, proposals, channel partners. One link + one deck should answer "what can Zenera build?" Build in Google Slides or Canva (16:9). Slide visuals come from the real assets under `public/works/`.

**Positioning line (cover + closing):**
*Zenera Labs Engineering Portfolio — internally developed systems demonstrating our capabilities in AI automation, analytics, cybersecurity and intelligent software. All projects are reference implementations, not client work.*

**House rules in this deck:** never say "client project"; always show limitations; always end slides with the "Request Similar Solution" CTA.

---

## Slide 1 — Cover

- Eyebrow: ZENERA LABS ENGINEERING PORTFOLIO
- Title: Selected AI Solutions · Internally Built, Production-Shaped
- Subtitle: AI automation · Analytics · Document intelligence · Cybersecurity · Multi-agent research
- Visual: 2×3 thumbnail mosaic of the six project covers (landing/dashboard/soc screenshots).
- CTA: 'Portfolio → zeneralabs.in/portfolio' / 'Talk to us → zeneralabs.in'

## Slide 2 — Index / How to read this deck

- Line: "Each slide is one working system. Every claim below is backed by tests and a live demo video in the online case study."
- Tabular mini-index: project → category → stack recaps (6 rows).
- Trust strip: test counts (32 + 130 + 38 + 70 + continuous suites) · Docker-ready · MVP scope stated per project.

---

## Slide 3 — AI Contract Analysis & Risk Detection

- Category chips: Document Intelligence · AI Automation · Enterprise Software
- Value line: "Faster document review with traceable evidence."
- Hero visual: `public/works/naman/ai-contract-risk-analyser/high-risk-output-2.png` (evidence view).
- Capabilities bullets:
  - PDF upload → 12-category risk detection (termination, renewal, indemnification, liability, IP, confidentiality, law, payment…)
  - Evidence tracing: every finding links to page, section and chunk + severity + confidence
  - Retrieval Q&A with source citations
  - Security: path-traversal, injection and leak defences; Docker-ready
- Industries: Legal · Procurement · HR · Enterprise Automation
- Stack: FastAPI · React 18 · ChromaDB · sentence-transformers · OpenRouter · Docker
- Validation: 32 tests (unit / integration / security / edge cases)
- Limitation line: "Analysis assistant, not legal advice, scoped to the uploaded document and 12 predefined categories."
- CTA: Request Similar Solution → zeneralabs.in/contact?service=AI%20Document%20/%20PDF%20System

## Slide 4 — Natural Language → SQL Analytics Assistant

- Category chips: Analytics Automation · LLM Guardrails · Data Access
- Value line: "Ask business data questions in plain English — safe, validated SQL with grounded explanations."
- Hero visual: `public/works/naman/nl-to-sql/Screenshot 2026-08-12 204403.png`
- Capabilities bullets:
  - Live schema discovery + relevance-based table selection
  - AST-based SQL validation (sqlglot): destructive / multi-statement / cross-schema queries rejected
  - Read-only execution role with 10s timeout + 1,000-row cap
  - Grounded explanations locked to returned rows; structured logging
- Industries: Data Teams · Analytics Automation · Non-Technical Business Users
- Stack: FastAPI · PostgreSQL 16 · sqlglot · React 18 · Docker · nginx
- Validation: 130 tests (129 passing, 1 needs live DB): success, failure, security rejections, sanitization
- Limitation line: "Open-ended questioning requires a real LLM key; single first-party schema in this MVP."
- CTA: Request Similar Solution → zeneralabs.in/contact?service=AI%20Business%20Assistant

## Slide 5 — SentinelAI · Security Log Anomaly Detection

- Category chips: Security Analytics · Detection Engineering · SOC Platform
- Value line: "Risk-scored alerts from security events — a Mini-SIEM that explains itself."
- Hero visual: `public/works/pragna/PAGE 10.png` (SOC dashboard)
- Capabilities bullets:
  - Auth-log ingestion (POST /log) → rule + Isolation Forest + behavioural baseline hybrid scoring
  - Composite risk ≥ 80 fires MITRE ATT&CK-mapped alerts
  - Correlation engine: credential stuffing, account takeover, insider threat, impossible travel
  - Threat-enrichment feeds + SHAP explainability + RBAC dashboard (ADMIN/ANALYST/VIEWER)
- Industries: Cybersecurity · SOC Operations · Enterprise Security
- Stack: FastAPI · scikit-learn · SHAP · SQLite · React 18 · JWT + RBAC · Docker
- Validation: 38 backend unit tests + phase reports, demo scripts and a release audit
- Limitation line: "Demo-scale storage (SQLite) and a bundled/mock IOC feed; PostgreSQL + external feeds on the roadmap."
- CTA: Request Similar Solution → zeneralabs.in/contact?service=Custom%20AI%20Solution

## Slide 6 — AI Data Analyst & Business Intelligence Agent

- Category chips: Business Intelligence · Data Analytics · LLM Interpretation
- Value line: "Evidence-grounded business intelligence from spreadsheets — analytics computes, AI interprets."
- Hero visual: `public/works/priyanka/ai-data-analyst-bi-agent/Visualization.png`
- Capabilities bullets:
  - CSV/XLSX ingest → validate → clean → profile (data dictionary + quality log)
  - Deterministic metrics (revenue, profit, AOV, margin, breakdowns) with Pandas/NumPy
  - Plotly visualizations; natural-language questions answered from an evidence bundle
  - Insights + recommendations; ReportLab PDF export
- Industries: BI & Analytics · Management Reporting · Business Operations
- Stack: Streamlit · Pandas · NumPy · Plotly · OpenAI API · ReportLab · Pytest
- Validation: happy-path, failure/edge-case and numerical-correctness testing; example-question suite
- Limitation line: "MVP focuses on structured business datasets; forecasting/anomaly detection are stretch features."
- CTA: Request Similar Solution → zeneralabs.in/contact?service=Predictive%20ML%20System

## Slide 7 — AI Project & Workflow Automation Agent

- Category chips: Project Planning · Workflow Automation · LLM Agents
- Value line: "Turn project briefs into actionable delivery plans — AI plans, humans approve."
- Hero visual: `public/works/sanjay/ai-project-workflow/dashboard.png`
- Capabilities bullets:
  - Natural-language brief → structured, Pydantic-validated ProjectPlan (requirements, modules, tasks, priorities, statuses, acceptance criteria, dependency edges)
  - Dashboard review/edit with "AI-generated, editable" labelling; edits persist
  - Optional GitHub issue export after explicit confirmation
  - Deterministic fallback planner enables offline end-to-end testing
- Industries: Delivery Operations · Project Management · Internal Workflow Automation
- Stack: React 19 · Vite 8 · FastAPI · Gemini (google-genai) · Pydantic v2 · SQLAlchemy · SQLite
- Validation: full suite covering schemas, API errors (404/422/502/503, no stack traces), fallback planner, end-to-end GitHub export
- Limitation line: "Single-user, no auth (by design); real Gemini quality needs a live key + prompt tuning."
- CTA: Request Similar Solution → zeneralabs.in/contact?service=Workflow%20Automation

## Slide 8 — Deep Research Multi-Agent System

- Category chips: Advanced AI / RAG · Multi-Agent Systems · Research Automation
- Value line: "Planning, retrieval, critique and citation-aware synthesis — evidence-backed research reports."
- Hero visual: `public/works/subhraneel/deep-research-multi-agent-system/Screenshot 2026-08-19 at 1.59.44 AM.png`
- Capabilities bullets:
  - Intent → planning → tasks → Exa/Firecrawl search-fetch → quality-scored evidence store (relevance 35% / freshness 25% / author 20% / content 20%)
  - Analyst sub-answers with inline citations; critique agent flags gaps and triggers bounded follow-up
  - Synthesized report with claim-level evidence IDs, references, confidence scores; SSE live streaming to a Next.js UI
- Industries: Enterprise Knowledge Workflows · Research Automation · Analyst Teams
- Stack: LangGraph 1.2.11 · FastAPI · gpt-4o-mini via litellm · Exa · Firecrawl · Next.js 16
- Validation: 70 mocked tests (~5s), every node + evidence store + scoring math + chat pipeline
- Limitation line: "Single follow-up iteration by design; real live research needs live API keys; JSON/Markdown export today."
- CTA: Request Similar Solution → zeneralabs.in/contact?service=AI%20Agent%20/%20Multi-Agent

---

## Slide 9 — Closing / CTA

- Title: "Have a similar workflow? Zenera Labs can build a custom version for your business."
- Proof recap strip: 4 working categories (Analytics · Document AI · Security · Multi-agent) + test counts + live demos.
- Primary CTA: See the full case studies → zeneralabs.in/portfolio
- Secondary CTA: Request a custom solution → zeneralabs.in/contact (choose your service + paste your problem)
- Partner note (for channel partners): forward this deck + portfolio link; Zenera handles delivery and can white-label.
- Footer: Prepared by Zenera Labs · Founder: Puneeth Punacha.

## Appendix — Partner / delivery cheat notes

- Every project pages to a full case-study with demo video, screenshots, architecture and documentation: link each deck slide's CTA or "case study" chip to `zeneralabs.in/portfolio/<slug>`.
- GitHub links: add to slides only when repositories are approved for public sharing (work in progress).
- Sales call tip: open the matching case-study's demo video live instead of showing static slides when possible.