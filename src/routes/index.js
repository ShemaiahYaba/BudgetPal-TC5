import { Router } from 'express';

const router = Router();

/**
 * Health Check
 * GET /api/v1/health
 */
router.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'BudgetPal API is running.', data: { status: 'ok' } });
});

// ─── Module Routes (uncomment as built) ──────────────────────────────────────
// import authRoutes from './authRoutes.js';
// import categoryRoutes from './categoryRoutes.js';
// import transactionRoutes from './transactionRoutes.js';
// import budgetRoutes from './budgetRoutes.js';
// import reportRoutes from './reportRoutes.js';

// router.use('/auth', authRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/transactions', transactionRoutes);
// router.use('/budgets', budgetRoutes);
// router.use('/reports', reportRoutes);

export default router;
