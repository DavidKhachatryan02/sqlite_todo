import Joi from 'joi';
import { TaskStatus } from '.prisma/client';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(1000).allow(null, ''),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .default(TaskStatus.TODO),
  parentId: Joi.string().optional().allow(null),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).optional(),
  description: Joi.string().max(1000).allow(null, '').optional(),
  status: Joi.string().valid(...Object.values(TaskStatus)),
  parentId: Joi.string().optional().allow(null), // Optional
}).min(1);
