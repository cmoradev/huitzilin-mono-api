import { Module } from '@nestjs/common';
import { DiscountModule } from './discounts/discounts.module';

@Module({
  imports: [DiscountModule],
})
export class MiscellaneousModule {}
