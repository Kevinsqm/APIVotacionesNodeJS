/*
  Warnings:

  - You are about to alter the column `idCard` on the `Candidate` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `idCard` on the `Voter` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "idCard" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Voter" ALTER COLUMN "idCard" SET DATA TYPE INTEGER;
