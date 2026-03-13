# BudgetPal — Tech Stack
**Personal Finance Tracker API · Capstone 2026**

---

## Core

| Package | Version | Purpose |
|---------|---------|---------|
| Node.js | LTS (v20+) | Runtime environment |
| Express.js | ^4.x | Web framework and routing |

---

## Database

| Package | Version | Purpose |
|---------|---------|---------|
| MySQL | 8.x | Primary relational database |
| Sequelize | ^6.x | ORM — models, migrations, associations |
| sequelize-cli | ^6.x | Migrations and seeders via CLI |
| mysql2 | ^3.x | MySQL driver (required by Sequelize) |

---

## Authentication & Security

| Package | Version | Purpose |
|---------|---------|---------|
| jsonwebtoken | ^9.x | JWT generation and verification |
| bcrypt | ^5.x | Password hashing |
| helmet | ^7.x | Secure HTTP headers |
| cors | ^2.x | Cross-Origin Resource Sharing |

---

## Validation

| Package | Version | Purpose |
|---------|---------|---------|
| express-validator | ^7.x | Input validation and sanitization on all routes |

---

## Email

| Package | Version | Purpose |
|---------|---------|---------|
| Nodemailer | ^6.x | Transactional and notification emails |

---

## Scheduling

| Package | Version | Purpose |
|---------|---------|---------|
| node-cron | ^3.x | Monthly summary emails + budget alert checks |

---

## Documentation

| Package | Version | Purpose |
|---------|---------|---------|
| swagger-ui-express | ^5.x | Serves Swagger UI at `/api/v1/docs` |
| swagger-jsdoc | ^6.x | Generates spec from JSDoc comments |

---

## View Layer

| Package | Version | Purpose |
|---------|---------|---------|
| EJS | ^3.x | Lightweight templating for visual web interface |

---

## Logging & Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| morgan | ^1.x | HTTP request logging |
| dotenv | ^16.x | Environment variable management |
| uuid | ^9.x | UUID generation for primary keys |

---

## Install Command

```bash
npm install express sequelize sequelize-cli mysql2 jsonwebtoken bcrypt helmet cors express-validator nodemailer node-cron swagger-ui-express swagger-jsdoc ejs morgan dotenv uuid
```

```bash
npm install --save-dev nodemon
```

---

## Project Structure

```
budgetpal-api/
├── src/
│   ├── config/           # DB config, Swagger config
│   ├── controllers/      # Route handler logic
│   ├── middlewares/      # Auth, validation, error handling
│   ├── models/           # Sequelize models
│   ├── routes/           # Express route definitions
│   ├── services/         # Email service, cron jobs
│   ├── utils/            # Helper functions
│   └── app.js            # Express app setup
├── views/                # EJS templates
├── migrations/           # Sequelize migration files
├── seeders/              # Sample data seeders
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
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
DB_PASSWORD=

JWT_SECRET=your_jwt_secret_minimum_32_characters
JWT_EXPIRES_IN=7d

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
MAIL_FROM="BudgetPal <no-reply@budgetpal.com>"
```

---

## Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| SQL vs NoSQL | MySQL | Transactions, budgets, and reports are deeply relational |
| Budget model | Separate `budgets` table (userId + categoryId + month + year + limit) | Supports per-month per-category limits cleanly — can't live on the category row |
| Auth | JWT stateless | Standard for REST APIs, works cleanly with Swagger auth header |
| View layer | EJS | Lightweight — just enough for visual testing, no frontend framework needed |
| API versioning | `/api/v1/` | Explicit versioning from day one as required by the spec |

---

*BudgetPal · Stack v1.0 · March 2026*
