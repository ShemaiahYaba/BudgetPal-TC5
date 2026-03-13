import { Op } from 'sequelize';
import { Budget, Category, Transaction } from '../models/index.js';
import AppError from '../middlewares/errors/appError.js';
import { HTTP, ERR, CATEGORY_TYPES } from '../constants/index.js';

const findOwnedBudget = async (userId, id) => {
  const budget = await Budget.findOne({
    where: { id, user_id: userId },
    include: [{ model: Category, as: 'category' }],
  });
  if (!budget) throw new AppError(ERR.BUDGET_NOT_FOUND, HTTP.NOT_FOUND);
  return budget;
};

const assertExpenseCategory = (category) => {
  if (category.type !== CATEGORY_TYPES.EXPENSE) {
    throw new AppError(ERR.BUDGET_CATEGORY_MUST_BE_EXPENSE, HTTP.BAD_REQUEST);
  }
};

export const createBudget = async (userId, { category_id, month, year, limit_amount }) => {
  const category = await Category.findOne({ where: { id: category_id, user_id: userId } });
  if (!category) throw new AppError(ERR.CATEGORY_NOT_FOUND, HTTP.NOT_FOUND);
  assertExpenseCategory(category);

  const existing = await Budget.findOne({ where: { user_id: userId, category_id, month, year } });
  if (existing) throw new AppError(ERR.BUDGET_ALREADY_EXISTS, HTTP.CONFLICT);

  return Budget.create({ user_id: userId, category_id, month, year, limit_amount });
};

export const listBudgets = async (userId, query) => {
  const where = { user_id: userId };
  if (query.month) where.month = query.month;
  if (query.year) where.year = query.year;

  return Budget.findAll({
    where,
    include: [{ model: Category, as: 'category' }],
    order: [['year', 'DESC'], ['month', 'DESC']],
  });
};

export const getBudget = async (userId, id) => {
  return findOwnedBudget(userId, id);
};

export const updateBudget = async (userId, id, { limit_amount }) => {
  const budget = await findOwnedBudget(userId, id);
  return budget.update({ limit_amount });
};

export const deleteBudget = async (userId, id) => {
  const budget = await findOwnedBudget(userId, id);
  await budget.destroy();
};

export const getBudgetStatus = async (userId, id) => {
  const budget = await findOwnedBudget(userId, id);

  const spent = await Transaction.sum('amount', {
    where: {
      user_id: userId,
      category_id: budget.category_id,
      date: {
        [Op.between]: [
          `${budget.year}-${String(budget.month).padStart(2, '0')}-01`,
          `${budget.year}-${String(budget.month).padStart(2, '0')}-31`,
        ],
      },
    },
  }) || 0;

  const limit = parseFloat(budget.limit_amount);
  const spentNum = parseFloat(spent);
  const remaining = limit - spentNum;
  const percentage = limit > 0 ? Math.round((spentNum / limit) * 100) : 0;

  let status;
  if (spentNum >= limit) status = 'exceeded';
  else if (percentage >= 80) status = 'warning';
  else status = 'safe';

  return {
    budget,
    spent: spentNum,
    remaining,
    percentage,
    status,
  };
};
