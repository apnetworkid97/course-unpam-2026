import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { GetEventsDTO } from './dto/get-events.dto';

@Controller('blockchain')
export class BlockchainController {
  constructor(
    private readonly blockchainService: BlockchainService,
  ) {}

  // GET /blockchain/value
  @Get('value')
  async getValue() {
    return this.blockchainService.getLatestValue();
  }

  // POST /blockchain/events
  @Post('events')
async getEvents(@Body() body: GetEventsDTO) {
  return this.blockchainService.getValueUpdatedEvents(
    BigInt(body.fromBlock),
    BigInt(body.toBlock),
  );
}

}
