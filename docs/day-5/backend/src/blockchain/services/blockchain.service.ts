import { BadRequestException, Injectable} from "@nestjs/common";
import { viemPublicClient } from "../clients/viem.client";
import { SIMPLE_STORAGE_ABI } from "../simple-storage/simple-storage.abi";
import { USER_CONTRACT_ADDRESS } from "helpers/deployments";
import { MAX_BLOCK_RANGE } from '../constants/blockchain.constants';
import { handleRpcError } from "../errors/rpc-error.handler";
import {parseAbiItem } from "viem";
@Injectable()
export class BlockchainService {
    
  private readonly contractAddress: `0x${string}` = USER_CONTRACT_ADDRESS as `0x${string}`;
   async getLatestValue() {
    if (!this.contractAddress) {
        throw new Error('CONTRACT_ADDRESS is not configured');
      }
    try {
      const value = (await viemPublicClient.readContract({
        address: this.contractAddress,
        abi: SIMPLE_STORAGE_ABI,
        functionName: 'getValue',
      })) as bigint;

      return {
        value: value.toString(),
      };
    } catch (error) {
      handleRpcError(error);
    }
  }

  // 🔹 Read ValueUpdated events
  async getValueUpdatedEvents(fromBlock: bigint, toBlock: bigint) {
      if (!this.contractAddress) {
        throw new Error('CONTRACT_ADDRESS is not configured');
      }
     if (toBlock < fromBlock) {
      throw new BadRequestException(
        'fromBlock harus kurang dari toBlock',
      );
    }

    if (toBlock - fromBlock > MAX_BLOCK_RANGE) {
      throw new BadRequestException(
        `Block range terlalu besar (max ${MAX_BLOCK_RANGE.toString()})`,
      );
    }
    try {
      const events = await viemPublicClient.getLogs({
        address: this.contractAddress,
        event: parseAbiItem(
            'event ValueUpdated(uint256 newValue)',
          ),
        fromBlock,
        toBlock,
      });
      // console.log(events)
      return events.map((event) => ({blockNumber: event.blockNumber?.toString(),value: event.args?.newValue?.toString(),txHash: event.transactionHash
      }));
    } catch (error) {
      handleRpcError(error);
    }
  }
}