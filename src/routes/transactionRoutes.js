import { Router } from 'express';
import { body } from 'express-validator';
import { create, list, show, update, remove } from '../controllers/transactionController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/errors/validationError.js';
import { TRANSACTION_TYPES } from '../constants/index.js';

const router = Router();

const transactionValidation = [
  body('category_id').notEmpty().withMessage('Category is required'),
  body('type')
    .isIn(Object.values(TRANSACTION_TYPES))
    .withMessage(`Type must be one of: ${Object.values(TRANSACTION_TYPES).join(', ')}`),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('date').isDate().withMessage('Date must be a valid date (YYYY-MM-DD)'),
];

router.use(authMiddleware);

router.post('/', transactionValidation, validate, create);
router.get('/', list);
router.get('/:id', show);
router.put('/:id', transactionValidation, validate, update);
router.delete('/:id', remove);

export default router;
