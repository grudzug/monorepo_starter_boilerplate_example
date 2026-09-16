import { apiErrorBodySchema } from '@repo/contracts'
import { z } from 'zod'

import { ApiContractError, ApiError } from '@/lib/api-error'

async function readJsonBody(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return undefined
  }
}

function formatApiErrorMessage(message: string | string[]): string {
  return Array.isArray(message) ? message.join(', ') : message
}

async function getApiError(response: Response): Promise<ApiError> {
  const fallback = `Request failed with status ${response.status}`
  const body = await readJsonBody(response)
  const parsed = apiErrorBodySchema.safeParse(body)

  if (!parsed.success) {
    return new ApiError(fallback, response.status)
  }

  return new ApiError(formatApiErrorMessage(parsed.data.message), response.status, parsed.data.code)
}

export async function parseApiResponse<T>(
  response: Response,
  schema: z.ZodType<T>,
  context: string,
): Promise<T> {
  if (!response.ok) {
    throw await getApiError(response)
  }

  const json = await readJsonBody(response)
  const parsed = schema.safeParse(json)

  if (!parsed.success) {
    throw new ApiContractError(`Invalid ${context}: ${z.prettifyError(parsed.error)}`)
  }

  return parsed.data
}
