// libraries
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

// decorators
import { Injectable, UnauthorizedException } from '@nestjs/common';

// providers
import { UsersService } from 'src/users/users.service';

// utils
import { compare } from 'src/utils/hashing';

// constants
import { UserCredentials } from 'src/utils/types';
import { INCORRECT_CREDENTIALS_ERROR_MESSAGE } from '../auth.constants';

// content

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserCredentials> {
    const credentials = await this.usersService.findOnlyCredentials(username);
    const match = await compare(password, credentials.password);
    if (!match) {
      throw new UnauthorizedException(INCORRECT_CREDENTIALS_ERROR_MESSAGE);
    }
    return credentials;
  }
}
