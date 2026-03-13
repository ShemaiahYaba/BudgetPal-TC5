import { createCategory, listCategories, getCategory, updateCategory, deleteCategory } from '../services/categoryService.js';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const create = asyncHandler(async (req, res) => {
  const category = await createCategory(req.user.id, req.body);
  sendCreated(res, category, 'Category created successfully');
});

export const list = asyncHandler(async (req, res) => {
  const categories = await listCategories(req.user.id);
  sendSuccess(res, categories, 'Categories retrieved successfully');
});

export const show = asyncHandler(async (req, res) => {
  const category = await getCategory(req.user.id, req.params.id);
  sendSuccess(res, category, 'Category retrieved successfully');
});

export const update = asyncHandler(async (req, res) => {
  const category = await updateCategory(req.user.id, req.params.id, req.body);
  sendSuccess(res, category, 'Category updated successfully');
});

export const remove = asyncHandler(async (req, res) => {
  await deleteCategory(req.user.id, req.params.id);
  sendNoContent(res);
});
