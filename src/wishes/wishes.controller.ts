// libraries
import { CurrentlyAuthenticatedUser } from 'src/common/decorators';
import {
  UseInterceptors,
  ParseIntPipe,
  Controller,
  UseFilters,
  UseGuards,
  Delete,
  Param,
  Patch,
  Body,
  Post,
  Get,
} from '@nestjs/common';

// providers
import { WishesService } from './wishes.service';

// guards
import { OnlyWishOwner } from './wishes.guards';
import { JwtAuth } from 'src/auth/jwt/jwt.guard';

// filters
import { WishNotFound } from 'src/common/filters';

// interceptors
import {
  HideHiddenOffersFromWish,
  HideOwnersWishesFromWish,
} from 'src/common/interceptors';

// entities
import { Wish } from './wishes.entities';
import { User } from 'src/users/users.entities';

// data transfer objects
import { UncleanedCreateWishDto } from './dto/create-wish.dto';
import { UncleanedUpdateWishDto } from './dto/update-wish.dto';

// constants
import { LAST_WISHES_LIMIT, TOP_WISHES_LIMIT } from './wishes.constants';

// content

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get('last')
  async findLast(): Promise<Array<Wish>> {
    const limit = LAST_WISHES_LIMIT;
    return this.wishesService.findLast(limit);
  }

  @Get('top')
  async findTop(): Promise<Array<Wish>> {
    const limit = TOP_WISHES_LIMIT;
    return this.wishesService.findTop(limit);
  }

  @Post()
  @UseGuards(JwtAuth)
  @UseInterceptors(HideOwnersWishesFromWish)
  async createOne(
    @Body() data: UncleanedCreateWishDto,
    @CurrentlyAuthenticatedUser() me: User,
  ): Promise<Wish> {
    const cleanedData = data.escapeFields();
    return this.wishesService.createOne(cleanedData, me);
  }

  @Get(':id')
  @UseGuards(JwtAuth)
  @UseFilters(WishNotFound)
  @UseInterceptors(HideHiddenOffersFromWish)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Wish> {
    return this.wishesService.findWithOwnerAndOffersById(id);
  }

  @Patch(':id')
  @UseFilters(WishNotFound)
  @UseGuards(JwtAuth, OnlyWishOwner)
  async updateOne(
    @Body() data: UncleanedUpdateWishDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Wish> {
    const cleanedData = data.escapeFields();
    return this.wishesService.updateOne(id, cleanedData);
  }

  @Delete(':id')
  @UseFilters(WishNotFound)
  @UseGuards(JwtAuth, OnlyWishOwner)
  async removeOne(@Param('id', ParseIntPipe) id: number): Promise<Wish> {
    return this.wishesService.removeOne(id);
  }

  @Post(':id/copy')
  @UseGuards(JwtAuth)
  @UseFilters(WishNotFound)
  @UseInterceptors(HideOwnersWishesFromWish)
  async copyOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentlyAuthenticatedUser() me: User,
  ): Promise<Wish> {
    return this.wishesService.copyOne(id, me);
  }
}
