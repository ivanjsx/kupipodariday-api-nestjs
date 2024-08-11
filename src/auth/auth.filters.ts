import { Response } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';
import {
  INCORRECT_CREDENTIALS_ERROR_MESSAGE,
  USER_ALREADY_EXISTS_ERROR_MESSAGE,
} from './auth.constants';
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
