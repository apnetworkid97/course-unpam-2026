import { createPublicClient, http, PublicClient } from 'viem';
import { RPC_URL,CHAIN_ID } from '../helpers/deployments';

export const viemPublicClient: PublicClient = createPublicClient({
  chain: CHAIN_ID,
  transport: http(RPC_URL),
});
