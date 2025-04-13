import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { ClassroomModule } from './classroom/classroom.module';
import { CycleModule } from './cycle/cycle.module';
import { DebitModule } from './debit/debit.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { FeeModule } from './fee/fee.module';
import { LevelModule } from './level/level.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { TutorModule } from './tutor/tutor.module';

@Module({
  imports: [
    ActivityModule,
    ClassroomModule,
    CycleModule,
    DebitModule,
    EnrollmentModule,
    FeeModule,
    LevelModule,
    StudentModule,
    TeacherModule,
    TutorModule,
  ],
})
export class SchoolModule {}
