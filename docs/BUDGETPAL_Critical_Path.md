# BudgetPal — Critical Path Analysis
**Personal Finance Tracker API · Capstone 2026**  
*Solo project. 3-day delivery. Every hour counts — this document defines what order to build in and what cannot wait.*

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          🚀  START                                  │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
╔═════════════════════════════════════════════════════════════════════╗
║              🔴  CRITICAL PATH — Must complete in order             ║
║                                                                     ║
║  ┌─────────────────────────────────────────────────────────────┐   ║
║  │  1️⃣  PROJECT SETUP                                          │   ║
║  │  • Init repo + folder structure                             │   ║
║  │  • Express app scaffold + middleware stack                  │   ║
║  │  • dotenv + .env.example                                   │   ║
║  │  • CORS, Helmet, Morgan                                     │   ║
║  │  • Global error handler + 404 catch-all                    │   ║
║  │  • GET /api/v1/health                                       │   ║
║  │  • EJS setup (views folder, engine registered)             │   ║
║  │  • npm scripts: start, dev, migrate, seed                  │   ║
║  └──────────────────────────┬────────────────────────────────┘   ║
║                             │                                       ║
║                             ▼                                       ║
║  ┌─────────────────────────────────────────────────────────────┐   ║
║  │  2️⃣  DATABASE — MIGRATIONS & MODELS                         │   ║
║  │  • Sequelize config + DB connection test                    │   ║
║  │  • users table + model                                      │   ║
║  │  • categories table + model    (FK → users)                 │   ║
║  │  • transactions table + model  (FK → users, categories)     │   ║
║  │  • budgets table + model       (FK → users, categories)     │   ║
║  │  • UNIQUE constraint on budgets (user+category+month+year)  │   ║
║  │  • All Sequelize associations defined                       │   ║
║  └──────────────────────────┬────────────────────────────────┘   ║
║                             │                                       ║
║                             ▼                                       ║
║  ┌─────────────────────────────────────────────────────────────┐   ║
║  │  3️⃣  AUTHENTICATION SYSTEM                                  │   ║
║  │  • POST  /api/v1/auth/register  → bcrypt hash + JWT         │   ║
║  │  • POST  /api/v1/auth/login     → verify + JWT              │   ║
║  │  • POST  /api/v1/auth/logout                                │   ║
║  │  • POST  /api/v1/auth/forgot-password  → email reset link   │   ║
║  │  • POST  /api/v1/auth/reset-password   → update password    │   ║
║  │  • GET   /api/v1/auth/me                                    │   ║
║  │  • authMiddleware  → validates JWT, attaches req.user       │   ║
║  │  • Welcome email triggered on register                      │   ║
║  └──────────────────────────┬────────────────────────────────┘   ║
╚═════════════════════════════╪═══════════════════════════════════════╝
                              │
                              ▼
╔═════════════════════════════════════════════════════════════════════╗
║         🟡  HIGH PRIORITY — Core features, build next              ║
║                                                                     ║
║              ┌──────────────┴──────────────┐                       ║
║              │                             │                       ║
║              ▼                             ▼                       ║
║  ┌───────────────────────────┐  ┌───────────────────────────────┐  ║
║  │  4️⃣  CATEGORIES MODULE    │  │  5️⃣  TRANSACTIONS MODULE      │  ║
║  │                           │  │                               │  ║
║  │  GET    /api/v1/categories│  │  GET    /api/v1/transactions  │  ║
║  │  POST   /api/v1/categories│  │  POST   /api/v1/transactions  │  ║
║  │  GET    /:id              │  │  GET    /:id                  │  ║
║  │  PUT    /:id              │  │  PUT    /:id                  │  ║
║  │  DELETE /:id              │  │  DELETE /:id                  │  ║
║  │  User-scoped              │  │  User-scoped                  │  ║
║  │  type ENUM validation     │  │  amount > 0 validation        │  ║
║  └─────────────┬─────────────┘  │  date validation              │  ║
║                │                │  Budget alert check on POST   │  ║
║                │                └─────────────┬─────────────────┘  ║
║                └──────────────┬───────────────┘                    ║
║                               │                                    ║
║                               ▼                                    ║
║  ┌─────────────────────────────────────────────────────────────┐   ║
║  │  6️⃣  BUDGETS MODULE                                         │   ║
║  │                                                             │   ║
║  │  GET    /api/v1/budgets                                     │   ║
║  │  POST   /api/v1/budgets                                     │   ║
║  │  GET    /api/v1/budgets/:id                                 │   ║
║  │  PUT    /api/v1/budgets/:id                                 │   ║
║  │  DELETE /api/v1/budgets/:id                                 │   ║
║  │  GET    /api/v1/budgets/status   (current month summary)    │   ║
║  │  UNIQUE constraint enforced (user+category+month+year)      │   ║
║  │  spent vs limit computed on every read                      │   ║
║  └──────────────────────────┬────────────────────────────────┘   ║
║                             │                                       ║
║                             ▼                                       ║
║  ┌─────────────────────────────────────────────────────────────┐   ║
║  │  7️⃣  DATABASE SEEDERS                                       │   ║
║  │  • 2–3 test users (with known credentials)                  │   ║
║  │  • 6–8 categories per user (mix of income + expense)        │   ║
║  │  • 20–30 transactions (spread across months)                │   ║
║  │  • 3–5 budgets (including some at 80%+ and 100%+ spent)     │   ║
║  └──────────────────────────┬────────────────────────────────┘   ║
╚═════════════════════════════╪═══════════════════════════════════════╝
                              │
                              ▼
╔═════════════════════════════════════════════════════════════════════╗
║         🟢  NON-BLOCKING — Build once core modules are done         ║
║                                                                     ║
║         ┌──────────────────┬──────────────────────────┐            ║
║         │                  │                          │            ║
║         ▼                  ▼                          ▼            ║
║  ┌────────────┐   ┌────────────────────┐   ┌──────────────────┐   ║
║  │  8️⃣         │   │  9️⃣                │   │  🔟               │   ║
║  │  REPORTS   │   │  BUDGET ALERTS     │   │  EJS VIEWS       │   ║
║  │  MODULE    │   │  EMAIL SERVICE     │   │                  │   ║
║  │            │   │                   │   │  /               │   ║
║  │ GET        │   │ Triggered on       │   │  /login          │   ║
║  │ /summary   │   │ transaction POST   │   │  /register       │   ║
║  │            │   │ if budget ≥ 80%    │   │  /dashboard      │   ║
║  │ GET        │   │ or ≥ 100%          │   │  /transactions   │   ║
║  │ /by-       │   │                   │   │  /budgets        │   ║
║  │  category  │   │ node-cron monthly  │   │  /reports        │   ║
║  │            │   │ summary job        │   │                  │   ║
║  │ GET        │   │                   │   │  Calls own API   │   ║
║  │ /monthly   │   │ Forgot password    │   │  endpoints       │   ║
║  │            │   │ email flow         │   │                  │   ║
║  │ POST       │   │                   │   │                  │   ║
║  │ /email     │   │                   │   │                  │   ║
║  └─────┬──────┘   └────────┬──────────┘   └──────────┬───────┘   ║
║        └──────────────────┴──────────────────────────┘            ║
╚═════════════════════════════════════════════════════════════════════╝
                              │
                              ▼
╔═════════════════════════════════════════════════════════════════════╗
║            ⚪  STANDALONE — Zero dependencies, build anytime        ║
║                                                                     ║
║  ┌───────────────────────────────────────────────────────────┐     ║
║  │  1️⃣1️⃣  SWAGGER DOCUMENTATION                              │     ║
║  │  • swagger-jsdoc + swagger-ui-express                     │     ║
║  │  • Accessible at GET /api/v1/docs                         │     ║
║  │  • All endpoints documented with schemas                  │     ║
║  │  • JWT Bearer auth scheme documented                      │     ║
║  └───────────────────────────────────────────────────────────┘     ║
╚═════════════════════════════════════════════════════════════════════╝
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│              ✅  API COMPLETE — READY FOR SUBMISSION                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## The Critical Chain

```
Setup → DB Models → Auth → Categories + Transactions (parallel) → Budgets → Seeders → Reports + Alerts + EJS → Swagger
```

The first three are strictly sequential and gate everything else. Categories and Transactions can be built in parallel since they only depend on Auth being done. Budgets depends on both being done because it links users + categories and its alert logic reads transactions.

---

## Task Breakdown

---

### 🔴 TASK 1 — Project Setup
**Day 1 — first thing**

| Deliverable | Detail |
|-------------|--------|
| Folder structure | `src/config`, `controllers`, `middlewares`, `models`, `routes`, `services`, `utils` + `views/` |
| Express app | `app.js` with full middleware stack |
| API versioning | All routes mounted under `/api/v1/` |
| EJS | Engine registered, `views/` directory created |
| Security | helmet, cors, morgan registered |
| Error handling | Global error handler + 404 catch-all |
| Health check | `GET /api/v1/health` → `{ status: "ok" }` |
| Environment | `.env` + `.env.example` committed |
| Scripts | `start`, `dev`, `migrate`, `seed` |

**Done when:** `npm run dev` starts, `/api/v1/health` returns 200.

---

### 🔴 TASK 2 — Database Migrations & Models
**Day 1 — immediately after setup**

Migration order is mandatory:
```
1. users
2. categories   (FK → users)
3. transactions (FK → users, categories)
4. budgets      (FK → users, categories + UNIQUE constraint)
```

**Done when:** `npm run migrate` succeeds, all 4 tables exist with correct constraints.

---

### 🔴 TASK 3 — Authentication System
**Day 1 — complete before end of day**

This is the most critical task in the project. Nothing else is testable without it. The email service must also be bootstrapped here for the welcome email.

| Endpoint | Detail |
|----------|--------|
| `POST /api/v1/auth/register` | Creates user, bcrypt hash, sends welcome email, returns JWT |
| `POST /api/v1/auth/login` | Validates credentials, returns JWT |
| `POST /api/v1/auth/logout` | Returns 200, client-side token drop |
| `POST /api/v1/auth/forgot-password` | Generates reset token, emails reset link |
| `POST /api/v1/auth/reset-password` | Validates token, updates password, clears token |
| `GET  /api/v1/auth/me` | Returns current user profile |
| `authMiddleware` | Validates JWT, attaches `req.user` |

**Password reset flow:**
```
1. User POSTs email to /forgot-password
2. Server generates a random token, hashes it, stores in reset_token + reset_expires
3. Sends email with link: /reset-password?token=<raw_token>
4. User POSTs new password + raw token to /reset-password
5. Server hashes raw token, compares to stored hash, checks expiry
6. Updates password, clears reset_token and reset_expires
```

**Done when:** Register returns JWT + welcome email is sent, login works, forgot/reset flow works end to end.

---

### 🟡 TASK 4 — Categories Module
**Day 2 — morning**

| Endpoint | Detail |
|----------|--------|
| `GET /api/v1/categories` | Returns authenticated user's categories only |
| `POST /api/v1/categories` | Creates category for authenticated user |
| `GET /api/v1/categories/:id` | Returns single category (user-scoped) |
| `PUT /api/v1/categories/:id` | Updates category (user-scoped) |
| `DELETE /api/v1/categories/:id` | Deletes category — reject if has transactions |

**Key rules:**
- All queries must be scoped with `where: { user_id: req.user.id }`
- Cannot delete a category that has transactions attached — return 409
- `type` must be `income` or `expense`

---

### 🟡 TASK 5 — Transactions Module
**Day 2 — morning (parallel with categories)**

| Endpoint | Detail |
|----------|--------|
| `GET /api/v1/transactions` | User's transactions with optional filters |
| `POST /api/v1/transactions` | Creates transaction, triggers budget alert check |
| `GET /api/v1/transactions/:id` | Single transaction (user-scoped) |
| `PUT /api/v1/transactions/:id` | Updates transaction, re-triggers alert check |
| `DELETE /api/v1/transactions/:id` | Deletes transaction |

**Filters on GET /transactions:**
- `?type=income|expense`
- `?category_id=uuid`
- `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`
- `?month=3&year=2026`
- `?page=1&limit=20`

**Budget alert check — triggered on every POST and PUT:**
```
After saving transaction:
1. Find budget for (user_id, category_id, current month, current year)
2. If no budget exists → skip
3. Calculate total spent this month for that category
4. If spent ≥ 100% of limit → send "exceeded" email (once — don't spam)
5. If spent ≥ 80% of limit → send "approaching" email (once)
```

**Key validations:**
- `amount` must be a positive number
- `category_id` must belong to the authenticated user
- `date` must be a valid date, not in the future

---

### 🟡 TASK 6 — Budgets Module
**Day 2 — afternoon (after categories + transactions done)**

| Endpoint | Detail |
|----------|--------|
| `GET /api/v1/budgets` | User's budgets with spent amount and percentage |
| `POST /api/v1/budgets` | Creates budget for a category + month + year |
| `GET /api/v1/budgets/:id` | Single budget with live spent calculation |
| `PUT /api/v1/budgets/:id` | Updates limit_amount |
| `DELETE /api/v1/budgets/:id` | Removes budget |
| `GET /api/v1/budgets/status` | Current month budget overview for all categories |

**Every budget read must include live computed fields:**
```json
{
  "id": "uuid",
  "category": { "name": "Food", "type": "expense" },
  "month": 3,
  "year": 2026,
  "limit_amount": 50000,
  "spent": 42000,
  "remaining": 8000,
  "percent_used": 84,
  "status": "warning"   // "safe" < 80%, "warning" 80–99%, "exceeded" >= 100%
}
```

**Validations:**
- `category_id` must belong to the authenticated user
- `category.type` must be `expense` — budgets only apply to expense categories
- `limit_amount` must be > 0
- UNIQUE constraint: one budget per user per category per month per year

---

### 🟡 TASK 7 — Database Seeders
**Day 2 — end of day**

| Seeder | Records |
|--------|---------|
| Users | 2 users with known credentials |
| Categories | 5–6 per user (mix: Food, Transport, Rent, Salary, Freelance) |
| Transactions | 20–30 spread across last 3 months |
| Budgets | 4–5 budgets: 1 safe, 1 at ~80%, 1 exceeded, 1 current month |

**Test credentials:**
```
user1@budgetpal.com  / Password123!
user2@budgetpal.com  / Password123!
```

---

### 🟢 TASK 8 — Reports Module
**Day 3 — morning**

| Endpoint | Detail |
|----------|--------|
| `GET /api/v1/reports/summary` | Total income vs total expenses for a period |
| `GET /api/v1/reports/by-category` | Spending breakdown per category |
| `GET /api/v1/reports/monthly` | Month-by-month overview |
| `POST /api/v1/reports/email` | Triggers on-demand report email to user |

All report endpoints support `?month=&year=` or `?start_date=&end_date=` query params.

---

### 🟢 TASK 9 — Budget Alert Email Service + Cron Job
**Day 3 — morning**

| Deliverable | Detail |
|-------------|--------|
| Email service | `src/services/emailService.js` — reusable `sendEmail()` |
| Welcome email | Triggered on register |
| Forgot password email | Triggered on forgot-password |
| 80% alert email | Triggered on transaction save when budget hits 80% |
| 100% alert email | Triggered on transaction save when budget is exceeded |
| Monthly summary cron | Runs on 1st of every month at 08:00 — sends previous month summary to all users |
| On-demand report email | Triggered by `POST /api/v1/reports/email` |

---

### 🟢 TASK 10 — EJS Web Interface
**Day 3 — afternoon**

| View | Route | Description |
|------|-------|-------------|
| Home / Landing | `GET /` | Simple landing page with links to login/register |
| Register | `GET /register` | Registration form → calls `POST /api/v1/auth/register` |
| Login | `GET /login` | Login form → calls `POST /api/v1/auth/login` |
| Dashboard | `GET /dashboard` | Summary stats — income, expenses, budgets |
| Transactions | `GET /transactions` | List + add transaction form |
| Budgets | `GET /budgets` | Budget list with spent/limit bars |
| Reports | `GET /reports` | Summary and category breakdown |

---

### ⚪ TASK 11 — Swagger Documentation
**Day 3 — final task, written progressively**

- All endpoints documented with JSDoc annotations
- Request/response schemas for every endpoint
- JWT Bearer auth scheme
- Accessible at `GET /api/v1/docs`

---

## Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1. Setup | Nothing | Everything |
| 2. DB Models | Task 1 | Tasks 3–7 |
| 3. Auth | Task 2 | Tasks 4–11 |
| 4. Categories | Task 3 | Tasks 6, 8 |
| 5. Transactions | Task 3 | Tasks 6, 8, 9 |
| 6. Budgets | Tasks 4, 5 | Tasks 8, 9 |
| 7. Seeders | Task 6 | Realistic testing |
| 8. Reports | Tasks 6, 7 | Task 9 (email report) |
| 9. Alerts + Email | Tasks 5, 8 | Nothing |
| 10. EJS Views | Tasks 4–8 | Nothing |
| 11. Swagger | All tasks | Nothing |

---

## 3-Day Execution Plan

| Time | Task |
|------|------|
| **Day 1 AM** | Task 1 — Project Setup |
| **Day 1 AM** | Task 2 — DB Migrations + Models |
| **Day 1 PM** | Task 3 — Auth System (full, including email bootstrap) |
| **Day 2 AM** | Tasks 4 + 5 — Categories + Transactions (parallel) |
| **Day 2 PM** | Task 6 — Budgets Module |
| **Day 2 EOD** | Task 7 — Seeders |
| **Day 3 AM** | Task 8 — Reports Module |
| **Day 3 AM** | Task 9 — Budget Alerts + Cron Job |
| **Day 3 PM** | Task 10 — EJS Views |
| **Day 3 PM** | Task 11 — Swagger |
| **Day 3 EOD** | Bug fixes, README polish, full test run |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Auth + email setup takes too long on Day 1 | High | Set up email service as a simple utility first, wire welcome email after auth routes work |
| Budget alert logic triggers duplicate emails | Medium | Track alert state — add `alerted_80` and `alerted_100` boolean flags to budgets table, or check before sending |
| Forgot password token expiry misconfigured | Medium | Test the full flow immediately after building it |
| EJS views delayed — deprioritise if running behind | Low | EJS is nice-to-have for the demo, not for the API grade |
| Reports query performance on large seed data | Low | Keep seed data small and indexes in place |

---

*BudgetPal · Critical Path Analysis v1.0 · March 2026*
