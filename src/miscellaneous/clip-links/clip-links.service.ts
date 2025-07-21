import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { ClipLink } from './entities/clip-link.entity';

@Injectable()
export class ClipLinksService extends TypeOrmQueryService<ClipLink> {
  constructor(
    @InjectRepository(ClipLink)
    private readonly _clipLinkRepository: Repository<ClipLink>,
  ) {
    super(_clipLinkRepository, { useSoftDelete: true });
  }
}
