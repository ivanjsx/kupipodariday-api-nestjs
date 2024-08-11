// libraries
import { CurrentlyAuthenticatedUser } from 'src/common/decorators';
import {
  ParseIntPipe,
  Controller,
  UseFilters,
  UseGuards,
  Param,
  Body,
  Post,
  Get,
} from '@nestjs/common';

// providers
import { OffersService } from './offers.service';

// guards
import { JwtAuth } from 'src/auth/jwt/jwt.guard';

// filters
import { OfferNotFound } from './offers.filters';

// entities
import { Offer } from './offers.entities';
import { User } from 'src/users/users.entities';

// data transfer objects
import { CreateOfferDto } from './dto/create-offer.dto';

// content

@Controller('offers')
@UseGuards(JwtAuth)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async createOne(
    @Body() data: CreateOfferDto,
    @CurrentlyAuthenticatedUser() me: User,
  ): Promise<Offer> {
    return this.offersService.createOne(data, me);
  }

  @Get()
  async findAll(): Promise<Array<Offer>> {
    return this.offersService.findAll();
  }

  @Get(':id')
  @UseFilters(OfferNotFound)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offersService.findByIdOr404(id);
  }
}
