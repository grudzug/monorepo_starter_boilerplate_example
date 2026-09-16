import { helloRequestSchema, helloResponseSchema } from '@repo/contracts'
import { createZodDto } from 'nestjs-zod'

export class HelloRequestDto extends createZodDto(helloRequestSchema) {}

export class HelloResponseDto extends createZodDto(helloResponseSchema) {}
