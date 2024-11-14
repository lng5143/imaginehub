-- Copy OpenAI configurations
INSERT INTO "OpenAIGenerationConfigs" ("imageGenerationId", "quality", "size", "createdAt", "updatedAt")
SELECT 
    gen.id as "imageGenerationId",
    gen.de_quality as quality,
    gen.de_size as size,
    gen."createdAt",
    gen."updatedAt"
FROM "ImageGeneration" gen
WHERE gen.provider = 'openai';

-- Copy Stability configurations
INSERT INTO "StabilityGenerationConfigs" ("imageGenerationId", "negativePrompt", "aspectRatio", "seed", "stylePreset", "createdAt", "updatedAt")
SELECT 
    gen.id as "imageGenerationId",
    gen."sd_negativePrompt" as "negativePrompt",
    gen."sd_aspectRatio" as "aspectRatio",
    gen."sd_seed" as seed,
    gen."sd_stylePreset" as "stylePreset",
    gen."createdAt",
    gen."updatedAt"
FROM "ImageGeneration" gen
WHERE gen.provider = 'stability';