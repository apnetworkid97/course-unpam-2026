import { createPublicClient, http, PublicClient } from 'viem';
import { avalancheFuji } from 'viem/chains';

export const viemPublicClient: PublicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(process.env.RPC_URL),
});
