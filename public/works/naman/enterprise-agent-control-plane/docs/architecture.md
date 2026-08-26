# Architecture

## Overview

The Enterprise Agent Control Plane is a centralized governance and security platform for AI agents.

## System Flow

```text
AI Agent
    ↓
Control Plane Gateway (/api/v1/tool-calls)
    ↓
Agent Identification
    ↓
Agent Status Check (ACTIVE / DISABLED)
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
Protected Tool (if ALLOWED)
    ↓
Response
```

## Components

### Backend (FastAPI + SQLAlchemy + PostgreSQL)

- **API Layer** (`app/api/`): REST endpoints for agents, policies, tool calls, audit logs, users, dashboard.
- **Core Layer** (`app/core/`): Policy engine, gateway, rate limiter, security, config.
- **Models** (`app/models/`): SQLAlchemy ORM models for agents, policies, audit logs, users.
- **Schemas** (`app/schemas/`): Pydantic schemas for request/response validation.
- **Services** (`app/services/`): Business logic for agents, policies, audit, users.
- **Tools** (`app/tools/`): Sandboxed mock tools (`get_customer`, `search_transactions`, `create_ticket`, `send_email`, `refund_payment`).

### Frontend (React + TypeScript + Tailwind CSS)

- **Pages**: Login, Dashboard, Agents, Agent Detail, Policies, Audit Logs, Users.
- **Layout**: Sidebar navigation with protected routes.
- **Services**: API client with JWT interceptor.

## Security Boundary

The gateway is the mandatory enforcement point. Protected tools are not exposed as public endpoints.

## No-Bypass Principle

All agent tool requests must flow through `/api/v1/tool-calls`. Direct access to protected tools is not available.