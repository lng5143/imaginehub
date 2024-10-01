/*
  Warnings:

  - You are about to drop the column `sd_safetyChecker` on the `ImageGeneration` table. All the data in the column will be lost.
  - You are about to drop the column `sd_upscale` on the `ImageGeneration` table. All the data in the column will be lost.
  - Added the required column `sd_aspectRatio` to the `ImageGeneration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sd_outputFormat` to the `ImageGeneration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sd_seed` to the `ImageGeneration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sd_stylePreset` to the `ImageGeneration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageGeneration" DROP COLUMN "sd_safetyChecker",
DROP COLUMN "sd_upscale",
ADD COLUMN     "sd_aspectRatio" TEXT NOT NULL,
ADD COLUMN     "sd_outputFormat" TEXT NOT NULL,
ADD COLUMN     "sd_seed" INTEGER NOT NULL,
ADD COLUMN     "sd_stylePreset" TEXT NOT NULL;
