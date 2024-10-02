/*
  Warnings:

  - The values [STABILITY,OPENAI] on the enum `Provider` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `model` on the `ImageGeneration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Provider_new" AS ENUM ('stability', 'openai');
ALTER TABLE "ImageGeneration" ALTER COLUMN "provider" TYPE "Provider_new" USING ("provider"::text::"Provider_new");
ALTER TYPE "Provider" RENAME TO "Provider_old";
ALTER TYPE "Provider_new" RENAME TO "Provider";
DROP TYPE "Provider_old";
COMMIT;

-- AlterTable
ALTER TABLE "ImageGeneration" DROP COLUMN "model",
ADD COLUMN     "model" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Model";
