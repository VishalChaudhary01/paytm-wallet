/*
  Warnings:

  - You are about to drop the column `status` on the `P2PTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "P2PTransaction" DROP COLUMN "status";

-- DropEnum
DROP TYPE "P2PStatus";
