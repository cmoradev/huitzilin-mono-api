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

@Entity({ schema: 'school', name: 'activities' })
export class Activity extends Base {
  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'int', nullable: false })
  order: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  isPackage: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  inPackage: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  withTax: boolean;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.activities)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => Fee, (action) => action.activity, { cascade: ['insert'] })
  fees: Fee[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.activity)
  enrollments: Enrollment[];
}
