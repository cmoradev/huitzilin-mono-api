import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentInput } from './dto/create-enrollment.input';
import { UpdateEnrollmentInput } from './dto/update-enrollment.input';
import { EnrollmentDto } from './dto/enrollment.dto';

@Resolver(() => EnrollmentDto)
export class EnrollmentResolver {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Mutation(() => EnrollmentDto)
  createEnrollment(
    @Args('createEnrollmentInput') createEnrollmentInput: CreateEnrollmentInput,
  ) {
    return this.enrollmentService.create(createEnrollmentInput);
  }

  @Query(() => [EnrollmentDto], { name: 'enrollment' })
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Query(() => EnrollmentDto, { name: 'enrollment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.enrollmentService.findOne(id);
  }

  @Mutation(() => EnrollmentDto)
  updateEnrollment(
    @Args('updateEnrollmentInput') updateEnrollmentInput: UpdateEnrollmentInput,
  ) {
    return this.enrollmentService.update(
      updateEnrollmentInput.id,
      updateEnrollmentInput,
    );
  }

  @Mutation(() => EnrollmentDto)
  removeEnrollment(@Args('id', { type: () => Int }) id: number) {
    return this.enrollmentService.remove(id);
  }
}
