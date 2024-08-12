// libraries
import { PickType } from '@nestjs/mapped-types';
import { Request } from 'express';

// entities
import { User } from 'src/users/users.entities';

// content

export interface AuthenticatedRequest extends Request {
  user: User;
}

export interface AccessToken {
  access_token: string;
}

export class UserCredentials extends PickType(User, [
  'id',
  'username',
  'password',
]) {}

export class JwtPayload extends PickType(User, ['username']) {
  sub: number;
}
