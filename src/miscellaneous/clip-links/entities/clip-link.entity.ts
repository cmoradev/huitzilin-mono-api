import { Base } from 'src/common/utils/base.entity';
import { Income } from 'src/finance';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ schema: 'miscellaneous', name: 'clip-links' })
export class ClipLink extends Base {
  @Column({ type: 'varchar', nullable: false })
  link: string;

  @Column({ type: 'varchar', nullable: false })
  qr: string;

  @Column({ type: 'timestamp', nullable: false })
  expiresAt: Date;

  @Column({ type: 'varchar', nullable: false })
  requestId: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  incomeId: string;

  @ManyToOne(() => Income, (income) => income.clipLinks)
  @JoinColumn({ name: 'incomeId' })
  income: Income;
}
