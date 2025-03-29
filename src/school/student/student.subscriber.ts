import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Student } from './entities/student.entity';
import { getFullname, randomCode, titleCase } from 'src/common/helpers';
import { InjectDataSource } from '@nestjs/typeorm';

@EventSubscriber()
export class StudentEventSubscriber
  implements EntitySubscriberInterface<Student>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Student;
  }

  async beforeInsert(e: InsertEvent<Student>): Promise<any | void> {
    e.entity.firstname = titleCase(`${e.entity!.firstname || ''}`);
    e.entity.lastname = titleCase(`${e.entity!.lastname || ''}`);
    
    e.entity.fullname = getFullname(e.entity);
    
    e.entity.code = randomCode();

    return e;
  }

  async beforeUpdate(e: UpdateEvent<Student>): Promise<any | void> {
    e.entity!.firstname = titleCase(`${e.entity!.firstname || ''}`);
    e.entity!.lastname = titleCase(`${e.entity!.lastname || ''}`);

    e.entity!.fullname = getFullname(e.entity as Student);

    return e;
  }
}
