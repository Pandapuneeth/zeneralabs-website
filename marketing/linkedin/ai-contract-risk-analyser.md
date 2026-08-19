# AI Contract Analysis & Risk Detection — LinkedIn Content Pack

Site: https://zeneralabs.in/portfolio/ai-contract-risk-analyser
Positioning: internally developed prototype demonstrating Zenera Labs' document-intelligence capability.
Rules: never say "client"; state limitations; don't overclaim.

---

## Post 1 — Problem / Insight

**Format:** Text post. Attach: `landing-page.png`.

> Contract review is one of the least-automated, highest-value tasks in legal and procurement work.
>
> A reviewer has to manually read dense documents to spot: one-sided termination and renewal clauses, ambiguous liability or IP language, unfair governing law, and payment risk. Every miss is exposure. Every hour is billable time.
>
> The problem was never "there isn't a tool" — it's that most tools can't trace *why* a risk was flagged.
>
> So at Zenera Labs we built a reference implementation that treats traceability as a first-class requirement: upload a contract, get findings, and inspect the exact page, section and passage behind every risk call.
>
> We call this "evidence-backed document review" — the AI proposes, the human decides.
>
> Reading the doc at links below. Building for your team as well? DM us.

#AI #LegalTech #DocumentIntelligence #ContractManagement #ZeneraLabs

---

## Post 2 — Architecture

**Format:** Photo/graphic post. Attach: `architecture.png`.

> How we built a contract-risk engine on a 12-category detection model.
>
> The design keeps a human at the end of every step:
>
> 1. **Upload + validation** — drag-and-drop PDF; type, size and MIME checks before processing.
> 2. **Page-preserving extraction** — pdfplumber keeps page boundaries so citations stay honest.
> 3. **Normalization + chunking** — clause-aware chunks (500 / overlap 100) for reliable retrieval.
> 4. **Vector indexing** — ChromaDB with all-MiniLM-L6-v2 embeddings.
> 5. **Risk detection** — 12 predefined categories across termination, renewal, indemnification, liability, IP, confidentiality, law, payment and privacy.
> 6. **Evidence verification** — every finding links to its source page, section and chunk with a severity level and confidence.
>
> A retrieval-based Q&A lets reviewers ask follow-up questions and get answers that cite the source — not vibes.
>
> The full walkthrough is on our portfolio. Not legal advice — this is an analysis aid. The human reviewer stays in the loop.

#Architecture #LLM #RAG #LangChain #DocumentAI

---

## Post 3 — Demo Clip

**Format:** Video post (under 3 min). Attach: `demo-video.mp4`.

> 60 seconds of a contract-risk walkthrough — no cuts.
>
> What you'll see:
> - A contract PDF dropped into the uploader
> - Automatic clause identification and chunking
> - Risk findings across 12 categories with severity
> - Evidence inspection: the exact passage behind a HIGH-severity flag
> - A Q&A that answers with source citations
>
> Notice what's *not* there: a black box. Every finding is traceable to the document.
>
> For legal teams, procurement and HR the shift is simple: first pass in minutes instead of hours, with the human still making the final call.

#Demo #LegalTech #Automation #AI

---

## Post 4 — Technical Lesson

**Format:** Text/Long-form. No asset needed (or reuse screenshot).

> Three lessons from building a contract-risk engine that didn't trust its own output.
>
> **1. Split instructions from content at every layer.** We treated the instruction/query separation as a security boundary — the system prompt, the document content and the user question are structurally separated to blunt prompt injection.
>
> **2. Traceable > impressive.** We'd rather return "HIGH risk, §3.7, evidence here, 91% confidence" than a confident but unverifiable summary. Severity (HIGH/MEDIUM/LOW) is driven by financial and legal exposure, and every finding carries its source.
>
> **3. Test the failure paths hardest.** Our 32-test suite covers path traversal, malicious filenames, oversized uploads, prompt injection and sensitive-data leakage — because document tools ingest untrusted content by definition.
>
> Limitation we state plainly: analysis is scoped to the 12 predefined categories and the uploaded document, and LLM output should always be human-verified.

#LLM #Security #RAG #EngineeringLessons

---

## Post 5 — Business Use Case

**Format:** Carousel (4 slides) or text. Attach screenshots: `low-risk-output.png`, `high-risk-output.png`, `high-risk-output-2.png`.

> Where a system like this changes workflows fast:
>
> **Procurement** — one-sided renewal and termination terms flagged before signature.
> **HR** — employment and vendor agreements screened for IP and confidentiality gaps.
> **Legal ops** — first-pass review at scale, freeing reviewers for negotiation.
> **Compliance** — data-privacy and governing-law risks surfaced consistently, every time.
>
> The pattern we're proud of: an MVP that runs from a PDF all the way to a Pydantic-validated, severity-ranked, evidence-linked analysis — 32 tests, Docker-ready, and honest about its limits.
>
> If your team processes contracts in volume, we should talk.

#Procurement #HRTech #Compliance #EnterpriseAI