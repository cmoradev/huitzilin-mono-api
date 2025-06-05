import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { DocumentDto } from './dto/document.dto';
import { DocumentService } from './documents.service';

@Resolver(() => DocumentDto)
export class DocumentResolver {
  constructor(private readonly _documentService: DocumentService) {}

  @Mutation(() => DocumentDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<DocumentDto> {
    return this._documentService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(DocumentDto) })
    filter: Filter<DocumentDto>,
  ): Promise<UpdateManyResponse> {
    return this._documentService.restoreMany(filter);
  }
}
