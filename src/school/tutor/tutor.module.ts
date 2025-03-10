import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorResolver } from './tutor.resolver';

@Module({
  providers: [TutorResolver, TutorService],
})
export class TutorModule {}
