import { registerEnumType } from '@nestjs/graphql';

/**
 * Enumera las diferentes frecuencias posibles para un evento o acción.
 *
 * @enum {string}
 * @readonly
 */
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
