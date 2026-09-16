import { z } from 'zod'

export const helloRequestSchema = z.object({
  name: z.string().min(1).max(100).default('World'),
})

export type HelloRequest = z.infer<typeof helloRequestSchema>

export const helloResponseSchema = z.object({
  message: z.string(),
})

export type HelloResponse = z.infer<typeof helloResponseSchema>
