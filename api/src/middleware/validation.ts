import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validation = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return next(error);
    }

    next();
  };
};
