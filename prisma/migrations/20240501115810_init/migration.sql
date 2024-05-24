/*
  Warnings:

  - You are about to drop the column `user_avatarUrl` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_family_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `family_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_user_email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `user_avatarUrl`,
    DROP COLUMN `user_email`,
    DROP COLUMN `user_family_name`,
    DROP COLUMN `user_name`,
    DROP COLUMN `user_password`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `family_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'ADMIN';

-- DropTable
DROP TABLE `admin`;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `authorId` VARCHAR(191) NOT NULL,

    INDEX `Post_authorId_idx`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
