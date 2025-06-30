import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9+\-\s]{6,16}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must be 6-16 characters and contain digits, +, - or spaces',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of work, home, personal',
      'any.required': 'Contact type is required',
    }),
  userId: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.message('User ID must be a valid Mongo ID');
      }
      return value;
    })
    .messages({
      'any.required': 'User ID is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9+\-\s]{6,16}$/)
    .messages({
      'string.pattern.base':
        'Phone number must be 6-16 characters and contain digits, +, - or spaces',
    }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of work, home, personal',
  }),
  userId: Joi.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.message('User ID must be a valid Mongo ID');
    }
    return value;
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });
