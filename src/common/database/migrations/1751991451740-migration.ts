import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1751991451740 implements MigrationInterface {
  name = 'Migration1751991451740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "miscellaneous"."clip-accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(64) NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_6db65bc87d10261089bcf37b596" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "miscellaneous"."clip-accounts_to_branchs" ("clipAccountsId" uuid NOT NULL, "branchsId" uuid NOT NULL, CONSTRAINT "PK_51d0e2703dffcab7a3bc394ea5e" PRIMARY KEY ("clipAccountsId", "branchsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_86273be1d29488b74ddf5920d5" ON "miscellaneous"."clip-accounts_to_branchs" ("clipAccountsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f9baf39a872fe3a1aab9e1dada" ON "miscellaneous"."clip-accounts_to_branchs" ("branchsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."students" ADD "active" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `CREATE TYPE "finance"."payments_method_enum" AS ENUM('card', 'transfer', 'cash', 'clip')`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."payments" ADD "method" "finance"."payments_method_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "finance"."payments_state_enum" RENAME TO "payments_state_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "finance"."payments_state_enum" AS ENUM('paid', 'pending', 'cancelled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."payments" ALTER COLUMN "state" TYPE "finance"."payments_state_enum" USING "state"::"text"::"finance"."payments_state_enum"`,
    );
    await queryRunner.query(`DROP TYPE "finance"."payments_state_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-accounts_to_branchs" ADD CONSTRAINT "FK_86273be1d29488b74ddf5920d55" FOREIGN KEY ("clipAccountsId") REFERENCES "miscellaneous"."clip-accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-accounts_to_branchs" ADD CONSTRAINT "FK_f9baf39a872fe3a1aab9e1dada8" FOREIGN KEY ("branchsId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-accounts_to_branchs" DROP CONSTRAINT "FK_f9baf39a872fe3a1aab9e1dada8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-accounts_to_branchs" DROP CONSTRAINT "FK_86273be1d29488b74ddf5920d55"`,
    );
    await queryRunner.query(
      `CREATE TYPE "finance"."payments_state_enum_old" AS ENUM('paid', 'pending', 'stamping', 'attempted_stamping', 'global_stamping', 'cancelled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."payments" ALTER COLUMN "state" TYPE "finance"."payments_state_enum_old" USING "state"::"text"::"finance"."payments_state_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "finance"."payments_state_enum"`);
    await queryRunner.query(
      `ALTER TYPE "finance"."payments_state_enum_old" RENAME TO "payments_state_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."payments" DROP COLUMN "method"`,
    );
    await queryRunner.query(`DROP TYPE "finance"."payments_method_enum"`);
    await queryRunner.query(
      `ALTER TABLE "school"."students" DROP COLUMN "active"`,
    );
    await queryRunner.query(
      `DROP INDEX "miscellaneous"."IDX_f9baf39a872fe3a1aab9e1dada"`,
    );
    await queryRunner.query(
      `DROP INDEX "miscellaneous"."IDX_86273be1d29488b74ddf5920d5"`,
    );
    await queryRunner.query(
      `DROP TABLE "miscellaneous"."clip-accounts_to_branchs"`,
    );
    await queryRunner.query(`DROP TABLE "miscellaneous"."clip-accounts"`);
  }
}
