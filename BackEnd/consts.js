import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const PORT = process.env.PORT || 2002;

export const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/foods";

export const JWT_SECRET = process.env.JWT_SECRET || "potato";

// Allowed front-end origins. Empty means "any origin" (development only).
export const CORS_ORIGINS = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (isProduction) {
  if (JWT_SECRET === "potato") {
    throw new Error("JWT_SECRET must be set in production");
  }
  if (!process.env.DB_CONNECTION_STRING) {
    throw new Error("DB_CONNECTION_STRING must be set in production");
  }
}
