/*
  Warnings:

  - You are about to drop the column `sd_negative_prompt` on the `ImageGeneration` table. All the data in the column will be lost.
  - You are about to drop the column `sd_safety_checker` on the `ImageGeneration` table. All the data in the column will be lost.
  - Added the required column `sd_negativePrompt` to the `ImageGeneration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sd_safetyChecker` to the `ImageGeneration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageGeneration" DROP COLUMN "sd_negative_prompt",
DROP COLUMN "sd_safety_checker",
ADD COLUMN     "sd_negativePrompt" TEXT NOT NULL,
ADD COLUMN     "sd_safetyChecker" BOOLEAN NOT NULL;
