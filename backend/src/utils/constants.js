process.loadEnvFile();

export const PORT = process.env.PORT || 5000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const MONGODB_URI = process.env.MONGODB_URI;
export const DB_NAME = "blogapp";
export const JWT_SECRET = process.env.JWT_SECRET;
