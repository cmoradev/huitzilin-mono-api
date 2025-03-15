import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TutorService } from './tutor.service';
import { CreateTutorInput } from './dto/create-tutor.input';
import { UpdateTutorInput } from './dto/update-tutor.input';
import { TutorDto } from './dto/tutor.dto';

@Resolver(() => TutorDto)
export class TutorResolver {
  constructor(private readonly tutorService: TutorService) {}

}
