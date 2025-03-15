import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Policy } from '..';

@Injectable()
export class PolicyService extends TypeOrmQueryService<Policy> {
  constructor(
    @InjectRepository(Policy)
    private readonly _policyRepository: Repository<Policy>,
  ) {
    super(_policyRepository, { useSoftDelete: true });
  }
}
