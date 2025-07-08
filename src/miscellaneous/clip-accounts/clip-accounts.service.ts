import { Injectable } from '@nestjs/common';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { ClipAccount } from './entities/clip-account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClipAccountsService extends TypeOrmQueryService<ClipAccount> {
  constructor(
    @InjectRepository(ClipAccount)
    private readonly _discountRepository: Repository<ClipAccount>,
  ) {
    super(_discountRepository, { useSoftDelete: true });
  }
}
