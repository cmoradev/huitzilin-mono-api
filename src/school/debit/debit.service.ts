import { Injectable } from '@nestjs/common';
import { CreateDebitInput } from './dto/create-debit.input';
import { UpdateDebitInput } from './dto/update-debit.input';

@Injectable()
export class DebitService {
  create(createDebitInput: CreateDebitInput) {
    return 'This action adds a new debit';
  }

  findAll() {
    return `This action returns all debit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debit`;
  }

  update(id: string, updateDebitInput: UpdateDebitInput) {
    return `This action updates a #${id} debit`;
  }

  remove(id: number) {
    return `This action removes a #${id} debit`;
  }
}
