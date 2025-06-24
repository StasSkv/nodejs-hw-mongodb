import { Router } from 'express';
import { welcome } from '../controllers/home.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(welcome));

export default router;
