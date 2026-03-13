import { Router } from 'express';
import { body } from 'express-validator';
import { create, list, show, update, remove } from '../controllers/categoryController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/errors/validationError.js';
import { CATEGORY_TYPES } from '../constants/index.js';

const router = Router();

const categoryValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('type')
    .isIn(Object.values(CATEGORY_TYPES))
    .withMessage(`Type must be one of: ${Object.values(CATEGORY_TYPES).join(', ')}`),
];

router.use(authMiddleware);

router.post('/', categoryValidation, validate, create);
router.get('/', list);
router.get('/:id', show);
router.put('/:id', categoryValidation, validate, update);
router.delete('/:id', remove);

export default router;
