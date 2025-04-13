import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1744552322034 implements MigrationInterface {
  name = 'Migration1744552322034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."students" ADD "levelId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4627550896111589a4da245dad" ON "school"."students" ("levelId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."students" ADD CONSTRAINT "FK_4627550896111589a4da245dadf" FOREIGN KEY ("levelId") REFERENCES "school"."levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."students" DROP CONSTRAINT "FK_4627550896111589a4da245dadf"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_4627550896111589a4da245dad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."students" DROP COLUMN "levelId"`,
    );
  }
}
