import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI: mongo_uri, GRUPLAC_URL: gruplac_url } = process.env;

export const envConfig = { mongo_uri, gruplac_url };
