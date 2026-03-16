/**
 * API Response Utilities
 * Standardizes all success responses to: { success, message, data }
 *
 * Usage:
 *   import { sendSuccess, sendCreated, sendNoContent } from '../utils/apiResponse.js';
 *
 *   sendSuccess(res, transactions, 'Transactions retrieved');
 *   sendCreated(res, newBudget, 'Budget created');
 *   sendNoContent(res);
 */

const sendSuccess = (res, data, message = 'Success', pagination = null, statusCode = 200) => {
  const body = { success: true, message, data };
  if (pagination) body.pagination = pagination;
  return res.status(statusCode).json(body);
};

const sendCreated = (res, data, message = 'Created successfully') =>
  sendSuccess(res, data, message, null, 201);

const sendNoContent = (res) => res.status(204).send();

export { sendSuccess, sendCreated, sendNoContent };
