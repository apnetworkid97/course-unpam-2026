// import dotenv from 'dotenv';
// dotenv.config();
import { avalancheFuji } from 'viem/chains';

export const USER_CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as `0x${string}`;
export const RPC_URL = process.env.RPC_URL as string;
export const PORT = process.env.PORT ?? 3001;
export const CHAIN_ID = avalancheFuji ?? process.env.CHAIN_ID;
