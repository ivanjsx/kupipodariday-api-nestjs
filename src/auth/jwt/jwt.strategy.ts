// strategies
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

// decorators
import { Injectable, UnauthorizedException } from '@nestjs/common';

// providers
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

// entities
import { User } from 'src/users/users.entities';

// constants
import { INVALID_TOKEN } from 'src/utils/error-messages';
import { JWT_SECRET_PROPERTY_PATH } from '../auth.constants';

// types
import { JwtPayload } from '../auth.types';

// content

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(JWT_SECRET_PROPERTY_PATH),
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.usersService.getUser(jwtPayload.subject);
    if (!user) {
      throw new UnauthorizedException(INVALID_TOKEN);
    }
    return user;
  }
}
