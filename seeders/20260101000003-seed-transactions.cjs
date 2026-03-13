'use strict';

const ALICE = 'aaaaaaaa-0000-0000-0000-000000000001';
const BOB   = 'aaaaaaaa-0000-0000-0000-000000000002';

// Alice category ids
const A_SALARY    = 'cccccccc-0001-0000-0000-000000000001';
const A_FREELANCE = 'cccccccc-0001-0000-0000-000000000002';
const A_RENT      = 'cccccccc-0001-0000-0000-000000000003';
const A_FOOD      = 'cccccccc-0001-0000-0000-000000000004';
const A_TRANSPORT = 'cccccccc-0001-0000-0000-000000000005';

// Bob category ids
const B_SALARY   = 'cccccccc-0002-0000-0000-000000000001';
const B_SHOPPING = 'cccccccc-0002-0000-0000-000000000002';
const B_UTILS    = 'cccccccc-0002-0000-0000-000000000003';

const TRANSACTIONS = [
  // Alice — March 2026
  { id: 'tttttttt-0001-0000-0000-000000000001', user_id: ALICE, category_id: A_SALARY,    type: 'income',  amount: 4500.00, description: 'March salary',        date: '2026-03-01', created_at: new Date(), updated_at: new Date() },
  { id: 'tttttttt-0001-0000-0000-000000000002', user_id: ALICE, category_id: A_FREELANCE, type: 'income',  amount:  800.00, description: 'Web project payment', date: '2026-03-05', created_at: new Date(), updated_at: new Date() },
  { id: 'tttttttt-0001-0000-0000-000000000003', user_id: ALICE, category_id: A_RENT,      type: 'expense', amount: 1200.00, description: 'March rent',          date: '2026-03-02', created_at: new Date(), updated_at: new Date() },
  { id: 'tttttttt-0001-0000-0000-000000000004', user_id: ALICE, category_id: A_FOOD,      type: 'expense', amount:  150.00, description: 'Grocery shopping',    date: '2026-03-06', created_at: new Date(), updated_at: new Date() },
  { id: 'tttttttt-0001-0000-0000-000000000005', user_id: ALICE, category_id: A_FOOD,      type: 'expense', amount:   85.00, description: 'Restaurants',         date: '2026-03-09', created_at: new Date(), updated_at: new Date() },
  { id: 'tttttttt-0001-0000-0000-000000000006', user_id: ALICE, category_id: A_TRANSPORT, type: 'expense', amount:   60.00, description: 'Monthly bus pass',    date: '2026-03-03', created_at: new Date(), updated_at: new Date() },
  // Alice — February 2026
  { id: 'tttttttt-0001-0000-0000-000000000007', user_id: ALICE, category_id: A_SALARY,    type: 'income',  amount: 4500.00, description: 'February salary',     date: '2026-02-01', created_at: new Date(), updated_at: new Date() },
  { id: 'tttttttt-0001-0000-0000-000000000008', user_id: ALICE, category_id: A_RENT,      type: 'expense', amount: 1200.00, description: 'February rent',       date: '2026-02-02', created_at: new Date(), updated_at: new Date() },
  { id: 'tttttttt-0001-0000-0000-000000000009', user_id: ALICE, category_id: A_FOOD,      type: 'expense', amount:  320.00, description: 'Groceries & dining',  date: '2026-02-15', created_at: new Date(), updated_at: new Date() },
  // Bob — March 2026
  { id: 'tttttttt-0002-0000-0000-000000000001', user_id: BOB,   category_id: B_SALARY,   type: 'income',  amount: 3200.00, description: 'March salary',        date: '2026-03-01', created_at: new Date(), updated_at: new Date() },
  { id: 'tttttttt-0002-0000-0000-000000000002', user_id: BOB,   category_id: B_SHOPPING, type: 'expense', amount:  430.00, description: 'Clothing haul',       date: '2026-03-07', created_at: new Date(), updated_at: new Date() },
  { id: 'tttttttt-0002-0000-0000-000000000003', user_id: BOB,   category_id: B_UTILS,    type: 'expense', amount:  120.00, description: 'Electricity bill',    date: '2026-03-04', created_at: new Date(), updated_at: new Date() },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('transactions', TRANSACTIONS);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('transactions', {
      id: TRANSACTIONS.map((t) => t.id),
    });
  },
};
