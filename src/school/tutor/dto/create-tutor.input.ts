import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

@InputType('CreateTutor')
export class CreateTutorInput {
  @MaxLength(128)
  @Field(() => String, { nullable: false })
  picture: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  firstname: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  lastname: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  userId: string;
}
