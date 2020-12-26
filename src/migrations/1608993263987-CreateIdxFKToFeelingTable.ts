import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class CreateIdxFKToFeelingTable1608993263987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createIndex('feeling', new TableIndex({
            name: "idx_feeling_user_movie_book",
            columnNames: [
                'user_id',
                'movie_id',
                'book_id'
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('feeling', 'idx_feeling_user_movie_book');
    }

}
