import { Injectable } from '@nestjs/common';
import { CreateActionInput } from './dto/create-action.input';
import { UpdateActionInput } from './dto/update-action.input';

@Injectable()
export class ActionService {
  create(createActionInput: CreateActionInput) {
    return {};
  }

  findAll() {
    return {};
  }

  findOne(id: number) {
    return {};
  }

  update(id: string, updateActionInput: UpdateActionInput) {
    return {};
  }

  remove(id: number) {
    return {};
  }
}
