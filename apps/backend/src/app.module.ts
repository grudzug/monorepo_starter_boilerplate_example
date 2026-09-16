import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { createZodValidationPipe, ZodSerializerInterceptor } from 'nestjs-zod'
import './config/env.bootstrap'

import { ZodHttpExceptionFilter } from './common/zod-exception.filter'
import { ConfigModule } from './config/config.module'
import { HelloModule } from './domain/hello/hello.module'
import { HealthModule } from './health/health.module'

/** `false`: non-zod DTOs on some routes would 500 under strict mode */
const RootZodValidationPipe = createZodValidationPipe({
  strictSchemaDeclaration: false,
})

@Module({
  imports: [ConfigModule, HealthModule, HelloModule],
  providers: [
    { provide: APP_PIPE, useClass: RootZodValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    { provide: APP_FILTER, useClass: ZodHttpExceptionFilter },
  ],
})
export class AppModule {}
