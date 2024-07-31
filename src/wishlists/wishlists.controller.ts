// decorators
import {
  ParseIntPipe,
  Controller,
  Delete,
  Param,
  Patch,
  Body,
  Post,
  Get,
} from '@nestjs/common';

// providers
import { WishlistsService } from './wishlists.service';

// entities
import { Wishlist } from './entities/wishlist.entity';

// data transfer objects
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

// content

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  createOne(@Body() data: CreateWishlistDto): Promise<Wishlist> {
    return this.wishlistsService.createOne(data);
  }

  @Get()
  findAll(): Promise<Array<Wishlist>> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Wishlist> {
    return this.wishlistsService.findOne(id);
  }

  @Patch(':id')
  updateOne(
    @Body() data: UpdateWishlistDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Wishlist> {
    return this.wishlistsService.updateOne(id, data);
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number): Promise<Wishlist> {
    return this.wishlistsService.removeOne(id);
  }
}
