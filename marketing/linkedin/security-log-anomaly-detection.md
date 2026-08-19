# SentinelAI — Security Log Anomaly Detection — LinkedIn Content Pack

Site: https://zeneralabs.in/portfolio/security-log-anomaly-detection
Positioning: internally developed Mini-SIEM platform. State demo-mode/scale limitations.

---

## Post 1 — Problem / Insight

**Format:** Text post. No asset (or `PAGE 2.png`).

> Every SOC has the same math problem: too many events, too few analysts.
>
> Login and access logs pile up by the hour. Manual review doesn't scale. And the classic early indicators — logins from high-risk geographies, unknown devices, credential-stuffing patterns — are buried in the noise until damage is done.
>
> The answer isn't "more alerts." It's risk-scoring events and *explaining* the ML so analysts can actually act.
>
> So we built internally at Zenera Labs: **a Mini-SIEM** that ingests auth logs, scores every event, detects anomalies with a hybrid rule + ML pipeline, correlates multi-step attack chains, and gives analysts evidence they can investigate — not just a red flag.
>
> Details over the next few posts. Alert fatigue is real; visibility doesn't have to wait for a big-budget platform.

#Cybersecurity #SOC #DetectionEngineering #InfoSec

---

## Post 2 — Architecture

**Format:** Graphic post. Attach `sentinelai-arch.png`.

> SentinelAI, the architecture:
>
> 1. **POST /log ingestion** — Pydantic-validated security events.
> 2. **Rule risk scoring** — location + device signals scored instantly.
> 3. **Hybrid detection** — Isolation Forest anomalies combined with per-user behavioural baselines.
> 4. **Alerting** — composite risk ≥ 80 fires, automatically mapped to MITRE ATT&CK techniques (failed logins → T1110 Brute Force; valid accounts → T1078; privileged access → T1078.004).
> 5. **Correlation engine** — credential stuffing (fail→fail→success), account takeover, insider threat (≥5 high-risk events in 24h), impossible travel (multi-location within 2h).
> 6. **Threat enrichment** — IOC feed matching (17 default IOCs).
> 7. **SHAP explainability** — *why* the model flagged an event, in natural language.
> 8. **SOC dashboard** — React 18 UI, live metrics, 5-second polling, RBAC (ADMIN/ANALYST/VIEWER).
>
> 38 backend unit tests, JWT + RBAC auth, Docker-ready. Honest limits: demo scale (SQLite), pickle model artifact (ONNX planned), bundled IOC feed.

#SIEM #MITER #ThreatDetection #ML

---

## Post 3 — Demo + Explainability

**Format:** Carousel. Attach `PAGE 9.png`, `PAGE 10.png`, `PAGE 12.png`.

> A security alert you can actually *audit*.
>
> Most anomaly detection stops at "risk score: high."
>
> SentinelAI goes one step further with SHAP feature attribution — for every ML-flagged event, analysts see which features drove the decision, summarized in plain language. That turns a black-box red flag into something the team can defend, document and explain in an incident report.
>
> Slides: detection pipeline → explainable AI → SOC dashboard → validation. Full presentation (14 slides) is on the case study.

#ExplainableAI #SHAP #ML #Security

---

## Post 4 — Technical Lesson

**Format:** Long-form text.

> Three rules from building a Mini-SIEM that SOC analysts can trust:
>
> **1. Rules and ML should cooperate, not compete.** Rule scoring catches the known patterns instantly; Isolation Forest + behavioural baselines catch the deviation from *this user's* normal. Composite scoring (alert at ≥ 80) means neither has to carry the whole load.
>
> **2. Map every alert to a framework.** MITRE ATT&CK gave us a vocabulary that analysts already speak and made "what now?" answerable in the UI.
>
> **3. Ship the "why", not just the "what".** SHAP attribution with natural-language summaries is what separates an alert-noise generator from an investigation tool.
>
> Boundaries we kept: demo data (seeded accounts, guest VIEWER session), SQLite for demo scale, mock IOC feed. External feeds (AbuseIPDB, AlienVault OTX) and PostgreSQL are the roadmap — and we're open to building this for production-grade environments.

#DetectionEngineering #AI #SecOps

---

## Post 5 — Business Use Case

**Format:** Text/Carousel. Attach `PAGE 13.png` or `PAGE 14.png`.

> What would you do with a risk-scored view of every authentication event?
>
> - **SOCs** — triage by composite risk, not by timestamps.
> - **Product & SaaS teams** — detect account-takeover patterns in your own login telemetry.
> - **Security teams without a SIEM budget** — a reference framework for detection engineering.
>
> It's a Mini-SIEM: 38 unit tests, RBAC, MITRE mapping, correlation, enrichment, explainability — built internally to show what detection engineering can look like without a seven-figure platform contract.
>
> Have a SOC challenge in mind? This is exactly the kind of system we build. Talk to us via the case-study CTA.

#SOC #SecurityAutomation #CyberResilience