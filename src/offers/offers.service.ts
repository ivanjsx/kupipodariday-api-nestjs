// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { Repository } from 'typeorm';

// entities
import { Offer } from './offers.entities';
import { User } from 'src/users/users.entities';

// data transfer objects
import { CreateOfferDto } from './dto/create-offer.dto';

// content

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {}

  public async createOne(data: CreateOfferDto, proposer: User): Promise<Offer> {
    const offer = this.offersRepository.create({
      ...data,
      proposer,
    });
    return this.offersRepository.save(offer);
  }

  public async findAll(): Promise<Array<Offer>> {
    return this.offersRepository.find();
  }

  public async findByIdOr404(id: number): Promise<Offer> {
    return this.offersRepository.findOneByOrFail({ id });
  }
}
