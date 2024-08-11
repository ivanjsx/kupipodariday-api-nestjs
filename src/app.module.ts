// decorators
import { Module } from '@nestjs/common';

// app modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { WishlistsModule } from './wishlists/wishlists.module';

// orm
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
})
export class AppModule {}
