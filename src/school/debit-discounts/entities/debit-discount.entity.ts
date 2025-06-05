import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Debit } from 'src/school/debit/entities/debit.entity';
import { DiscountBy } from 'src/miscellaneous/discounts/enums';

@Entity({ schema: 'school', name: 'debit_discounts' })
export class DebitDiscount extends Base {
  @Column({ type: 'varchar', nullable: false, length: 64 })
  name: string;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'enum', nullable: false, enum: DiscountBy })
  type: DiscountBy;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  debitId: string;

  @ManyToOne(() => Debit, (debit) => debit.debitDiscounts)
  @JoinColumn({ name: 'debitId' })
  debit: Debit;
}
