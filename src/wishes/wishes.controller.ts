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
  UseGuards,
} from '@nestjs/common';

// providers
import { WishesService } from './wishes.service';

// guards
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

// entities
import { Wish } from './wishes.entities';

// data transfer objects
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

// constants
import { LAST_WISHES_LIMIT, TOP_WISHES_LIMIT } from './wishes.constants';

// content

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createOne(@Body() data: CreateWishDto): Promise<Wish> {
    return this.wishesService.createOne(data);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Wish> {
    return this.wishesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateOne(
    @Body() data: UpdateWishDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Wish> {
    return this.wishesService.updateOne(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  removeOne(@Param('id', ParseIntPipe) id: number): Promise<Wish> {
    return this.wishesService.removeOne(id);
  }

  @Post(':id/copy')
  @UseGuards(JwtAuthGuard)
  copyOne(@Param('id', ParseIntPipe) id: number): Promise<Wish> {
    return this.wishesService.copyOne(id);
  }

  @Get('last')
  findLast(): Promise<Array<Wish>> {
    const limit = LAST_WISHES_LIMIT;
    return this.wishesService.findLast(limit);
  }

  @Get('top')
  findTop(): Promise<Array<Wish>> {
    const limit = TOP_WISHES_LIMIT;
    return this.wishesService.findTop(limit);
  }
}
