# Internal Developer Platform

A self-service internal developer platform for organizations running multiple microservices. Enables developers to register services, scaffold new ones from approved templates, and provision environments — all through policy-guarded workflows with full audit trails.

## Problem

Companies running 40+ microservices face a common bottleneck: developers need to provision new services and environments, but the process involves multiple handoffs with platform teams, manual configuration, inconsistent templates, and no clear audit trail. This creates:

- **2–4 hours** of wait time for basic service onboarding
- Inconsistent service structures across teams
- No central visibility into who owns what
- Policy violations when developers bypass approval workflows
- No audit trail for compliance

## Solution

The Internal Developer Platform provides a developer-friendly self-service dashboard where:

- Developers register and manage services in a central catalog
- New services are scaffolded from **approved golden-path templates**
- Environment provisioning goes through **mandatory policy validation** (no bypass)
- Every action is **logged in an immutable audit trail**
- Role-based access control ensures only authorized users can perform actions
- CI/CD configuration is auto-generated from templates

## MVP Features

| Feature | Description |
|---------|-------------|
| **Service Catalog** | Register, view, search, and filter services with persistent data |
| **Self-Service Provisioning** | Request environments through a full approval pipeline |
| **Golden-Path Scaffolding** | Create services from approved templates (FastAPI, Express) |
| **Role-Based Access Control** | Server-enforced RBAC with 4 roles |
| **Audit Logging** | Persistent audit trail for every action |
| **Policy Guardrails** | 7-layer validation before any provisioning |
| **CI/CD Generation** | Auto-generated pipeline configs from templates |
| **Provisioning Status** | Full lifecycle tracking (PENDING → COMPLETED/REJECTED) |
| **Developer Dashboard** | Real-time overview with stats and recent activity |

## Architecture

![Internal Developer Platform Architecture](docs/architecture_IDP.png)

**Key architectural principle:** Policy validation sits between authentication and provisioning with NO bypass path. Every provisioning request must pass all guardrails before any resources are created.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Python 3.11+, FastAPI, SQLAlchemy |
| **Database** | SQLite (WAL mode) |
| **Frontend** | React 18, TypeScript, Vite |
| **Testing** | pytest, FastAPI TestClient |
| **Provisioning** | Local sandbox (file-system based) |

## Project Structure

```
internal_developer_platform/
├── app/
│   ├── main.py                    # FastAPI application entry point
│   ├── dependencies.py            # Auth/RBAC dependency injection
│   ├── database/
│   │   └── connection.py          # SQLite engine, session, Base
│   ├── models/
│   │   ├── user.py                # User and Role models
│   │   ├── service.py             # Service catalog model
│   │   ├── template.py            # Template registry model
│   │   ├── provisioning.py        # Provisioning request model
│   │   └── audit.py               # Audit log model
│   ├── schemas/
│   │   ├── user.py                # User/Role request/response schemas
│   │   ├── service.py             # Service schemas
│   │   ├── template.py            # Template schemas
│   │   ├── provisioning.py        # Provisioning schemas
│   │   └── audit.py               # Audit schemas
│   ├── routers/
│   │   ├── auth.py                # Authentication and user management
│   │   ├── services.py            # Service catalog CRUD
│   │   ├── templates.py           # Template registry management
│   │   ├── provisioning.py        # Provisioning and scaffolding
│   │   ├── audit.py               # Audit log queries
│   │   └── dashboard.py           # Dashboard aggregated data
│   └── services/
│       ├── rbac.py                # Role-based access control
│       ├── policy.py              # Policy validation (7 checks)
│       ├── audit.py               # Audit logging
│       ├── provisioning.py        # Provisioning pipeline
│       └── scaffolding.py         # Golden-path scaffolding
├── tests/
│   ├── conftest.py                # Test fixtures, isolated DB
│   └── test_api.py                # 52 comprehensive tests
├── frontend/
│   ├── src/
│   │   ├── App.tsx                # Main app with routing
│   │   ├── api.ts                 # API client
│   │   ├── types.ts               # TypeScript types
│   │   ├── index.css              # Global styles
│   │   └── pages/
│   │       ├── Dashboard.tsx      # Overview dashboard
│   │       ├── ServiceCatalog.tsx # Service listing
│   │       ├── ServiceDetail.tsx  # Service detail view
│   │       ├── Templates.tsx      # Template registry
│   │       ├── ScaffoldService.tsx# Service scaffolding
│   │       ├── ProvisionEnvironment.tsx  # Provisioning form
│   │       ├── ProvisioningHistory.tsx   # Request history
│   │       └── AuditLogs.tsx      # Audit log viewer
│   └── package.json
├── docs/
│   └── architecture.md            # Architecture diagram
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

## Setup

### Prerequisites

- Python 3.11+
- Node.js 20+
- npm

### Backend

```bash
# Install dependencies
pip install -r requirements.txt

# Copy environment config
cp .env.example .env

# Run the backend server
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API calls to the backend on port 8000.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite:///./platform.db` | Database connection string |
| `SECRET_KEY` | `dev-secret-key` | Application secret key |
| `API_KEY` | `dev-api-key` | API authentication key |
| `BACKEND_URL` | `http://localhost:8000` | Backend API URL |
| `FRONTEND_URL` | `http://localhost:5173` | Frontend URL |

## Running the Application

1. Start the backend: `uvicorn app.main:app --reload --port 8000`
2. Start the frontend: `cd frontend && npm run dev`
3. Open `http://localhost:5173`
4. Select a user to sign in (Admin, Platform Engineer, Developer, or Viewer)

**Default users:**
| Username | Role | Team |
|----------|------|------|
| `admin` | ADMIN | Platform |
| `eng` | PLATFORM_ENGINEER | Platform |
| `dev` | DEVELOPER | Payments |
| `viewer` | VIEWER | Finance |

## Example Workflow

### 1. Scaffold a New Service

1. Sign in as `dev` (Developer)
2. Go to **Scaffold Service**
3. Select **Python FastAPI Service** template
4. Enter service name: `payments-api`, team: `Payments Team`
5. Click **Scaffold Service**
6. Project is generated with source code, tests, Dockerfile, CI/CD config
7. Service appears in the Service Catalog

### 2. Provision an Environment

1. Go to **Provision Environment**
2. Select `payments-api`, environment: `development`, template: `python-fastapi-service`
3. Click **Submit**
4. Policy validation runs → Approved → Provisioning completes
5. CI/CD configuration is generated
6. Audit log records the entire workflow

### 3. Policy Rejection

1. Sign in as `dev` (Developer)
2. Try to provision a `production` environment
3. Policy rejects: "DEVELOPER role is not permitted to provision production"
4. Rejection is recorded in the audit log
5. No resources are provisioned

## Policy Guardrails

**Every provisioning request passes through these checks (no bypass):**

| Check | Description |
|-------|-------------|
| Role Authorization | User must have provisioning permission |
| Environment Restriction | DEVELOPER → dev only; ADMIN/PE → all |
| Template Approval | Only active/approved templates allowed |
| Template Environment | Template must support the requested environment |
| Service Name Convention | Lowercase letters, digits, hyphens; starts with letter |
| Resource Limits (Environment) | CPU/memory capped per environment tier |
| Resource Limits (Template) | CPU/memory capped per template configuration |

## RBAC

| Permission | ADMIN | PLATFORM_ENGINEER | DEVELOPER | VIEWER |
|-----------|-------|-------------------|-----------|--------|
| Manage Users | ✅ | ❌ | ❌ | ❌ |
| Manage Templates | ✅ | ✅ | ❌ | ❌ |
| Register Services | ✅ | ✅ | ✅ | ❌ |
| Scaffold Services | ✅ | ✅ | ✅ | ❌ |
| Provision Development | ✅ | ✅ | ✅ | ❌ |
| Provision Staging | ✅ | ✅ | ❌ | ❌ |
| Provision Production | ✅ | ✅ | ❌ | ❌ |
| View Services | ✅ | ✅ | ✅ | ✅ |
| View Audit Logs | ✅ | ✅ | ❌ | ❌ |
| Approve Requests | ✅ | ✅ | ❌ | ❌ |

## Provisioning

Provisioning follows a strict pipeline:

```
Request → PENDING → VALIDATING → [Policy Check] → APPROVED → PROVISIONING → COMPLETED
                                 ↓ (if violation)
                              REJECTED
```

This platform uses a **safe sandbox provisioner** that creates project artifacts from approved templates. It does NOT provide unrestricted shell access or arbitrary infrastructure commands.

## Golden-Path Templates

### Python FastAPI Service
- FastAPI with async support
- Pydantic validation
- Docker configuration
- GitHub Actions CI/CD
- Pytest test suite

### Node.js Express Service
- Express.js with JSON support
- Jest test suite
- Docker configuration
- GitHub Actions CI/CD

Both templates generate a complete project structure with tests, Dockerfile, and CI/CD pipeline configuration.

## Audit Logging

Every important action creates an audit record containing:
- User ID, username, and role
- Action performed (e.g., PROVISION_REQUESTED, POLICY_REJECTED)
- Resource type and name
- Environment
- Result status (success/failure/rejected)
- Failure reason (when applicable)
- Request ID (for traceability)
- Timestamp

## Validation and Testing

### Running Tests

```bash
python -m pytest tests/ -v
```

### Test Coverage: 52 tests across 8 test classes

| Category | Tests | What's Tested |
|----------|-------|---------------|
| Health Check | 1 | API availability |
| Authentication | 4 | Login, users, roles |
| Service Catalog | 7 | CRUD, search, persistence, RBAC |
| Templates | 6 | Listing, creation, permissions |
| Provisioning | 6 | Full pipeline, CI/CD, audit, status |
| Policy Validation | 6 | Dev/Prod restrictions, limits, bypass |
| RBAC | 6 | Server-side enforcement, all roles |
| Scaffolding | 7 | Python/Node, audit, duplicates, RBAC |
| Audit Logging | 4 | Persistence, fields, viewer isolation |
| Dashboard | 1 | Real data from database |
| Failure Cases | 4 | 404, 401, policy recording |

### Key Test Scenarios

**Happy Path:**
1. ✅ Developer registers a service
2. ✅ Developer selects approved template
3. ✅ Developer requests development environment
4. ✅ Policy validation succeeds
5. ✅ Provisioning succeeds
6. ✅ CI/CD configuration is generated
7. ✅ Audit log is created
8. ✅ Dashboard updates with real data

**Failure Path:**
9. ✅ Developer attempts production provisioning
10. ✅ Policy rejects it
11. ✅ No provisioning occurs
12. ✅ Rejection appears in UI
13. ✅ Audit log records the rejection

**RBAC:**
14. ✅ Viewer cannot provision (403)
15. ✅ Unauthorized requests return 401
16. ✅ Developer cannot manage users/templates

**Template:**
17. ✅ Unapproved template is rejected
18. ✅ Duplicate service registration fails

## Manual vs Self-Service Comparison

| Metric | Manual Process | Self-Service Platform | Improvement |
|--------|---------------|----------------------|-------------|
| Service Registration | 30–60 min (ticket + wait) | ~1 min (form submit) | ~95% faster |
| Environment Provisioning | 1–3 hours (multiple handoffs) | ~2 min (auto-provision) | ~97% faster |
| CI/CD Setup | 30–60 min (manual config) | Instant (auto-generated) | ~100% faster |
| Policy Compliance | Manual review | Automated (always enforced) | 100% consistent |
| Audit Trail | None / manual notes | Automatic (every action) | Full visibility |

*Times based on platform testing. Manual process based on documented typical onboarding workflows.*

## Limitations

- **Local sandbox only**: Provisioning creates local project files, not real cloud infrastructure
- **SQLite database**: Suitable for development/demo, not production-scale
- **Simplified authentication**: Uses header-based auth; production would use JWT/OAuth
- **No real CI/CD**: Generates configuration but doesn't connect to actual deployment platforms
- **Single-tenant**: No multi-organization support
- **No service health checks**: Health status is manually set, not monitored

## Future Improvements

- **Real cloud provisioning**: Integrate with AWS/GCP/Azure for actual resource creation
- **Kubernetes operator**: Deploy scaffolded services to K8s clusters
- **Git integration**: Auto-create GitHub repos and push scaffolded code
- **Service mesh integration**: Auto-configure Istio/Linkerd sidecars
- **Monitoring integration**: Pull real health data from Prometheus/Grafana
- **Multi-environment promotion**: Promote services between dev → staging → production
- **Custom templates**: Allow teams to create organization-specific templates
- **Cost tracking**: Track resource costs per service/team
- **Slack/Teams notifications**: Notify teams of provisioning events
- **OIDC/SAML authentication**: Enterprise-grade identity integration
- **Multi-tenancy**: Support multiple organizations
- **Service dependency graph**: Visualize service interdependencies


## Security Notes

- **No secrets committed**: `.env` file is in `.gitignore`
- **Server-side RBAC**: Authorization enforced on every API endpoint
- **Policy before provisioning**: No bypass path exists
- **Safe provisioning only**: No arbitrary shell access or infrastructure commands
- **Audit trail**: Every action is traceable to a specific user
- **Input validation**: All inputs validated with Pydantic schemas
- **CORS configured**: Explicit origin whitelist for production