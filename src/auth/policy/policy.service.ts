import { Injectable } from '@nestjs/common';
import { CreatePolicyInput } from './dto/create-policy.input';
import { UpdatePolicyInput } from './dto/update-policy.input';

@Injectable()
export class PolicyService {
  create(createPolicyInput: CreatePolicyInput) {
    return 'This action adds a new policy';
  }

  findAll() {
    return `This action returns all policy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} policy`;
  }

  update(id: string, updatePolicyInput: UpdatePolicyInput) {
    return `This action updates a #${id} policy`;
  }

  remove(id: number) {
    return `This action removes a #${id} policy`;
  }
}
