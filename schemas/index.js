import { 
    DE2_SIZES, 
    DE3_SIZES, 
    DE3_QUALITIES,
    DE2_QUALITIES,
    SD_PRESETS,
    SD_RATIOS,
    SD3_MODELS   
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
    models: z.array(z.object({
        name: z.string(),
        active: z.boolean()
    }))
})

export const DE2FormSchema = z.object({
    size: z.enum(DE2_SIZES),
    de_quality: z.enum(DE2_QUALITIES),
    samples: z.array(z.number().min(1).max(10)),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})

export const DE3FormSchema = z.object({
    size: z.enum(DE3_SIZES),
    de_quality: z.enum(DE3_QUALITIES),
    samples: z.array(z.number()).min(1).max(10),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})

export const SD3FormSchema = z.object({
    sd_model: z.enum(SD3_MODELS),
    sd_aspectRatio: z.enum(SD_RATIOS),
    sd_seed: z.number().min(0).max(4294967294),
    sd_negativePrompt: z.string(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})

export const SICoreFormSchema = z.object({
    sd_aspectRatio: z.enum(SD_RATIOS),
    sd_stylePreset: z.enum(SD_PRESETS).or(z.literal("")),
    sd_seed: z.number().min(0).max(4294967294),
    sd_negativePrompt: z.string(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})

export const SIUltraFormSchema = z.object({
    sd_aspectRatio: z.enum(SD_RATIOS),
    sd_seed: z.number().min(0).max(4294967294),
    sd_negativePrompt: z.string(),
    prompt: z.string().min(1, { message: "Prompt is required" }),
})