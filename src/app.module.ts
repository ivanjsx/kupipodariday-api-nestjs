// decorators
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

// app modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { WishlistsModule } from './wishlists/wishlists.module';

// orm
import { TypeOrmModule } from '@nestjs/typeorm';

// security
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

// environment
import { mainConfig } from './config/main';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigFactory } from './config/database-config.factory';

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
      load: [mainConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigFactory,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
