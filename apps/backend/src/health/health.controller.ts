import { Controller, Get } from '@nestjs/common'

@Controller('health')
export class HealthController {
  /** Process is up — use for liveness probes. */
  @Get()
  liveness(): { status: 'ok' } {
    return { status: 'ok' }
  }
}
