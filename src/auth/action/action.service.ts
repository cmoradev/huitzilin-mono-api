import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Action } from '..';

@Injectable()
export class ActionService extends TypeOrmQueryService<Action> {
  constructor(
    @InjectRepository(Action)
    private readonly _actionRepository: Repository<Action>,
  ) {
    super(_actionRepository, { useSoftDelete: true });
  }
}
