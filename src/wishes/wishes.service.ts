// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { Repository } from 'typeorm';

// entities
import { Wish } from './wish.entity';

// data transfer objects
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

// constants
import { Direction } from 'src/utils/constants';

// content

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async createOne(data: CreateWishDto): Promise<Wish> {
    const insertResult = await this.wishesRepository.insert(data);
    return insertResult.generatedMaps[0] as Wish;
  }

  findOne(id: number): Promise<Wish> {
    return this.wishesRepository.findOneByOrFail({ id });
  }

  async updateOne(id: number, data: UpdateWishDto): Promise<Wish> {
    const wish = await this.findOne(id);
    return this.wishesRepository.save({ ...wish, ...data });
  }

  async removeOne(id: number): Promise<Wish> {
    const wish = await this.findOne(id);
    return this.wishesRepository.remove(wish);
  }

  async copyOne(id: number): Promise<Wish> {
    const wish = await this.findOne(id);
    const copy: unknown = {};
    Object.keys(CreateWishDto).forEach((key) => {
      if (key in wish) {
        copy[key] = wish[key];
      }
    });
    return this.createOne(copy as CreateWishDto);
  }

  findMany(
    orderBy: keyof Wish,
    direction: Direction,
    limit: number,
  ): Promise<Array<Wish>> {
    return this.wishesRepository.find({
      order: {
        [orderBy]: direction,
      },
      take: limit,
    });
  }

  findLast(limit: number): Promise<Array<Wish>> {
    return this.findMany('createdAt', Direction.DESC, limit);
  }

  findTop(limit: number): Promise<Array<Wish>> {
    return this.findMany('copied', Direction.DESC, limit);
  }
}
