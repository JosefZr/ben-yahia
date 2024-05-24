/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `admin` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[admin_email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `admin_email` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_family_name` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_name` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_password` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_avatarUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_family_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropIndex
DROP INDEX `Admin_email_key` ON `admin`;

-- AlterTable
ALTER TABLE `admin` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `name`,
    ADD COLUMN `admin_email` VARCHAR(191) NOT NULL,
    ADD COLUMN `admin_family_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `admin_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `admin_password` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'ADMIN',
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    ADD COLUMN `user_avatarUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_email` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_family_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_password` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `images`;

-- DropTable
DROP TABLE `post`;

-- CreateTable
CREATE TABLE `Permisions` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `access` BOOLEAN NOT NULL,

    INDEX `Permisions_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_admin_email_key` ON `Admin`(`admin_email`);

-- CreateIndex
CREATE UNIQUE INDEX `User_user_email_key` ON `User`(`user_email`);
