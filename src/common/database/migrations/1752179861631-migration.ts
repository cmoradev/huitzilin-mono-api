import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752179861631 implements MigrationInterface {
    name = 'Migration1752179861631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school"."debts" RENAME COLUMN "pendingPayment" TO "branchId"`);
        await queryRunner.query(`ALTER TABLE "finance"."concepts" ADD "pendingPayment" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "school"."debts" DROP COLUMN "branchId"`);
        await queryRunner.query(`ALTER TABLE "school"."debts" ADD "branchId" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_84129d6d0ad1153485411ed657" ON "school"."debts" ("branchId") `);
        await queryRunner.query(`ALTER TABLE "school"."debts" ADD CONSTRAINT "FK_84129d6d0ad1153485411ed6578" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school"."debts" DROP CONSTRAINT "FK_84129d6d0ad1153485411ed6578"`);
        await queryRunner.query(`DROP INDEX "school"."IDX_84129d6d0ad1153485411ed657"`);
        await queryRunner.query(`ALTER TABLE "school"."debts" DROP COLUMN "branchId"`);
        await queryRunner.query(`ALTER TABLE "school"."debts" ADD "branchId" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "finance"."concepts" DROP COLUMN "pendingPayment"`);
        await queryRunner.query(`ALTER TABLE "school"."debts" RENAME COLUMN "branchId" TO "pendingPayment"`);
    }

}
