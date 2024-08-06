import express, { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactController,
  getContactController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';

const router = Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:id', ctrlWrapper(getContactController));
router.post('/', jsonParser, ctrlWrapper(createContactController));
router.patch('/:id', jsonParser, ctrlWrapper(patchContactController));
router.delete('/:id', jsonParser, ctrlWrapper(deleteContactController));

export default router;
