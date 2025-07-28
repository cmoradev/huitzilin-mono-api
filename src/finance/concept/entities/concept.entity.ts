import { Base } from 'src/common/utils/base.entity';
import { Income } from 'src/finance/income/entities/income.entity';
import { Discount } from 'src/miscellaneous';
import { Debit } from 'src/school';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ schema: 'finance', name: 'concepts' })
export class Concept extends Base {
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  unitPrice: number;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  quantity: number;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  amount: number;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  discount: number;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  subtotal: number;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  taxes: number;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  total: number;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  pendingPayment: number;

  @Column({ type: 'boolean', nullable: false, default: true })
  withTax: boolean;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  incomeId: string;

  @ManyToOne(() => Income, (income) => income.concepts)
  @JoinColumn({ name: 'incomeId' })
  income: Income;

  @ManyToMany(() => Discount, (discount) => discount.concepts, {
    cascade: true,
  })
  @JoinTable({ name: 'concepts_to_discounts' })
  discounts: Discount[];

  @ManyToMany(() => Debit, (debit) => debit.concepts, { cascade: true })
  @JoinTable({ name: 'concepts_to_debits' })
  debits: Debit[];
}
