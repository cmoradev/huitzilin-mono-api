import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Debit } from './entities/debit.entity';

@Injectable()
export class DebitService extends TypeOrmQueryService<Debit> {
  constructor(
    @InjectRepository(Debit)
    private readonly _debitRepository: Repository<Debit>,
  ) {
    super(_debitRepository, { useSoftDelete: true });
  }
}
