import Joi, { ObjectSchema } from 'joi';

const showreelSchema: ObjectSchema = Joi.object().keys({
  title: Joi.string().optional().allow(null, ''),
  timeline: Joi.string().optional().allow(null, ''),
  description: Joi.string().optional().allow(null, ''),
  url: Joi.string().optional().allow(null, ''),
  privacy: Joi.string().optional().allow(null, '')
});

export { showreelSchema };
