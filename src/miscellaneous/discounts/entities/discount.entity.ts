import { Base } from 'src/common/utils/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { DiscountBy } from '../enums';
import { Branch } from 'src/auth';
import { Debit } from 'src/school';
import { Concept } from 'src/finance';

@Entity({ schema: 'miscellaneous', name: 'discounts' })
export class Discount extends Base {
  @Column({ type: 'varchar', nullable: false, length: 64 })
  name: string;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  value: number;

  @Column({ type: 'enum', nullable: false, enum: DiscountBy })
  type: DiscountBy;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.discounts)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @ManyToMany(() => Debit, (debit) => debit.discounts)
  debts: Debit[];

  @ManyToMany(() => Concept, (debit) => debit.discounts)
  concepts: Concept[];
}
