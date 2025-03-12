import { Module } from '@nestjs/common';
import { DebitService } from './debit.service';
import { DebitResolver } from './debit.resolver';

@Module({
  providers: [DebitResolver, DebitService],
})
export class DebitModule {}
