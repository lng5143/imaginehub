/*
  Warnings:

  - The values [stability,openai] on the enum `Provider` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `de_quality` on the `ImageGeneration` table. All the data in the column will be lost.
  - You are about to drop the column `de_size` on the `ImageGeneration` table. All the data in the column will be lost.
  - You are about to drop the column `sd_aspectRatio` on the `ImageGeneration` table. All the data in the column will be lost.
  - You are about to drop the column `sd_negativePrompt` on the `ImageGeneration` table. All the data in the column will be lost.
  - You are about to drop the column `sd_seed` on the `ImageGeneration` table. All the data in the column will be lost.
  - You are about to drop the column `sd_stylePreset` on the `ImageGeneration` table. All the data in the column will be lost.
  - Changed the type of `model` on the `ImageGeneration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Model" AS ENUM ('DALL_E_2', 'DALL_E_3', 'STABLE_DIFFUSION_3_MEDIUM', 'STABLE_DIFFUSION_3_LARGE', 'STABLE_DIFFUSION_3_LARGE_TURBO', 'STABLE_IMAGE_CORE', 'STABLE_IMAGE_ULTRA');

-- AlterEnum
BEGIN;
CREATE TYPE "Provider_new" AS ENUM ('STABILITY', 'OPENAI');
ALTER TABLE "ImageGeneration" ALTER COLUMN "provider" TYPE "Provider_new" USING ("provider"::text::"Provider_new");
ALTER TYPE "Provider" RENAME TO "Provider_old";
ALTER TYPE "Provider_new" RENAME TO "Provider";
DROP TYPE "Provider_old";
COMMIT;

-- AlterTable
ALTER TABLE "ImageGeneration" DROP COLUMN "de_quality",
DROP COLUMN "de_size",
DROP COLUMN "sd_aspectRatio",
DROP COLUMN "sd_negativePrompt",
DROP COLUMN "sd_seed",
DROP COLUMN "sd_stylePreset",
DROP COLUMN "model",
ADD COLUMN     "model" "Model" NOT NULL;

-- DropEnum
DROP TYPE "DallEQuality";
