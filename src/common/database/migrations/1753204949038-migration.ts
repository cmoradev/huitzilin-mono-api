import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1753204949038 implements MigrationInterface {
  name = 'Migration1753204949038';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-links" ADD "accountId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_43497e2e0be185bab11f526f10" ON "miscellaneous"."clip-links" ("accountId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-links" ADD CONSTRAINT "FK_43497e2e0be185bab11f526f10b" FOREIGN KEY ("accountId") REFERENCES "miscellaneous"."clip-accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-links" DROP CONSTRAINT "FK_43497e2e0be185bab11f526f10b"`,
    );
    await queryRunner.query(
      `DROP INDEX "miscellaneous"."IDX_43497e2e0be185bab11f526f10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-links" DROP COLUMN "accountId"`,
    );
  }
}
