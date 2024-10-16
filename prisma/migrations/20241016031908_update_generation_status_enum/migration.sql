/*
  Warnings:

  - The values [PENDING,SUCCESS,ERROR] on the enum `ImageGenerationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ImageGenerationStatus_new" AS ENUM ('PROCESSING', 'COMPLETED', 'FAILED');
ALTER TABLE "ImageGeneration" ALTER COLUMN "status" TYPE "ImageGenerationStatus_new" USING ("status"::text::"ImageGenerationStatus_new");
ALTER TYPE "ImageGenerationStatus" RENAME TO "ImageGenerationStatus_old";
ALTER TYPE "ImageGenerationStatus_new" RENAME TO "ImageGenerationStatus";
DROP TYPE "ImageGenerationStatus_old";
COMMIT;
