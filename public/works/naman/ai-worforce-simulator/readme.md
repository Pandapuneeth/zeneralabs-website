# AI Workforce Simulator

[![Python 3.11](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/downloads/release/python-311/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-green.svg)](https://fastapi.tiangolo.com/)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Deterministic, reproducible workforce simulation for BPO / contact-center environments.**

An applied operations simulation platform that models a virtual workforce of configurable agents (skill, speed, error rate, shift availability) to evaluate staffing plans, demand profiles, and process changes — **without touching real employees or live operations**.

> **Important:** Simulation results are estimates based on supplied assumptions, distributions, configuration, and random seed. They are **not guaranteed predictions** of real-world outcomes.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Quick Start](#quick-start)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [Testing](#testing)
8. [Simulation Methodology](#simulation-methodology)
9. [Statistical Assumptions](#statistical-assumptions)
10. [Reproducibility](#reproducibility)
11. [Validation](#validation)
12. [Security](#security)
13. [Limitations](#limitations)
14. [Roadmap](#roadmap)
15. [AI Analyst & OpenRouter](#ai-analyst--openrouter)
16. [API Documentation](#api-documentation)
17. [License](#license)

---

## Architecture

![Architecture](ARCHITECTURE.png)

The system enforces strict separation of concerns:

```
 Users
   │
   ▼
 Frontend (React 19 / Vite / Tailwind / Recharts)
   │
   ▼
 API Layer (FastAPI + Pydantic)
   │
   ├──────────────────┬────────────────┐
   │ Scenario Service │ Report Service │
   │                  │                │
   ▼                  ▼                │
 Simulation Orchestrator               │
   │                                    │
   ▼                                    │
 Discrete-Event Simulation Engine      │
   │  ┌──────────┬──────────┐          │
   │  │ Worker   │ Task     │ Queue     │
   │  └──────────┴──────────┘          │
   ▼                                    │
 Metrics Engine                         │
   │  ┌────────┬────────┬───────┐      │
   │  │Through-│ SLA    │Util-  │Back- │
   │  │ put    │ Compl. │ ization│ log  │
   │  └────────┴────────┴───────┘      │
   ▼                                    │
 SQLite Persistence ───────────► Database│
   │                                    │
   ▼                                    │
 Optional AI Analyst (OpenRouter)       │
   │                                    │
   ▼                                    │
 Human-readable operational insight      │
```

**The simulation engine is the single source of truth for all numerical results.** The frontend visualizes results; the AI Analyst only explains pre-computed numbers — it never generates or alters them.

See [`docs/architecture.md`](docs/architecture.md) for a detailed component reference.

---

## Features

| Capability | Description |
|---|---|
| **Discrete-event engine** | Deterministic, event-driven simulation with a single seeded RNG per run |
| **Worker modeling** | Skill, speed, error rate, and shift availability per agent |
| **Task & queue system** | Poisson arrivals, priority + FIFO queue, configurable task types |
| **KPI metrics** | Throughput, SLA compliance, error rate, utilization, backlog, time-series |
| **Scenario comparison** | Side-by-side KPI deltas across competing configurations |
| **Structured reports** | Reproducible report cards with validation status and assumptions |
| **Validation suite** | Automated edge-case coverage: zero staffing, extreme demand, no demand, reproducibility, invalid input |
| **Assumption inspector** | Full transparency into model inputs for every run |
| **AI Analyst** | Optional OpenRouter-backed operational insight (backend-only, graceful fallback) |
| **Docker deployment** | One-command full-stack via `docker compose up --build` |

---

## Technology Stack

| Layer | Choice |
|---|---|
| **Backend** | Python 3.11, FastAPI, Pydantic, NumPy |
| **Persistence** | SQLAlchemy 2.0 + aiosqlite (SQLite) |
| **Simulation** | Custom discrete-event engine + NumPy RNG |
| **Frontend** | React 19, Vite, Tailwind CSS, Recharts |
| **AI Analyst** | OpenRouter (optional, backend-only) |

---

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+ (for frontend)
- Docker & Docker Compose (optional, for containerized deployment)

### Option A: Docker (recommended for demo)

```bash
docker compose up --build
# Frontend → http://localhost:5173
# Backend  → http://localhost:8000
# API docs → http://localhost:8000/api/docs
```

### Option B: Local development

```bash
# 1. Clone
git clone https://github.com/Zenera-Labs/ai-workforce-simulator.git
cd ai-workforce-simulator

# 2. Backend
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env           # edit as needed
PYTHONPATH=backend python -m uvicorn app.main:app --reload

# 3. Frontend (new terminal)
cd ../frontend
npm install
npm run dev
```

---

## Environment Variables

See [`backend/.env.example`](backend/.env.example). Key variables:

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite:///./app.db` | Persistence database |
| `OPENROUTER_API_KEY` | *(empty)* | AI Analyst key — **server-side only** |
| `OPENROUTER_MODEL` | `openai/gpt-4o-mini` | LLM provider/model |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173` | Allowed frontend origins |
| `MAX_WORKERS` | `5000` | Resource limit |
| `MAX_ARRIVAL_RATE` | `200.0` | Resource limit |
| `MAX_SIMULATION_DURATION_MINUTES` | `10080` | Resource limit |
| `MAX_QUEUE_SIZE` | `100000` | Resource limit |
| `MAX_CONCURRENT_SIMULATIONS` | `1` | Concurrency limit |

---

## Running the Application

### Backend

```bash
# from backend/
PYTHONPATH=backend python -m uvicorn app.main:app --reload
# Docs: http://localhost:8000/api/docs
# Health: http://localhost:8000/health
```

### Frontend

```bash
# from frontend/
npm run dev
# http://localhost:5173
```

---

## Testing

```bash
# Backend (from repo root or backend/.venv)
backend\.venv\Scripts\python -m pytest -q              # Windows
PYTHONPATH=backend python -m pytest -q                 # macOS / Linux

# Lint & format
backend\.venv\Scripts\python -m ruff check backend/app backend/tests
backend\.venv\Scripts\python -m ruff format --check backend/app backend/tests

# Frontend
cd frontend && npm run typecheck && npm run build
```

### Test layout

```
backend/tests/
├── unit/           # worker, task, queue, processing-time, SLA, metrics
├── integration/    # end-to-end scenario execution + comparison
└── validation/     # zero staffing, extreme demand, no demand, reproducibility, invalid input
```

---

## Simulation Methodology

The engine is a **discrete-event simulator** with the following pipeline:

1. **Arrival process** — Tasks arrive as a Poisson process (superposition of independent task-type streams). An optional demand-profile multiplier shapes the rate over time.
2. **Queue discipline** — Priority-first, then FIFO within the same priority tier.
3. **Assignment** — The next available worker is selected by priority and shift availability.
4. **Processing time** — `base_time × complexity × lognormal(0, CV × (1.5 − skill)) / speed`.
5. **Error modeling** — Bernoulli per-task outcome with probability = worker error rate × task error sensitivity.
6. **SLA measurement** — Time from arrival to completion.
7. **Horizon** — Events with `time ≤ horizon` are processed; backlog is bounded by the configured queue cap.

All stochastic draws use a single `np.random.default_rng(seed)` per run, ensuring bit-for-bit reproducibility.

---

## Statistical Assumptions

| Phenomenon | Distribution | Rationale |
|---|---|---|
| Task arrivals | Poisson process | Independent events at a constant average rate |
| Processing time | Log-normal | Positive, right-skewed; captures task-effort variability |
| Errors | Bernoulli | Per-task binary outcome with configurable probability |
| Worker skill | Categorical / continuous | Junior / Intermediate / Senior or explicit values |

---

## Reproducibility

Every run records its seed, model version, configuration, and duration.  
**Same configuration + seed + version ⇒ identical results.**  
Verified by an automated reproducibility test in the validation suite.

---

## Validation

See [`docs/validation.md`](docs/validation.md) and `backend/tests/validation/`.

| Case | Expected outcome |
|---|---|
| Normal operation | Completes within limits; SLA ~95%; utilization 70–85% |
| Zero staffing | 0 completions; backlog grows; no crash or division-by-zero |
| Extreme demand | Continues operating; backlog bounded by cap |
| No demand | Completes successfully with all-zero metrics |
| Reproducibility | Identical results across runs with the same seed |
| Invalid input | Resource limits and schema constraints reject pathological configs |

---

## Security

See [`SECURITY.md`](SECURITY.md). Key guarantees:

- No hardcoded secrets; `.env` excluded from Git
- API keys stored backend-only; never exposed to the frontend
- Parameterized ORM queries; restricted CORS
- Safe JSON error responses (no stack traces)
- Sanitized AI payloads with prompt-injection-resistant system prompts
- Resource-limit enforcement (workers, rate, duration, queue, concurrency)

---

## Limitations

- SQLite is used for the MVP; swap `DATABASE_URL` for a managed database in production.
- Errors mark tasks as processed-but-not-successfully-completed (no automatic re-queue).
- AI Analyst requires an OpenRouter key and is optional.
- Staffing optimization and Monte-Carlo sensitivity analysis are future features.

---

## Roadmap

- Staffing optimizer (LP / heuristic solver)
- Monte-Carlo sensitivity analysis
- Historical calibration against real AHT / SLA data
- Live scenario tuning from the dashboard
- PDF report export

---

## AI Analyst & OpenRouter

The optional AI Analyst calls OpenRouter from the backend only. Configure:

```bash
OPENROUTER_API_KEY=<your key>
OPENROUTER_MODEL=<provider/model>
```

The frontend never receives the key. If OpenRouter is unavailable or the key is unset, the simulator continues and shows a graceful fallback message.

---

## API Documentation

Auto-generated OpenAPI UI:

- **Swagger UI:** `http://localhost:8000/api/docs`
- **ReDoc:** `http://localhost:8000/api/redoc`
- **Schema:** `http://localhost:8000/api/openapi.json`

---

## License

MIT — see [LICENSE](LICENSE) for details.