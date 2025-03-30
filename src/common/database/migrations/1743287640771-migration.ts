import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743287640771 implements MigrationInterface {
    name = 'Migration1743287640771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school"."debts" ADD "quantity" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD "cycleId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_1dffb4570c1142bdd669095d28" ON "auth"."users" ("cycleId") `);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD CONSTRAINT "FK_1dffb4570c1142bdd669095d283" FOREIGN KEY ("cycleId") REFERENCES "school"."cycles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP CONSTRAINT "FK_1dffb4570c1142bdd669095d283"`);
        await queryRunner.query(`DROP INDEX "auth"."IDX_1dffb4570c1142bdd669095d28"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP COLUMN "cycleId"`);
        await queryRunner.query(`ALTER TABLE "school"."debts" DROP COLUMN "quantity"`);
    }

}
