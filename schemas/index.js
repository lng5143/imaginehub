import { 
    DE2_SIZES, 
    DE3_SIZES, 
    DE3_QUALITIES,
    DE2_QUALITIES,
    SD_PRESETS,
    SD_RATIOS,
} from '@/const/imagine-box-consts';
import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    })
})

export const GeneralSettingsSchema = z.object({
    name: z.string().min(1, { message: "Name is required" })
})

export const ModelsSettingsSchema = z.object({
    openai_api_key: z.string().optional(),
    stability_api_key: z.string().optional(),
})

export const DE2FormSchema = z.object({
    de_size: z.enum(DE2_SIZES),
    de_quality: z.enum(DE2_QUALITIES),
    samples: z.number().min(1).max(10),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})

export const DE3FormSchema = z.object({
    de_size: z.enum(DE3_SIZES),
    de_quality: z.enum(DE3_QUALITIES),
    samples: z.number().min(1).max(10),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})

export const SD3FormSchema = z.object({
    sd_aspectRatio: z.enum(SD_RATIOS),
    sd_seed: z.number().int({ message: "Seed must be an integer between 0 and 4294967294" }).min(0).max(4294967294),
    sd_negativePrompt: z.string().optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})

export const SICoreFormSchema = z.object({
    sd_aspectRatio: z.enum(SD_RATIOS),
    sd_stylePreset: z.enum(SD_PRESETS).or(z.literal("")),
    sd_seed: z.number().int({ message: "Seed must be an integer between 0 and 4294967294" }).min(0).max(4294967294),
    sd_negativePrompt: z.string().optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})

export const SIUltraFormSchema = z.object({
    sd_aspectRatio: z.enum(SD_RATIOS),
    sd_seed: z.number().int({ message: "Seed must be an integer between 0 and 4294967294" }).min(0).max(4294967294),
    sd_negativePrompt: z.string().optional(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})

export const EmailFormSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    })
})

export const CreatePostSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    slug: z.string().min(1, { message: "Slug is required" }),
    thumbnailUrl: z.string().min(1, { message: "Thumbnail is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    isPublished: z.boolean().optional(),
})