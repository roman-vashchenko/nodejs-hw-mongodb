import express, { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactController,
  getContactController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, updateContactSchema } from '../validation/contact.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/upload.js';

const router = Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:id', isValidId, ctrlWrapper(getContactController));
router.post(
  '/',
  jsonParser,
  upload.single('photo'),
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:id',
  isValidId,
  jsonParser,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
router.delete(
  '/:id',
  isValidId,
  jsonParser,
  ctrlWrapper(deleteContactController),
);

export default router;
