import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePackageInput } from './create-package.input';

@InputType('UpdatePackage')
export class UpdatePackageInput extends PartialType(CreatePackageInput) {}
