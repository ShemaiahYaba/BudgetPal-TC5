'use strict';

const { Router } = require('express');

const router = Router();

// Health check — unauthenticated
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'BudgetPal API is running.',
    data: { status: 'ok' },
  });
});

// Sub-routers mounted here in later tasks:
// router.use('/auth', require('./authRoutes'));
// router.use('/categories', require('./categoryRoutes'));
// router.use('/transactions', require('./transactionRoutes'));
// router.use('/budgets', require('./budgetRoutes'));
// router.use('/reports', require('./reportRoutes'));

module.exports = router;
