# BudgetPal — API Response Standards
**Personal Finance Tracker API · Capstone 2026**  
*Every response in this API follows this document. No exceptions.*

---

## Base Response Shape

```json
{
  "success": true | false,
  "message": "Human-readable description",
  "data": { } | [ ] | null
}
```

---

## Success Responses

### 201 Created
```json
{
  "success": true,
  "message": "Transaction created successfully",
  "data": {
    "id": "uuid",
    "type": "expense",
    "amount": 15000,
    "description": "Grocery shopping",
    "date": "2026-03-06",
    "category": { "id": "uuid", "name": "Food", "type": "expense" },
    "created_at": "2026-03-06T08:00:00.000Z"
  }
}
```

### 200 OK — Single resource
```json
{
  "success": true,
  "message": "Budget retrieved successfully",
  "data": {
    "id": "uuid",
    "category": { "name": "Food", "type": "expense" },
    "month": 3,
    "year": 2026,
    "limit_amount": 50000,
    "spent": 42000,
    "remaining": 8000,
    "percent_used": 84,
    "status": "warning"
  }
}
```

### 200 OK — Collection
```json
{
  "success": true,
  "message": "Transactions retrieved successfully",
  "data": [ { }, { } ]
}
```

### 200 OK — Paginated collection
```json
{
  "success": true,
  "message": "Transactions retrieved successfully",
  "data": {
    "records": [ { }, { } ],
    "pagination": {
      "total": 58,
      "page": 1,
      "limit": 20,
      "totalPages": 3,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### 200 OK — Action with no data
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

### 200 OK — Delete
```json
{
  "success": true,
  "message": "Category deleted successfully",
  "data": null
}
```

---

## Error Responses

### 400 — Validation failure
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": [
    { "field": "amount", "message": "Amount must be a positive number" },
    { "field": "date", "message": "Date cannot be in the future" }
  ]
}
```

### 400 — Business rule failure
```json
{
  "success": false,
  "message": "Password reset token has expired.",
  "data": null
}
```

### 401 — Unauthenticated
```json
{
  "success": false,
  "message": "Authentication required. Please log in.",
  "data": null
}
```

### 404 — Not found
```json
{
  "success": false,
  "message": "Transaction not found.",
  "data": null
}
```

### 409 — Conflict
```json
{
  "success": false,
  "message": "A budget already exists for this category in March 2026.",
  "data": null
}
```

### 500 — Server error
```json
{
  "success": false,
  "message": "An unexpected error occurred. Please try again.",
  "data": null
}
```

---

## Status Code Reference

| Code | When |
|------|------|
| 200 | Successful GET, PUT, DELETE, actions |
| 201 | Successful POST (new resource) |
| 400 | Validation failure, business rule violation |
| 401 | Missing, expired, or invalid JWT |
| 404 | Resource not found (includes other user's resources) |
| 409 | Unique constraint violation |
| 500 | Unhandled server error |

> Note: BudgetPal does not use 403 — there are no roles. Instead, accessing another user's resource returns 404 (not revealing that the resource exists).

---

## Field Conventions

| Field | Rule |
|-------|------|
| Naming | `snake_case` on all fields |
| Timestamps | ISO 8601: `"2026-03-06T08:00:00.000Z"` |
| Dates | `"YYYY-MM-DD"` string |
| Amounts | `DECIMAL` — return as number, not string |
| UUIDs | Lowercase hyphenated |
| Null fields | Explicitly `null` — never omit |
| Empty lists | `"data": []` — never `null` for a list |
| Passwords | Never returned in any response |
| reset_token | Never returned in any response |

---

## Global Middleware Implementation

```js
// src/middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            success: false,
            message: 'A record with this value already exists.',
            data: null
        });
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            data: null,
            errors: err.errors.map(e => ({ field: e.path, message: e.message }))
        });
    }

    return res.status(500).json({
        success: false,
        message: 'An unexpected error occurred. Please try again.',
        data: null
    });
};

export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found.',
        data: null
    });
};
```

```js
// src/middlewares/validate.js
import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            data: null,
            errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
        });
    }
    next();
};
```

---

*BudgetPal · API Response Standards v1.0 · March 2026*
