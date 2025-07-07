import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Debit } from './entities/debit.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  calculateTotalFromUnitPriceQuantityDiscountAndTax,
  TaxEnum,
} from 'src/common/lib/calculations';

@EventSubscriber()
export class DebitEventSubscriber implements EntitySubscriberInterface<Debit> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Debit;
  }

  beforeInsert(e: InsertEvent<Debit>) {
    e.entity = this.calculateTotal(e.entity);
  }

  beforeUpdate(e: UpdateEvent<Debit>) {
    if (e.entity) {
      e.entity = this.calculateTotal(e.entity as Debit);
    }
  }

  private calculateTotal(debit: Debit) {
    const { unitPrice, quantity, amount, discount, subtotal, taxes, total } =
      calculateTotalFromUnitPriceQuantityDiscountAndTax(
        debit.unitPrice,
        debit.quantity,
        debit.discount,
        debit.withTax ? TaxEnum.Sixteen : TaxEnum.Zero,
      );

    debit.unitPrice = unitPrice;
    debit.quantity = quantity;
    debit.amount = amount;
    debit.discount = discount;
    debit.subtotal = subtotal;
    debit.taxes = taxes;
    debit.total = total;
    debit.pendingPayment = total;

    return debit;
  }
}
