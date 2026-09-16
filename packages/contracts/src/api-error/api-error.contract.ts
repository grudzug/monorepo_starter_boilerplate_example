import { z } from 'zod'

export const apiErrorBodySchema = z.object({
  statusCode: z.number(),
  error: z.string().optional(),
  message: z.union([z.string(), z.array(z.string())]),
  code: z.string().optional(),
  issues: z.array(z.unknown()).optional(),
})

export type ApiErrorBody = z.infer<typeof apiErrorBodySchema>

export const API_ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RESPONSE_CONTRACT_VIOLATION: 'RESPONSE_CONTRACT_VIOLATION',
} as const

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES]
