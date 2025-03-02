import { Injectable } from '@nestjs/common';
import { CreateActionInput } from './dto/create-action.input';
import { UpdateActionInput } from './dto/update-action.input';

@Injectable()
export class ActionService {
  create(createActionInput: CreateActionInput) {
    return 'This action adds a new action';
  }

  findAll() {
    return `This action returns all action`;
  }

  findOne(id: number) {
    return `This action returns a #${id} action`;
  }

  update(id: number, updateActionInput: UpdateActionInput) {
    return `This action updates a #${id} action`;
  }

  remove(id: number) {
    return `This action removes a #${id} action`;
  }
}
