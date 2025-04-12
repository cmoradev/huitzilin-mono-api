import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Frequency } from '../enums';
import { Activity } from 'src/school';

@Entity({ schema: 'school', name: 'fees' })
export class Fee extends Base {
  @Column({ type: 'varchar', nullable: false, length: 64 })
  name: string;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', nullable: false, enum: Frequency })
  frequency: Frequency;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  activityId: string;

  @ManyToOne(() => Activity, (activity) => activity.fees)
  @JoinColumn({ name: 'activityId' })
  activity: Activity;
}
