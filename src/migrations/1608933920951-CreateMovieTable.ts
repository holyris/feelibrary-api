import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMovieTable1608933920951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'movie',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "release_date",
                    type: "date",
                    isNullable: true
                },
                {
                    name: "image",
                    type: "varchar",
                    isNullable: true

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
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movie');
    }

}
