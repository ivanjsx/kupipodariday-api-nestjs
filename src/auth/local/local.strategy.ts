// libraries
import * as bcrypt from 'bcryptjs';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

// decorators
import { Injectable, UnauthorizedException } from '@nestjs/common';

// providers
import { UsersService } from 'src/users/users.service';

// entities
import { User } from 'src/users/user.entity';

// data transfer objects
import { LoginUserDto } from 'src/users/dto/login-user.dto';

// constants
import { INCORRECT_CREDENTIALS } from 'src/utils/error-messages';

// content

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(data: LoginUserDto): Promise<User> {
    try {
      const user = await this.usersService.findOne(data.username);
      const match = await bcrypt.compare(data.password, user.password);
      if (match) {
        // TODO remove password from user object
        return user;
      }
      throw new UnauthorizedException(INCORRECT_CREDENTIALS);
    } catch (error) {
      throw new UnauthorizedException(INCORRECT_CREDENTIALS);
    }
  }
}
