import dotenv from "dotenv";
dotenv.config();
export const USER_CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";
export const PORT = process.env.PORT || 3000;
export const RPC_URL = process.env.RPC_URL || "";