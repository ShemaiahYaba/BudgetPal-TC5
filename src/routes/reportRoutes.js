import { Router } from 'express';
import { summary, byCategory, monthly, emailSummary } from '../controllers/reportController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/summary', summary);
router.get('/by-category', byCategory);
router.get('/monthly', monthly);
router.post('/email', emailSummary);

export default router;
