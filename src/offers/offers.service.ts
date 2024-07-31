// decorators
import { Injectable } from '@nestjs/common';

// providers
import { Repository } from 'typeorm';

// entities
import { Offer } from './entities/offer.entity';

// data transfer objects
import { CreateOfferDto } from './dto/create-offer.dto';

// content

@Injectable()
export class OffersService {
  constructor(private readonly wishesRepository: Repository<Offer>) {}

  async createOne(data: CreateOfferDto): Promise<Offer> {
    const insertResult = await this.wishesRepository.insert(data);
    return insertResult.generatedMaps[0] as Offer;
  }

  findAll() {
    return this.wishesRepository.find();
  }

  findOne(id: number): Promise<Offer> {
    return this.wishesRepository.findOneByOrFail({ id });
  }
}
