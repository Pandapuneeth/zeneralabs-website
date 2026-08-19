# Natural Language → SQL Analytics Assistant — LinkedIn Content Pack

Site: https://zeneralabs.in/portfolio/nl-to-sql-analytics-assistant
Positioning: internally developed prototype. State limitations (LLM key required, single schema, SQL-only execution boundary).

---

## Post 1 — Problem / Insight

**Format:** Text post. No asset.

> The real bottleneck in most companies isn't data — it's *access to it*.
>
> Business users ask questions like "what's the revenue trend?" and either wait on a data team, or get handed a dashboard that only answers the questions someone already predicted.
>
> Writing SQL is a skill most stakeholders don't have and shouldn't need. But the alternative — letting an LLM run loose on a production database — is a security dream nobody should sign off on.
>
> The tension: *natural-language data access* vs *safe database access*.
>
> At Zenera Labs we built a reference implementation that refuses to choose. Plain-English questions → validated SQL → read-only execution → grounded answers. We'll share how the guardrails work in the next posts.

#DataAnalytics #SQL #BusinessIntelligence #AI

---

## Post 2 — Architecture / Guardrails

**Format:** Graphic post. Attach: `arch.png`.

> The design principle we care most about: **the LLM is never treated as a security boundary.**
>
> Here's the defense-in-depth stack for an NL→SQL system:
>
> 1. **Prompt rules** — strict instructions plus a schema boundary.
> 2. **Schema discovery** — the system introspects live tables, joins and keys, then selects only the tables relevant to the question.
> 3. **AST-based SQL validation** — sqlglot parses every query and rejects destructive, malformed, multi-statement or unauthorized queries.
> 4. **Read-only execution role** — validated SQL runs as a SELECT-only PostgreSQL user (default 10s timeout, 1,000-row cap).
> 5. **Grounded explanations** — the LLM summarizes only the returned rows; it can't invent metrics.
>
> The result: business users get answers *and* the database stays safe, even when the model hallucinates a dangerous query — because it's killed before it ever reaches the DB.

#SecurityByDesign #LLM #PostgreSQL #DataEngineering

---

## Post 3 — Demo Clip

**Format:** Video post. Attach: `demo-video-nl-sql.mp4` (poster `Screenshot 2026-08-15 114220.png`).

> Watch a business question become a query, safely.
>
> In the demo: "revenue question" in plain English → schema discovery → validated SQL → executed read-only → a $8,400,050.00 answer you can actually verify.
>
> And the failure paths demonstrated in our tests: DELETE, DROP, multi-statement and cross-schema queries are all rejected before execution, and the UI explains errors without leaking SQL or table names.
>
> 130 tests. 129 passing. 1 skipped — the one that needs a live database.
>
> Full walkthrough on the portfolio.

#Demo #DataAnalytics #AI

---

## Post 4 — Technical Lesson

**Format:** Long-form text.

> "Just prompt it not to write DELETE" is not a SQL safety strategy.
>
> Three things we learned building NL→SQL with real guardrails:
>
> **1. Validate the AST, not the string.** Parsing to a syntax tree (sqlglot) and walking it for destructive statements is far more reliable than keyword blacklists — which are trivial to bypass with comments, aliases or formatting.
>
> **2. Enforce at the database, not in the prompt.** Even with perfect validation, the execution account is a dedicated SELECT-only role with row and timeout limits. Defense in depth means the last line of defense isn't the AI at all.
>
> **3. Reference, don't invent.** Explanations are locked to the returned rows. That one rule removes most hallucinated metrics.
>
> Realty check: an open-ended question still needs a real LLM key, we scope to a single first-party schema, and explanation quality is bounded by the data and model.

#LLM #SQL #Guardrails #Engineering

---

## Post 5 — Business Use Case

**Format:** Text/Carousel. Attach `Screenshot 2026-08-12 204403.png`.

> Who benefits when analytics speaks plain English?
>
> **Executives & managers** — ask strategy questions without ticket queues.
> **Ops & finance** — self-service numbers, verified by the actual query.
> **Data teams** — fewer ad-hoc requests, more time for models and pipelines.
>
> And because every answer ships with its SQL and its explanation, nobody has to take the AI on faith.
>
> We can build this pattern against *your* schema, for your teams, with the same guardrails. DM or use the CTA on the case study.

#AnalyticsAutomation #SelfServiceBI #AIForBusiness