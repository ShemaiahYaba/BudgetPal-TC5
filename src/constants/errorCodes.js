/**
 * HTTP status codes and standard error messages.
 * Use HTTP.NOT_FOUND instead of magic number 404 everywhere.
 */

const HTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const ERR = {
  // Generic
  NOT_FOUND: 'The requested resource was not found.',
  ROUTE_NOT_FOUND: 'Route not found.',
  DUPLICATE: 'A record with this value already exists.',
  VALIDATION_FAILED: 'Validation failed.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again.',

  // Auth
  AUTH_REQUIRED: 'Authentication required. Please log in.',
  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
  TOKEN_INVALID: 'Invalid authentication token.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_IN_USE: 'An account with this email already exists.',
  INVALID_RESET_TOKEN: 'Invalid or expired password reset token.',
  FORBIDDEN: 'You do not have permission to perform this action.',

  // Categories
  CATEGORY_NOT_FOUND: 'Category not found.',
  CATEGORY_HAS_TRANSACTIONS: 'Cannot delete a category that has transactions.',
  BUDGET_CATEGORY_MUST_BE_EXPENSE: 'Budgets can only be set for expense categories.',

  // Transactions
  TRANSACTION_NOT_FOUND: 'Transaction not found.',
  AMOUNT_MUST_BE_POSITIVE: 'Amount must be a positive number.',
  DATE_IN_FUTURE: 'Transaction date cannot be in the future.',

  // Budgets
  BUDGET_NOT_FOUND: 'Budget not found.',
  BUDGET_ALREADY_EXISTS: 'A budget for this category and month already exists.',
  LIMIT_MUST_BE_POSITIVE: 'Budget limit must be a positive number.',
};

export { HTTP, ERR };
