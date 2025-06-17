import { Injectable } from '@nestjs/common';
import { CreatePeriodInput } from './dto/create-period.input';
import { UpdatePeriodInput } from './dto/update-period.input';

@Injectable()
export class PeriodService {
  create(createPeriodInput: CreatePeriodInput) {
    return 'This action adds a new period';
  }

  findAll() {
    return `This action returns all period`;
  }

  findOne(id: number) {
    return `This action returns a #${id} period`;
  }

  update(id: number, updatePeriodInput: UpdatePeriodInput) {
    return `This action updates a #${id} period`;
  }

  remove(id: number) {
    return `This action removes a #${id} period`;
  }
}
