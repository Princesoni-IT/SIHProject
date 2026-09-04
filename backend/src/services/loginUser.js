import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";

export const loginUser = async ({
  identifier,
  password,
}) => {
  const value = identifier.trim();

  // Check whether the identifier is an email or phone number.
  const isEmail = value.includes("@");

  const user = await User.findOne(
    isEmail
      ? { email: value.toLowerCase() }
      : { phone: value }
  ).select("+password");

  if (!user) {
    throw new ApiError(
      401,
      "Invalid email/phone number or password"
    );
  }

  // Compare the entered password with the hashed password.
  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new ApiError(
      401,
      "Invalid email/phone number or password"
    );
  }

  // Return only the information required by the frontend.
  return {
    id: user._id,
    email: user.email,
    phone: user.phone,
  };
};