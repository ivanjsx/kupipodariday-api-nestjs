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

  public async createOne(data: CreateWishDto, owner: User): Promise<Wish> {
    const wish = this.wishesRepository.create({
      ...data,
      owner,
    });
    return this.wishesRepository.save(wish);
  }

  public async findByIdOr404(id: number, withOrigins = false): Promise<Wish> {
    const relations = withOrigins
      ? { direct_copy_of: true, root_copy_of: true }
      : undefined;
    return this.wishesRepository.findOneOrFail({ where: { id }, relations });
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
    const from = await this.findByIdOr404(fromId, true);
    const { name, link, image, price, description } = from;
    const data: CreateWishDto = { name, link, image, price, description };

    const to = this.wishesRepository.create({
      ...data,
      owner: copycat,
    });

    to.direct_copy_of = from;

    if (from.root_copy_of) {
      to.root_copy_of = from.root_copy_of;
    } else {
      to.root_copy_of = from;
    }

    from.copied += 1;

    return this.wishesRepository
      .save(from)
      .then(() => this.wishesRepository.save(to));
  }
}
