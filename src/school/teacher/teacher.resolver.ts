import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { TeacherDto } from './dto/teacher.dto';

@Resolver(() => TeacherDto)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Mutation(() => TeacherDto)
  createTeacher(@Args('createTeacherInput') createTeacherInput: CreateTeacherInput) {
    return this.teacherService.create(createTeacherInput);
  }

  @Query(() => [TeacherDto], { name: 'teacher' })
  findAll() {
    return this.teacherService.findAll();
  }

  @Query(() => TeacherDto, { name: 'teacher' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teacherService.findOne(id);
  }

  @Mutation(() => TeacherDto)
  updateTeacher(@Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput) {
    return this.teacherService.update(updateTeacherInput.id, updateTeacherInput);
  }

  @Mutation(() => TeacherDto)
  removeTeacher(@Args('id', { type: () => Int }) id: number) {
    return this.teacherService.remove(id);
  }
}
