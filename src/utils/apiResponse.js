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

const sendSuccess = (res, data, message = 'Success', statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, data });

const sendCreated = (res, data, message = 'Created successfully') =>
  sendSuccess(res, data, message, 201);

const sendNoContent = (res) => res.status(204).send();

export { sendSuccess, sendCreated, sendNoContent };
