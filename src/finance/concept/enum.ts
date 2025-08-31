import { registerEnumType } from '@nestjs/graphql';

export enum ConceptApplication {
  DEBT_PAYMENT = 'debt_payment',
  ADDITIONAL_CHARGE = 'additional_charge',
  DELINQUENCY_CHARGE = 'delinquency_charge',
}

registerEnumType(ConceptApplication, {
  name: 'ConceptApplication',
});
