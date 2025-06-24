import { Router } from 'express';
import homeRouter from './home.js';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

router.use('/', homeRouter);
router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
