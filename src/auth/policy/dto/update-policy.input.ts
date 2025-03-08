import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreatePolicyInput } from "./create-policy.input";

@InputType('UpdatePolicy')
export class UpdatePolicyInput extends PartialType(CreatePolicyInput) {
  @Field(() => ID, { nullable: false })
  id: string;
}
