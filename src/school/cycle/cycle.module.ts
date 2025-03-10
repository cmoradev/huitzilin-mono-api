import { Module } from '@nestjs/common';
import { CycleService } from './cycle.service';
import { CycleResolver } from './cycle.resolver';

@Module({
  providers: [CycleResolver, CycleService],
})
export class CycleModule {}
