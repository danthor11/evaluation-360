import dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT;
export const DATABASE_URI = process.env.DATABASE_URI;
export const SECRET_KEY = process.env.SECRET_KEY;
