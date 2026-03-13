import { Op, fn, col, literal } from 'sequelize';
import { Transaction, Category, User } from '../models/index.js';
import { TRANSACTION_TYPES } from '../constants/index.js';
import { sendReportEmail } from './email/index.js';

/**
 * Resolves query params into a date WHERE clause and period metadata.
 * Priority: date range > month+year > current month.
 */
const resolvePeriod = (query) => {
  if (query.start_date || query.end_date) {
    const dateCond = {};
    if (query.start_date) dateCond[Op.gte] = query.start_date;
    if (query.end_date) dateCond[Op.lte] = query.end_date;
    return {
      where: { date: dateCond },
      period: { start_date: query.start_date, end_date: query.end_date },
    };
  }

  const now = new Date();
  const month = parseInt(query.month) || now.getMonth() + 1;
  const year = parseInt(query.year) || now.getFullYear();
  const pad = (n) => String(n).padStart(2, '0');
  return {
    where: { date: { [Op.between]: [`${year}-${pad(month)}-01`, `${year}-${pad(month)}-31`] } },
    period: { month, year },
  };
};

export const getSummary = async (userId, query) => {
  const { where, period } = resolvePeriod(query);

  const rows = await Transaction.findAll({
    attributes: ['type', [fn('SUM', col('amount')), 'total']],
    where: { user_id: userId, ...where },
    group: ['type'],
    raw: true,
  });

  const total_income = parseFloat(rows.find((r) => r.type === TRANSACTION_TYPES.INCOME)?.total || 0);
  const total_expenses = parseFloat(rows.find((r) => r.type === TRANSACTION_TYPES.EXPENSE)?.total || 0);

  return { period, total_income, total_expenses, net: total_income - total_expenses };
};

export const getByCategory = async (userId, query) => {
  const { where } = resolvePeriod(query);
  const typeFilter = query.type ? { type: query.type } : {};

  const rows = await Transaction.findAll({
    attributes: ['category_id', [fn('SUM', col('Transaction.amount')), 'total']],
    where: { user_id: userId, ...where, ...typeFilter },
    include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'type'] }],
    group: ['category_id', 'category.id', 'category.name', 'category.type'],
    order: [[literal('total'), 'DESC']],
    raw: false,
  });

  return rows.map((r) => ({
    category: r.category,
    total: parseFloat(r.get('total')),
  }));
};

export const getMonthly = async (userId, query) => {
  let months = [];

  if (query.year) {
    const year = parseInt(query.year);
    months = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, year }));
  } else {
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ month: d.getMonth() + 1, year: d.getFullYear() });
    }
  }

  const pad = (n) => String(n).padStart(2, '0');
  const start = `${months[0].year}-${pad(months[0].month)}-01`;
  const end = `${months[months.length - 1].year}-${pad(months[months.length - 1].month)}-31`;

  const rows = await Transaction.findAll({
    attributes: [
      [fn('MONTH', col('date')), 'month'],
      [fn('YEAR', col('date')), 'year'],
      'type',
      [fn('SUM', col('amount')), 'total'],
    ],
    where: { user_id: userId, date: { [Op.between]: [start, end] } },
    group: [literal('YEAR(date)'), literal('MONTH(date)'), 'type'],
    raw: true,
  });

  return months.map(({ month, year }) => {
    const income = parseFloat(
      rows.find((r) => Number(r.month) === month && Number(r.year) === year && r.type === TRANSACTION_TYPES.INCOME)?.total || 0
    );
    const expenses = parseFloat(
      rows.find((r) => Number(r.month) === month && Number(r.year) === year && r.type === TRANSACTION_TYPES.EXPENSE)?.total || 0
    );
    return { month, year, total_income: income, total_expenses: expenses, net: income - expenses };
  });
};

export const emailReport = async (userId, query) => {
  const [user, report] = await Promise.all([
    User.findByPk(userId),
    getSummary(userId, query),
  ]);
  sendReportEmail({ name: user.name, email: user.email }, report);
};
