// decorators
import { Module } from '@nestjs/common';

// orm
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { Offer } from './offers.entities';

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
