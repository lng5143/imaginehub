import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    })
})

export const GeneralSettingsSchema = z.object({
    name: z.string().optional(),
    theme: z.string().optional()
})

export const ModelsSettingsSchema = z.object({
    models: z.array(z.object({
        name: z.string(),
        active: z.boolean()
    }))
})