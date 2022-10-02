/*
  Warnings:

  - You are about to drop the column `updateBy` on the `Games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "updateBy",
ADD COLUMN     "updatedBy" VARCHAR(255);
