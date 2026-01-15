import dotenv from "dotenv";
dotenv.config();
export const USER_CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";
export const SWAGGER_PORT = process.env.SWAGGER_PORT || 3000;