import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { PackageKind } from '../enums';

@InputType('CreatePackage')
export class CreatePackageInput {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Number, { nullable: false })
  order: number;

  @Field(() => Number, { nullable: false })
  quantity: number;

  @Field(() => PackageKind, { nullable: false })
  kind: PackageKind;

  @Field(() => Boolean, { nullable: false })
  withTax: boolean;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;
}
