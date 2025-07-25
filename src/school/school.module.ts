import { Module } from '@nestjs/common';
import { CycleModule } from './cycle/cycle.module';
import { DebitModule } from './debit/debit.module';
import { DocumentsModule } from './documents/documents.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { FeeModule } from './fee/fee.module';
import { LevelModule } from './level/level.module';
import { PackageModule } from './package/package.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { TutorModule } from './tutor/tutor.module';
import { PeriodModule } from './period/period.module';
import { DisciplineModule } from './discipline/discipline.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    CycleModule,
    DebitModule,
    DocumentsModule,
    EnrollmentModule,
    FeeModule,
    LevelModule,
    PackageModule,
    StudentModule,
    TeacherModule,
    TutorModule,
    PeriodModule,
    DisciplineModule,
    ScheduleModule,
  ],
})
export class SchoolModule {}
