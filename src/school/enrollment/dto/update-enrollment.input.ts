import { InputType, PartialType } from '@nestjs/graphql';
import { CreateEnrollmentInput } from './create-enrollment.input';

@InputType('UpdateEnrollment')
export class UpdateEnrollmentInput extends PartialType(CreateEnrollmentInput) {}
