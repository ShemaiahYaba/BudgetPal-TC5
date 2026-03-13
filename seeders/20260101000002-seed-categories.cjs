'use strict';

const ALICE = 'aaaaaaaa-0000-0000-0000-000000000001';
const BOB   = 'aaaaaaaa-0000-0000-0000-000000000002';

const CATEGORIES = [
  // Alice — income
  { id: 'cccccccc-0001-0000-0000-000000000001', user_id: ALICE, name: 'Salary',    type: 'income',  created_at: new Date(), updated_at: new Date() },
  { id: 'cccccccc-0001-0000-0000-000000000002', user_id: ALICE, name: 'Freelance', type: 'income',  created_at: new Date(), updated_at: new Date() },
  // Alice — expense
  { id: 'cccccccc-0001-0000-0000-000000000003', user_id: ALICE, name: 'Rent',      type: 'expense', created_at: new Date(), updated_at: new Date() },
  { id: 'cccccccc-0001-0000-0000-000000000004', user_id: ALICE, name: 'Food',      type: 'expense', created_at: new Date(), updated_at: new Date() },
  { id: 'cccccccc-0001-0000-0000-000000000005', user_id: ALICE, name: 'Transport', type: 'expense', created_at: new Date(), updated_at: new Date() },
  // Bob — income
  { id: 'cccccccc-0002-0000-0000-000000000001', user_id: BOB,   name: 'Salary',    type: 'income',  created_at: new Date(), updated_at: new Date() },
  // Bob — expense
  { id: 'cccccccc-0002-0000-0000-000000000002', user_id: BOB,   name: 'Shopping',  type: 'expense', created_at: new Date(), updated_at: new Date() },
  { id: 'cccccccc-0002-0000-0000-000000000003', user_id: BOB,   name: 'Utilities', type: 'expense', created_at: new Date(), updated_at: new Date() },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', CATEGORIES);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', {
      id: CATEGORIES.map((c) => c.id),
    });
  },
};
