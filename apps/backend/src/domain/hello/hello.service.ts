import { Injectable } from '@nestjs/common'
import type { HelloRequest, HelloResponse } from '@repo/contracts'

@Injectable()
export class HelloService {
  greet({ name }: HelloRequest): HelloResponse {
    return { message: `Hello, ${name}!` }
  }
}
