import {
  sendEmailOtp,
  verifyEmailOtp,
} from "../services/otp.service.js";

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await sendEmailOtp(email);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const result = await verifyEmailOtp(
      email,
      otp
    );

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};