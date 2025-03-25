import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Enrollment, Fee } from 'src/school';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ schema: 'school', name: 'courses' })
export class Course extends Base {
  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.courses)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => Fee, (action) => action.course, { cascade: ['insert'] })
  fees: Fee[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
