// decorators
import {
  ParseIntPipe,
  Controller,
  Param,
  Body,
  Post,
  Get,
} from '@nestjs/common';

// providers
import { OffersService } from './offers.service';

// entities
import { Offer } from './entities/offer.entity';

// data transfer objects
import { CreateOfferDto } from './dto/create-offer.dto';

// content

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  createOne(@Body() data: CreateOfferDto): Promise<Offer> {
    return this.offersService.createOne(data);
  }

  @Get()
  findAll(): Promise<Array<Offer>> {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offersService.findOne(id);
  }
}
