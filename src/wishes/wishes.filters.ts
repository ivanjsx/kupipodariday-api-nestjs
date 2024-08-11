import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import { WISH_NOT_FOUND_ERROR_MESSAGE } from './wishes.constants';
import {
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Catch,
} from '@nestjs/common';

@Catch(EntityNotFoundError)
export class WishNotFound implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
      message: WISH_NOT_FOUND_ERROR_MESSAGE,
    });
  }
}
