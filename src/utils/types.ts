import { Request } from 'express';
import { User } from 'src/users/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}

export interface AccessTokenResponse {
  access_token: string;
}
