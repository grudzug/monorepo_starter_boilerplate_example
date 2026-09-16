import { Catch, type ArgumentsHost, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common'
import { API_ERROR_CODES, type ApiErrorBody } from '@repo/contracts'
import type { Response } from 'express'
import { ZodSerializationException, ZodValidationException } from 'nestjs-zod'
import { ZodError } from 'zod'

@Catch(ZodValidationException, ZodSerializationException)
export class ZodHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ZodHttpExceptionFilter.name)

  catch(exception: ZodValidationException | ZodSerializationException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>()
    const raw = exception.getZodError()

    if (exception instanceof ZodValidationException) {
      const issues = raw instanceof ZodError ? raw.issues.map((i) => ({ ...i })) : undefined
      const body: ApiErrorBody = {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        code: API_ERROR_CODES.VALIDATION_ERROR,
        message:
          raw instanceof Error
            ? raw.message
            : typeof exception.message === 'string'
              ? exception.message
              : 'Validation failed',
        issues,
      }
      response.status(HttpStatus.BAD_REQUEST).json(body)
      return
    }

    const issues = raw instanceof ZodError ? raw.issues.map((i) => ({ ...i })) : undefined
    this.logger.error({
      msg: 'ZodSerializationException',
      message: raw instanceof Error ? raw.message : String(raw),
      issues,
    })

    const body: ApiErrorBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      code: API_ERROR_CODES.RESPONSE_CONTRACT_VIOLATION,
      message: 'Response did not match API contract',
      ...(process.env.NODE_ENV !== 'production' ? { issues } : {}),
    }
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body)
  }
}
