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
    replicate_api_key: z.string().optional(),
})

export const EmailFormSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    })
})

export const CreatePostSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, { message: "Title is required" }),
    slug: z.string().min(1, { message: "Slug is required" }),
    thumbnailUrl: z.string().min(1, { message: "Thumbnail is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    isPublished: z.boolean().optional(),
})

export const KeyFormSchema = z.object({
    key: z.string().min(1, { message: "API key is required" }),
})