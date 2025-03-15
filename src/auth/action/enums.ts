import { registerEnumType } from '@nestjs/graphql';

/**
 * Enumeración que representa los posibles efectos de una acción de autorización.
 * 
 * @enum {string}
 * @property {string} ALLOW - Permite la acción.
 * @property {string} DENY - Niega la acción.
 */
export enum ActionEffect {
  ALLOW = 'allow',
  DENY = 'deny',
}

registerEnumType(ActionEffect, {
  name: 'ActionEffect',
});
