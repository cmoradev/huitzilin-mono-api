import { Module } from '@nestjs/common';
import { ClassroomModule } from './classroom/classroom.module';
import { CourseModule } from './course/course.module';
import { CycleModule } from './cycle/cycle.module';
import { DealModule } from './deal/deal.module';
import { DebitModule } from './debit/debit.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { FeeModule } from './fee/fee.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { TutorModule } from './tutor/tutor.module';

@Module({
  imports: [
    ClassroomModule,
    CourseModule,
    CycleModule,
    DealModule,
    DebitModule,
    EnrollmentModule,
    FeeModule,
    StudentModule,
    TeacherModule,
    TutorModule,
  ],
})
export class SchoolModule {}
