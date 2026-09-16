import { join } from 'node:path'

import { Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

import { envSchema } from './env.schema'

const envFilePath = join(__dirname, '..', '..', '.env')

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath,
      validate: (config) => envSchema.parse(config),
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
