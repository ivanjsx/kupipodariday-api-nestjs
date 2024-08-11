import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { USER_ALREADY_EXISTS_ERROR_MESSAGE } from './constants';
import {
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Catch,
} from '@nestjs/common';

@Catch(QueryFailedError)
export class UserAlreadyExists implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      error: 'Conflict',
      statusCode: HttpStatus.CONFLICT,
      message: USER_ALREADY_EXISTS_ERROR_MESSAGE,
    });
  }
}
