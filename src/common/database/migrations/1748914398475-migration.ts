import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748914398475 implements MigrationInterface {
    name = 'Migration1748914398475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school"."activities" ADD "withTax" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "school"."fees" ADD "amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "school"."fees" ADD "tax" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "school"."fees" ADD "withTax" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "school"."levels" ADD "order" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school"."levels" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "school"."fees" DROP COLUMN "withTax"`);
        await queryRunner.query(`ALTER TABLE "school"."fees" DROP COLUMN "tax"`);
        await queryRunner.query(`ALTER TABLE "school"."fees" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "school"."activities" DROP COLUMN "withTax"`);
    }

}
