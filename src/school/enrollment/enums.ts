import { registerEnumType } from '@nestjs/graphql';

export enum EnrollmentState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PAUSED = 'paused',
}

registerEnumType(EnrollmentState, {
  name: 'EnrollmentState',
});
