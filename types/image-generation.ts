import { z } from "zod";
import { DE2_SIZES, DE2_QUALITIES, DE3_SIZES, DE3_QUALITIES, SD_RATIOS, SD_PRESETS } from "@/const/consts";
import { DallEQuality, ImageGenerationStatus, Provider } from "@prisma/client";

export type CreateOrEditImageGenerationDTO = {
    id: string | undefined;
    userId: string | undefined;
    prompt: string;
    samples: number;
    status: ImageGenerationStatus | undefined;
    provider: Provider;
    model: string;
    de_quality: DallEQuality | undefined;
    de_size: string | undefined;
    sd_negativePrompt: string | undefined;
    sd_aspectRatio: string | undefined;
    sd_seed: number | undefined;
    sd_stylePreset: string | undefined;
}

export const DE2FormSchema = z.object({
    id: z.string().optional(),
    de_size: z.enum(DE2_SIZES as [string, ...string[]]),
    de_quality: z.enum(DallEQuality),
    samples: z.number().min(1).max(10),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: data.samples,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.openai,
    model: "de-2",
    de_quality: data.de_quality,
    de_size: data.de_size,
    sd_negativePrompt: undefined,
    sd_aspectRatio: undefined,
    sd_seed: undefined,
    sd_stylePreset: undefined,
}))

export const DE3FormSchema = z.object({
    id: z.string().optional(),
    de_size: z.enum(DE3_SIZES as [string, ...string[]]),
    de_quality: z.enum(DallEQuality),
    samples: z.number().min(1).max(10),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: data.samples,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.openai,
    model: "de-3",
    de_quality: data.de_quality,
    de_size: data.de_size,
    sd_negativePrompt: undefined,
    sd_aspectRatio: undefined,
    sd_seed: undefined,
    sd_stylePreset: undefined,
}))

export const SD3FormSchema = z.object({
    id: z.string().optional(),
    sd_aspectRatio: z.enum(SD_RATIOS as [string, ...string[]]),
    sd_seed: z.number().int({ message: "Seed must be an integer between 0 and 4294967294" }).min(0).max(4294967294),
    sd_negativePrompt: z.string().optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: 1,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.stability,
    model: "sd3",
    de_quality: undefined,
    de_size: undefined,
    sd_negativePrompt: data.sd_negativePrompt,
    sd_aspectRatio: data.sd_aspectRatio,
    sd_seed: data.sd_seed,
    sd_stylePreset: undefined,
}))

export const SICoreFormSchema = z.object({
    id: z.string().optional(),
    sd_aspectRatio: z.enum(SD_RATIOS as [string, ...string[]]),
    sd_stylePreset: z.enum(SD_PRESETS as [string, ...string[]]).optional(),
    sd_seed: z.number().int({ message: "Seed must be an integer between 0 and 4294967294" }).min(0).max(4294967294),
    sd_negativePrompt: z.string().optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: 1,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.stability,
    model: "si-core",
    de_quality: undefined,
    de_size: undefined,
    sd_negativePrompt: data.sd_negativePrompt,
    sd_aspectRatio: data.sd_aspectRatio,
    sd_seed: data.sd_seed,
    sd_stylePreset: data.sd_stylePreset,
}))

export const SIUltraFormSchema = z.object({
    id: z.string().optional(),
    sd_aspectRatio: z.enum(SD_RATIOS as [string, ...string[]]),
    sd_seed: z.number().int({ message: "Seed must be an integer between 0 and 4294967294" }).min(0).max(4294967294),
    sd_negativePrompt: z.string().optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})
.transform((data) : CreateOrEditImageGenerationDTO => ({
    id: data.id,
    userId: undefined,
    prompt: data.prompt,
    samples: 1,
    status: ImageGenerationStatus.PROCESSING,
    provider: Provider.stability,
    model: "si-ultra",
    de_quality: undefined,
    de_size: undefined,
    sd_negativePrompt: data.sd_negativePrompt,
    sd_aspectRatio: data.sd_aspectRatio,
    sd_seed: data.sd_seed,
    sd_stylePreset: undefined,
}))