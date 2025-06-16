import express from 'express';
import {
  createContactController,
  deleteContactController,
  getStudentByIdController,
  getStudentsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contactsValidation.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getStudentsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
