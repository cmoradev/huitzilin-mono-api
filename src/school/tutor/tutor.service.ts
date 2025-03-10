import { Injectable } from '@nestjs/common';
import { CreateTutorInput } from './dto/create-tutor.input';
import { UpdateTutorInput } from './dto/update-tutor.input';

@Injectable()
export class TutorService {
  create(createTutorInput: CreateTutorInput) {
    return 'This action adds a new tutor';
  }

  findAll() {
    return `This action returns all tutor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tutor`;
  }

  update(id: string, updateTutorInput: UpdateTutorInput) {
    return `This action updates a #${id} tutor`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutor`;
  }
}
