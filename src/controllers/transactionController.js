import { createTransaction, listTransactions, getTransaction, updateTransaction, deleteTransaction } from '../services/transactionService.js';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const create = asyncHandler(async (req, res) => {
  const transaction = await createTransaction(req.user.id, req.body);
  sendCreated(res, transaction, 'Transaction created successfully');
});

export const list = asyncHandler(async (req, res) => {
  const transactions = await listTransactions(req.user.id, req.query);
  sendSuccess(res, transactions, 'Transactions retrieved successfully');
});

export const show = asyncHandler(async (req, res) => {
  const transaction = await getTransaction(req.user.id, req.params.id);
  sendSuccess(res, transaction, 'Transaction retrieved successfully');
});

export const update = asyncHandler(async (req, res) => {
  const transaction = await updateTransaction(req.user.id, req.params.id, req.body);
  sendSuccess(res, transaction, 'Transaction updated successfully');
});

export const remove = asyncHandler(async (req, res) => {
  await deleteTransaction(req.user.id, req.params.id);
  sendNoContent(res);
});
