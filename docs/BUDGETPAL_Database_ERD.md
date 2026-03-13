# BudgetPal — Database ERD
**Personal Finance Tracker API · Capstone 2026**

---

## Entity Relationship Diagram

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  ┌──────────────────────────────────────┐                                        │
│  │              USERS                   │                                        │
│  ├──────────────────────────────────────┤                                        │
│  │ 🔑 id             UUID PK            │                                        │
│  │    name           VARCHAR(255) NN    │                                        │
│  │    email          VARCHAR(255) UQ NN │                                        │
│  │    password       VARCHAR(255) NN    │                                        │
│  │    reset_token    VARCHAR NULL       │                                        │
│  │    reset_expires  DATETIME NULL      │                                        │
│  │    created_at     TIMESTAMP          │                                        │
│  │    updated_at     TIMESTAMP          │                                        │
│  └──────────┬───────────────────────────┘                                        │
│             │ 1                                                                  │
│             │                                                                    │
│    ┌────────┴──────────────────────────────────────────┐                         │
│    │                  │                                │                         │
│    │ 1                │ 1                              │ 1                       │
│    ▼ M                ▼ M                              ▼ M                       │
│                                                                                  │
│  ┌──────────────────────────┐    ┌───────────────────────────────────────────┐  │
│  │       CATEGORIES         │    │              TRANSACTIONS                 │  │
│  ├──────────────────────────┤    ├───────────────────────────────────────────┤  │
│  │ 🔑 id       UUID PK      │    │ 🔑 id          UUID PK                    │  │
│  │ 🔗 user_id  UUID FK NN   │    │ 🔗 user_id     UUID FK → users.id NN      │  │
│  │    name     VARCHAR NN   │    │ 🔗 category_id UUID FK → categories.id NN │  │
│  │    type     ENUM NN      │    │    type        ENUM NN                    │  │
│  │             income       │    │                income                     │  │
│  │             expense      │    │                expense                    │  │
│  │    created_at TIMESTAMP  │    │    amount      DECIMAL(10,2) NN           │  │
│  │    updated_at TIMESTAMP  │    │    description VARCHAR(255) NULL          │  │
│  └──────────┬───────────────┘    │    date        DATE NN                    │  │
│             │ 1                  │    created_at  TIMESTAMP                  │  │
│             │                    │    updated_at  TIMESTAMP                  │  │
│             │                    └───────────────────────────────────────────┘  │
│             │                                                                    │
│             │ 1                                                                  │
│             ▼ M                                                                  │
│  ┌──────────────────────────────────────────────────────┐                       │
│  │                     BUDGETS                          │                       │
│  ├──────────────────────────────────────────────────────┤                       │
│  │ 🔑 id           UUID PK                              │                       │
│  │ 🔗 user_id      UUID FK → users.id NOT NULL          │                       │
│  │ 🔗 category_id  UUID FK → categories.id NOT NULL     │                       │
│  │    month        TINYINT NN  (1–12)                   │                       │
│  │    year         SMALLINT NN (e.g. 2026)              │                       │
│  │    limit_amount DECIMAL(10,2) NN                     │                       │
│  │    created_at   TIMESTAMP                            │                       │
│  │    updated_at   TIMESTAMP                            │                       │
│  │                                                      │                       │
│  │    UNIQUE (user_id, category_id, month, year)        │                       │
│  └──────────────────────────────────────────────────────┘                       │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## Relationships

```
USERS ──────────── CATEGORIES
      1 user creates M categories (personal, user-owned categories)

USERS ──────────── TRANSACTIONS
      1 user has M transactions

USERS ──────────── BUDGETS
      1 user sets M budgets (one per category per month)

CATEGORIES ─────── TRANSACTIONS
      1 category tags M transactions

CATEGORIES ─────── BUDGETS
      1 category can have 1 budget per month per user
      UNIQUE constraint: (user_id, category_id, month, year)
```

---

## Table Definitions

---

### Table: `users`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Auto-generated |
| `name` | VARCHAR(255) | NOT NULL | Display name |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Login credential |
| `password` | VARCHAR(255) | NOT NULL | bcrypt hash |
| `reset_token` | VARCHAR(255) | NULLABLE | Hashed password reset token |
| `reset_expires` | DATETIME | NULLABLE | Token expiry timestamp |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Auto-managed |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Auto-updated |

**Sequelize Associations:**
```js
User.hasMany(Category, { foreignKey: 'user_id', as: 'categories' });
User.hasMany(Transaction, { foreignKey: 'user_id', as: 'transactions' });
User.hasMany(Budget, { foreignKey: 'user_id', as: 'budgets' });
```

---

### Table: `categories`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Auto-generated |
| `user_id` | UUID | FK → users.id, NOT NULL | Categories are user-owned |
| `name` | VARCHAR(100) | NOT NULL | e.g. "Food", "Rent", "Salary" |
| `type` | ENUM | NOT NULL | `income`, `expense` |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Auto-managed |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Auto-updated |

> Two users can have categories with the same name — uniqueness is scoped per user.

**Sequelize Associations:**
```js
Category.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Category.hasMany(Transaction, { foreignKey: 'category_id', as: 'transactions' });
Category.hasMany(Budget, { foreignKey: 'category_id', as: 'budgets' });
```

---

### Table: `transactions`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Auto-generated |
| `user_id` | UUID | FK → users.id, NOT NULL | Owner of the transaction |
| `category_id` | UUID | FK → categories.id, NOT NULL | Must reference user's own category |
| `type` | ENUM | NOT NULL | `income`, `expense` |
| `amount` | DECIMAL(10,2) | NOT NULL | Must be > 0 |
| `description` | VARCHAR(255) | NULLABLE | Optional note |
| `date` | DATE | NOT NULL | Transaction date (not necessarily today) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Auto-managed |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Auto-updated |

> `type` on transaction should match the `type` of its category — validate this in the service layer.

**Sequelize Associations:**
```js
Transaction.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Transaction.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
```

---

### Table: `budgets`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Auto-generated |
| `user_id` | UUID | FK → users.id, NOT NULL | Budget owner |
| `category_id` | UUID | FK → categories.id, NOT NULL | Which category this budget covers |
| `month` | TINYINT | NOT NULL | 1–12 |
| `year` | SMALLINT | NOT NULL | e.g. 2026 |
| `limit_amount` | DECIMAL(10,2) | NOT NULL | Spending cap for the month |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Auto-managed |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Auto-updated |

**Unique constraint:**
```sql
UNIQUE KEY unique_budget (user_id, category_id, month, year)
```
One budget per user per category per month. Attempting to create a duplicate returns 409.

**Sequelize Associations:**
```js
Budget.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Budget.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
```

---

## Migration Order

> Foreign key constraints enforce this order strictly.

```
Step 1 → create-users-table
Step 2 → create-categories-table     (FK → users)
Step 3 → create-transactions-table   (FK → users, categories)
Step 4 → create-budgets-table        (FK → users, categories)
```

**Undo order (reverse):**
```
Step 1 → undo budgets
Step 2 → undo transactions
Step 3 → undo categories
Step 4 → undo users
```

---

## ENUM Values Reference

| Table | Column | Allowed Values |
|-------|--------|---------------|
| `categories` | `type` | `income`, `expense` |
| `transactions` | `type` | `income`, `expense` |

---

## Indexes

| Table | Column | Type | Reason |
|-------|--------|------|--------|
| `users` | `email` | UNIQUE | Login lookup |
| `transactions` | `user_id` | INDEX | Filter by user |
| `transactions` | `category_id` | INDEX | Category-based reports |
| `transactions` | `date` | INDEX | Date range queries (reports) |
| `budgets` | `user_id` | INDEX | User budget lookup |
| `budgets` | `(user_id, category_id, month, year)` | UNIQUE | Prevent duplicate budgets |

---

## Budget Alert Logic

The alert system queries the `budgets` and `transactions` tables together:

```js
// For a given budget (user + category + month + year):
const spent = await Transaction.sum('amount', {
    where: {
        user_id,
        category_id,
        type: 'expense',
        date: {
            [Op.between]: [
                new Date(year, month - 1, 1),   // first day of month
                new Date(year, month, 0)          // last day of month
            ]
        }
    }
});

const percentUsed = (spent / budget.limit_amount) * 100;

if (percentUsed >= 100) → trigger "budget exceeded" email
if (percentUsed >= 80 && percentUsed < 100) → trigger "approaching limit" email
```

---

## Seed Data Order

```
Step 1 → users        (no dependencies)
Step 2 → categories   (depends on users)
Step 3 → transactions (depends on users + categories)
Step 4 → budgets      (depends on users + categories)
```

---

*BudgetPal · Database ERD v1.0 · March 2026*
