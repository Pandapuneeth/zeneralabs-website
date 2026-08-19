# Natural Language → SQL Analytics Assistant — Instagram Pack

## Carousel (7 slides) — "Ask your data in plain English"

Visuals: `Screenshot 2026-08-12 204403.png`, `Screenshot 2026-08-15 114220.png`, `Screenshot 2026-08-15 114211.png`, `arch.png`, demo frames.

1. **Cover — HOOK**
   "'What's our revenue trend?' — answered in plain English, run as safe SQL."
   Visual: chat UI crop + headline.
2. **The problem**
   "Dashboards only answer the questions someone predicted."
   Visual: split — predefined dashboard vs typed question.
3. **How it works**
   "Question → schema discovery → SQL → validated → executed read-only → grounded answer."
   Visual: `arch.png` single-line mini-diagram.
4. **The guardrail**
   "The LLM is never the security boundary: AST validation + a SELECT-only DB role kill destructive queries."
   Visual: "DELETE … ✗ REJECTED" mock callout.
5. **Verified answers**
   "A revenue question → SUM(quantity × unit_price) → $8,400,050.00. Checkable, not hallucinated."
   Visual: result card with the SQL visible.
6. **Failure handled**
   "Invalid SQL, unknown tables, API errors — clean responses, no leaked internals."
   Visual: error-state UI example (from tests).
7. **CTA**
   "Self-service analytics for your team → zeneralabs.in/portfolio/nl-to-sql-analytics-assistant"
   Visual: end-card.
   Objection handle in caption: "Requires a real LLM key; scoped to our first-party schema in this MVP."

**Caption:**
Analytics in plain English — with guardrails that treat the model as a component, not a boundary. Internally built at Zenera Labs. 130 tests, 129 passing.

Hashtags: #SQL #DataAnalytics #SelfServiceBI #LLM #ZeneraLabs

## Reel (30s) — "Ask → SQL → answer"

Source: `demo-video-nl-sql.mp4`

Shot list:
- 0:00–0:06 hook: type "what was our total revenue?" into the chat.
- 0:06–0:14 show live stages: schema discovery → SQL generation → validation tick.
- 0:14–0:24 generated SQL flashes past, then the executed result ($8,400,050.00) + grounded explanation.
- 0:24–0:30 end card: "Safe natural-language analytics. Zenera Labs Engineering Portfolio."

On-screen captions for each stage; upbeat pacing; link in bio.