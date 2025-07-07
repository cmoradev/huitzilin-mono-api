import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Concept } from './entities/concept.entity';

@Injectable()
export class ConceptService extends TypeOrmQueryService<Concept> {
  constructor(
    @InjectRepository(Concept)
    private readonly _conceptRepository: Repository<Concept>,
  ) {
    super(_conceptRepository, { useSoftDelete: true });
  }
}
