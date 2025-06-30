import { SORT_ORDER } from '../constants/index.js';
import { contactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const queryConditions = { userId };

  if (filter.contactType) {
    queryConditions.contactType = filter.contactType;
  }
  if (typeof filter.isFavourite === 'boolean') {
    queryConditions.isFavourite = filter.isFavourite;
  }

  const [contactsCount, contacts] = await Promise.all([
    contactsCollection.countDocuments(queryConditions),
    contactsCollection
      .find(queryConditions)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};


export const getContactById = async (contactId, userId) => {
  return await contactsCollection.findOne({ _id: contactId, userId });
};


export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const rawResult = await contactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};


export const deleteContact = async (contactId, userId) => {
  return await contactsCollection.findOneAndDelete({ _id: contactId, userId });
};
