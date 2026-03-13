# BudgetPal — Personal Finance Tracker API
**Capstone 2026**

A RESTful API for tracking personal income and expenses, managing category-based monthly budgets, and generating spending reports — with email notifications for budget alerts, password resets, and monthly summaries.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [API Overview](#api-overview)
- [Test Credentials](#test-credentials)
- [Project Structure](#project-structure)
- [Scripts Reference](#scripts-reference)
- [Email Flows](#email-flows)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js v20+ (ESM) |
| Framework | Express.js v4 |
| Database | MySQL 8 |
| ORM | Sequelize v6 |
| Auth | JWT + bcrypt |
| Validation | express-validator |
| Email | Nodemailer |
| Scheduling | node-cron |
| Docs | Swagger UI (`/api/v1/docs`) |
| Views | EJS |
| Logging | Morgan |

---

## Prerequisites

- **Node.js** v20+
- **MySQL** 8.x running locally
- **npm**

```bash
node -v        # v20+
mysql --version
npm -v
```

---

## Getting Started

```bash
# 1. Clone
git clone <repo-url>
cd BudgetPal-TC5

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env with your values

# 4. Create the database
mysql -u root -p -e "CREATE DATABASE budgetpal_db;"

# 5. Run migrations
npm run migrate

# 6. Seed demo data
npm run seed

# 7. Start dev server
npm run dev
```

Verify:
```
GET http://localhost:5001/api/v1/health
→ { "success": true, "message": "BudgetPal API is running.", "data": { "status": "ok" } }
```

---

## Environment Variables

```env
PORT=5001
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=budgetpal_db
DB_USER=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=your_super_secret_jwt_key_minimum_32_chars
JWT_EXPIRES_IN=7d

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
MAIL_FROM="BudgetPal <no-reply@budgetpal.com>"

FRONTEND_URL=http://localhost:3000
```

| Variable | Required | Notes |
|----------|----------|-------|
| `PORT` | Yes | Server port (default 5001) |
| `DB_*` | Yes | MySQL connection details |
| `JWT_SECRET` | Yes | Min 32 chars — generate with `openssl rand -base64 64` |
| `JWT_EXPIRES_IN` | Yes | e.g. `7d`, `24h` |
| `MAIL_*` | Yes | Required for email flows |
| `FRONTEND_URL` | No | Used in password reset link (default `http://localhost:3000`) |

> `.env` is gitignored. Never commit it.

---

## Database Setup

### Migrations

```bash
npm run migrate           # Run all pending migrations
npm run migrate:undo      # Undo last migration
npm run migrate:undo:all  # Drop all tables
```

**Migration order (enforced by FK constraints):**
```
1. users
2. categories   → FK: users
3. transactions → FK: users, categories
4. budgets      → FK: users, categories  (UNIQUE: user+category+month+year)
```

### Seeders

```bash
npm run seed        # Insert demo users, categories, transactions, budgets
npm run seed:undo   # Remove all seeded rows
```

---

## Running the Server

```bash
npm run dev    # Development with nodemon
npm start      # Production
```

| URL | Description |
|-----|-------------|
| `http://localhost:5001/api/v1/health` | Health check |
| `http://localhost:5001/api/v1/docs`   | Swagger UI |
| `http://localhost:5001`               | Web interface (EJS) |

---

## API Overview

Base URL: `http://localhost:5001/api/v1`

All protected routes require:
```
Authorization: Bearer <JWT>
```

All responses follow:
```json
{ "success": true | false, "message": "...", "data": {} | [] | null }
```

### Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /auth/register | ❌ | Register + welcome email |
| POST | /auth/login | ❌ | Login |
| POST | /auth/logout | ✅ | Logout |
| POST | /auth/forgot-password | ❌ | Request password reset email |
| POST | /auth/reset-password | ❌ | Reset password via token |
| GET | /auth/me | ✅ | Get current user profile |
| GET | /categories | ✅ | List user's categories |
| POST | /categories | ✅ | Create category |
| GET | /categories/:id | ✅ | Get category |
| PUT | /categories/:id | ✅ | Update category |
| DELETE | /categories/:id | ✅ | Delete category (blocked if has transactions) |
| GET | /transactions | ✅ | List transactions (type / category / date filters) |
| POST | /transactions | ✅ | Create transaction + budget alert check |
| GET | /transactions/:id | ✅ | Get transaction |
| PUT | /transactions/:id | ✅ | Update transaction + budget alert re-check |
| DELETE | /transactions/:id | ✅ | Delete transaction |
| GET | /budgets | ✅ | List budgets (month/year filter) |
| POST | /budgets | ✅ | Create monthly budget (expense categories only) |
| GET | /budgets/status | ✅ | Current month budget overview |
| GET | /budgets/:id | ✅ | Get budget with live spent/remaining/status |
| GET | /budgets/:id/status | ✅ | Live status for a specific budget |
| PUT | /budgets/:id | ✅ | Update budget limit |
| DELETE | /budgets/:id | ✅ | Delete budget |
| GET | /reports/summary | ✅ | Income vs expenses for a period |
| GET | /reports/by-category | ✅ | Spending grouped by category |
| GET | /reports/monthly | ✅ | Month-by-month trend (last 6 or full year) |
| POST | /reports/email | ✅ | Email summary report to user |

**Total: 27 endpoints** (including `/health`)

---

## Test Credentials

Seeded by `npm run seed`:

| Name | Email | Password |
|------|-------|----------|
| Alice Demo | `alice@demo.com` | `password123` |
| Bob Demo | `bob@demo.com` | `password123` |

Alice has 9 transactions (Feb + Mar 2026) and 4 budgets.
Bob has 3 transactions and 2 budgets (both Mar 2026).

---

## Project Structure

```
BudgetPal-TC5/
├── src/
│   ├── app.js                        # Express app entry point
│   ├── config/
│   │   ├── database.js               # Sequelize-cli config (ESM)
│   │   ├── settings.js               # Centralised env config
│   │   └── swagger.js                # swagger-jsdoc spec
│   ├── constants/
│   │   ├── errorCodes.js             # HTTP + ERR constants
│   │   ├── types.js                  # Domain enums
│   │   └── index.js                  # Barrel export
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── transactionController.js
│   │   ├── budgetController.js
│   │   └── reportController.js
│   ├── docs/                         # Swagger JSDoc annotations
│   │   ├── auth.js
│   │   ├── categories.js
│   │   ├── transactions.js
│   │   ├── budgets.js
│   │   └── reports.js
│   ├── jobs/
│   │   ├── index.js                  # Starts all cron jobs
│   │   └── budgetAlertJob.js         # Daily 08:00 budget sweep
│   ├── middlewares/
│   │   ├── authMiddleware.js         # JWT verify
│   │   └── errors/
│   │       ├── appError.js
│   │       ├── ormError.js
│   │       ├── serverError.js
│   │       ├── validationError.js
│   │       └── index.js              # notFoundHandler + errorHandler
│   ├── models/
│   │   ├── index.js                  # Sequelize instance + associations
│   │   ├── User.js
│   │   ├── Category.js
│   │   ├── Transaction.js
│   │   └── Budget.js
│   ├── routes/
│   │   ├── index.js                  # Root router + health check
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── budgetRoutes.js
│   │   └── reportRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── categoryService.js
│   │   ├── transactionService.js
│   │   ├── budgetService.js
│   │   ├── budgetAlertService.js
│   │   ├── reportService.js
│   │   └── email/
│   │       ├── index.js              # sendWelcomeEmail, sendPasswordResetEmail, etc.
│   │       ├── transporter.js
│   │       └── templates/
│   │           ├── welcome.js
│   │           ├── passwordReset.js
│   │           ├── budgetAlert.js
│   │           └── report.js
│   └── utils/
│       ├── apiResponse.js            # sendSuccess, sendCreated, sendNoContent
│       └── asyncHandler.js
├── migrations/                       # .cjs — run in FK order
│   ├── 20260101000001-create-users-table.cjs
│   ├── 20260101000002-create-categories-table.cjs
│   ├── 20260101000003-create-transactions-table.cjs
│   └── 20260101000004-create-budgets-table.cjs
├── seeders/                          # .cjs — demo data
│   ├── 20260101000001-seed-users.cjs
│   ├── 20260101000002-seed-categories.cjs
│   ├── 20260101000003-seed-transactions.cjs
│   └── 20260101000004-seed-budgets.cjs
├── views/                            # EJS templates
│   └── index.ejs
├── docs/                             # Project documentation
│   └── apiDocs/
│       └── BUDGETPAL_Postman_Collection.json
├── .sequelizerc
├── .env                              # Gitignored
├── .env.example
├── package.json
└── BUDGETPAL_README.md
```

---

## Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `nodemon src/app.js` | Dev server with auto-restart |
| `npm start` | `node src/app.js` | Production server |
| `npm run migrate` | `sequelize-cli db:migrate` | Run all pending migrations |
| `npm run migrate:undo` | `sequelize-cli db:migrate:undo` | Undo last migration |
| `npm run migrate:undo:all` | `sequelize-cli db:migrate:undo:all` | Drop all tables |
| `npm run seed` | `sequelize-cli db:seed:all` | Insert all demo data |
| `npm run seed:undo` | `sequelize-cli db:seed:undo:all` | Remove all seeded data |

---

## Email Flows

| Trigger | Email Sent | Notes |
|---------|-----------|-------|
| `POST /auth/register` | Welcome email | Fire-and-forget |
| `POST /auth/forgot-password` | Password reset link | Token expires in 1 hour |
| Transaction creates/updates → spending ≥ 80% | Budget warning alert | Per category, fire-and-forget |
| Transaction creates/updates → spending ≥ 100% | Budget exceeded alert | Per category, fire-and-forget |
| Daily cron at 08:00 | Sweep all current-month budgets | Alerts where ≥ 80% |
| `POST /reports/email` | On-demand summary report | Uses same period filters as `/reports/summary` |

---

*BudgetPal · Personal Finance Tracker · Capstone 2026*
