import { Injectable } from '@nestjs/common';
import { CreateCycleInput } from './dto/create-cycle.input';
import { UpdateCycleInput } from './dto/update-cycle.input';

@Injectable()
export class CycleService {
  create(createCycleInput: CreateCycleInput) {
    return 'This action adds a new cycle';
  }

  findAll() {
    return `This action returns all cycle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cycle`;
  }

  update(id: string, updateCycleInput: UpdateCycleInput) {
    return `This action updates a #${id} cycle`;
  }

  remove(id: number) {
    return `This action removes a #${id} cycle`;
  }
}
