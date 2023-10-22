/*
  Warnings:

  - You are about to drop the column `shopImage` on the `supplier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `shopImage`,
    ADD COLUMN `paymentQrImg` VARCHAR(191) NULL;
