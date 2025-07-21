import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { ClipLinksService } from './clip-links.service';
import { ClipLinkDto } from './dto/clip-link.dto';
import { ClipLink } from './entities/clip-link.entity';

@Resolver(() => ClipLink)
export class ClipLinksResolver {
  constructor(private readonly _clipLinksService: ClipLinksService) {}

  @Mutation(() => ClipLinkDto)
  restoreOneClipLink(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<ClipLinkDto> {
    return this._clipLinksService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyClipLinks(
    @Args('input', { type: () => FilterType(ClipLinkDto) })
    filter: Filter<ClipLinkDto>,
  ): Promise<UpdateManyResponse> {
    return this._clipLinksService.restoreMany(filter);
  }
}
