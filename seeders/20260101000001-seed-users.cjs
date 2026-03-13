'use strict';

const bcrypt = require('bcrypt');

const USERS = [
  {
    id: 'aaaaaaaa-0000-0000-0000-000000000001',
    name: 'Alice Demo',
    email: 'alice@demo.com',
    password: bcrypt.hashSync('password123', 10),
    reset_token: null,
    reset_expires: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'aaaaaaaa-0000-0000-0000-000000000002',
    name: 'Bob Demo',
    email: 'bob@demo.com',
    password: bcrypt.hashSync('password123', 10),
    reset_token: null,
    reset_expires: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', USERS);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      id: USERS.map((u) => u.id),
    });
  },
};
