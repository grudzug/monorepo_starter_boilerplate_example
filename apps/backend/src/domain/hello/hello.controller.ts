import { Controller, Get, Query, Version } from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'

import { HelloRequestDto, HelloResponseDto } from './dto/hello.dto'
import { HelloService } from './hello.service'

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  @Version('1')
  @ZodSerializerDto(HelloResponseDto)
  greet(@Query() query: HelloRequestDto): HelloResponseDto {
    return this.helloService.greet(query)
  }
}
