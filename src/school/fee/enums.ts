import { registerEnumType } from '@nestjs/graphql';

export enum Frequency {
  SINGLE = 'single',
  MONTHLY = 'monthly',
  WEEKLY = 'weekly',
  DAILY = 'daily',
  HOURLY = 'hourly',
}

registerEnumType(Frequency, {
  name: 'Frequency',
});
