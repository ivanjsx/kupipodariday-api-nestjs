import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import { INCORRECT_CREDENTIALS_ERROR_MESSAGE } from './auth.constants';
import {
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Catch,
} from '@nestjs/common';

@Catch(EntityNotFoundError)
export class IncorrectUsername implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(HttpStatus.UNAUTHORIZED).json({
      error: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED,
      message: INCORRECT_CREDENTIALS_ERROR_MESSAGE,
    });
  }
}
