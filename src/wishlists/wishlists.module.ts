// decorators
import { Module } from '@nestjs/common';

// orm modules
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { Wishlist } from './entities/wishlist.entity';

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
