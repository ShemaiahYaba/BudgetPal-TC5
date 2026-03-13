# BudgetPal — Functional & Non-Functional Requirements
**Personal Finance Tracker API · Capstone 2026**

---

## Part 1 — Functional Requirements

---

### FR-01 — Authentication

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01.1 | The system must allow users to register with a name, email, and password | Must |
| FR-01.2 | Passwords must be hashed with bcrypt before storage | Must |
| FR-01.3 | Passwords must never appear in any API response | Must |
| FR-01.4 | On successful registration, the system must return a signed JWT | Must |
| FR-01.5 | On successful registration, a welcome email must be sent to the user | Must |
| FR-01.6 | The system must authenticate users via email and password, returning a JWT on success | Must |
| FR-01.7 | The system must provide an auth middleware that validates the JWT on all protected routes | Must |
| FR-01.8 | The system must return 401 for missing, invalid, or expired tokens | Must |
| FR-01.9 | The system must support a forgot-password flow that emails a time-limited reset link | Must |
| FR-01.10 | Reset tokens must expire after a fixed duration (e.g. 1 hour) | Must |
| FR-01.11 | Reset tokens must be invalidated after a single use | Must |
| FR-01.12 | The forgot-password endpoint must return 200 even for unknown emails (no user enumeration) | Must |
| FR-01.13 | The system must expose `GET /auth/me` returning the authenticated user's profile | Must |

---

### FR-02 — Categories

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-02.1 | Authenticated users can create personal categories with a name and type | Must |
| FR-02.2 | Category type must be one of: `income`, `expense` | Must |
| FR-02.3 | All category operations must be scoped to the authenticated user | Must |
| FR-02.4 | Users cannot view, edit, or delete another user's categories | Must |
| FR-02.5 | The system must reject deletion of a category that has transactions attached | Must |
| FR-02.6 | Categories support full CRUD (create, read, update, delete) | Must |

---

### FR-03 — Transactions

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-03.1 | Authenticated users can log transactions with type, amount, category, description, and date | Must |
| FR-03.2 | Transaction `amount` must be a positive number | Must |
| FR-03.3 | Transaction `date` must not be a future date | Must |
| FR-03.4 | Transactions must be linked to a category owned by the same user | Must |
| FR-03.5 | All transaction operations must be scoped to the authenticated user | Must |
| FR-03.6 | Transactions support full CRUD | Must |
| FR-03.7 | `GET /transactions` must support filtering by type, category, date range, and month+year | Must |
| FR-03.8 | `GET /transactions` must support pagination | Should |
| FR-03.9 | After every transaction POST or PUT, the system must check the relevant budget and trigger an alert email if the 80% or 100% threshold is crossed | Must |
| FR-03.10 | Budget alert emails must not be sent if no budget is set for that category/month | Must |

---

### FR-04 — Budgets

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-04.1 | Authenticated users can set a monthly spending limit per category | Must |
| FR-04.2 | A budget must be unique per user per category per month per year | Must |
| FR-04.3 | Budgets can only be set on `expense` type categories | Must |
| FR-04.4 | `limit_amount` must be a positive number | Must |
| FR-04.5 | Every budget read must include live-computed `spent`, `remaining`, `percent_used`, and `status` fields | Must |
| FR-04.6 | Budget `status` must be: `safe` (< 80%), `warning` (80–99%), `exceeded` (≥ 100%) | Must |
| FR-04.7 | `GET /budgets/status` must return the current month's budget overview for all the user's expense categories | Must |
| FR-04.8 | Budgets support full CRUD | Must |
| FR-04.9 | All budget operations must be scoped to the authenticated user | Must |
| FR-04.10 | `GET /budgets` must support filtering by month and year | Should |

---

### FR-05 — Reports

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-05.1 | The system must provide a summary report of total income vs total expenses for a given period | Must |
| FR-05.2 | The summary report must include a `net` value (income minus expenses) | Must |
| FR-05.3 | The system must provide a category breakdown report showing total spent per category | Must |
| FR-05.4 | The category breakdown must support filtering by type and month+year | Must |
| FR-05.5 | The system must provide a month-by-month overview report | Must |
| FR-05.6 | All reports must be scoped to the authenticated user only | Must |
| FR-05.7 | All report endpoints must support date range and month+year query parameters | Must |
| FR-05.8 | The system must allow a user to request an on-demand report via email | Must |
| FR-05.9 | The on-demand email report must include income, expenses, net, and category breakdown | Must |

---

### FR-06 — Email Service

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-06.1 | The system must send a welcome email on successful user registration | Must |
| FR-06.2 | The system must send a password reset email with a time-limited link on forgot-password | Must |
| FR-06.3 | The system must send a budget warning email when spending reaches 80% of the limit | Must |
| FR-06.4 | The system must send a budget exceeded email when spending reaches 100% of the limit | Must |
| FR-06.5 | Budget alert emails must not spam — each threshold (80%, 100%) triggers at most once per budget per month | Should |
| FR-06.6 | The system must send a monthly spending summary email on the 1st of every month | Must |
| FR-06.7 | The monthly summary must cover the previous calendar month | Must |
| FR-06.8 | The monthly summary cron job must run daily at 08:00 WAT (UTC+1) on the 1st | Must |
| FR-06.9 | The system must support on-demand report emails triggered by the user | Must |

---

### FR-07 — EJS Web Interface

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-07.1 | The system must serve an EJS-based web interface for visual testing | Should |
| FR-07.2 | The interface must include registration and login views | Should |
| FR-07.3 | The interface must include a dashboard showing income, expenses, and budget status | Should |
| FR-07.4 | The interface must include a transactions view | Should |
| FR-07.5 | The interface must include a budgets view | Should |
| FR-07.6 | The interface must include a reports view | Could |
| FR-07.7 | EJS views must consume the same REST API endpoints — no separate data layer | Should |

---

### FR-08 — General

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-08.1 | All inputs must be validated with express-validator | Must |
| FR-08.2 | All responses must follow a consistent `{ success, message, data }` JSON shape | Must |
| FR-08.3 | All error responses must include a human-readable message and HTTP status code | Must |
| FR-08.4 | The API must be versioned under `/api/v1/` | Must |
| FR-08.5 | The system must expose Swagger documentation at `GET /api/v1/docs` | Must |
| FR-08.6 | The system must expose `GET /api/v1/health` as an unauthenticated health check | Must |
| FR-08.7 | All models must include `created_at` and `updated_at` timestamps | Must |
| FR-08.8 | Soft-delete is not required — hard deletes are acceptable for this project | — |

---

## Part 2 — Non-Functional Requirements

---

### NFR-01 — Security

| ID | Requirement |
|----|-------------|
| NFR-01.1 | All passwords must be bcrypt hashed with a cost factor ≥ 10 |
| NFR-01.2 | JWT must be signed with a secret ≥ 32 characters stored in `.env` |
| NFR-01.3 | JWT expiry must be enforced — expired tokens return 401 |
| NFR-01.4 | Password reset tokens must be hashed before storage — raw token only in the email link |
| NFR-01.5 | No sensitive fields (password, reset_token) in any API response |
| NFR-01.6 | Helmet registered for secure HTTP headers |
| NFR-01.7 | User data isolation must be enforced in every query — not just at the route level |
| NFR-01.8 | Raw database errors must never be exposed to the client |

---

### NFR-02 — Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-02.1 | All CRUD responses | < 500ms |
| NFR-02.2 | Report aggregation queries | < 800ms with seeded data |
| NFR-02.3 | Indexed columns used for all filter/report queries | date, user_id, category_id |

---

### NFR-03 — Reliability

| ID | Requirement |
|----|-------------|
| NFR-03.1 | Global error handler catches all unhandled exceptions — no raw 500 stack traces |
| NFR-03.2 | Email send failure must not crash the request — wrap in try/catch, log, continue |
| NFR-03.3 | Cron job execution must be logged |
| NFR-03.4 | Required environment variables must be validated on startup |

---

### NFR-04 — Maintainability

| ID | Requirement |
|----|-------------|
| NFR-04.1 | Business logic in service layer — not inline in route handlers |
| NFR-04.2 | Email templates in dedicated files — not hardcoded in service functions |
| NFR-04.3 | No hardcoded values — all config via `.env` |
| NFR-04.4 | Database changes via Sequelize migrations only |

---

### NFR-05 — Developer Experience

| ID | Requirement |
|----|-------------|
| NFR-05.1 | Swagger at `/api/v1/docs` with all 26 endpoints documented |
| NFR-05.2 | Postman collection provided |
| NFR-05.3 | README includes setup, env reference, seed credentials, scripts |
| NFR-05.4 | `npm run seed` populates enough data to demonstrate all features |

---

## Requirements Summary

| Category | Must | Should | Could | Total |
|----------|------|--------|-------|-------|
| Authentication | 13 | 0 | 0 | 13 |
| Categories | 6 | 0 | 0 | 6 |
| Transactions | 9 | 1 | 0 | 10 |
| Budgets | 9 | 1 | 0 | 10 |
| Reports | 9 | 0 | 0 | 9 |
| Email Service | 7 | 1 | 0 | 8 |
| EJS Interface | 0 | 6 | 1 | 7 |
| General | 7 | 0 | 0 | 7 |
| **Functional Total** | **60** | **9** | **1** | **70** |
| Non-Functional | — | — | — | 20 |
| **Grand Total** | — | — | — | **90** |

---

*BudgetPal · Functional & Non-Functional Requirements v1.0 · March 2026*
