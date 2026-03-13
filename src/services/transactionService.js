import { Op } from 'sequelize';
import { Transaction, Category } from '../models/index.js';
import AppError from '../middlewares/errors/appError.js';
import { HTTP, ERR } from '../constants/index.js';
import { checkBudgetAlert } from './budgetAlertService.js';

const findOwnedTransaction = async (userId, id) => {
  const transaction = await Transaction.findOne({
    where: { id, user_id: userId },
    include: [{ model: Category, as: 'category' }],
  });
  if (!transaction) throw new AppError(ERR.TRANSACTION_NOT_FOUND, HTTP.NOT_FOUND);
  return transaction;
};

export const createTransaction = async (userId, { category_id, type, amount, description, date }) => {
  if (parseFloat(amount) <= 0) throw new AppError(ERR.AMOUNT_MUST_BE_POSITIVE, HTTP.BAD_REQUEST);
  if (new Date(date) > new Date()) throw new AppError(ERR.DATE_IN_FUTURE, HTTP.BAD_REQUEST);

  const transaction = await Transaction.create({ user_id: userId, category_id, type, amount, description, date });
  checkBudgetAlert(userId, category_id, date, type);
  return transaction;
};

export const listTransactions = async (userId, query) => {
  const where = { user_id: userId };

  if (query.category_id) where.category_id = query.category_id;
  if (query.type) where.type = query.type;
  if (query.start_date || query.end_date) {
    where.date = {};
    if (query.start_date) where.date[Op.gte] = query.start_date;
    if (query.end_date) where.date[Op.lte] = query.end_date;
  }

  return Transaction.findAll({
    where,
    include: [{ model: Category, as: 'category' }],
    order: [['date', 'DESC']],
  });
};

export const getTransaction = async (userId, id) => {
  return findOwnedTransaction(userId, id);
};

export const updateTransaction = async (userId, id, fields) => {
  const transaction = await findOwnedTransaction(userId, id);

  if (fields.amount !== undefined && parseFloat(fields.amount) <= 0) {
    throw new AppError(ERR.AMOUNT_MUST_BE_POSITIVE, HTTP.BAD_REQUEST);
  }
  if (fields.date !== undefined && new Date(fields.date) > new Date()) {
    throw new AppError(ERR.DATE_IN_FUTURE, HTTP.BAD_REQUEST);
  }

  const updated = await transaction.update(fields);
  const effectiveDate = fields.date ?? transaction.date;
  const effectiveType = fields.type ?? transaction.type;
  checkBudgetAlert(userId, updated.category_id, effectiveDate, effectiveType);
  return updated;
};

export const deleteTransaction = async (userId, id) => {
  const transaction = await findOwnedTransaction(userId, id);
  await transaction.destroy();
};
