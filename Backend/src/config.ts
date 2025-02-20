import 'dotenv/config'

export const JWT_SECRET = process.env.JWT_SECRET || "";
export const PORT = process.env.PORT || 3000;
export const mongodb_url = process.env.MONGODB_URL || "";
