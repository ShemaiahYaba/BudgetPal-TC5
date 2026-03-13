'use strict';

const ERR = Object.freeze({
  // Generic
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'Authentication required. Please log in.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  VALIDATION_FAILED: 'Validation failed.',
  DUPLICATE: 'A record with this value already exists.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again.',

  // Auth
  INVALID_CREDENTIALS: 'Invalid email or password.',
  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
  TOKEN_INVALID: 'Invalid token.',
  EMAIL_IN_USE: 'An account with this email already exists.',
  INVALID_RESET_TOKEN: 'Invalid or expired password reset token.',

  // Categories
  CATEGORY_NOT_FOUND: 'Category not found.',
  CATEGORY_HAS_TRANSACTIONS: 'Cannot delete a category that has transactions.',
  INVALID_CATEGORY_TYPE: 'Category type must be income or expense.',
  BUDGET_CATEGORY_MUST_BE_EXPENSE: 'Budgets can only be set for expense categories.',

  // Transactions
  TRANSACTION_NOT_FOUND: 'Transaction not found.',
  AMOUNT_MUST_BE_POSITIVE: 'Amount must be a positive number.',
  DATE_IN_FUTURE: 'Transaction date cannot be in the future.',

  // Budgets
  BUDGET_NOT_FOUND: 'Budget not found.',
  BUDGET_ALREADY_EXISTS: 'A budget for this category and month already exists.',
  LIMIT_MUST_BE_POSITIVE: 'Budget limit must be a positive number.',
});

module.exports = { ERR };
