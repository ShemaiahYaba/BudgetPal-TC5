'use strict';

const TRANSACTION_TYPES = Object.freeze({
  INCOME: 'income',
  EXPENSE: 'expense',
});

const CATEGORY_TYPES = Object.freeze({
  INCOME: 'income',
  EXPENSE: 'expense',
});

const BUDGET_STATUS = Object.freeze({
  SAFE: 'safe',
  WARNING: 'warning',
  EXCEEDED: 'exceeded',
});

const HTTP = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
});

module.exports = { TRANSACTION_TYPES, CATEGORY_TYPES, BUDGET_STATUS, HTTP };
