import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TutorService } from './tutor.service';
import { CreateTutorInput } from './dto/create-tutor.input';
import { UpdateTutorInput } from './dto/update-tutor.input';
import { TutorDto } from './dto/tutor.dto';

@Resolver(() => TutorDto)
export class TutorResolver {
  constructor(private readonly tutorService: TutorService) {}

  @Mutation(() => TutorDto)
  createTutor(@Args('createTutorInput') createTutorInput: CreateTutorInput) {
    return this.tutorService.create(createTutorInput);
  }

  @Query(() => [TutorDto], { name: 'tutor' })
  findAll() {
    return this.tutorService.findAll();
  }

  @Query(() => TutorDto, { name: 'tutor' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tutorService.findOne(id);
  }

  @Mutation(() => TutorDto)
  updateTutor(@Args('updateTutorInput') updateTutorInput: UpdateTutorInput) {
    return this.tutorService.update(updateTutorInput.id, updateTutorInput);
  }

  @Mutation(() => TutorDto)
  removeTutor(@Args('id', { type: () => Int }) id: number) {
    return this.tutorService.remove(id);
  }
}
