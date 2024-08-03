// decorators
import { Injectable } from '@nestjs/common';

// providers
import { JwtService } from '@nestjs/jwt';

// entities
import { User } from 'src/users/user.entity';

// types
import { AccessTokenResponse } from 'src/utils/types';

// content

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  authenticate(user: User): AccessTokenResponse {
    const payload = { subject: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
