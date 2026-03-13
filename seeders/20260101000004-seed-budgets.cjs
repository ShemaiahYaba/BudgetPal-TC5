'use strict';

const ALICE = 'aaaaaaaa-0000-0000-0000-000000000001';
const BOB   = 'aaaaaaaa-0000-0000-0000-000000000002';

const A_RENT      = 'cccccccc-0001-0000-0000-000000000003';
const A_FOOD      = 'cccccccc-0001-0000-0000-000000000004';
const A_TRANSPORT = 'cccccccc-0001-0000-0000-000000000005';
const B_SHOPPING  = 'cccccccc-0002-0000-0000-000000000002';
const B_UTILS     = 'cccccccc-0002-0000-0000-000000000003';

const BUDGETS = [
  // Alice — March 2026
  { id: 'bbbbbbbb-0001-0000-0000-000000000001', user_id: ALICE, category_id: A_RENT,      month: 3, year: 2026, limit_amount: 1200.00, created_at: new Date(), updated_at: new Date() },
  { id: 'bbbbbbbb-0001-0000-0000-000000000002', user_id: ALICE, category_id: A_FOOD,      month: 3, year: 2026, limit_amount:  300.00, created_at: new Date(), updated_at: new Date() },
  { id: 'bbbbbbbb-0001-0000-0000-000000000003', user_id: ALICE, category_id: A_TRANSPORT, month: 3, year: 2026, limit_amount:  100.00, created_at: new Date(), updated_at: new Date() },
  // Alice — February 2026
  { id: 'bbbbbbbb-0001-0000-0000-000000000004', user_id: ALICE, category_id: A_FOOD,      month: 2, year: 2026, limit_amount:  300.00, created_at: new Date(), updated_at: new Date() },
  // Bob — March 2026
  { id: 'bbbbbbbb-0002-0000-0000-000000000001', user_id: BOB,   category_id: B_SHOPPING,  month: 3, year: 2026, limit_amount:  400.00, created_at: new Date(), updated_at: new Date() },
  { id: 'bbbbbbbb-0002-0000-0000-000000000002', user_id: BOB,   category_id: B_UTILS,     month: 3, year: 2026, limit_amount:  150.00, created_at: new Date(), updated_at: new Date() },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('budgets', BUDGETS);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('budgets', {
      id: BUDGETS.map((b) => b.id),
    });
  },
};
