import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClassroomService } from './classroom.service';
import { CreateClassroomInput } from './dto/create-classroom.input';
import { UpdateClassroomInput } from './dto/update-classroom.input';
import { ClassroomDto } from './dto/classroom.dto';

@Resolver(() => ClassroomDto)
export class ClassroomResolver {
  constructor(private readonly classroomService: ClassroomService) {}

  @Mutation(() => ClassroomDto)
  createClassroom(@Args('createClassroomInput') createClassroomInput: CreateClassroomInput) {
    return this.classroomService.create(createClassroomInput);
  }

  @Query(() => [ClassroomDto], { name: 'classroom' })
  findAll() {
    return this.classroomService.findAll();
  }

  @Query(() => ClassroomDto, { name: 'classroom' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.classroomService.findOne(id);
  }

  @Mutation(() => ClassroomDto)
  updateClassroom(@Args('updateClassroomInput') updateClassroomInput: UpdateClassroomInput) {
    return this.classroomService.update(updateClassroomInput.id, updateClassroomInput);
  }

  @Mutation(() => ClassroomDto)
  removeClassroom(@Args('id', { type: () => Int }) id: number) {
    return this.classroomService.remove(id);
  }
}
