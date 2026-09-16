import './config/env.bootstrap'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { enableApiVersioning } from './common/enable-api-versioning'
import { setupSwagger } from './common/setup-swagger'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.enableShutdownHooks()
  enableApiVersioning(app)

  const configService = app.get(ConfigService)

  app.enableCors({
    origin: configService.getOrThrow<string>('CORS_ORIGIN'),
    credentials: true,
  })

  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app)
  }

  const port = configService.getOrThrow<number>('PORT')
  await app.listen(port)
}

void bootstrap()
