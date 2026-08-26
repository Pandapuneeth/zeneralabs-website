# API Documentation

## Base URL

```
/api/v1
```

## Authentication

All protected endpoints require a Bearer token:

```
Authorization: Bearer <token>
```

## Endpoints

### Auth

- `POST /auth/login` - Login (form data: username, password)

### Agents

- `GET /agents` - List agents
- `POST /agents` - Create agent (ADMIN)
- `GET /agents/{id}` - Get agent
- `PATCH /agents/{id}` - Update agent (ADMIN)
- `POST /agents/{id}/disable` - Disable agent (ADMIN)
- `POST /agents/{id}/enable` - Enable agent (ADMIN)

### Policies

- `GET /policies` - List policies
- `POST /policies` - Create policy (ADMIN)
- `GET /policies/{id}` - Get policy
- `PATCH /policies/{id}` - Update policy (ADMIN)

### Tool Calls

- `POST /tool-calls` - Execute tool through gateway

### Audit Logs

- `GET /audit-logs` - List audit logs (supports filters: agent_id, tool, decision)

### Dashboard

- `GET /dashboard/summary` - Get dashboard summary

### Users

- `GET /users` - List users
- `POST /users` - Create user (ADMIN)
- `PATCH /users/{id}` - Update user (ADMIN)

## Tool Call Request

```json
{
  "agent_id": "uuid",
  "tool": "search_transactions",
  "arguments": {
    "customer_id": "C123"
  }
}
```

## Tool Call Response

```json
{
  "result": {},
  "decision": "ALLOWED",
  "reason": null
}
```
