// decorators
import { Injectable } from '@nestjs/common';

// providers
import { JwtService } from '@nestjs/jwt';

// entities
import { User } from 'src/users/users.entities';

// types
import { JwtPayload, AccessTokenResponse } from './auth.types';

// content

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  authenticate(user: User): AccessTokenResponse {
    const payload: JwtPayload = { subject: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
