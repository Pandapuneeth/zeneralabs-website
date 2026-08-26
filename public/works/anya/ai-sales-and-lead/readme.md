# AI Sales and Lead Qualification Agent

An end-to-end system that turns unstructured inbound project enquiries into structured, explainable, CRM-ready sales records — automatically scored, classified (Hot/Warm/Cold), explained, and followed up with a personalized AI-drafted email — with a live analytics dashboard for the sales team.

This README documents the **entire project** (frontend form → n8n automation → AI scoring → Google Sheets storage → Gmail follow-up → Looker Studio dashboard). Anyone following it end-to-end, with no other context, should be able to stand the whole system up and run it.

See also:
- `Architecture_Diagram.md` — visual diagrams of the full system (component, sequence, and data-model views).
- `Validation_Test_Set.md` — a reproducible set of test scenarios (pass and fail cases) used to verify the system.

---

## 1. What this project does

1. A visitor fills out a **project enquiry form** (built with Bolt.new) describing who they are and what they need help with.
2. The form submits the data to an **n8n workflow** via webhook.
3. n8n logs the raw submission to **Google Sheets**, then hands it to an **AI Agent** (Google Gemini) which:
   - Extracts pain points and need points from the free-text description.
   - Computes a **Lead Score (0–100)** across four weighted criteria.
   - Classifies the lead **Hot / Warm / Cold** and marks it **Qualified / Disqualified / Needs Review**.
   - Explains its reasoning and flags any missing information instead of guessing.
   - Drafts a **personalized follow-up email**.
4. The AI's structured output is written back to Google Sheets and returned to the form as a JSON "CRM record."
5. n8n routes the lead by classification and sends the AI-drafted follow-up email via **Gmail**.
6. A **Looker Studio dashboard** reads the same spreadsheet live, giving the sales team a real-time view of lead volume, average score, classification mix, and service-category demand — with no manual reporting step.

---

## 2. System components

| Component | Technology | What it's for |
|---|---|---|
| Intake form | Bolt.new (React + Tailwind CSS + Lucide icons) | Public-facing enquiry form; the only thing a prospective lead interacts with. |
| Orchestration backend | n8n (workflow file: `AI_Sales_Agent.json`) | Wires together storage, AI scoring, routing, and email — no custom backend server needed. |
| AI reasoning | Google Gemini (`models/gemini-3.5-flash-lite`) via n8n's LangChain Agent node | Scores and classifies each lead, drafts a follow-up, and explains its output — constrained to a fixed JSON schema. |
| Data storage | Google Sheets (two tabs: `LeadIntakeDB`, `LeadScore`) | System of record for every submission and its AI analysis. |
| Notification | Gmail (OAuth2) | Sends the AI-drafted follow-up email to the lead. |
| Reporting | Looker Studio (Google Data Studio) | Live dashboard reading directly from the `LeadScore` sheet. |

A full diagram of how these connect is in `Architecture_Diagram.md`.

---

## 3. Prerequisites

Before setting anything up, you'll need:

1. **A Bolt.new account** (or any static-hosting alternative) to deploy the intake form — or you can adapt the same form markup to any React/HTML hosting of your choice.
2. **An n8n instance** (self-hosted or n8n Cloud) with these node packages available:
   - `n8n-nodes-base` (core — Webhook, Code, Google Sheets, Gmail, Switch, Respond to Webhook)
   - `@n8n/n8n-nodes-langchain` (AI Agent, Gemini Chat Model, Structured Output Parser)
3. **A Google Gemini API key** from [Google AI Studio](https://aistudio.google.com/app/apikey).
4. **A Google account** with:
   - Google Sheets API access (OAuth2)
   - Gmail API access (OAuth2)
5. **A Looker Studio (Google Data Studio) account**, connected to the same Google account, for the dashboard.
6. A way to send test HTTP requests (`curl`, Postman, or just the deployed form) — see `Validation_Test_Set.md` for ready-made test payloads.

---

## 4. Setup — step by step

### 4.1 Google Sheet (do this first — everything else references it)

Create one Google Sheet with **two tabs**, with headers exactly as below (column names are referenced verbatim by the n8n nodes, including the trailing space in "Email "):

**Tab 1 — `LeadIntakeDB`** (raw submissions, append-only)

`Lead ID`, `Timestamp`, `Name`, `Email ` *(trailing space)*, `Phone`, `Organisation`, `Service Category`, `Other Service`, `Project Title`, `Project Description`, `Budget`, `Timeline`, `Preferred Contact method`, `Additional Notes`, `Consent`

**Tab 2 — `LeadScore`** (AI-scored records, one row per lead, updated in place)

`Lead ID`, `Timestamp`, `Name`, `Email ` *(trailing space)*, `Phone`, `Service Category`, `Project Name`, `Project Details`, `Pain point`, `Need point`, `LeadScore`, `Classification`, `Qualification Status`, `Missing Information`, `Score breakdown`, `Reasoning`, `Recommended Action`, `Follow up subject`, `Follow up message`

Copy the spreadsheet's **ID** from its URL (the string between `/d/` and `/edit`) — you'll need it in step 4.3.

### 4.2 Import the n8n workflow

1. In n8n: **Workflows → Add workflow → Import from File**, select `AI_Sales_Agent.json`.
2. You'll see 12 nodes: `Webhook`, `Code in JavaScript`, `Append row in sheet`, `AI Agent`, `Google Gemini Chat Model`, `Structured Output Parser`, `Append or update row in sheet`, `Respond to Webhook`, `Switch`, and three Gmail nodes (`Send a message`, `Send a message1`, `Send a message2`).

### 4.3 Connect credentials and the spreadsheet

1. **Google Sheets nodes** (`Append row in sheet`, `Append or update row in sheet`): open each, set the **Document** to your spreadsheet, and the **Sheet** to `LeadIntakeDB` / `LeadScore` respectively. Create a Google Sheets OAuth2 credential if you don't already have one.
2. **Gmail nodes** (`Send a message`, `Send a message1`, `Send a message2`): create/select a Gmail OAuth2 credential (one credential can be reused across all three).
3. **Google Gemini Chat Model node**: create a credential using your Gemini API key. Confirm the model dropdown shows an available model — the workflow ships pointed at `models/gemini-3.5-flash-lite`; swap to another Gemini model if that one isn't enabled for your key/region.

### 4.4 Activate the workflow and get the webhook URL

1. Toggle the workflow **Active** (top-right of the n8n editor).
2. Open the `Webhook` node and copy the **Production URL** (e.g. `https://<your-n8n-domain>/webhook/lead-intake`). Use the **Test URL** shown in the same node while testing from the editor with "Listen for test event."

### 4.5 Deploy the intake form

1. In Bolt.new, build/deploy the project enquiry form (contact info, service category with an "Other" conditional field, project details, optional timeline/budget, preferred contact method, additional notes, consent checkbox).
2. Point the form's submit handler at the n8n **Production URL** from step 4.4, sending a `POST` with a JSON body shaped as described in §5 below.
3. Deploy/publish the Bolt.new project and note its public URL.

### 4.6 Connect the Looker Studio dashboard

1. In Looker Studio, create a new report and add a **Google Sheets** data source pointed at the same spreadsheet, **`LeadScore`** tab.
2. Add the visualizations you want — the reference dashboard includes: a scorecard for total lead count, a scorecard for average `LeadScore`, a histogram of `LeadScore` bucketed into ranges, a pie chart of `Classification` share, a bar chart of lead count by `Service Category`, and a data table of individual leads with `Classification`, `Qualification Status`, and `Recommended Action`.
3. Share the report (view access) with whoever on the sales team needs it. It updates automatically as new rows land in `LeadScore` — no manual refresh step required in normal use (Looker Studio caches for a short period; use **Refresh data** for an immediate pull).

---

## 5. Data contract

### Request the form sends to n8n

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91-9876543210",
  "organization": "Example Corp",
  "service": "Web Development",
  "otherService": "",
  "projectName": "Customer Portal Revamp",
  "projectDescription": "We need a redesigned customer portal with SSO and a new billing dashboard.",
  "budget": "$15,000 - $25,000",
  "timeline": "Within 6 weeks",
  "preferredContact": "Email",
  "additionalInformation": "Ready to start immediately, have engineering resources on our side too.",
  "consent": true,
  "submittedAt": "2026-08-22T10:00:00.000Z"
}
```

`name`, `email`, `service`, and `projectDescription` are effectively required for the AI to produce a meaningful assessment — every other field is optional and, if omitted, is flagged by the AI in `missing_information` rather than guessed at.

### Response the form receives back

```json
{
  "success": true,
  "crm_record": {
    "lead_id": "LEAD-20260822-4F3A1B2C",
    "created_at": "2026-08-22T10:00:03.512Z",
    "contact": { "name": "...", "email": "...", "phone": "...", "organization": "...", "preferred_contact": "..." },
    "project_scope": { "service": "...", "project_name": "...", "project_description": "...", "timeline": "...", "budget": "..." },
    "ai_qualification": {
      "lead_score": 82,
      "classification": "Hot",
      "qualification_status": "Qualified",
      "score_breakdown": { "scope_clarity_score": 26, "budget_alignment_score": 22, "urgency_timeline_score": 18, "intent_contact_score": 16 },
      "pain_points": ["..."],
      "need_points": ["..."],
      "missing_information": [],
      "reasoning": "...",
      "recommended_action": "..."
    },
    "sales_actions": { "email_subject": "...", "email_draft": "..." }
  }
}
```

### AI scoring rubric

| Criterion | Points | Measures |
|---|---|---|
| Scope & Clarity | 0–30 | Concrete project description, clear objectives, defined technical scope. |
| Budget Alignment | 0–25 | Explicit, realistic budget relative to the requested scope. |
| Urgency & Timeline | 0–20 | Realistic, near-term timeline or active milestone. |
| Contact Viability & Intent | 0–25 | Business-grade contact details, organization provided, consent given. |

**Classification tiers:** Hot = 80–100, Warm = 50–79, Cold = 0–49, each paired with a qualification status of `Qualified`, `Disqualified`, or `Needs Review`.

---

## 6. Testing the system

1. Deploy/confirm the n8n workflow is **Active**.
2. Either submit through the live form, or send a direct request:

```bash
curl -X POST "https://<your-n8n-domain>/webhook/lead-intake" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "service": "Web Development",
    "projectDescription": "We need a redesigned customer portal with SSO and a new billing dashboard.",
    "budget": "$15,000 - $25,000",
    "timeline": "Within 6 weeks",
    "preferredContact": "Email",
    "consent": true
  }'
```

3. Confirm: a `200 OK` JSON response; a new row in `LeadIntakeDB`; a new/updated row in `LeadScore`; an email delivered to the test address; the Looker Studio dashboard's totals updating.

For a full, reproducible set of scenarios (Hot/Warm/Cold examples plus deliberate failure cases like missing fields, malformed input, and spammy submissions), see **`Validation_Test_Set.md`**.

---

## 7. Customization

- **Prompt / scoring rubric / company identity**: edit the `systemMessage` and prompt `text` inside the `AI Agent` node. The company name/signature ("Synapse Labs" in the reference build) is hardcoded there — change it to your own.
- **Output schema**: if you add/remove fields the AI should return, update the JSON Schema in the `Structured Output Parser` node, and update every downstream reference to that field (Sheets column mapping, `Respond to Webhook` body, Gmail node parameters).
- **Per-tier email behavior**: the three Gmail nodes downstream of `Switch` currently send a similarly structured AI-drafted email regardless of tier. Edit each branch independently to add tier-specific behavior (e.g., only auto-email Hot leads, hold Cold leads for manual review, add a Slack notification for Hot leads).
- **Lead ID format**: controlled by the `Code in JavaScript` node (`LEAD-YYYYMMDD-<execution id>`).
- **Dashboard visuals**: add/edit charts directly in Looker Studio; all of them should point at the `LeadScore` tab.

---

## 8. Troubleshooting

| Symptom | Likely cause |
|---|---|
| Webhook returns 404 | Workflow isn't **Active**, or you're using the Test URL without "Listen for test event." |
| Google Sheets node fails with a permissions error | OAuth2 credential's account lacks edit access, or the Spreadsheet ID/Sheet name is wrong. |
| AI Agent errors or returns malformed data | Gemini API key invalid/missing, selected model unavailable to your key, or the model failed to satisfy the schema — check the node's execution log. |
| Gmail node fails to send | OAuth2 credential expired/revoked — reauthorize it. |
| Rows appear in `LeadIntakeDB` but not `LeadScore` | The AI Agent step failed before reaching `Append or update row in sheet` — check that node's execution. |
| Emails say "undefined" or look unpersonalized | A field referenced in the prompt is missing from the sheet row — confirm the `Append row in sheet` column mapping matches the headers in §4.1 exactly (including the trailing space in "Email "). |
| Dashboard numbers look stale | Looker Studio's cache hasn't refreshed — use **Refresh data** in the report, or reduce the data source's cache duration. |

---

## 9. Data & privacy notes

- Lead contact details are stored in plain text in Google Sheets and sent to the Gemini API as part of the scoring prompt. Confirm this matches your organization's data-handling policy before processing real customer data.
- The webhook has no built-in authentication — anyone with the URL can submit a "lead." For a public-facing deployment, consider adding a shared-secret header check or a spam-protected form frontend.
- The intake form should present a clear consent statement (already included as a checkbox in the reference form) since submissions are used to contact the lead by email.

---

## 10. Project files

| File | Purpose |
|---|---|
| `AI_Sales_Agent.json` | The importable n8n workflow. |
| `README.md` | This file — full project setup and usage guide. |
| `Architecture_Diagram.md` | Component, sequence, and data-model diagrams for the whole system. |
| `Validation_Test_Set.md` | Reproducible test scenarios (pass cases and failure cases) for verifying the system. |
| `docker-compose.yml` | configuration file that tells Docker how to create and run your n8n environment. |
| `frontend` | A simple Lead Intake form. |