import { Injectable } from '@nestjs/common';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Document } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentService extends TypeOrmQueryService<Document> {
  constructor(
    @InjectRepository(Document)
    private readonly _documentRepository: Repository<Document>,
  ) {
    super(_documentRepository, { useSoftDelete: true });
  }
}
