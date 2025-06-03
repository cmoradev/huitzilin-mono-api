import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Fee } from './entities/fee.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { calculateAmountFromTotalAndTax } from 'src/common/lib/calculations';

@EventSubscriber()
export class FeeEventSubscriber implements EntitySubscriberInterface<Fee> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Fee;
  }

  beforeInsert(e: InsertEvent<Fee>) {
    e.entity = this.calculateTaxes(e.entity);
  }

  beforeUpdate(e: UpdateEvent<Fee>) {
    if (e.entity) {
      e.entity = this.calculateTaxes(e.entity as Fee);
    }
  }

  private calculateTaxes(fee: Fee) {
    if (typeof fee.withTax === 'boolean' && typeof fee.price === 'number') {
      if (fee.withTax) {
        const { amount, taxes } = calculateAmountFromTotalAndTax(fee.price);

        fee.amount = amount;
        fee.tax = taxes;
      } else {
        fee.amount = fee.price;
        fee.tax = 0;
      }
    }

    return fee;
  }
}
