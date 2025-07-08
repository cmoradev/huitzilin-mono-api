import { Module } from '@nestjs/common';
import { DiscountModule } from './discounts/discounts.module';
import { ClipAccountsModule } from './clip-accounts/clip-accounts.module';

@Module({
  imports: [DiscountModule, ClipAccountsModule],
})
export class MiscellaneousModule {}
