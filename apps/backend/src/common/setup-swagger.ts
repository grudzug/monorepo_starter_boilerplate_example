import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { cleanupOpenApiDoc } from 'nestjs-zod'

import { HelloModule } from '../domain/hello/hello.module'

/** OpenAPI UI at `/docs`. Skipped in production. */
export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Monorepo Starter API')
    .setDescription('Hello World starter API (URI prefix `/v1`).')
    .setVersion('1.0')
    .build()

  const document = cleanupOpenApiDoc(
    SwaggerModule.createDocument(app, config, {
      include: [HelloModule],
    }),
  )

  SwaggerModule.setup('docs', app, document)
}
