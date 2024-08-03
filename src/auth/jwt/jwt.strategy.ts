// strategies
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

// decorators
import { Injectable, UnauthorizedException } from '@nestjs/common';

// providers
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

// entities
import { User } from 'src/users/user.entity';

// constants
import { JWT_SECRET_PROPERTY_PATH } from 'src/utils/constants';

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

  async validate(jwtPayload: { subject: string }): Promise<User> {
    try {
      const user = await this.usersService.findOne(jwtPayload.subject);
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
