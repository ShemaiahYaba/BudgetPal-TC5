import { createBudget, listBudgets, getBudget, updateBudget, deleteBudget, getBudgetStatus } from '../services/budgetService.js';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const create = asyncHandler(async (req, res) => {
  const budget = await createBudget(req.user.id, req.body);
  sendCreated(res, budget, 'Budget created successfully');
});

export const list = asyncHandler(async (req, res) => {
  const budgets = await listBudgets(req.user.id, req.query);
  sendSuccess(res, budgets, 'Budgets retrieved successfully');
});

export const show = asyncHandler(async (req, res) => {
  const budget = await getBudget(req.user.id, req.params.id);
  sendSuccess(res, budget, 'Budget retrieved successfully');
});

export const update = asyncHandler(async (req, res) => {
  const budget = await updateBudget(req.user.id, req.params.id, req.body);
  sendSuccess(res, budget, 'Budget updated successfully');
});

export const remove = asyncHandler(async (req, res) => {
  await deleteBudget(req.user.id, req.params.id);
  sendNoContent(res);
});

export const status = asyncHandler(async (req, res) => {
  const data = await getBudgetStatus(req.user.id, req.params.id);
  sendSuccess(res, data, 'Budget status retrieved successfully');
});
