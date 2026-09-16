import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { config } from 'dotenv'

import { envSchema, type Env } from './env.schema'

// `import 'dotenv/config'` only reads `.env` from `process.cwd()`. Dev servers started
// from the monorepo root (or some IDEs) then miss `apps/backend/.env`.
const packagedEnvPath = join(__dirname, '..', '..', '.env')

const dotenvQuiet = process.env.NODE_ENV === 'test'

if (existsSync(packagedEnvPath)) {
  config({ path: packagedEnvPath, quiet: dotenvQuiet })
} else {
  config({ quiet: dotenvQuiet })
}

export const env: Env = envSchema.parse(process.env)
