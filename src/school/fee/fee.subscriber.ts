import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Fee } from './entities/fee.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { calculateTotalFromBaseAndTax } from 'src/common/lib/calculations';

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
    if (typeof fee.withTax === 'boolean' && typeof fee.amount === 'number') {
      if (fee.withTax) {
        const { total, taxes, amount } = calculateTotalFromBaseAndTax(
          fee.amount,
        );

        fee.amount = amount;
        fee.price = total;
        fee.taxes = taxes;
      } else {
        fee.price = fee.amount;
        fee.taxes = 0;
      }
    }

    return fee;
  }
}
