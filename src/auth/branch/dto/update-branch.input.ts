import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreateBranchInput } from "./create-branch.input";

@InputType('UpdateBranch')
export class UpdateBranchInput extends PartialType(CreateBranchInput) {
  @Field(() => ID, { nullable: false })
  id: string;
}
