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

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js v20+ |
| Framework | Express.js v4 |
| Database | MySQL 8 |
| ORM | Sequelize v6 |
| Auth | JWT + bcrypt |
| Validation | express-validator |
| Email | Nodemailer |
| Scheduling | node-cron |
| Docs | Swagger UI at `/api/v1/docs` |
| Views | EJS |
| Logging | Morgan |

---

## Prerequisites

- **Node.js** v20+ — [nodejs.org](https://nodejs.org)
- **MySQL** 8.x running locally
- **npm**

```bash
node -v      # v20+
mysql --version
npm -v
```

---

## Getting Started

```bash
# 1. Clone
git clone <repo-url>
cd budgetpal-api

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Open .env and fill in your values

# 4. Create the database
mysql -u root -p -e "CREATE DATABASE budgetpal_db;"

# 5. Run migrations
npm run migrate

# 6. Seed the database
npm run seed

# 7. Start the server
npm run dev
```

Verify:
```
GET http://localhost:5000/api/v1/health
→ { "status": "ok" }
```

---

## Environment Variables

```env
PORT=5000
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
```

| Variable | Required | Notes |
|----------|----------|-------|
| `PORT` | Yes | Server port |
| `DB_*` | Yes | MySQL connection details |
| `JWT_SECRET` | Yes | Must be ≥ 32 characters |
| `JWT_EXPIRES_IN` | Yes | e.g. `7d`, `24h` |
| `MAIL_*` | Yes | Required for email flows |

> `.env` is gitignored. Never commit it.

---

## Database Setup

### Migrations

```bash
npm run migrate           # Run all migrations
npm run migrate:undo      # Undo last migration
npm run migrate:undo:all  # Drop all tables
```

**Migration order (FK constraints enforce this):**
```
1. users
2. categories   → FK: users
3. transactions → FK: users, categories
4. budgets      → FK: users, categories
```

### Seeders

```bash
npm run seed        # Populate with test data
npm run seed:undo   # Clear seeded data
```

---

## Running the Server

```bash
npm run dev    # Development (nodemon)
npm start      # Production
```

Server: `http://localhost:5000`  
Swagger docs: `http://localhost:5000/api/v1/docs`  
Web interface: `http://localhost:5000`

---

## API Overview

Base URL: `http://localhost:5000/api/v1`

All protected routes require:
```
Authorization: Bearer <JWT>
```

### Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /auth/register | ❌ | Register + welcome email |
| POST | /auth/login | ❌ | Login |
| POST | /auth/logout | ✅ | Logout |
| POST | /auth/forgot-password | ❌ | Request password reset email |
| POST | /auth/reset-password | ❌ | Reset password via token |
| GET | /auth/me | ✅ | Get current user |
| GET | /categories | ✅ | List user's categories |
| POST | /categories | ✅ | Create category |
| GET | /categories/:id | ✅ | Get category |
| PUT | /categories/:id | ✅ | Update category |
| DELETE | /categories/:id | ✅ | Delete category |
| GET | /transactions | ✅ | List transactions (filterable) |
| POST | /transactions | ✅ | Create transaction + budget check |
| GET | /transactions/:id | ✅ | Get transaction |
| PUT | /transactions/:id | ✅ | Update transaction |
| DELETE | /transactions/:id | ✅ | Delete transaction |
| GET | /budgets | ✅ | List budgets with live spend data |
| POST | /budgets | ✅ | Set monthly budget |
| GET | /budgets/status | ✅ | Current month overview |
| GET | /budgets/:id | ✅ | Get budget (with computed fields) |
| PUT | /budgets/:id | ✅ | Update budget limit |
| DELETE | /budgets/:id | ✅ | Delete budget |
| GET | /reports/summary | ✅ | Income vs expenses summary |
| GET | /reports/by-category | ✅ | Breakdown by category |
| GET | /reports/monthly | ✅ | Month-by-month overview |
| POST | /reports/email | ✅ | Email report to user |

---

## Test Credentials

Seeded by `npm run seed`:

| Email | Password |
|-------|----------|
| `user1@budgetpal.com` | `Password123!` |
| `user2@budgetpal.com` | `Password123!` |

---

## Project Structure

```
budgetpal-api/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── transactionController.js
│   │   ├── budgetController.js
│   │   └── reportController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Category.js
│   │   ├── Transaction.js
│   │   └── Budget.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── budgetRoutes.js
│   │   └── reportRoutes.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── cronService.js
│   ├── utils/
│   │   └── helpers.js
│   └── app.js
├── views/                  # EJS templates
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── dashboard.ejs
│   ├── transactions.ejs
│   └── budgets.ejs
├── migrations/
├── seeders/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Scripts Reference

| Script | Command |
|--------|---------|
| Development | `npm run dev` |
| Production | `npm start` |
| Migrate | `npm run migrate` |
| Undo last migration | `npm run migrate:undo` |
| Drop all tables | `npm run migrate:undo:all` |
| Seed | `npm run seed` |
| Undo seed | `npm run seed:undo` |

---

## Email Flows

| Trigger | Email Sent |
|---------|-----------|
| User registers | Welcome email |
| Forgot password | Reset link (expires 1hr) |
| Spending hits 80% of budget | Warning alert |
| Spending hits 100% of budget | Exceeded alert |
| 1st of every month (cron) | Previous month summary |
| POST /reports/email | On-demand report |

---

*BudgetPal · Personal Finance Tracker · Capstone 2026*
