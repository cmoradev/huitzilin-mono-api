import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Branch } from '..';

@Injectable()
export class BranchService extends TypeOrmQueryService<Branch> {
  constructor(
    @InjectRepository(Branch)
    private readonly _branchRepository: Repository<Branch>,
  ) {
    super(_branchRepository, { useSoftDelete: true });
  }
}
