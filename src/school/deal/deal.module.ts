import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealResolver } from './deal.resolver';

@Module({
  providers: [DealResolver, DealService],
})
export class DealModule {}
