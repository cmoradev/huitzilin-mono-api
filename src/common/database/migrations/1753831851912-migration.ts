import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1753831851912 implements MigrationInterface {
  name = 'Migration1753831851912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."discounts" ALTER COLUMN "value" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "unitPrice" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "quantity" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "amount" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "discount" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "subtotal" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "taxes" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "total" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" ALTER COLUMN "amount" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" ALTER COLUMN "taxes" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" ALTER COLUMN "price" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "amount" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "discount" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "subtotal" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "taxes" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "total" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "pendingPayment" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "unitPrice" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "quantity" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "amount" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "discount" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "subtotal" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "taxes" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "total" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "pendingPayment" TYPE numeric(14,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."payments" ALTER COLUMN "amount" TYPE numeric(14,6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "finance"."payments" ALTER COLUMN "amount" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "pendingPayment" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "total" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "taxes" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "subtotal" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "discount" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "amount" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "quantity" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ALTER COLUMN "unitPrice" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "pendingPayment" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "total" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "taxes" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "subtotal" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "discount" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ALTER COLUMN "amount" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" ALTER COLUMN "price" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" ALTER COLUMN "taxes" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" ALTER COLUMN "amount" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "total" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "taxes" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "subtotal" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "discount" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "amount" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "quantity" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ALTER COLUMN "unitPrice" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."discounts" ALTER COLUMN "value" TYPE numeric(10,2)`,
    );
  }
}
