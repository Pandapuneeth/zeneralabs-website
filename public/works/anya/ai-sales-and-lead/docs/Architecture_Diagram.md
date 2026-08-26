# Architecture Diagram — AI Sales and Lead Qualification Agent

This document describes the full system architecture: the public intake form, the n8n orchestration backend, the AI reasoning layer, data storage, notification, and reporting. Diagrams are written in [Mermaid](https://mermaid.js.org/) — they render natively on GitHub, GitLab, Notion, and most modern Markdown viewers. If your viewer doesn't render Mermaid, paste the code blocks into the [Mermaid Live Editor](https://mermaid.live).

---

## 1. Component overview

```mermaid
flowchart LR
    subgraph Client["Client-facing"]
        FORM["Project Enquiry Form<br/>(Bolt.new — React + Tailwind)"]
    end

    subgraph Automation["n8n Workflow — 'AI Sales Agent'"]
        WEBHOOK["Webhook<br/>POST /lead-intake"]
        CODE["Code in JavaScript<br/>(generate Lead ID)"]
        APPEND1["Append row in sheet<br/>(LeadIntakeDB tab)"]
        AGENT["AI Agent<br/>(LangChain Agent)"]
        LLM["Google Gemini Chat Model<br/>models/gemini-3.5-flash-lite"]
        PARSER["Structured Output Parser<br/>(JSON Schema)"]
        APPEND2["Append or update row in sheet<br/>(LeadScore tab)"]
        RESPOND["Respond to Webhook<br/>(JSON CRM record)"]
        SWITCH["Switch<br/>(Hot / Warm / Cold)"]
        MAIL_HOT["Gmail: Send a message<br/>(Hot branch)"]
        MAIL_WARM["Gmail: Send a message2<br/>(Warm branch)"]
        MAIL_COLD["Gmail: Send a message1<br/>(Cold branch)"]
    end

    subgraph Storage["Data layer"]
        SHEET[("Google Sheet<br/>'AI Sales and Lead Qualification Agent'")]
    end

    subgraph Reporting["Reporting"]
        LOOKER["Looker Studio Dashboard<br/>(Lead Analytics)"]
    end

    subgraph External["External recipient"]
        LEAD["Lead's inbox"]
    end

    FORM -->|"POST JSON"| WEBHOOK
    WEBHOOK --> CODE
    CODE --> APPEND1
    APPEND1 --> SHEET
    APPEND1 --> AGENT
    LLM -.->|"ai_languageModel"| AGENT
    PARSER -.->|"ai_outputParser"| AGENT
    AGENT --> APPEND2
    APPEND2 --> SHEET
    APPEND2 --> RESPOND
    RESPOND -->|"JSON response"| FORM
    RESPOND --> SWITCH
    SWITCH -->|"Hot"| MAIL_HOT
    SWITCH -->|"Warm"| MAIL_WARM
    SWITCH -->|"Cold"| MAIL_COLD
    MAIL_HOT --> LEAD
    MAIL_WARM --> LEAD
    MAIL_COLD --> LEAD
    SHEET -.->|"live read"| LOOKER
```

---

## 2. n8n node graph (matches the imported workflow exactly)

```mermaid
flowchart LR
    Webhook --> CodeJS["Code in JavaScript"]
    CodeJS --> Append1["Append row in sheet"]
    Append1 --> AIAgent["AI Agent"]
    Gemini["Google Gemini Chat Model"] -. ai_languageModel .-> AIAgent
    OutputParser["Structured Output Parser"] -. ai_outputParser .-> AIAgent
    AIAgent --> Append2["Append or update row in sheet"]
    Append2 --> Respond["Respond to Webhook"]
    Respond --> Switch
    Switch -->|Hot| SendHot["Send a message"]
    Switch -->|Warm| SendWarm["Send a message2"]
    Switch -->|Cold| SendCold["Send a message1"]
```

> This mirrors the node names and connections found in `AI_Sales_Agent.json` exactly, so it can be used to sanity-check the workflow after import.

---

## 3. Request/response sequence for one lead

```mermaid
sequenceDiagram
    participant U as User (Lead)
    participant F as Intake Form (Bolt.new)
    participant N as n8n Webhook
    participant S as Google Sheets
    participant AI as AI Agent (Gemini)
    participant G as Gmail
    participant D as Looker Studio

    U->>F: Fills out project enquiry
    F->>N: POST /lead-intake (JSON payload)
    N->>N: Generate Lead ID
    N->>S: Append raw lead (LeadIntakeDB)
    N->>AI: Prompt with lead fields
    AI-->>N: Structured JSON (score, classification, reasoning, email draft)
    N->>S: Upsert scored record (LeadScore, matched on Lead ID)
    N-->>F: 200 OK — JSON "CRM record"
    N->>N: Switch on classification
    N->>G: Send follow-up email (subject + draft)
    G->>U: Follow-up email delivered
    S-->>D: Live data refresh
```

---

## 4. Data model

```mermaid
erDiagram
    LEAD_INTAKE_DB {
        string Lead_ID PK
        string Timestamp
        string Name
        string Email
        string Phone
        string Organisation
        string Service_Category
        string Other_Service
        string Project_Title
        string Project_Description
        string Budget
        string Timeline
        string Preferred_Contact_method
        string Additional_Notes
        string Consent
    }
    LEAD_SCORE {
        string Lead_ID PK
        string Timestamp
        string Name
        string Email
        string Phone
        string Service_Category
        string Project_Name
        string Project_Details
        string Pain_point
        string Need_point
        number LeadScore
        string Classification
        string Qualification_Status
        string Missing_Information
        string Score_breakdown
        string Reasoning
        string Recommended_Action
        string Follow_up_subject
        string Follow_up_message
    }
    LEAD_INTAKE_DB ||--|| LEAD_SCORE : "joined on Lead_ID"
```

---

## 5. Layer responsibilities

| Layer | Technology | Responsibility |
|---|---|---|
| **Presentation** | Bolt.new (React + Tailwind + Lucide) | Collects structured lead input from a public form; POSTs JSON to the webhook; displays confirmation. |
| **Orchestration** | n8n | Owns the pipeline: intake logging, AI invocation, result persistence, response, routing, email dispatch. |
| **Reasoning** | Google Gemini (`gemini-3.5-flash-lite`) via LangChain Agent node | Scores, classifies, explains, and drafts a follow-up — constrained to a fixed JSON Schema. |
| **Validation** | Structured Output Parser (JSON Schema) | Guarantees the AI's output always has the fields every downstream node expects. |
| **Persistence** | Google Sheets (2 tabs: `LeadIntakeDB`, `LeadScore`) | System of record; append-only raw log + upserted scored record. |
| **Notification** | Gmail (OAuth2) | Delivers the AI-drafted follow-up to the lead, branch selected by classification. |
| **Reporting** | Looker Studio | Live dashboard reading directly from `LeadScore` — totals, average score, classification mix, score distribution, service-category mix. |

---

## 6. Why this shape

- **Single webhook entry point** keeps the form decoupled from the backend implementation — the form only needs to know one URL and POST JSON.
- **Raw log before AI processing** (`LeadIntakeDB`) means a lead is never lost even if the AI step or a downstream node fails.
- **Schema-constrained AI output** turns a free-text LLM into a reliable API contract that Sheets, the webhook response, and the dashboard can all consume without additional parsing.
- **Upsert-by-Lead-ID on the scored table** allows safe re-processing of the same lead without duplicating dashboard rows.
- **Dashboard reads the sheet, not the workflow** — reporting has zero coupling to n8n's runtime, so the dashboard stays live even if the workflow is edited or briefly deactivated.