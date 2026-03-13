import { getSummary, getByCategory, getMonthly, emailReport } from '../services/reportService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const summary = asyncHandler(async (req, res) => {
  const data = await getSummary(req.user.id, req.query);
  sendSuccess(res, data, 'Summary report retrieved successfully');
});

export const byCategory = asyncHandler(async (req, res) => {
  const data = await getByCategory(req.user.id, req.query);
  sendSuccess(res, data, 'Category report retrieved successfully');
});

export const monthly = asyncHandler(async (req, res) => {
  const data = await getMonthly(req.user.id, req.query);
  sendSuccess(res, data, 'Monthly report retrieved successfully');
});

export const emailSummary = asyncHandler(async (req, res) => {
  await emailReport(req.user.id, req.query);
  sendSuccess(res, null, 'Report sent to your email');
});
