import crypto from "crypto";
import bcrypt from "bcrypt";

import EmailOtp from "../models/email-otp-model.js";
import { sendEmail } from "../utils/mailer.js";
import { ApiError } from "../utils/api-error.js";

const OTP_EXPIRY_MINUTES = 5;
const OTP_LENGTH = 6;

const generateOtp = () => {
  return crypto
    .randomInt(0, 10 ** OTP_LENGTH)
    .toString()
    .padStart(OTP_LENGTH, "0");
};

export const sendEmailOtp = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const otp = generateOtp();

  const otpHash = await bcrypt.hash(otp, 10);

  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
  );

  await EmailOtp.deleteMany({
    email: normalizedEmail,
  });

  await EmailOtp.create({
    email: normalizedEmail,
    otpHash,
    expiresAt,
  });

  await sendEmail({
    to: normalizedEmail,
    subject: "Your Email Verification OTP",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Email Verification</h2>

        <p>Your OTP for email verification is:</p>

        <h1 style="letter-spacing: 5px;">
          ${otp}
        </h1>

        <p>
          This OTP will expire in
          <strong>${OTP_EXPIRY_MINUTES} minutes</strong>.
        </p>

        <p>
          If you did not request this OTP, please ignore this email.
        </p>
      </div>
    `,
  });

  return {
    email: normalizedEmail,
    expiresIn: `${OTP_EXPIRY_MINUTES} minutes`,
  };
};

export const verifyEmailOtp = async (email, otp) => {
  const normalizedEmail = email.trim().toLowerCase();

  const otpRecord = await EmailOtp.findOne({
    email: normalizedEmail,
  });

  if (!otpRecord) {
    throw new ApiError(
      400,
      "OTP not found or expired"
    );
  }

  if (otpRecord.expiresAt < new Date()) {
    await EmailOtp.deleteOne({
      _id: otpRecord._id,
    });

    throw new ApiError(
      400,
      "OTP has expired"
    );
  }

  if (otpRecord.attempts >= 5) {
    await EmailOtp.deleteOne({
      _id: otpRecord._id,
    });

    throw new ApiError(
      429,
      "Too many incorrect OTP attempts"
    );
  }

  const isValid = await bcrypt.compare(
    otp,
    otpRecord.otpHash
  );

  if (!isValid) {
    otpRecord.attempts += 1;
    await otpRecord.save();

    throw new ApiError(
      400,
      "Invalid OTP"
    );
  }

  await EmailOtp.deleteOne({
    _id: otpRecord._id,
  });

  return {
    email: normalizedEmail,
    verified: true,
  };
};