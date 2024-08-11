// decorators
import { Module } from '@nestjs/common';

// orm
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { Wishlist } from './wishlists.entities';

// controllers
import { WishlistsController } from './wishlists.controller';

// providers
import { WishlistsService } from './wishlists.service';

// content

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
