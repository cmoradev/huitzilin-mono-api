import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ schema: 'school', name: 'teachers' })
export class Teacher extends Base {
  @Column({ type: 'varchar', nullable: false, length: 128 })
  picture: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  firstname: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  lastname: string;

  @Column({ type: 'varchar', nullable: false, length: 64 })
  fullname: string;

  @Column({ type: 'uuid', nullable: true })
  @Index()
  userId: string;
}
