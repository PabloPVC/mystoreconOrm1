import { MigrationInterface, QueryRunner } from 'typeorm';

export class initMigrations1685745333865 implements MigrationInterface {
  name = 'initMigrations1685745333865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brans" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "nombre" character varying NOT NULL, "estado" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_1511a2c14c6f044487a2bfbd017" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "identificacion" character varying NOT NULL, "nombre" character varying NOT NULL, "image" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "numero_fac" character varying NOT NULL, "fecha_orden" TIMESTAMP NOT NULL, "total" integer NOT NULL, "descuento" integer NOT NULL, "estado" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "cliente_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ordersdetalle" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "cantidad" integer NOT NULL, "precio_unitario" numeric(10,2) NOT NULL, "orden_id" integer, "producto_id" integer, CONSTRAINT "PK_1e610c71d1af84569a3b3ca0d96" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "nombre" character varying NOT NULL, "description" character varying NOT NULL, "precio_unitario" numeric(10,2) NOT NULL, "stock" numeric(10,2) NOT NULL, "image" character varying NOT NULL, "estado" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "categorie_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "nombre" character varying NOT NULL, "description" character varying NOT NULL, "estado" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "nombre" character varying NOT NULL, "estado" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "nombre" character varying NOT NULL, "image" character varying NOT NULL, "estado" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "profile_id" integer, CONSTRAINT "UQ_fe712d637a0c83c6f9d443db7a2" UNIQUE ("nombre"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_fc1a6687220b80864d5ca6092e4" FOREIGN KEY ("cliente_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ordersdetalle" ADD CONSTRAINT "FK_0d4cd2fcbe1b6827050bf5f5fbe" FOREIGN KEY ("orden_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ordersdetalle" ADD CONSTRAINT "FK_faa30627d602994fa011001cf08" FOREIGN KEY ("producto_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_54f60c73aa73cd760e06d9d2495" FOREIGN KEY ("categorie_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_54f60c73aa73cd760e06d9d2495"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ordersdetalle" DROP CONSTRAINT "FK_faa30627d602994fa011001cf08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ordersdetalle" DROP CONSTRAINT "FK_0d4cd2fcbe1b6827050bf5f5fbe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_fc1a6687220b80864d5ca6092e4"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "ordersdetalle"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "brans"`);
  }
}
