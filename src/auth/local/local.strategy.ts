// libraries
import * as bcrypt from 'bcryptjs';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

// decorators
import { Injectable, UnauthorizedException } from '@nestjs/common';

// providers
import { UsersService } from 'src/users/users.service';

// entities
import { User } from 'src/users/users.entities';

// constants
import { INCORRECT_CREDENTIALS } from 'src/utils/error-messages';

// content

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.usersService.getUser(username, false, ['password']);
    if (!user) {
      throw new UnauthorizedException(INCORRECT_CREDENTIALS);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException(INCORRECT_CREDENTIALS);
    }
    return user;
  }
}
