import { createPublicClient, http, PublicClient } from 'viem';
import { avalancheFuji } from 'viem/chains';
import { RPC_URL } from 'helpers/deployments';
export const viemPublicClient: PublicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(RPC_URL),
});
