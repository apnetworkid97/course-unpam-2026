import { ApiProperty } from '@nestjs/swagger';

export class GetEventsDTO {
  @ApiProperty({
    example: '123456',
    description: 'Block awal',
  })
  fromBlock: number;

  @ApiProperty({
    example: '123999',
    description: 'Block akhir',
  })
  toBlock: string;
}
