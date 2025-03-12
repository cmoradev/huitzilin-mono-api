import { Injectable } from '@nestjs/common';
import { CreateDealInput } from './dto/create-deal.input';
import { UpdateDealInput } from './dto/update-deal.input';

@Injectable()
export class DealService {
  create(createDealInput: CreateDealInput) {
    return 'This action adds a new deal';
  }

  findAll() {
    return `This action returns all deal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deal`;
  }

  update(id: number, updateDealInput: UpdateDealInput) {
    return `This action updates a #${id} deal`;
  }

  remove(id: number) {
    return `This action removes a #${id} deal`;
  }
}
