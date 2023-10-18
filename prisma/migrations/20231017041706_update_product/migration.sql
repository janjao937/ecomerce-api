/*
  Warnings:

  - You are about to drop the `productimg` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `productimg` DROP FOREIGN KEY `ProductImg_productId_fkey`;

-- DropTable
DROP TABLE `productimg`;
