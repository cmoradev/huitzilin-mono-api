import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { ClipLink } from 'src/miscellaneous';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ schema: 'miscellaneous', name: 'clip-accounts' })
export class ClipAccount extends Base {
  @Column({ type: 'varchar', nullable: false, length: 64 })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  token: string;

  @Column({ type: 'varchar', nullable: false })
  webhook: string;

  @Column({ type: 'varchar', nullable: false })
  default: string;

  @Column({ type: 'varchar', nullable: false })
  success: string;

  @Column({ type: 'varchar', nullable: false })
  error: string;

  @OneToMany(() => ClipLink, (clipLink) => clipLink.account)
  clipLinks: ClipLink[];

  @ManyToMany(() => Branch, (branch) => branch.clipAccounts)
  @JoinTable({ name: 'clip-accounts_to_branchs' })
  branchs: Branch[];
}
