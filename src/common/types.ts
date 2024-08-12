// libraries
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
  public abstract escapeFields(): this;
}
