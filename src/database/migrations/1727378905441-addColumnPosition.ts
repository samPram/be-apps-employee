import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnPosition1727378905441 implements MigrationInterface {
    name = 'AddColumnPosition1727378905441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "position" character varying(225) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "idx_employee_position" ON "employee" ("position") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_employee_position"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "position"`);
    }

}
