import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1754844238973 implements MigrationInterface {
  name = 'Migration1754844238973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth"."policies" DROP CONSTRAINT "FK_5e234b497d27d66e987c2ee0b98"`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_5e234b497d27d66e987c2ee0b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."actions" DROP COLUMN "effect"`,
    );
    await queryRunner.query(`DROP TYPE "auth"."actions_effect_enum"`);
    await queryRunner.query(
      `ALTER TABLE "auth"."actions" DROP COLUMN "action"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."policies" DROP COLUMN "branchId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."actions" ADD "resources" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."actions" ADD "actions" character varying array NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-links" ALTER COLUMN "amount" TYPE numeric(14,6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-links" ALTER COLUMN "amount" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."actions" DROP COLUMN "actions"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."actions" DROP COLUMN "resources"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."policies" ADD "branchId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."actions" ADD "action" character varying(32) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "auth"."actions_effect_enum" AS ENUM('allow', 'deny')`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."actions" ADD "effect" "auth"."actions_effect_enum" NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5e234b497d27d66e987c2ee0b9" ON "auth"."policies" ("branchId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."policies" ADD CONSTRAINT "FK_5e234b497d27d66e987c2ee0b98" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
