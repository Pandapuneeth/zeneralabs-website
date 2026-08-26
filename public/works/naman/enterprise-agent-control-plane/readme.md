# Enterprise Agent Control Plane

A centralized governance and security platform for registering, controlling, monitoring, and auditing AI agents.

## Problem Statement

AI agents need controlled access to tools and data. Without centralized enforcement, agents may exceed their intended permissions, creating security and compliance risks.

## Architecture

```text
AI Agent
    ↓
Control Plane Gateway
    ↓
Agent Identification
    ↓
Agent Status Check
    ↓
Policy Engine
    ↓
Tool Permission Check
    ↓
Data Scope Check
    ↓
Rate Limit Check
    ↓
ALLOW / DENY
    ↓
Audit Logging
    ↓
Protected Tool
    ↓
Response
```

## Features

- Agent Registry
- Policy Engine
- Control Gateway
- Tool Authorization
- Rate Limiting
- Audit Trail
- Kill Switch
- RBAC
- Dashboard

## Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy, Pydantic, PostgreSQL, Alembic, PyJWT
- **Frontend**: React, TypeScript, Tailwind CSS
- **Testing**: Pytest
- **Infrastructure**: Docker, Docker Compose

## Project Structure

```
enterprise-agent-control-plane/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── tools/
│   │   └── database/
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docs/
├── scripts/
├── docker-compose.yml
├── .env.example
└── README.md
```

## Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and configure values
3. Start PostgreSQL
4. Run migrations

## Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and JWT secret.

## Database Setup

```bash
cd backend
alembic upgrade head
```

## Running Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Usage

See `docs/api.md` for full API documentation.

## Demo

```bash
python scripts/demo.py
```

## Testing

```bash
cd backend
pytest tests/ -v
```

## Security

See `docs/security.md` for security architecture and controls.

## Validation

See `docs/validation.md` for validation scenarios and security validation matrix.

## Limitations

- MVP uses in-memory rate limiting
- Mock tools for demonstration
- No multi-tenancy
- No enterprise SSO

## Future Improvements

- Redis-backed rate limiting
- Cryptographic audit chaining
- Multi-tenancy
- Enterprise SSO
- Anomaly detection
- Cost tracking