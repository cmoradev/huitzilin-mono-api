import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752246780814 implements MigrationInterface {
    name = 'Migration1752246780814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school"."debts" DROP COLUMN "withPayment"`);
        await queryRunner.query(`ALTER TABLE "finance"."incomes" ADD "amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "finance"."incomes" ADD "discount" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "finance"."incomes" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "finance"."incomes" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "school"."debts" ADD "withPayment" boolean NOT NULL DEFAULT false`);
    }

}
