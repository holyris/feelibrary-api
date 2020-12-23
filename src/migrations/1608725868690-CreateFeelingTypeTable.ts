import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFeelingTypeTable1608725868690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "feeling_type",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "name",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: 'now()'
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: 'now()'
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("feeling_type")
    }

}
