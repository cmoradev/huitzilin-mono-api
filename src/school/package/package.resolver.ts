import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { SetOrderInput } from 'src/common/dtos';
import { UpdateCountResponse } from 'src/common/dtos/update.count.response.dto';
import { PackageDto } from './dto/package.dto';
import { PackageService } from './package.service';

@Resolver(() => PackageDto)
export class PackageResolver {
  constructor(private readonly _packageService: PackageService) {}

  @Mutation(() => UpdateCountResponse)
  setOrderPackages(
    @Args('input', { type: () => [SetOrderInput] })
    params: SetOrderInput[],
  ): Promise<UpdateCountResponse> {
    return this._packageService.setOrderPackages(params);
  }

  @Mutation(() => PackageDto)
  restoreOnePackage(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<PackageDto> {
    return this._packageService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyPackages(
    @Args('input', { type: () => FilterType(PackageDto) })
    filter: Filter<PackageDto>,
  ): Promise<UpdateManyResponse> {
    return this._packageService.restoreMany(filter);
  }
}
