/**
 * Domain type constants — single source of truth for all ENUM values.
 * Use these in models, validators, and business logic instead of raw strings.
 */

const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

const CATEGORY_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

const BUDGET_STATUS = {
  SAFE: 'safe',
  WARNING: 'warning',
  EXCEEDED: 'exceeded',
};

export { TRANSACTION_TYPES, CATEGORY_TYPES, BUDGET_STATUS };
