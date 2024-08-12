// libraries
import { Injectable, UnauthorizedException } from '@nestjs/common';

// strategies
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

// providers
import { UsersService } from 'src/users/users.service';

// utils
import { compare } from 'src/common/hashing';

// constants
import { UserCredentials } from 'src/common/types';
import { INCORRECT_CREDENTIALS } from 'src/common/error-messages';

// content

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserCredentials> {
    const credentials =
      await this.usersService.findOnlyCredentialsByUsername(username);
    const match = await compare(password, credentials.password);
    if (!match) {
      throw new UnauthorizedException(INCORRECT_CREDENTIALS);
    }
    return credentials;
  }
}
