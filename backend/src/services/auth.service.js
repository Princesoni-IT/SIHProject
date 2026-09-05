import bcrypt from "bcrypt";

import User from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { env } from "../config/env.js";

export const registerUser = async ({
  email,
  password,
  phone,
}) => {
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedPhone = phone.trim();

  const existingUser = await User.findOne({
    $or: [
      { email: normalizedEmail },
      { phone: normalizedPhone },
    ],
  }).lean();

  if (existingUser) {
    if (existingUser.email === normalizedEmail) {
      throw new ApiError(
        409,
        "Email is already registered"
      );
    }

    if (existingUser.phone === normalizedPhone) {
      throw new ApiError(
        409,
        "Phone number is already registered"
      );
    }

    throw new ApiError(
      409,
      "User already exists"
    );
  }

  const passwordHash = await bcrypt.hash(
    password,
    env.bcryptSaltRounds
  );

  try {
    const user = await User.create({
      email: normalizedEmail,
      password: passwordHash,
      phone: normalizedPhone,
    });

    return {
      id: user._id,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(
        409,
        "Email or phone number is already registered"
      );
    }

    throw error;
  }
};