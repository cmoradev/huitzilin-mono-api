import { Injectable } from '@nestjs/common';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';

@Injectable()
export class TeacherService {
  create(createTeacherInput: CreateTeacherInput) {
    return 'This action adds a new teacher';
  }

  findAll() {
    return `This action returns all teacher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: string, updateTeacherInput: UpdateTeacherInput) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
