// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

// entities
import { User } from 'src/users/users.entities';
import { Wishlist } from './wishlists.entities';

// data transfer objects
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

// content

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
  ) {}

  public async createOne(
    data: CreateWishlistDto,
    author: User,
  ): Promise<Wishlist> {
    const wishlist = this.wishlistsRepository.create({
      ...data,
      author,
    });
    return this.wishlistsRepository.save(wishlist);
  }

  public async findAll(): Promise<Array<Wishlist>> {
    return this.wishlistsRepository.find();
  }

  public async findByIdOr404(
    id: number,
    fields: FindOptionsSelect<Wishlist> = undefined,
    join: FindOptionsRelations<Wishlist> = undefined,
  ): Promise<Wishlist> {
    return this.wishlistsRepository.findOneOrFail({
      where: { id },
      select: fields,
      relations: join,
    });
  }

  public async findOnlyAuthorById(id: number): Promise<Wishlist> {
    return this.findByIdOr404(id, { author: undefined }, { author: true });
  }

  async updateOne(id: number, data: UpdateWishlistDto): Promise<Wishlist> {
    const wishlist = await this.findByIdOr404(id);
    return this.wishlistsRepository.save({ ...wishlist, ...data });
  }

  async removeOne(id: number): Promise<Wishlist> {
    const wish = await this.findByIdOr404(id);
    return this.wishlistsRepository.remove(wish);
  }
}
