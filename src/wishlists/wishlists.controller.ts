// decorators
import { CurrentlyAuthenticatedUser } from 'src/utils/decorators';
import {
  ParseIntPipe,
  Controller,
  UseGuards,
  Delete,
  Param,
  Patch,
  Body,
  Post,
  Get,
} from '@nestjs/common';

// providers
import { WishlistsService } from './wishlists.service';

// guards
import { JwtAuth } from 'src/auth/jwt/jwt.guard';
import { OnlyWishlistOwner } from './wishlists.guards';

// entities
import { User } from 'src/users/users.entities';
import { Wishlist } from './wishlists.entities';

// data transfer objects
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

// content

@Controller('wishlists')
@UseGuards(JwtAuth)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  async createOne(
    @Body() data: CreateWishlistDto,
    @CurrentlyAuthenticatedUser() me: User,
  ): Promise<Wishlist> {
    return this.wishlistsService.createOne(data, me);
  }

  @Get()
  async findAll(): Promise<Array<Wishlist>> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Wishlist> {
    return this.wishlistsService.findByIdOr404(id);
  }

  @Patch(':id')
  @UseGuards(OnlyWishlistOwner)
  async updateOne(
    @Body() data: UpdateWishlistDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Wishlist> {
    return this.wishlistsService.updateOne(id, data);
  }

  @Delete(':id')
  @UseGuards(OnlyWishlistOwner)
  async removeOne(@Param('id', ParseIntPipe) id: number): Promise<Wishlist> {
    return this.wishlistsService.removeOne(id);
  }
}
