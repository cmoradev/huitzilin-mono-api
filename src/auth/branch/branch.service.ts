import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '..';
import { CreateBranchInput } from './dto/create-branch.input';
import { UpdateBranchInput } from './dto/update-branch.input';
import { instanceToInstance, instanceToPlain } from 'class-transformer';
import { BranchDto } from './dto/branch.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly _branchRepository: Repository<Branch>,
  ) {}

  async create(input: CreateBranchInput) {
    const created = await this._branchRepository.save(input);

    return instanceToPlain<BranchDto>(created);
  }

  findAll() {
    return `This action returns all branch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  update(input: UpdateBranchInput) {
    return `This action updates a #${input.id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
