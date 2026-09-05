import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(254, "Email address is too long"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters")
    .max(128, "Password must not exceed 128 characters"),

  phone: z
    .string()
    .trim()
    .min(5, "Phone number is too short")
    .max(20, "Phone number is too long"),
});

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Email or phone number is required")
    .max(254, "Email or phone number is too long"),

  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password must not exceed 128 characters"),
});