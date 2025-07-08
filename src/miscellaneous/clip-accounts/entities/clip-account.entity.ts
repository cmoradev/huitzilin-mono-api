import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ schema: 'miscellaneous', name: 'clip-accounts' })
export class ClipAccount extends Base {
  @Column({ type: 'varchar', nullable: false, length: 64 })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  token: string;

  @ManyToMany(() => Branch, (branch) => branch.clipAccounts)
  @JoinTable({ name: 'clip-accounts_to_branchs' })
  branchs: Branch[];
}
