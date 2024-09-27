import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1727354956385 implements MigrationInterface {
  name = 'InitMigration1727354956385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(225) NOT NULL, "number" integer NOT NULL, "department" character varying(50) NOT NULL, "joined" date NOT NULL, "photo" character varying(225), "status" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_employee_name" ON "employee" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_employee_number" ON "employee" ("number") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_employee_status" ON "employee" ("status") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_employee_status"`);
    await queryRunner.query(`DROP INDEX "public"."idx_employee_number"`);
    await queryRunner.query(`DROP INDEX "public"."idx_employee_name"`);
    await queryRunner.query(`DROP TABLE "employee"`);
  }
}
