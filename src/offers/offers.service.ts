// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { Repository } from 'typeorm';

// entities
import { Offer } from './offer.entity';

// data transfer objects
import { CreateOfferDto } from './dto/create-offer.dto';

// content

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {}

  async createOne(data: CreateOfferDto): Promise<Offer> {
    const insertResult = await this.offersRepository.insert(data);
    return insertResult.generatedMaps[0] as Offer;
  }

  findAll() {
    return this.offersRepository.find();
  }

  findOne(id: number): Promise<Offer> {
    return this.offersRepository.findOneByOrFail({ id });
  }
}
