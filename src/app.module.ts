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

// entities
import { User } from './users/entities/user.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Offer } from './offers/entities/offer.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';

// content

@Module({
  imports: [
    AuthModule,
    UsersModule,
    WishesModule,
    OffersModule,
    WishlistsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday',
      schema: 'public',
      entities: [User, Wish, Offer, Wishlist],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
