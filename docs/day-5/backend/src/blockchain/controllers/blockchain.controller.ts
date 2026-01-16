import { Controller, Get, Query } from '@nestjs/common';
import { BlockchainService } from '../services/blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  constructor(
    private readonly blockchainService: BlockchainService,
  ) {}

  @Get('value')
  async getValue() {
    return this.blockchainService.getLatestValue();
  }

  @Get('events')
  async getEvents(
    @Query('fromBlock') fromBlock: string,
    @Query('toBlock') toBlock: string,
  ) {
    return this.blockchainService.getValueUpdatedEvents(
      BigInt(fromBlock),
      BigInt(toBlock),
    );
  }
}
