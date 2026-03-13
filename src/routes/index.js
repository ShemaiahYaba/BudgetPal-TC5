import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'BudgetPal API is running.',
    data: { status: 'ok' },
  });
});

// Sub-routers mounted here in later tasks:
// import authRoutes from './authRoutes.js';
// router.use('/auth', authRoutes);
// import categoryRoutes from './categoryRoutes.js';
// router.use('/categories', categoryRoutes);
// import transactionRoutes from './transactionRoutes.js';
// router.use('/transactions', transactionRoutes);
// import budgetRoutes from './budgetRoutes.js';
// router.use('/budgets', budgetRoutes);
// import reportRoutes from './reportRoutes.js';
// router.use('/reports', reportRoutes);

export default router;
