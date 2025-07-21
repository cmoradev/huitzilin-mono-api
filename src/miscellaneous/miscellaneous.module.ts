import { Module } from '@nestjs/common';
import { DiscountModule } from './discounts/discounts.module';
import { ClipAccountsModule } from './clip-accounts/clip-accounts.module';
import { ClipLinksModule } from './clip-links/clip-links.module';

@Module({
  imports: [DiscountModule, ClipAccountsModule, ClipLinksModule],
})
export class MiscellaneousModule {}
