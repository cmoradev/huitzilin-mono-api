import { registerEnumType } from '@nestjs/graphql';

export enum ActionEffect {
  ALLOW = 'allow',
  DENY = 'deny',
}

registerEnumType(ActionEffect, {
  name: 'ActionEffect',
});
