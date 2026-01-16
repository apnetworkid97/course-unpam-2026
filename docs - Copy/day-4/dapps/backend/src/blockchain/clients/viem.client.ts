import { createPublicClient, http, PublicClient } from 'viem';
import { avalancheFuji } from 'viem/chains';

export const viemPublicClient: PublicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http('https://api.avax-test.network/ext/bc/C/rpc'),
});
