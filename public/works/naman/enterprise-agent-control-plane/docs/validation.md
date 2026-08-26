# Validation

## Running the Demo

```bash
python scripts/demo.py
```

## Running Tests

```bash
cd backend
pytest tests/ -v
```

## Validation Scenarios

### Scenario 1: Authorized Request

```text
Fraud Agent -> search_transactions -> ALLOWED
```

### Scenario 2: Unauthorized Request

```text
Fraud Agent -> refund_payment -> BLOCKED
Reason: Tool not permitted by policy
```

### Scenario 3: Rate Limit

```text
11th request -> BLOCKED
Reason: Rate limit exceeded
```

### Scenario 4: Kill Switch

```text
Admin disables agent
Agent requests tool -> BLOCKED
Reason: Agent is disabled
```

### Scenario 5: Audit Verification

```text
All previous actions are visible in audit logs.
```

## Security Validation

| Control | Expected Result |
|---|---|
| Authentication | Unauthenticated admin request rejected |
| RBAC | Unauthorized administrative action rejected |
| Agent status | Disabled agent rejected |
| Tool permission | Unauthorized tool rejected |
| Data scope | Unauthorized scope rejected |
| Rate limit | Excessive requests rejected |
| Audit | Allowed and blocked requests recorded |
| Kill switch | Future agent requests rejected |
| Policy failure | Request fails closed |
| Secret handling | No credentials committed |
| Input validation | Invalid requests rejected |
| Gateway enforcement | Protected tools cannot bypass policy |