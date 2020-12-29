import {MigrationInterface, QueryRunner} from "typeorm";

export class Base1609263214873 implements MigrationInterface {
    name = 'Base1609263214873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `feeling_type` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_dc00775cfe6dc17dcfab03be4a` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `movie` (`id` int NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NULL, `releaseDate` datetime NULL, `image` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `feeling` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `feelingTypeId` int NULL, `userId` int NULL, `movieId` int NULL, UNIQUE INDEX `idx_feeling_user_movie_book` (`userId`, `movieId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `book` (`id` int NOT NULL AUTO_INCREMENT, `isbn` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `test` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `feeling` ADD CONSTRAINT `FK_a2d23c5587b3bb600f2e4309df6` FOREIGN KEY (`feelingTypeId`) REFERENCES `feeling_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `feeling` ADD CONSTRAINT `FK_77fc02a9748b8b5cac80bff7968` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `feeling` ADD CONSTRAINT `FK_a43f2693eadaf4204f4b25f561a` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `feeling` DROP FOREIGN KEY `FK_a43f2693eadaf4204f4b25f561a`");
        await queryRunner.query("ALTER TABLE `feeling` DROP FOREIGN KEY `FK_77fc02a9748b8b5cac80bff7968`");
        await queryRunner.query("ALTER TABLE `feeling` DROP FOREIGN KEY `FK_a2d23c5587b3bb600f2e4309df6`");
        await queryRunner.query("DROP TABLE `test`");
        await queryRunner.query("DROP TABLE `book`");
        await queryRunner.query("DROP INDEX `idx_feeling_user_movie_book` ON `feeling`");
        await queryRunner.query("DROP TABLE `feeling`");
        await queryRunner.query("DROP TABLE `movie`");
        await queryRunner.query("DROP INDEX `IDX_dc00775cfe6dc17dcfab03be4a` ON `feeling_type`");
        await queryRunner.query("DROP TABLE `feeling_type`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
