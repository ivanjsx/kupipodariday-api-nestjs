// libraries
import escape from 'escape-html';
import { Request } from 'express';
import { PickType } from '@nestjs/mapped-types';

// entities
import { User } from 'src/users/users.entities';

// content

export interface AuthenticatedRequest extends Request {
  user: User;
}

export interface AccessToken {
  access_token: string;
}

export class UserCredentialsDto extends PickType(User, [
  'id',
  'username',
  'password',
]) {}

export class JwtPayloadDto extends PickType(User, ['username']) {
  sub: number;
}

export abstract class EscapableDto {
  public escapeFields(): typeof this {
    const result: Record<string, any> = {};
    for (const field in this) {
      if (typeof field === 'string') {
        result[field] = escape(field);
      } else {
        result[field] = field;
      }
    }
    return result as typeof this;
  }
}
