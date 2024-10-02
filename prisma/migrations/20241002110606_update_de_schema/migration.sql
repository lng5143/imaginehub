/*
  Warnings:

  - Added the required column `de_size` to the `ImageGeneration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageGeneration" ADD COLUMN     "de_size" TEXT NOT NULL;
