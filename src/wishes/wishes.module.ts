// decorators
import { Module } from '@nestjs/common';

// orm modules
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { Wish } from './entities/wish.entity';

// controllers
import { WishesController } from './wishes.controller';

// providers
import { WishesService } from './wishes.service';

// content

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}
