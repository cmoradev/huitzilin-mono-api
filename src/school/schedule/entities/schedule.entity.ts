import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Discipline, Enrollment, Level, Period } from 'src/school';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ schema: 'school', name: 'schedules' })
export class Schedule extends Base {
  @Column({ type: 'smallint', nullable: false })
  day: number;

  @Column({ type: 'time', nullable: false })
  start: string;

  @Column({ type: 'time', nullable: false })
  end: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.schedules)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  periodId: string;

  @ManyToOne(() => Period, (period) => period.schedules)
  @JoinColumn({ name: 'periodId' })
  period: Period;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  disciplineId: string;

  @ManyToOne(() => Discipline, (discipline) => discipline.schedules)
  @JoinColumn({ name: 'disciplineId' })
  discipline: Discipline;

  @ManyToMany(() => Level, (level) => level.schedules, { cascade: true })
  @JoinTable({ name: 'schedules_to_levels' })
  levels: Level[];

  @ManyToMany(() => Enrollment, (enrollment) => enrollment.schedules)
  enrollments: Enrollment[];
}
