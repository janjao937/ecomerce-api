/*
  Warnings:

  - Made the column `customerSlipImg` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `customerSlipImg` VARCHAR(191) NOT NULL;
