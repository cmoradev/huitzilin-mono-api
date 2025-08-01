import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Enrollment, Schedule } from 'src/school';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ schema: 'school', name: 'levels' })
export class Level extends Base {
  @Column({ type: 'varchar', nullable: false, length: 8 })
  abbreviation: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  order: number;

  @ManyToOne(() => Branch, (branch) => branch.levels)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.level)
  enrollments: Enrollment[];

  @ManyToMany(() => Schedule, (schedule) => schedule.levels)
  schedules: Schedule[];
}
