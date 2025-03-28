import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Enrollment } from 'src/school';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ schema: 'school', name: 'cycles' })
export class Cycle extends Base {
  @Column({ type: 'varchar', nullable: false, length: 16 })
  name: string;

  @Column({ type: 'date', nullable: false })
  start: string;

  @Column({ type: 'date', nullable: false })
  end: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.cycles)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.cycle)
  enrollments: Enrollment[];
}
