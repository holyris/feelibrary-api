import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFeelingTable1608725512044 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "feeling",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "feeling_type_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "user_id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "book_id",
                    type: "int",
                    isPrimary: true
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
        await queryRunner.dropTable("feeling");
    }

}
