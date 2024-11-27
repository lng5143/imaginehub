-- AlterTable
ALTER TABLE "StabilityGenerationConfigs" ADD COLUMN     "model" TEXT,
ALTER COLUMN "seed" DROP NOT NULL;
