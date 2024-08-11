// decorators
import { Injectable } from '@nestjs/common';

// providers
import { JwtService } from '@nestjs/jwt';

// types
import { UserCredentials } from 'src/utils/types';
import { AccessToken, JwtPayload } from './auth.types';

// content

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async authenticate(user: UserCredentials): Promise<AccessToken> {
    const { username, id: sub } = user;
    const payload: JwtPayload = { username, sub };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
