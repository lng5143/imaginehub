-- CreateEnum
CREATE TYPE "Model" AS ENUM ('DALL_E_3', 'DALL_E_2', 'STABLE_DIFFUSION');

-- CreateEnum
CREATE TYPE "ImageGenerationStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCESS', 'ERROR');

-- CreateEnum
CREATE TYPE "DallEQuality" AS ENUM ('standard', 'hd');

-- CreateTable
CREATE TABLE "ImageGeneration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "model" "Model" NOT NULL,
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "heigth" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "samples" INTEGER NOT NULL,
    "status" "ImageGenerationStatus" NOT NULL,
    "de_quality" "DallEQuality" NOT NULL,
    "sd_negative_prompt" TEXT NOT NULL,
    "sd_safety_checker" BOOLEAN NOT NULL,
    "sd_upscale" BOOLEAN NOT NULL,

    CONSTRAINT "ImageGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageGenerationId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageGeneration" ADD CONSTRAINT "ImageGeneration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_imageGenerationId_fkey" FOREIGN KEY ("imageGenerationId") REFERENCES "ImageGeneration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
