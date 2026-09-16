import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535),
  CORS_ORIGIN: z.string().min(1),
})

export type Env = z.infer<typeof envSchema>
