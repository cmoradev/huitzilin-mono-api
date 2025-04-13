import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

@InputType('CreateStudent')
export class CreateStudentInput {
  @MaxLength(128)
  @Field(() => String, { nullable: false })
  picture: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  firstname: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  lastname: string;

  @Field(() => String, { nullable: false })
  dni: string;

  @Field(() => String, { nullable: false })
  dateBirth: string;

  @IsUUID()
  @Field(() => String, { nullable: true })
  userId: string;
}
