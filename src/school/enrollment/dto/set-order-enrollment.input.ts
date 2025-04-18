import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('SetOrderEnrollment')
export class SetOrderEnrollmentInput {
  @IsUUID()
  @Field(() => String, { nullable: false })
  enrollmentId: string;

  @Field(() => Number, { nullable: false })
  order: number;
}
