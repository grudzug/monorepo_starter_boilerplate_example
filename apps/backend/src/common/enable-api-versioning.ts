import { type INestApplication, VERSION_NEUTRAL, VersioningType } from '@nestjs/common'

/** URI versioning for `@Version('1')` routes (`/v1/...`); other routes stay unversioned. */
export function enableApiVersioning(app: INestApplication): void {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  })
}
