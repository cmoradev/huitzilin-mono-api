import { Base } from 'src/common/utils/base.entity';
import { Package } from 'src/school';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Frequency } from '../enums';

@Entity({ schema: 'school', name: 'fees' })
export class Fee extends Base {
  @Column({ type: 'varchar', nullable: false, length: 64 })
  name: string;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  amount: number;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  taxes: number;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  price: number;

  @Column({ type: 'boolean', nullable: false, default: true })
  withTax: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  autoLoad: boolean;

  @Column({ type: 'enum', nullable: false, enum: Frequency })
  frequency: Frequency;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  packageId: string;

  @ManyToOne(() => Package, (pack) => pack.fees)
  @JoinColumn({ name: 'packageId' })
  package: Package;
}
