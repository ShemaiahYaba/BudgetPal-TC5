import { Category, Transaction } from '../models/index.js';
import AppError from '../middlewares/errors/appError.js';
import { HTTP, ERR } from '../constants/index.js';

const findOwnedCategory = async (userId, id) => {
  const category = await Category.findOne({ where: { id, user_id: userId } });
  if (!category) throw new AppError(ERR.CATEGORY_NOT_FOUND, HTTP.NOT_FOUND);
  return category;
};

export const createCategory = async (userId, { name, type }) => {
  return Category.create({ user_id: userId, name, type });
};

export const listCategories = async (userId) => {
  return Category.findAll({ where: { user_id: userId }, order: [['name', 'ASC']] });
};

export const getCategory = async (userId, id) => {
  return findOwnedCategory(userId, id);
};

export const updateCategory = async (userId, id, fields) => {
  const category = await findOwnedCategory(userId, id);
  return category.update(fields);
};

export const deleteCategory = async (userId, id) => {
  const category = await findOwnedCategory(userId, id);

  const txCount = await Transaction.count({ where: { category_id: id } });
  if (txCount > 0) throw new AppError(ERR.CATEGORY_HAS_TRANSACTIONS, HTTP.CONFLICT);

  await category.destroy();
};
