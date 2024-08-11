// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { Repository } from 'typeorm';

// entities
import { Wish } from './wishes.entities';
import { User } from 'src/users/users.entities';

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

  public async createOne(
    data: CreateWishDto,
    owner: User,
    copiedFrom: Wish = undefined,
  ): Promise<Wish> {
    const wish = this.wishesRepository.create({
      ...data,
      owner,
    });
    if (copiedFrom) {
      wish.direct_copy_of = copiedFrom;
    }
    return this.wishesRepository.save(wish);
  }

  public async findByIdOr404(id: number): Promise<Wish> {
    return this.wishesRepository.findOneByOrFail({ id });
  }

  public async updateOne(id: number, data: UpdateWishDto): Promise<Wish> {
    const wish = await this.findByIdOr404(id);
    return this.wishesRepository.save({ ...wish, ...data });
  }

  public async removeOne(id: number): Promise<Wish> {
    const wish = await this.findByIdOr404(id);
    return this.wishesRepository.remove(wish);
  }

  public async copyOne(fromId: number, copycat: User): Promise<Wish> {
    const wish = await this.findByIdOr404(fromId);
    const copy: unknown = {};
    Object.keys(CreateWishDto).forEach((key) => {
      if (key in wish) {
        copy[key] = wish[key];
      }
    });
    return this.createOne(copy as CreateWishDto, copycat, wish);
  }

  public async findLast(limit: number): Promise<Array<Wish>> {
    return this.wishesRepository.find({
      order: { createdAt: Direction.DESC },
      take: limit,
    });
  }

  public async findTop(limit: number): Promise<Array<Wish>> {
    return this.wishesRepository.find({
      order: { copied: Direction.DESC },
      take: limit,
    });
  }
}
