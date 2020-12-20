import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1608473268775 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "user",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true
        },
        {
          name: "username",
          type: "varchar",
          isUnique: true,
          isNullable: false
        },
        {
          name: "password",
          type: "varchar",
          isNullable: false
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updatedAt",
          type: "timestamp",
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }

}
