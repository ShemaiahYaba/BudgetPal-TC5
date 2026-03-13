# BudgetPal — Endpoints & Test Cases
**Personal Finance Tracker API · Capstone 2026**

---

## Base URL
```
http://localhost:5000/api/v1
```

All protected endpoints require:
```
Authorization: Bearer <JWT>
```

All responses follow:
```json
{ "success": true|false, "message": "...", "data": {}|[]|null }
```

---

## 1. Authentication

---

### POST /auth/register
**Auth:** No

**Request body:**
```json
{ "name": "Shemaiah", "email": "shemaiah@mail.com", "password": "Password123!" }
```

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-AUTH-01 | Valid registration | All required fields | 201 + JWT + welcome email sent |
| TC-AUTH-02 | Duplicate email | Email already in DB | 409 Conflict |
| TC-AUTH-03 | Missing name | No name field | 400 Bad Request |
| TC-AUTH-04 | Missing email | No email | 400 Bad Request |
| TC-AUTH-05 | Invalid email format | `notanemail` | 400 Bad Request |
| TC-AUTH-06 | Missing password | No password | 400 Bad Request |
| TC-AUTH-07 | Password too short | < 8 chars | 400 Bad Request |
| TC-AUTH-08 | Password in response | Valid registration | `password` field absent from response |
| TC-AUTH-09 | Empty body | `{}` | 400 Bad Request |

---

### POST /auth/login
**Auth:** No

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-AUTH-10 | Valid credentials | Correct email + password | 200 + JWT |
| TC-AUTH-11 | Wrong password | Correct email, wrong password | 401 Unauthorized |
| TC-AUTH-12 | Non-existent email | Unknown email | 401 Unauthorized |
| TC-AUTH-13 | Missing email | No email | 400 Bad Request |
| TC-AUTH-14 | Missing password | No password | 400 Bad Request |
| TC-AUTH-15 | Invalid email format | `notanemail` | 400 Bad Request |

---

### POST /auth/logout
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-AUTH-16 | Valid logout | Valid JWT | 200 + success message |
| TC-AUTH-17 | No token | Missing header | 401 Unauthorized |

---

### POST /auth/forgot-password
**Auth:** No

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-AUTH-18 | Valid email | Registered email | 200 + reset email sent |
| TC-AUTH-19 | Unknown email | Not in DB | 200 (don't reveal existence) |
| TC-AUTH-20 | Invalid email format | `notanemail` | 400 Bad Request |
| TC-AUTH-21 | Missing email | No email | 400 Bad Request |

---

### POST /auth/reset-password
**Auth:** No

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-AUTH-22 | Valid token + new password | Correct token, strong password | 200 + password updated |
| TC-AUTH-23 | Invalid token | Random string | 400 Bad Request |
| TC-AUTH-24 | Expired token | Token past expiry | 400 Bad Request |
| TC-AUTH-25 | Weak password | < 8 chars | 400 Bad Request |
| TC-AUTH-26 | Token reuse | Use token twice | 400 — token cleared after first use |
| TC-AUTH-27 | Login with new password | After successful reset | 200 + JWT |
| TC-AUTH-28 | Login with old password | After successful reset | 401 Unauthorized |

---

### GET /auth/me
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-AUTH-29 | Valid token | JWT in header | 200 + user profile (no password) |
| TC-AUTH-30 | No token | Missing header | 401 Unauthorized |
| TC-AUTH-31 | Expired token | Expired JWT | 401 Unauthorized |

---

## 2. Categories

---

### GET /categories
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-CAT-01 | Get own categories | Valid JWT | 200 + only caller's categories |
| TC-CAT-02 | User 2 cannot see User 1's categories | Different user JWT | 200 + empty (or User 2's own) |
| TC-CAT-03 | No categories yet | New user | 200 + empty array |

---

### POST /categories
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-CAT-04 | Valid income category | `{ name: "Salary", type: "income" }` | 201 + new category |
| TC-CAT-05 | Valid expense category | `{ name: "Food", type: "expense" }` | 201 + new category |
| TC-CAT-06 | Missing name | No name | 400 Bad Request |
| TC-CAT-07 | Missing type | No type | 400 Bad Request |
| TC-CAT-08 | Invalid type | `type: "savings"` | 400 Bad Request |
| TC-CAT-09 | user_id auto-assigned | Valid creation | `user_id` in response matches req.user.id |

---

### GET /categories/:id
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-CAT-10 | Own category | Valid UUID belonging to user | 200 + category |
| TC-CAT-11 | Other user's category | UUID belonging to another user | 404 Not Found |
| TC-CAT-12 | Non-existent ID | Random UUID | 404 Not Found |

---

### PUT /categories/:id
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-CAT-13 | Valid update | New name | 200 + updated category |
| TC-CAT-14 | Other user's category | Different user JWT | 404 Not Found |
| TC-CAT-15 | Update type | Change type | 200 (only if no transactions linked) |

---

### DELETE /categories/:id
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-CAT-16 | Delete with no transactions | Empty category | 200 + success |
| TC-CAT-17 | Delete with transactions | Category has transactions | 409 Conflict |
| TC-CAT-18 | Other user's category | Different JWT | 404 Not Found |
| TC-CAT-19 | Non-existent ID | Random UUID | 404 Not Found |

---

## 3. Transactions

---

### GET /transactions
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-TXN-01 | Get all own transactions | Valid JWT | 200 + array |
| TC-TXN-02 | Filter by type | `?type=expense` | 200 + only expense transactions |
| TC-TXN-03 | Filter by category | `?category_id=uuid` | 200 + matching transactions only |
| TC-TXN-04 | Filter by date range | `?start_date=2026-01-01&end_date=2026-03-31` | 200 + transactions in range |
| TC-TXN-05 | Filter by month+year | `?month=3&year=2026` | 200 + March 2026 transactions only |
| TC-TXN-06 | Pagination | `?page=1&limit=10` | 200 + max 10 records + pagination meta |
| TC-TXN-07 | User isolation | User 2's JWT | Cannot see User 1's transactions |
| TC-TXN-08 | No transactions | New user | 200 + empty array |

---

### POST /transactions
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-TXN-09 | Valid expense | All required fields | 201 + transaction + budget alert checked |
| TC-TXN-10 | Valid income | type: income | 201 + transaction |
| TC-TXN-11 | Missing amount | No amount | 400 Bad Request |
| TC-TXN-12 | Amount is zero | `amount: 0` | 400 Bad Request |
| TC-TXN-13 | Negative amount | `amount: -500` | 400 Bad Request |
| TC-TXN-14 | Missing category_id | No category | 400 Bad Request |
| TC-TXN-15 | Other user's category | category_id belongs to another user | 404 Not Found |
| TC-TXN-16 | Missing date | No date | 400 Bad Request |
| TC-TXN-17 | Future date | Date in future | 400 Bad Request |
| TC-TXN-18 | Budget alert at 80% | Transaction pushes category to 80% of limit | Alert email sent |
| TC-TXN-19 | Budget alert at 100% | Transaction pushes category to 100%+ | Exceeded email sent |
| TC-TXN-20 | No budget set | Transaction with no budget for category | 201 — no email, no error |

---

### GET /transactions/:id
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-TXN-21 | Own transaction | Valid UUID | 200 + transaction detail |
| TC-TXN-22 | Other user's transaction | Different JWT | 404 Not Found |
| TC-TXN-23 | Non-existent ID | Random UUID | 404 Not Found |

---

### PUT /transactions/:id
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-TXN-24 | Valid update | New amount | 200 + updated transaction |
| TC-TXN-25 | Update triggers re-check | Update pushes budget over 80% | Alert email sent |
| TC-TXN-26 | Other user's transaction | Different JWT | 404 Not Found |
| TC-TXN-27 | Amount updated to zero | `amount: 0` | 400 Bad Request |

---

### DELETE /transactions/:id
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-TXN-28 | Valid delete | Own transaction | 200 + success |
| TC-TXN-29 | Other user's transaction | Different JWT | 404 Not Found |
| TC-TXN-30 | Non-existent ID | Random UUID | 404 Not Found |

---

## 4. Budgets

---

### GET /budgets
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-BUD-01 | Get own budgets | Valid JWT | 200 + budgets with spent + percent_used |
| TC-BUD-02 | Spent is computed live | Transactions exist | `spent` matches sum of transactions |
| TC-BUD-03 | No budgets | New user | 200 + empty array |
| TC-BUD-04 | Filter by month | `?month=3&year=2026` | 200 + only March 2026 budgets |

---

### POST /budgets
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-BUD-05 | Valid budget | category + month + year + limit | 201 + new budget |
| TC-BUD-06 | Duplicate budget | Same user + category + month + year | 409 Conflict |
| TC-BUD-07 | Missing category_id | No category | 400 Bad Request |
| TC-BUD-08 | Other user's category | category_id not owned by user | 404 Not Found |
| TC-BUD-09 | Income category | category.type = income | 400 — budgets only for expense categories |
| TC-BUD-10 | Missing month | No month | 400 Bad Request |
| TC-BUD-11 | Invalid month | `month: 13` | 400 Bad Request |
| TC-BUD-12 | Missing year | No year | 400 Bad Request |
| TC-BUD-13 | Zero limit | `limit_amount: 0` | 400 Bad Request |
| TC-BUD-14 | Negative limit | `limit_amount: -1000` | 400 Bad Request |

---

### GET /budgets/:id
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-BUD-15 | Own budget | Valid UUID | 200 + budget with live computed fields |
| TC-BUD-16 | status field | percent_used < 80 | `status: "safe"` |
| TC-BUD-17 | status field | percent_used 80–99 | `status: "warning"` |
| TC-BUD-18 | status field | percent_used >= 100 | `status: "exceeded"` |
| TC-BUD-19 | Other user's budget | Different JWT | 404 Not Found |

---

### PUT /budgets/:id
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-BUD-20 | Valid update | New limit_amount | 200 + updated budget |
| TC-BUD-21 | Zero limit on update | `limit_amount: 0` | 400 Bad Request |
| TC-BUD-22 | Other user's budget | Different JWT | 404 Not Found |

---

### DELETE /budgets/:id
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-BUD-23 | Valid delete | Own budget | 200 + success |
| TC-BUD-24 | Other user's budget | Different JWT | 404 Not Found |
| TC-BUD-25 | Non-existent ID | Random UUID | 404 Not Found |

---

### GET /budgets/status
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-BUD-26 | Current month overview | Valid JWT | 200 + all budgets for current month with spent + status |
| TC-BUD-27 | No budgets this month | No budgets set | 200 + empty array |

---

## 5. Reports

---

### GET /reports/summary
**Auth:** Yes

**Success response:**
```json
{
  "success": true,
  "data": {
    "period": { "month": 3, "year": 2026 },
    "total_income": 250000,
    "total_expenses": 180000,
    "net": 70000
  }
}
```

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-REP-01 | Summary for current month | No params | 200 + income vs expenses |
| TC-REP-02 | Summary for specific month | `?month=2&year=2026` | 200 + February data only |
| TC-REP-03 | Summary for date range | `?start_date=...&end_date=...` | 200 + data for range |
| TC-REP-04 | No transactions in period | Empty month | 200 + all zeros |
| TC-REP-05 | Net is income minus expenses | Normal data | `net` = income - expenses |
| TC-REP-06 | User isolation | User 2 JWT | Returns only User 2's data |

---

### GET /reports/by-category
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-REP-07 | Category breakdown | Valid JWT | 200 + array of categories with totals |
| TC-REP-08 | Filter by type | `?type=expense` | 200 + expense categories only |
| TC-REP-09 | Filter by month | `?month=3&year=2026` | 200 + March data per category |
| TC-REP-10 | Category with no transactions | New category | Included with `total: 0` |
| TC-REP-11 | Sorted by highest spend | Normal data | Highest total first |

---

### GET /reports/monthly
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-REP-12 | Monthly overview | Valid JWT | 200 + array of months with income/expense/net |
| TC-REP-13 | Last 6 months | No params (default) | Returns last 6 months |
| TC-REP-14 | Custom year | `?year=2026` | Returns all months in 2026 |
| TC-REP-15 | Month with no data | Gap month | Included with zeros |

---

### POST /reports/email
**Auth:** Yes

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| TC-REP-16 | Valid request | Valid JWT | 200 + email sent with report |
| TC-REP-17 | With month+year | `?month=2&year=2026` | 200 + Feb report emailed |
| TC-REP-18 | No token | Missing header | 401 Unauthorized |

---

## 6. Cross-Cutting Test Cases

### Security & Auth

| # | Test Case | Expected |
|---|-----------|----------|
| TC-SEC-01 | Every protected route without token | 401 |
| TC-SEC-02 | Every protected route with expired token | 401 |
| TC-SEC-03 | Accessing another user's resource by guessing UUID | 404 |
| TC-SEC-04 | Password never in any response | Absent from all responses |
| TC-SEC-05 | reset_token never in any response | Absent from all responses |

### Validation

| # | Test Case | Expected |
|---|-----------|----------|
| TC-VAL-01 | All required fields missing | 400 with field-level errors array |
| TC-VAL-02 | Unknown extra fields in body | Ignored silently |
| TC-VAL-03 | String where number expected | 400 Bad Request |
| TC-VAL-04 | ENUM field with invalid value | 400 with valid options listed |

### Response Consistency

| # | Test Case | Expected |
|---|-----------|----------|
| TC-RES-01 | All success responses | `{ success: true, message, data }` |
| TC-RES-02 | All error responses | `{ success: false, message, data: null }` |
| TC-RES-03 | Unknown route | 404 — `{ success: false, message: "Route not found." }` |
| TC-RES-04 | Content-Type | All responses return `application/json` |

---

## Endpoint Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /auth/register | ❌ | Register new user |
| POST | /auth/login | ❌ | Login |
| POST | /auth/logout | ✅ | Logout |
| POST | /auth/forgot-password | ❌ | Request password reset |
| POST | /auth/reset-password | ❌ | Reset password with token |
| GET | /auth/me | ✅ | Get current user |
| GET | /categories | ✅ | List user's categories |
| POST | /categories | ✅ | Create category |
| GET | /categories/:id | ✅ | Get category |
| PUT | /categories/:id | ✅ | Update category |
| DELETE | /categories/:id | ✅ | Delete category |
| GET | /transactions | ✅ | List transactions (with filters) |
| POST | /transactions | ✅ | Create transaction |
| GET | /transactions/:id | ✅ | Get transaction |
| PUT | /transactions/:id | ✅ | Update transaction |
| DELETE | /transactions/:id | ✅ | Delete transaction |
| GET | /budgets | ✅ | List budgets with spent |
| POST | /budgets | ✅ | Create budget |
| GET | /budgets/status | ✅ | Current month budget overview |
| GET | /budgets/:id | ✅ | Get budget with computed fields |
| PUT | /budgets/:id | ✅ | Update budget limit |
| DELETE | /budgets/:id | ✅ | Delete budget |
| GET | /reports/summary | ✅ | Income vs expenses summary |
| GET | /reports/by-category | ✅ | Spending by category |
| GET | /reports/monthly | ✅ | Month-by-month overview |
| POST | /reports/email | ✅ | Email report to user |

**Total endpoints: 26**
**Total test cases: 100+**

---

*BudgetPal · Endpoints & Test Cases v1.0 · March 2026*
