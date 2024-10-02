/*
  Warnings:

  - You are about to drop the column `heigth` on the `ImageGeneration` table. All the data in the column will be lost.
  - You are about to drop the column `sd_outputFormat` on the `ImageGeneration` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `ImageGeneration` table. All the data in the column will be lost.
  - Added the required column `sd_model` to the `ImageGeneration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageGeneration" DROP COLUMN "heigth",
DROP COLUMN "sd_outputFormat",
DROP COLUMN "width",
ADD COLUMN     "sd_model" TEXT NOT NULL;
