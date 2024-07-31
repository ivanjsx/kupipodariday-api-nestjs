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
import { WishesService } from './wishes.service';

// entities
import { Wish } from './entities/wish.entity';

// data transfer objects
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

// constants
import { LAST_WISHES_LIMIT, TOP_WISHES_LIMIT } from 'src/utils/constants';

// content

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  createOne(@Body() data: CreateWishDto): Promise<Wish> {
    return this.wishesService.createOne(data);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Wish> {
    return this.wishesService.findOne(id);
  }

  @Patch(':id')
  updateOne(
    @Body() data: UpdateWishDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Wish> {
    return this.wishesService.updateOne(id, data);
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number): Promise<Wish> {
    return this.wishesService.removeOne(id);
  }

  @Post(':id/copy')
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
