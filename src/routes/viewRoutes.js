import { Router } from 'express';

const router = Router();

router.get('/',             (_req, res) => res.render('index'));
router.get('/login',        (_req, res) => res.render('login'));
router.get('/register',     (_req, res) => res.render('register'));
router.get('/dashboard',    (_req, res) => res.render('dashboard'));
router.get('/transactions', (_req, res) => res.render('transactions'));
router.get('/budgets',          (_req, res) => res.render('budgets'));
router.get('/reports',          (_req, res) => res.render('reports'));
router.get('/categories',       (_req, res) => res.render('categories'));
router.get('/profile',          (_req, res) => res.render('profile'));
router.get('/forgot-password',  (_req, res) => res.render('forgot-password'));
router.get('/reset-password',   (_req, res) => res.render('reset-password'));

export default router;
