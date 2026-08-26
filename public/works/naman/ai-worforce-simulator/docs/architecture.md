# Architecture

## Overview

The AI Workforce Simulator follows a layered, clean-architecture style that
strictly separates **stateful computation** (backend) from **presentation**
(frontend). The simulation engine is the single source of truth for all
numerical results.

```
                        ┌───────────────────────────────────────────┐
                        │                 Browser                  │
 Users  ──────────────► │   Frontend (React / Vite / Tailwind)      │
                        │   (Visualization, input, interaction)   │
                        └───────────────┬───────────────────────────┘
                                        │  HTTPS (CORS allow-listed origins)
                                        ▼
                        ┌───────────────────────────────────────────┐
                        │        API Layer (FastAPI)               │
                        │  Validation • Rate limits • Error bounds │
                        └──────┬──────────────────────────┬─────────┘
                               │                          │
              ┌────────────────┘        ┌──────────────────┘
              ▼                         ▼
  ┌───────────────────┐    ┌──────────────────────────┐
  │  Scenario Service │    │  Report Service          │
  │  (CRUD, templates)│    │  (structured reports)   │
  └────────┬──────────┘    └────────────┬─────────────┘
           │                            │
           ▼                            ▼
  ┌──────────────────────────────────────────────────┐
  │        Simulation Orchestrator                    │
  │  builds config → engine.run(seed) → RunResult     │
  └──────────────────────┬───────────────────────────┘
                         │
                         ▼
  ┌──────────────────────────────────────────────────┐
  │        Discrete-Event Simulation Engine          │
  │  Workers │ Tasks │ Queues │ Events │ Clock        │
  └──────────────────────┬───────────────────────────┘
                         │
                         ▼
  ┌──────────────────────────────────────────────────┐
  │              Metrics Engine                       │
  │  Throughput │ SLA │ Error │ Utilization │ Backlog │
  └──────────────────────┬───────────────────────────┘
                         │
                         ▼
  ┌──────────────────────────────────────────────────┐
  │        Persistence (SQLAlchemy / SQLite)          │
  │  scenarios │ simulation_runs │ reports           │
  └──────────────────────────────────────────────────┘
                                        │
            ┌───────────────────────────┼──────────────────────────┐
            ▼                           ▼                          ▼
  ┌──────────────────┐     ┌────────────────────────┐   ┌──────────────────────┐
  │ OpenRouter       │     │  External Services     │   │  Server-side logs    │
  │  AI Analyst      │     │  (HTTPS only)          │   │  (no secrets)        │
  └──────────────────┘     └────────────────────────┘   └──────────────────────┘
```

## Component Reference

### Backend (`backend/app/`)

| Module | Responsibility |
|--------|----------------|
| `main.py` | Application factory, middleware, CORS, exception handlers, health. |
| `core/config.py` | Pydantic settings loaded from env; resource limits. |
| `core/exceptions.py` | Domain exceptions + safe JSON error handlers. |
| `database/` | Async SQLAlchemy engine, sessions, ORM base. |
| `models/` | SQLAlchemy ORM models (scenarios, runs, reports). |
| `schemas/` | Pydantic request/response models + input validation. |
| `simulation/` | Pure-python discrete-event engine (no I/O). |
| `services/` | Orchestration: scenario, simulation, report, AI analyst. |
| `api/` | FastAPI routers exposing the HTTP contract. |

### Simulation package (`backend/app/simulation/`)

```
simulation/
├── distributions.py   # Poisson arrivals, log-normal processing times, Bernoulli errors
├── workers.py         # Worker dataclass + WorkerPool (availability, shifts)
├── tasks.py           # Task, TaskType dataclasses
├── queues.py          # TaskQueue (priority, FIFO; SLA-aware)
├── events.py          # Event, EventType, EventQueue (deterministic heap)
├── engine.py          # SimulationEngine: clock + event loop + orchestration
├── metrics.py         # MetricsEngine: throughput, SLA, errors, util, backlog (+ time series)
└── scenarios.py       # Scenario config + predefined templates
```

### Frontend (`frontend/src/`)

```
src/
├── components/   # reusable widgets (KPI cards, charts, assumption list)
├── pages/        # Dashboard, Scenario Builder, Results, Comparison, Reports, Validation, Assumptions
├── services/     # typed API client
├── hooks/        # data fetching hooks
├── types/        # TS types mirroring backend schemas
└── App.tsx       # route shell
```

## Key Design Decisions

1. **Deterministic event ordering.** Events are scheduled on a heap keyed by
   `(time, priority, sequence_id)`. The monotonically increasing sequence id
   guarantees reproducibility for same-time events regardless of insertion order.

2. **Single RNG per run.** One `np.random.default_rng(seed)` instance drives all
   stochasticity. The seed is stored with every run (SECURITY.md §16).

3. **Poisson arrival superposition.** Each task type arrives as an independent
   Poisson process; the superposition is also Poisson with rate = Σλᵢ. This lets
   "peak demand" and "no demand" scenarios be expressed as simple rate changes.

4. **Backend owns metrics.** The frontend renders numbers returned by the API and
   never recomputes KPIs (SECURITY.md §17).

5. **Backend owns AI.** The OpenRouter key stays server-side; the frontend calls
   `/api/simulations/{id}/analysis` and receives only a text explanation
   (SECURITY.md §4).

6. **Resource limits.** Worker count, arrival rate, duration, queue size, and
   concurrency are validated against configurable caps before a run starts
   (SECURITY.md §24).

## Data Flow (single run)

```
User → Scenario config (validated) → Engine(seed) → Event loop
  → MetricsEngine(samples) → RunResult
  → SQLite (simulation_runs)
  → Frontend (KPIs + charts + assumptions)
  → [optionally] AI Analyst ← sanitized metrics
```

## Cross-cutting Concerns

- **Security**: see SECURITY.md. `.env` excluded, CORS restricted, parameterized
  SQL, generic error messages, sanitized AI payload, rate/resource limits.
- **Reproducibility**: seed + model version persisted with each run.
- **Auditability**: every run records configuration, assumptions, and limits.
- **Fail-safe**: missing AI key / OpenRouter outage does not block simulation
  results (graceful fallback).