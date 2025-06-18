import { registerEnumType } from '@nestjs/graphql';

/**
 * Enumera los posibles tipos de paquetes que se pueden ofrecer en la escuela.
 *
 * @enum {string}
 * @readonly
 */
export enum PackageKind {
  HOURS = 'hours',
  QUANTITY = 'quantity',
  UNLIMITED = 'unlimited',
}

registerEnumType(PackageKind, {
  name: 'PackageKind',
});
