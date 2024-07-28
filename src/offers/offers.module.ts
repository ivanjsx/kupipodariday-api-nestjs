// decorators
import { Module } from '@nestjs/common';

// orm modules
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { Offer } from './entities/offer.entity';

// controllers
import { OffersController } from './offers.controller';

// providers
import { OffersService } from './offers.service';

// content

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
