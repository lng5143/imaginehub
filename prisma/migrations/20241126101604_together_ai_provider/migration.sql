-- AlterEnum
ALTER TYPE "Model" ADD VALUE 'FLUX_1_SCHNELL';

-- AlterEnum
ALTER TYPE "Provider" ADD VALUE 'TOGETHER';

-- CreateTable
CREATE TABLE "FLUXGenerationConfigs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "promptUpsampling" BOOLEAN NOT NULL,
    "seed" BIGINT NOT NULL,
    "safetyTolerance" INTEGER,
    "steps" INTEGER,
    "guidance" DOUBLE PRECISION,
    "interval" INTEGER,
    "raw" TEXT,
    "imageGenerationId" TEXT NOT NULL,

    CONSTRAINT "FLUXGenerationConfigs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FLUXGenerationConfigs_imageGenerationId_key" ON "FLUXGenerationConfigs"("imageGenerationId");

-- AddForeignKey
ALTER TABLE "FLUXGenerationConfigs" ADD CONSTRAINT "FLUXGenerationConfigs_imageGenerationId_fkey" FOREIGN KEY ("imageGenerationId") REFERENCES "ImageGeneration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
