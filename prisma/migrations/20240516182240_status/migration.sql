/*
  Warnings:

  - You are about to alter the column `authorId` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `authorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('confermer', 'annuler', 'en_attent') NOT NULL DEFAULT 'en_attent',
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `maxAppointmentPerDay` INTEGER NOT NULL,
    `samedi` VARCHAR(191) NOT NULL,
    `dimanche` VARCHAR(191) NOT NULL,
    `lundi` VARCHAR(191) NOT NULL,
    `mardi` VARCHAR(191) NOT NULL,
    `mercredi` VARCHAR(191) NOT NULL,
    `jeudi` VARCHAR(191) NOT NULL,
    `vendredi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
