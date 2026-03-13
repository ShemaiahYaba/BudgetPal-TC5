import { Op } from 'sequelize';
import { Budget, Category, Transaction, User } from '../models/index.js';
import { TRANSACTION_TYPES } from '../constants/index.js';
import { sendBudgetAlertEmail } from './email/index.js';

const pad = (n) => String(n).padStart(2, '0');

const computeSpent = async (userId, categoryId, month, year) => {
  const spent = await Transaction.sum('amount', {
    where: {
      user_id: userId,
      category_id: categoryId,
      date: { [Op.between]: [`${year}-${pad(month)}-01`, `${year}-${pad(month)}-31`] },
    },
  });
  return parseFloat(spent) || 0;
};

/**
 * Called after a transaction is created or updated.
 * Checks if the transaction's category has a budget and fires an alert if needed.
 */
export const checkBudgetAlert = async (userId, categoryId, transactionDate, transactionType) => {
  if (transactionType !== TRANSACTION_TYPES.EXPENSE) return;

  const [yearStr, monthStr] = transactionDate.split('-');
  const month = parseInt(monthStr);
  const year = parseInt(yearStr);

  const budget = await Budget.findOne({ where: { user_id: userId, category_id: categoryId, month, year } });
  if (!budget) return;

  const [user, category, spent] = await Promise.all([
    User.findByPk(userId),
    Category.findByPk(categoryId),
    computeSpent(userId, categoryId, month, year),
  ]);

  const limit = parseFloat(budget.limit_amount);
  const percentage = limit > 0 ? (spent / limit) * 100 : 0;

  if (percentage >= 100) {
    sendBudgetAlertEmail(user, { category, spent, limit, percentage, status: 'exceeded' });
  } else if (percentage >= 80) {
    sendBudgetAlertEmail(user, { category, spent, limit, percentage, status: 'warning' });
  }
};

/**
 * Daily cron sweep — checks all active budgets for the current month and alerts where needed.
 */
export const runDailyBudgetAlertSweep = async () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const budgets = await Budget.findAll({
    where: { month, year },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'category' },
    ],
  });

  for (const budget of budgets) {
    const spent = await computeSpent(budget.user_id, budget.category_id, month, year);
    const limit = parseFloat(budget.limit_amount);
    const percentage = limit > 0 ? (spent / limit) * 100 : 0;

    if (percentage >= 100) {
      sendBudgetAlertEmail(budget.user, { category: budget.category, spent, limit, percentage, status: 'exceeded' });
    } else if (percentage >= 80) {
      sendBudgetAlertEmail(budget.user, { category: budget.category, spent, limit, percentage, status: 'warning' });
    }
  }

  console.log(`[Cron] Budget alert sweep complete — ${budgets.length} budget(s) checked.`);
};
