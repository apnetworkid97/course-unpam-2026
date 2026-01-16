import { Module } from '@nestjs/common';
import { BlockchainService } from '../services/blockchain.service';
import { BlockchainController } from '../controllers/blockchain.controller';

@Module({
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule {}
