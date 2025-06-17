import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Discipline, Enrollment, Fee } from 'src/school';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PackageKind } from '../enums';

@Entity({ schema: 'school', name: 'packages' })
export class Package extends Base {
  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'smallint', nullable: false })
  order: number;

  @Column({ type: 'smallint', nullable: false })
  quantity: number;

  @Column({ type: 'enum', nullable: false, enum: PackageKind })
  kind: PackageKind;

  @Column({ type: 'boolean', nullable: false, default: true })
  withTax: boolean;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.packages)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => Fee, (action) => action.package, { cascade: ['insert'] })
  fees: Fee[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.package)
  enrollments: Enrollment[];

  @ManyToMany(() => Discipline, (discipline) => discipline.packages)
  disciplines: Discipline[];
}
