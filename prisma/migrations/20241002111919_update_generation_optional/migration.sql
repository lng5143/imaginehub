-- AlterTable
ALTER TABLE "ImageGeneration" ALTER COLUMN "de_quality" DROP NOT NULL,
ALTER COLUMN "sd_negativePrompt" DROP NOT NULL,
ALTER COLUMN "sd_aspectRatio" DROP NOT NULL,
ALTER COLUMN "sd_seed" DROP NOT NULL,
ALTER COLUMN "sd_stylePreset" DROP NOT NULL,
ALTER COLUMN "sd_model" DROP NOT NULL,
ALTER COLUMN "de_size" DROP NOT NULL;