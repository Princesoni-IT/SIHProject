import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

export const generateToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      phone: user.phone,
        role: user.role || "user",
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
      algorithm: "HS256",
    }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: ["HS256"],
  });
};