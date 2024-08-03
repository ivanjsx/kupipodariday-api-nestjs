// decorators
import { Module } from '@nestjs/common';

// app modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { WishlistsModule } from './wishlists/wishlists.module';

// orm modules
import { TypeOrmModule } from '@nestjs/typeorm';

// environment modules
import { ConfigModule, ConfigService } from '@nestjs/config';

// content

@Module({
  imports: [
    AuthModule,
    UsersModule,
    WishesModule,
    OffersModule,
    WishlistsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        useUTC: true,
        synchronize: true,
        autoLoadEntities: true,
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        schema: configService.get<string>('DATABASE_SCHEMA'),
      }),
    }),
  ],
})
export class AppModule {}
