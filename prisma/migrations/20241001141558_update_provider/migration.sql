/*
  Warnings:

  - Added the required column `provider` to the `ImageGeneration` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('STABILITY', 'OPENAI');

-- AlterTable
ALTER TABLE "ImageGeneration" ADD COLUMN     "provider" "Provider" NOT NULL;
