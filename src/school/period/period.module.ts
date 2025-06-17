import { Module } from '@nestjs/common';
import { PeriodService } from './period.service';
import { PeriodResolver } from './period.resolver';

@Module({
  providers: [PeriodResolver, PeriodService],
})
export class PeriodModule {}
