import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/api-error.js";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication token is required");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Authentication token is required");
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(
        new ApiError(401, "Invalid or expired authentication token")
      );
    }

    next(error);
  }
};