import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DiscountBy } from '../enums';
import { Branch } from 'src/auth';

@Entity({ schema: 'discounts', name: 'miscellaneous' })
export class Discount extends Base {
  @Column({ type: 'varchar', nullable: false, length: 64 })
  name: string;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'enum', nullable: false, enum: DiscountBy })
  type: DiscountBy;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.discounts)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;
}
