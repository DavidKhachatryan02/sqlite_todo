import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import { Prisma } from "@prisma/client";

interface ErrorResponse {
  status: number;
  message: string;
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  let errorResponse: ErrorResponse = {
    status: 500,
    message: "Internal Server Error",
  };

  if (err instanceof ValidationError) {
    errorResponse.status = 400;
    errorResponse.message = err.details.map((detail) => detail.message).join(", ");
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        errorResponse.status = 409;
        errorResponse.message = "Unique constraint violation";
        break;
      case "P2025":
        errorResponse.status = 404;
        errorResponse.message = "Record not found";
        break;
      default:
        errorResponse.status = 400;
        errorResponse.message = "Database error occurred";
    }
  } else if (err instanceof SyntaxError && "body" in err) {
    errorResponse.status = 400;
    errorResponse.message = "Invalid JSON payload";
  } else if (["JsonWebTokenError", "TokenExpiredError"].includes(err.name)) {
    errorResponse.status = 401;
    errorResponse.message = "Invalid authentication token";
  } else if (err.status && typeof err.status === "number") {
    errorResponse.status = err.status;
    errorResponse.message = err.message;
  } else {
    errorResponse.message = process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message;
  }

  res.status(errorResponse.status).json({
    success: false,
    error: errorResponse.message,
  });
};
