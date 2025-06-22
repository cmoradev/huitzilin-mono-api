import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Enrollment, Schedule } from 'src/school';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ schema: 'school', name: 'periods' })
export class Period extends Base {
  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'smallint', nullable: false })
  order: number;

  @Column({ type: 'varchar', nullable: false, length: 16 })
  days: string;

  @Column({ type: 'date', nullable: false })
  start: string;

  @Column({ type: 'date', nullable: false })
  end: string;

  @Column({ type: 'time', nullable: false })
  firstHour: string;

  @Column({ type: 'time', nullable: false })
  lastHour: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.periods)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.period)
  enrollments: Enrollment[];

  @OneToMany(() => Schedule, (schedule) => schedule.period)
  schedules: Schedule[];
}
