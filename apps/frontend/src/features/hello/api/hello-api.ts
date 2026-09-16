import type { HelloRequest, HelloResponse } from '@repo/contracts'
import { helloResponseSchema } from '@repo/contracts'

import { parseApiResponse } from '@/lib/api-response'
import config from '@/lib/config'

export async function fetchHello(params: HelloRequest = { name: 'World' }): Promise<HelloResponse> {
  const search = new URLSearchParams({ name: params.name })
  const response = await fetch(`${config.api.BASE_URL}/v1/hello?${search.toString()}`)
  return parseApiResponse(response, helloResponseSchema, 'hello response')
}
