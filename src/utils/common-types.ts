import { Request } from 'express';
import { User } from 'src/users/users.entities';

export type AuthenticatedRequest = Request & {
  user: User;
};
