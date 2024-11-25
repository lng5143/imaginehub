/*
  Warnings:

  - The values [FLUX_1_DEV] on the enum `Model` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Model_new" AS ENUM ('DALL_E_2', 'DALL_E_3', 'STABLE_DIFFUSION_3_MEDIUM', 'STABLE_DIFFUSION_3_LARGE', 'STABLE_DIFFUSION_3_LARGE_TURBO', 'STABLE_IMAGE_CORE', 'STABLE_IMAGE_ULTRA', 'FLUX_1_PRO', 'FLUX_1_1_PRO', 'FLUX_1_1_PRO_ULTRA');
ALTER TABLE "ImageGeneration" ALTER COLUMN "model" TYPE "Model_new" USING ("model"::text::"Model_new");
ALTER TYPE "Model" RENAME TO "Model_old";
ALTER TYPE "Model_new" RENAME TO "Model";
DROP TYPE "Model_old";
COMMIT;
