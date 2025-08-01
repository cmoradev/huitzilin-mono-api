import { Base } from 'src/common/utils/base.entity';
import { Income } from 'src/finance';
import { ClipAccount } from 'src/miscellaneous/clip-accounts/entities/clip-account.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ schema: 'miscellaneous', name: 'clip-links' })
export class ClipLink extends Base {
  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  amount: number;

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
  accountId: string;

  @ManyToOne(() => ClipAccount, (account) => account.clipLinks)
  @JoinColumn({ name: 'accountId' })
  account: ClipAccount;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  incomeId: string;

  @ManyToOne(() => Income, (income) => income.clipLinks)
  @JoinColumn({ name: 'incomeId' })
  income: Income;
}
