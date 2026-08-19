# Deep Research Multi-Agent System — LinkedIn Content Pack

Site: https://zeneralabs.in/portfolio/deep-research-multi-agent-system
Positioning: internally developed LangGraph system. State boundary of single follow-up iteration, real API keys required.

---

## Post 1 — Problem / Insight

**Format:** Text post. No asset.

> "Just ask the chatbot" is not how research works.
>
> A serious research question deserves: a plan, sources you can verify, claims you can trace, gaps someone actually checked, and a synthesis that cites everything.
>
> A single chatbot reply gives you none of that.
>
> At Zenera Labs we built a **multi-agent deep research system** with LangGraph that automates what a good analyst does: decompose the question → plan sub-questions → search and fetch → score evidence → analyze → *critique its own work* → do bounded follow-up research → synthesize with claim-level citations.
>
> The result: evidence-backed research reports with traceable claims — not vibes with footnotes.

#AI #MachineLearning #Research #LLMAgents

---

## Post 2 — Architecture

**Format:** Graphic post. Attach `high-level-architecture.png`.

> Inside our Deep Research agent graph:
>
> START → **intent** (extract target URL, entity, objective, domain, scope, constraints) → **planning** (decompose into sub-questions) → **tasks** (executable search queries) → **search & fetch** (Exa search, Firecrawl page fetch) → **evidence store** (normalized, deduplicated, quality-scored: relevance 35% / freshness 25% / author 20% / content 20%) → **analyst** (answers each sub-question from top-N evidence with inline citations) → **critique** (unsupported claims, missing evidence, weak sources, contradictions, gaps) → **bounded follow-up** → **synthesis** (structured report, traceable claims, references, confidence scores).
>
> Orchestrated in LangGraph 1.2.11 with a 3-attempt retry policy, gpt-4o-mini via litellm, and live SSE progress streaming to a Next.js frontend.
>
> 70 mocked tests in ~5s — no real API calls, every node covered.

#MultiAgent #LangGraph #RAG #AIResearch

---

## Post 3 — Demo Clip

**Format:** Video post. Attach `demo of the multi agent system.mp4`; secondary `ai video.mp4` (poster `Screenshot 2026-08-19 at 1.59.44 AM.png`).

> Watch research happen in real time — including the part where the AI criticizes itself.
>
> The demo streams the full lifecycle to the frontend over SSE: intent extraction → planning → task generation → search & fetch → analysis with citations → critique flagging gaps → bounded follow-up → final report with references.
>
> Two recordings on the case study: the complete pipeline, and the live streaming progress view.
>
> The part that matters for enterprise knowledge work: every claim in the final report maps back to specific evidence IDs and source URLs.

#Demo #ResearchAutomation #LLM

---

## Post 4 — Technical Lesson

**Format:** Long-form text.

> The most underrated agent component isn't the tool use — it's the **critic**.
>
> Three lessons from building Deep Research:
>
> **1. Score evidence before you trust it.** A quality score (relevance 35%, freshness 25%, author 20%, content 20%) drives which sources an analyst sub-answer leans on — blind "top 5 search hits" is a great way to cite SEO spam.
>
> **2. A self-critique pass catches what generation can't.** The critique agent isn't for show: it validates the synthesis for unsupported claims, weak sources and contradictions, and can actually trigger bounded follow-up queries instead of silently glossing over gaps.
>
> **3. Traceability survives through post-processing.** Unsupported evidence IDs are stripped during synthesis so the final report never cites evidence that isn't there; evidence is deduplicated and deterministically keyed by source URL + task ID.
>
> Boundaries we set: a single follow-up iteration by design, fully mocked offline tests, and JSON/Markdown export today (PDF/DOCX on the roadmap).

#MultiAgent #LLM #Engineering #RAG

---

## Post 5 — Business Use Case

**Format:** Text/Carousel. Attach `Screenshot 2026-08-19 at 1.59.23 AM.png` + `Screenshot 2026-08-19 at 1.59.32 AM.png`.

> Where multi-agent research changes workflow economics:
>
> - **Analyst teams** — first-pass landscape research with sources to verify, not slides of unsourced claims.
> - **Enterprise knowledge workflows** — turn "summarize what's out there" into cited, confidence-scored briefs.
> - **Engineering research** — architecture/competitor/paper surveys that cite their sources.
> - **Compliance & diligence-adjacent asks** — traceable evidence trails beat assertions.
>
> Everything is streamed live, so users watch the research as it happens — no black box.

#AnalystTools #EnterpriseAI #ResearchAutomation