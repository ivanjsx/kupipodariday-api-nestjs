// decorators
import { Module } from '@nestjs/common';

// modules
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// providers
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

// controllers
import { AuthController } from './auth.controller';

// strategies
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';

// constants
import { JWT_SECRET_PROPERTY_PATH } from './auth.constants';

// content

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_SECRET_PROPERTY_PATH),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
