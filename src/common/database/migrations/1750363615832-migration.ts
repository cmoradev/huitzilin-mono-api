import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750363615832 implements MigrationInterface {
    name = 'Migration1750363615832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school"."periods" ADD "order" smallint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school"."periods" DROP COLUMN "order"`);
    }

}
