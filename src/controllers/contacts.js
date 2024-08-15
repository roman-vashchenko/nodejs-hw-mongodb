import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact === null) {
    next(createHttpError.NotFound('Contact not found'));
    return;
  }
  res.send({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    contactType: req.body.contactType,
  };

  const createdContact = await createContact(contact);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: createdContact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await updateContact(id, req.body);
  if (updatedContact === null) {
    next(createHttpError.NotFound('Contact not found'));
    return;
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const deletedContact = await deleteContact(id);

  if (deletedContact === null) {
    return next(createHttpError.NotFound('Contact not found'));
  }

  res.status(204).end();
};
