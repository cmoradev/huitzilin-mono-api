import { Action, User } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ schema: 'auth', name: 'policies' })
export class Policy extends Base {
  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @OneToMany(() => Action, (action) => action.policy, { cascade: true })
  actions: Action[];

  @ManyToMany(() => User, (user) => user.policies)
  users: User[];
}
