import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentlyAuthenticatedUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user;
  },
);
