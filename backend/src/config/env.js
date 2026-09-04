import "dotenv/config";

const requiredEnvVariables = ["MONGODB_URI"];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(
      `Missing required environment variable: ${variable}`
    );
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 5000,

  mongodbUri: process.env.MONGODB_URI,

  bcryptSaltRounds:
    Number(process.env.BCRYPT_SALT_ROUNDS) || 12,

  corsOrigin:
    process.env.CORS_ORIGIN || "http://localhost:5173",
};