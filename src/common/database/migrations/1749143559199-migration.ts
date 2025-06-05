import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1749143559199 implements MigrationInterface {
  name = 'Migration1749143559199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "miscellaneous"."discounts_type_enum" AS ENUM('percentage', 'fixed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "miscellaneous"."discounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(64) NOT NULL, "value" numeric(10,2) NOT NULL, "type" "miscellaneous"."discounts_type_enum" NOT NULL, "branchId" uuid NOT NULL, CONSTRAINT "PK_66c522004212dc814d6e2f14ecc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4f9ff564fe6488a270521d8af8" ON "miscellaneous"."discounts" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(64) NOT NULL, "url" character varying(128) NOT NULL, CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "school"."debit_discounts_type_enum" AS ENUM('percentage', 'fixed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."debit_discounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(64) NOT NULL, "value" numeric(10,2) NOT NULL, "type" "school"."debit_discounts_type_enum" NOT NULL, "debitId" uuid NOT NULL, CONSTRAINT "PK_f9fbf0eb85b096e739d6106760a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_010cc19fc44c2544b4a0dcc51f" ON "school"."debit_discounts" ("debitId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."documents_to_students" ("studentsId" uuid NOT NULL, "documentsId" uuid NOT NULL, CONSTRAINT "PK_828394bc71ae454cd10a2be3a9a" PRIMARY KEY ("studentsId", "documentsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b1e53e3e1335deb055c6aa185e" ON "school"."documents_to_students" ("studentsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ca3d4548fb5f5b1fc7c074d8e8" ON "school"."documents_to_students" ("documentsId") `,
    );
    await queryRunner.query(`ALTER TABLE "school"."debts" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "school"."activities" ADD "withTax" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD "unitPrice" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD "amount" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD "discount" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD "subtotal" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD "taxes" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD "total" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD "withTax" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" ADD "amount" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" ADD "taxes" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" ADD "withTax" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."levels" ADD "order" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."discounts" ADD CONSTRAINT "FK_4f9ff564fe6488a270521d8af81" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debit_discounts" ADD CONSTRAINT "FK_010cc19fc44c2544b4a0dcc51f8" FOREIGN KEY ("debitId") REFERENCES "school"."debts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."documents_to_students" ADD CONSTRAINT "FK_b1e53e3e1335deb055c6aa185ed" FOREIGN KEY ("studentsId") REFERENCES "school"."students"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."documents_to_students" ADD CONSTRAINT "FK_ca3d4548fb5f5b1fc7c074d8e8b" FOREIGN KEY ("documentsId") REFERENCES "school"."documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."documents_to_students" DROP CONSTRAINT "FK_ca3d4548fb5f5b1fc7c074d8e8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."documents_to_students" DROP CONSTRAINT "FK_b1e53e3e1335deb055c6aa185ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debit_discounts" DROP CONSTRAINT "FK_010cc19fc44c2544b4a0dcc51f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."discounts" DROP CONSTRAINT "FK_4f9ff564fe6488a270521d8af81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."levels" DROP COLUMN "order"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" DROP COLUMN "withTax"`,
    );
    await queryRunner.query(`ALTER TABLE "school"."fees" DROP COLUMN "taxes"`);
    await queryRunner.query(`ALTER TABLE "school"."fees" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "school"."debts" DROP COLUMN "withTax"`,
    );
    await queryRunner.query(`ALTER TABLE "school"."debts" DROP COLUMN "total"`);
    await queryRunner.query(`ALTER TABLE "school"."debts" DROP COLUMN "taxes"`);
    await queryRunner.query(
      `ALTER TABLE "school"."debts" DROP COLUMN "subtotal"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" DROP COLUMN "discount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" DROP COLUMN "amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" DROP COLUMN "unitPrice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."activities" DROP COLUMN "withTax"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD "value" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_ca3d4548fb5f5b1fc7c074d8e8"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_b1e53e3e1335deb055c6aa185e"`,
    );
    await queryRunner.query(`DROP TABLE "school"."documents_to_students"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_010cc19fc44c2544b4a0dcc51f"`,
    );
    await queryRunner.query(`DROP TABLE "school"."debit_discounts"`);
    await queryRunner.query(`DROP TYPE "school"."debit_discounts_type_enum"`);
    await queryRunner.query(`DROP TABLE "school"."documents"`);
    await queryRunner.query(
      `DROP INDEX "miscellaneous"."IDX_4f9ff564fe6488a270521d8af8"`,
    );
    await queryRunner.query(`DROP TABLE "miscellaneous"."discounts"`);
    await queryRunner.query(`DROP TYPE "miscellaneous"."discounts_type_enum"`);
  }
}
