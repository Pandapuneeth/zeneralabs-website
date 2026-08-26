# Validation Scenarios

The simulator ships with a documented, automated validation suite
(`backend/tests/validation/`) and predefined templates
(`backend/app/simulation/scenarios.py`). Every scenario is reproducible.

## 1 — Normal Operation

A representative workforce and normal task demand. Verifies that throughput,
SLA, error rate, utilization, and backlog are all sensible and internally
consistent (e.g. throughput ≤ arrivals; utilization ≤ 100% when capacity exists).

## 2 — Zero Staffing

Workers = 0. Expected:

- Completed tasks = 0
- Backlog grows with incoming demand
- No division-by-zero
- No application crash

## 3 — Extreme Demand Spike

Incoming demand greatly exceeds capacity. Expected:

- The simulator continues operating
- Backlog grows but the queue is bounded (resource limits)
- Metrics remain defined (no crash, no NaN)

## 4 — No Demand

All arrival rates = 0. Expected:

- Simulation completes successfully
- Zero arrivals, zero completions, zero backlog
- All metrics are zero (defined, not NaN)

## 5 — Reproducibility

Same configuration + same seed must produce identical metrics and time series.

## 6 — Invalid Input

Malformed configurations return controlled `VALIDATION_ERROR` responses (HTTP
422), never a stack trace.