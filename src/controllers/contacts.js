import * as fs from 'node:fs/promises';
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
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

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
    userId: req.user._id,
  });

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(id, userId);

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
  let photo = null;

  const result = await uploadToCloudinary(req.file.path);
  await fs.unlink(req.file.path);

  photo = result.secure_url;
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    contactType: req.body.contactType,
    userId: req.user._id,
    photo,
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
  const userId = req.user._id;
  let photo = null;

  if (typeof req.file !== 'undefined') {
    const result = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path);
    photo = result.secure_url;
  }

  const updatedData = { ...req.body };
  if (photo) {
    updatedData.photo = photo;
  }

  const updatedContact = await updateContact(id, userId, updatedData);
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
  const userId = req.user._id;
  const deletedContact = await deleteContact(id, userId);

  if (deletedContact === null) {
    return next(createHttpError.NotFound('Contact not found'));
  }

  res.status(204).end();
};
