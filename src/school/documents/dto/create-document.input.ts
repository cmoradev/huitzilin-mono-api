import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType('CreateDocument')
export class CreateDocumentInput {
  @MaxLength(64)
  @Field(() => String, { nullable: false })
  name: string;

  @MaxLength(128)
  @Field(() => String, { nullable: false })
  url: string;
}
