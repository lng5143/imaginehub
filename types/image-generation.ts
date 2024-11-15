import { z } from "zod";
import { DE2_SIZES, DE2_QUALITIES, DE3_SIZES, DE3_QUALITIES, SD_RATIOS, SD_PRESETS } from "@/const/consts";
import { ImageGenerationStatus, Model, Provider } from "@prisma/client";

export type CreateOrEditImageGenerationDTO = {
    id: string | undefined;
    userId: string | undefined;
    prompt: string;
    samples: number;
    status: ImageGenerationStatus | undefined;
    provider: Provider;
    model: Model;
    openAIGenerationConfigs?: OpenAIGenerationConfigsDTO;
    stabilityGenerationConfigs?: StabilityGenerationConfigsDTO; 
}

export type OpenAIGenerationConfigsDTO = {
    id: string | undefined;
    quality: string;
    size: string;
    imageGenerationId: string | undefined;
}

export type StabilityGenerationConfigsDTO = {
    id: string | undefined;
    aspectRatio: string;
    seed: number;
    negativePrompt: string | undefined;
    stylePreset: string | undefined;
    imageGenerationId: string | undefined;
}

export const DE2FormSchema = z.object({
    id: z.string().optional(),
    size: z.enum(DE2_SIZES as [string, ...string[]]),
    quality: z.enum(DE2_QUALITIES as [string, ...string[]]),
    samples: z.number().min(1).max(10),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: data.samples,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.OPENAI,
    model: Model.DALL_E_2,
    openAIGenerationConfigs: {
        id: undefined,
        quality: data.quality,
        size: data.size,
        imageGenerationId: undefined,
    }
}))

export const DE3FormSchema = z.object({
    id: z.string().optional(),
    size: z.enum(DE3_SIZES as [string, ...string[]]),
    quality: z.enum(DE3_QUALITIES as [string, ...string[]]),
    samples: z.number().min(1).max(10),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: data.samples,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.OPENAI,
    model: Model.DALL_E_3,
    openAIGenerationConfigs: {
        id: undefined,
        quality: data.quality,
        size: data.size,
        imageGenerationId: undefined,
    }
}))

export const SD3MediumFormSchema = z.object({
    id: z.string().optional(),
    aspectRatio: z.enum(SD_RATIOS as [string, ...string[]]),
    seed: z.number().int({ message: "Seed must be an integer between 0 and 4294967294" }).min(0).max(4294967294),
    negativePrompt: z.string().optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: 1,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.STABILITY,
    model: Model.STABLE_DIFFUSION_3_MEDIUM,
    stabilityGenerationConfigs: {
        id: undefined,
        aspectRatio: data.aspectRatio,
        seed: data.seed,
        negativePrompt: data.negativePrompt,
        stylePreset: undefined,
        imageGenerationId: undefined,
    }
}))

export const SD3LargeFormSchema = z.object({
    id: z.string().optional(),
    aspectRatio: z.enum(SD_RATIOS as [string, ...string[]]),
    seed: z.number().int({ message: "Seed must be an integer between 0 and 4294967294" }).min(0).max(4294967294),
    negativePrompt: z.string().optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: 1,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.STABILITY,
    model: Model.STABLE_DIFFUSION_3_LARGE,
    stabilityGenerationConfigs: {
        id: undefined,
        aspectRatio: data.aspectRatio,
        seed: data.seed,
        negativePrompt: data.negativePrompt,
        stylePreset: undefined,
        imageGenerationId: undefined,
    }
}))

export const SD3LargeTurboFormSchema = z.object({
    id: z.string().optional(),
    aspectRatio: z.enum(SD_RATIOS as [string, ...string[]]),
    seed: z.number().int({ message: "Seed must be an integer between 0 and 4294967294" }).min(0).max(4294967294),
    negativePrompt: z.string().optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: 1,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.STABILITY,
    model: Model.STABLE_DIFFUSION_3_LARGE_TURBO,
    stabilityGenerationConfigs: {
        id: undefined,
        aspectRatio: data.aspectRatio,
        seed: data.seed,
        negativePrompt: data.negativePrompt,
        stylePreset: undefined,
        imageGenerationId: undefined,
    }
}))

export const SICoreFormSchema = z.object({
    id: z.string().optional(),
    aspectRatio: z.enum(SD_RATIOS as [string, ...string[]]),
    stylePreset: z.enum(SD_PRESETS as [string, ...string[]]).optional(),
    seed: z.number().int({ message: "Seed must be an integer between 0 and 4294967294" }).min(0).max(4294967294),
    negativePrompt: z.string().optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: 1,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.STABILITY,
    model: Model.STABLE_IMAGE_CORE,
    stabilityGenerationConfigs: {
        id: undefined,
        aspectRatio: data.aspectRatio,
        seed: data.seed,
        negativePrompt: data.negativePrompt,
        stylePreset: data.stylePreset,
        imageGenerationId: undefined,
    }
}))

export const SIUltraFormSchema = z.object({
    id: z.string().optional(),
    aspectRatio: z.enum(SD_RATIOS as [string, ...string[]]),
    seed: z.number().int({ message: "Seed must be an integer between 0 and 4294967294" }).min(0).max(4294967294),
    negativePrompt: z.string().optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: 1,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.STABILITY,
    model: Model.STABLE_IMAGE_ULTRA,
    stabilityGenerationConfigs: {
        id: undefined,
        aspectRatio: data.aspectRatio,
        seed: data.seed,
        negativePrompt: data.negativePrompt,
        stylePreset: undefined,
        imageGenerationId: undefined,
    }
}))