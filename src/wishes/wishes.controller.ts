// libraries
import { CurrentlyAuthenticatedUser } from 'src/common/decorators';
import {
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
import { WishNotFound } from './wishes.filters';

// entities
import { Wish } from './wishes.entities';
import { User } from 'src/users/users.entities';

// data transfer objects
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

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
  async createOne(
    @Body() data: CreateWishDto,
    @CurrentlyAuthenticatedUser() me: User,
  ): Promise<Wish> {
    return this.wishesService.createOne(data, me);
  }

  @Get(':id')
  @UseGuards(JwtAuth)
  @UseFilters(WishNotFound)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Wish> {
    return this.wishesService.findByIdOr404(id);
  }

  @Patch(':id')
  @UseFilters(WishNotFound)
  @UseGuards(JwtAuth, OnlyWishOwner)
  async updateOne(
    @Body() data: UpdateWishDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Wish> {
    return this.wishesService.updateOne(id, data);
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
  async copyOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentlyAuthenticatedUser() me: User,
  ): Promise<Wish> {
    return this.wishesService.copyOne(id, me);
  }
}
