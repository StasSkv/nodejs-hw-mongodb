import express from 'express';
import {
  createContactController,
  deleteContactController,
  getStudentByIdController,
  getStudentsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getStudentsController));

router.get('/contacts/:contactId', ctrlWrapper(getStudentByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
