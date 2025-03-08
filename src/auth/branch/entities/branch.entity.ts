import { Action } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ schema: 'auth', name: 'branchs' })
export class Branch extends Base {
  @Column({ type: 'varchar', nullable: false, length: 128 })
  picture: string;

  @Column({ type: 'varchar', nullable: false, length: 16 })
  name: string;

  @OneToMany(() => Action, (action) => action.policy)
  actions: Action[];
}
