-- CreateTable
CREATE TABLE "OpenAIGenerationConfigs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quality" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "imageGenerationId" TEXT NOT NULL,

    CONSTRAINT "OpenAIGenerationConfigs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StabilityGenerationConfigs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "negativePrompt" TEXT NOT NULL,
    "aspectRatio" TEXT NOT NULL,
    "seed" BIGINT NOT NULL,
    "stylePreset" TEXT NOT NULL,
    "imageGenerationId" TEXT NOT NULL,

    CONSTRAINT "StabilityGenerationConfigs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OpenAIGenerationConfigs_imageGenerationId_key" ON "OpenAIGenerationConfigs"("imageGenerationId");

-- CreateIndex
CREATE UNIQUE INDEX "StabilityGenerationConfigs_imageGenerationId_key" ON "StabilityGenerationConfigs"("imageGenerationId");

-- AddForeignKey
ALTER TABLE "OpenAIGenerationConfigs" ADD CONSTRAINT "OpenAIGenerationConfigs_imageGenerationId_fkey" FOREIGN KEY ("imageGenerationId") REFERENCES "ImageGeneration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StabilityGenerationConfigs" ADD CONSTRAINT "StabilityGenerationConfigs_imageGenerationId_fkey" FOREIGN KEY ("imageGenerationId") REFERENCES "ImageGeneration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
