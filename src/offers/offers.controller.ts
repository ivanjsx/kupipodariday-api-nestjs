// decorators
import {
  ParseIntPipe,
  Controller,
  Param,
  Body,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';

// providers
import { OffersService } from './offers.service';

// guards
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

// entities
import { Offer } from './offer.entity';

// data transfer objects
import { CreateOfferDto } from './dto/create-offer.dto';

// content

@Controller('offers')
@UseGuards(JwtAuthGuard)
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
