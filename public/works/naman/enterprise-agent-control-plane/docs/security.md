# Security

## Authentication

- JWT-based authentication for dashboard users.
- Passwords hashed with bcrypt.
- Tokens expire after configured duration.

## Authorization

- RBAC enforced on all admin endpoints.
- Roles: `ADMIN`, `APPROVER`, `VIEWER`.
- Backend-only enforcement; frontend hiding is not sufficient.

## Deny-by-Default

- Unknown agents are denied.
- Missing policies result in denial.
- Disabled agents are denied.
- Unauthorized tools are denied.
- Rate-limit violations are denied.

## Gateway Enforcement

- All tool calls pass through `/api/v1/tool-calls`.
- Policy evaluation occurs before tool execution.
- No bypass path exists for managed agents.

## Audit Logging

- Every action is logged (ALLOWED, BLOCKED, ERROR).
- Audit records are append-only through API design.
- Sensitive data is redacted from summaries.

## Rate Limiting

- In-memory sliding-window rate limiter per agent.
- Configurable via policy.
- Violations are logged.

## Kill Switch

- Administrators can disable agents.
- Disabled agents cannot execute tools.
- Kill switch overrides normal policy.

## Secret Management

- Secrets supplied via environment variables.
- `.env` files are gitignored.
- `.env.example` provided with placeholders.

## Input Validation

- Pydantic schemas validate all incoming requests.
- Malformed requests are rejected.

## Error Handling

- Security-sensitive failures fail closed.
- Error messages do not leak secrets or internal details.