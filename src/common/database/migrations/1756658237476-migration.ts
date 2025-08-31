import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1756658237476 implements MigrationInterface {
  name = 'Migration1756658237476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "finance"."concepts_application_enum" AS ENUM('debt_payment', 'additional_charge', 'delinquency_charge')`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ADD "application" "finance"."concepts_application_enum" NOT NULL DEFAULT 'debt_payment'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" DROP COLUMN "application"`,
    );
    await queryRunner.query(`DROP TYPE "finance"."concepts_application_enum"`);
  }
}
