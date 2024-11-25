import { string, z } from "zod";
import { DE2_SIZES, DE2_QUALITIES, DE3_SIZES, DE3_QUALITIES, SD_RATIOS, SD_PRESETS } from "@/const/consts";
import { ImageGenerationStatus, Model, Provider } from "@prisma/client";
import { raw } from "@prisma/client/runtime/library";

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
    fluxGenerationConfigs?: FLUXGenerationConfigsDTO;
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

export type FLUXGenerationConfigsDTO = {
    id: string | undefined;
    width: number;
    height: number;
    prompt_upsampling: boolean | undefined;
    seed: number | undefined;
    safety_tolerance: number | undefined;
    steps: number | undefined;
    guidance: number | undefined;
    interval: number | undefined;
    raw: boolean | undefined;
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

export const FLUX_1_1_ProFormSchema = z.object({
    id: z.string().optional(),
    width: z.number().int().min(256).max(1024).refine(val => val % 32 === 0, { message: "Width must be a multiple of 32" }),
    height: z.number().int().min(256).max(1024).refine(val => val % 32 === 0, { message: "Height must be a multiple of 32" }),
    prompt_upsampling: z.boolean(),
    seed: z.number().int().optional(),
    safety_tolerance: z.number().int().min(0).max(6).optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: 1,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.BFL,
    model: Model.FLUX_1_1_PRO,
    fluxGenerationConfigs: {
        id: undefined,
        width: data.width,
        height: data.height,
        prompt_upsampling: data.prompt_upsampling,
        seed: data.seed,
        safety_tolerance: data.safety_tolerance,
        steps: undefined,
        guidance: undefined,
        interval: undefined,
        raw: undefined,
        imageGenerationId: undefined,
    }
}))

export const FLUX_1_ProFormSchema = z.object({
    id: z.string().optional(),
    width: z.number().int().min(256).max(1024).refine(val => val % 32 === 0, { message: "Width must be a multiple of 32" }),
    height: z.number().int().min(256).max(1024).refine(val => val % 32 === 0, { message: "Height must be a multiple of 32" }),
    prompt_upsampling: z.boolean(),
    seed: z.number().int().optional(),
    safety_tolerance: z.number().int().min(0).max(6).optional(),
    steps: z.number().int().min(1).max(50).optional(),
    guidance: z.number().min(1.5).max(5).optional(),
    interval: z.number().int().min(1).max(4).optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: 1,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.BFL,
    model: Model.FLUX_1_1_PRO,
    fluxGenerationConfigs: {
        id: undefined,
        width: data.width,
        height: data.height,
        prompt_upsampling: data.prompt_upsampling,
        seed: data.seed,
        safety_tolerance: data.safety_tolerance,
        steps: data.steps,
        guidance: data.guidance,
        interval: data.interval,
        raw: undefined,
        imageGenerationId: undefined,
    }
}))

export const FLUX_1_1_Pro_UltraFormSchema = z.object({
    id: z.string().optional(),
    width: z.number().int().min(256).max(1024).refine(val => val % 32 === 0, { message: "Width must be a multiple of 32" }),
    height: z.number().int().min(256).max(1024).refine(val => val % 32 === 0, { message: "Height must be a multiple of 32" }),
    seed: z.number().int().optional(),
    safety_tolerance: z.number().int().min(0).max(6).optional(),
    raw: z.boolean(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: 1,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.BFL,
    model: Model.FLUX_1_1_PRO,
    fluxGenerationConfigs: {
        id: undefined,
        width: data.width,
        height: data.height,
        prompt_upsampling: undefined,
        seed: data.seed,
        safety_tolerance: data.safety_tolerance,
        steps: undefined,
        guidance: undefined,
        interval: undefined,
        raw: data.raw,
        imageGenerationId: undefined,
    }
}))