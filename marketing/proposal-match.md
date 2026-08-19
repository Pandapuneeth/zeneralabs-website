# Proposal-Matching Quick Guide — Portfolio pieces per Sales Service

> Rule from the handoff (§5): "Proposals reference only the 1–3 portfolio pieces closest to the prospect's requirement." Use this map to pick pieces fast.

## Site services → closest portfolio pieces

| Prospect asks for (site service) | Closest portfolio pieces (slug → case study) | Why / talking points |
| :-- | :-- | :-- |
| **AI & ML Automation** (chatbots, predictive models, pipelines) | `deep-research-multi-agent-system`, `ai-project-workflow-automation` | Agent orchestration + workflow automation; LLM-pipeline proof |
| **Web Development** (React/Next.js sites) | `deep-research-multi-agent-system` (Next.js 16 UI, SSE streaming) | Modern React/Next frontend work with streaming UX |
| **Full Stack Flutter Apps** | none direct — use `ai-data-analyst-bi-agent` (Streamlit) as product-style app + `deep-research` backend pattern | Show a complete user-facing app + robust API backend skills |
| **Backend Systems** (Node/Python/PostgreSQL/Docker) | `nl-to-sql-analytics-assistant`, `ai-contract-risk-analyser`, `security-log-anomaly-detection` | FastAPI + PostgreSQL + Docker + security-hardened APIs |
| **AI Document / PDF System** | `ai-contract-risk-analyser` (primary); `ai-data-analyst-bi-agent` (report/PDF export) | Extraction, chunking, retrieval, citation, PDF export |
| **AI Business Assistant** | `nl-to-sql-analytics-assistant`, `ai-data-analyst-bi-agent` | Question→answer over business data with grounded evidence |
| **Custom AI Solution** | `security-log-anomaly-detection`, `ai-contract-risk-analyser` | Full custom product incl. domain logic, ML, dashboards, RBAC |
| **Predictive ML System** | `security-log-anomaly-detection` (Isolation Forest + SHAP), `ai-data-analyst-bi-agent` (forecasting roadmap) | Anomaly/behavioural ML + explainability; analytics forecasting adjacent |
| **Workflow Automation** | `ai-project-workflow-automation` (primary); `deep-research-multi-agent-system` | Brief→structured plan + ticket export; agent-driven processes |
| **AI Agent / Multi-Agent** | `deep-research-multi-agent-system` (primary); `ai-project-workflow-automation` | LangGraph orchestr., critic loop, structured output, SSE |
| **Final Year Project Support** | `deep-research-multi-agent-system`, `security-log-anomaly-detection`, `nl-to-sql-analytics-assistant` | Well-documented, test-backed systems ideal as reference builds + docs/research reports |

## Quick decision helper

- Prospect has **documents / PDFs** → `ai-contract-risk-analyser` first; `ai-data-analyst-bi-agent` for report/PDF export.
- Prospect has **databases / dashboards** → `nl-to-sql-analytics-assistant` (BI questions) or `ai-data-analyst-bi-agent` (spreadsheets).
- Prospect works in **security / SOC** → `security-log-anomaly-detection`.
- Prospect wants **internal ops automation** → `ai-project-workflow-automation`.
- Prospect wants **deep research / knowledge workflows** → `deep-research-multi-agent-system`.

## How to reference a piece in a proposal (template)

> "Zenera Labs recently built an internally developed reference system: [project name] ([1-line value]). It demonstrates our capability in [capability] — live case study and demo: zeneralabs.in/portfolio/<slug>. We would build a custom version tailored to your requirements, with the same [security/testing/evidence] discipline."

## Position language to reuse (never "client project")

- "Zenera Labs Engineering Portfolio"
- "Internally developed"
- "Reference implementation"
- "Prototype / MVP (state status as shown on the case study)"
- "Selected AI Solution"