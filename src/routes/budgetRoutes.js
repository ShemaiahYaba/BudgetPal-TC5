import { Router } from 'express';
import { body } from 'express-validator';
import { create, list, show, update, remove, status } from '../controllers/budgetController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/errors/validationError.js';

const router = Router();

const createValidation = [
  body('category_id').notEmpty().withMessage('Category is required'),
  body('month').isInt({ min: 1, max: 12 }).withMessage('Month must be between 1 and 12'),
  body('year').isInt({ min: 2000, max: 2100 }).withMessage('Year must be a valid 4-digit year'),
  body('limit_amount').isFloat({ gt: 0 }).withMessage('Limit amount must be a positive number'),
];

const updateValidation = [
  body('limit_amount').isFloat({ gt: 0 }).withMessage('Limit amount must be a positive number'),
];

router.use(authMiddleware);

router.post('/', createValidation, validate, create);
router.get('/', list);
router.get('/:id', show);
router.get('/:id/status', status);
router.put('/:id', updateValidation, validate, update);
router.delete('/:id', remove);

export default router;
