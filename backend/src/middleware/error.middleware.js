import { ApiError } from "../utils/api-error.js";

export const errorMiddleware = (
  error,
  req,
  res,
  next
) => {
  console.error(error);

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message:
        "Email or phone number is already registered",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};