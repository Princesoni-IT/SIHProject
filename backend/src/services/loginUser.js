import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { generateToken } from "../utils/jwt.js";

export const loginUser = async ({
  identifier,
  password,
}) => {
  const value = identifier.trim();
   // Admin login
  if (
    value.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase() &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = generateToken({
      _id: "admin",
      email: process.env.ADMIN_EMAIL,
      phone: null,
      role: "admin",
    });

    return {
      token,
      user: {
        id: "admin",
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
    };
  }

  // Existing user login

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
  const token = generateToken(user);

  // Return information required by frontend
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      phone: user.phone,
      role: "user",
    },
  };
};