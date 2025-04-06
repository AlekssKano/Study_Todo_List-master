import {z} from "zod"

export const loginSchema = z.object({
    email: z.string()
        .min(1, { message: 'Email address is required' })
        .email({ message: 'Invalid email address' }),
    password: z.string({message: 'Password is required'})
        .min(1, {message: 'Password is required'})  // Проверка на обязательность
        .min(3, {message: 'Password must be at least 3 characters long'})  // Минимальная длина
        .regex(/^[A-Za-z]+$/, {message: 'Only latin letter'}),
    rememberMe: z.boolean().optional(),
    captcha: z.string().optional()
})
export type Inputs = z.infer<typeof loginSchema>
