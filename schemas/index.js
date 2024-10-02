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

export const DallEFormSchema = z.object({
    size: z.enum(['256x256', '512x512', '1024x1024']),
})