import { MigrationInterface, QueryRunner } from 'typeorm';

export class actualizarTableUsers1685746431552 implements MigrationInterface {
  name = 'actualizarTableUsers1685746431552';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
  }
}
