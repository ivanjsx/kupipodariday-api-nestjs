// decorators
import { Injectable } from '@nestjs/common';

// providers
import { Repository } from 'typeorm';

// entities
import { Wishlist } from './entities/wishlist.entity';

// data transfer objects
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

// content

@Injectable()
export class WishlistsService {
  constructor(private readonly wishlistsRepository: Repository<Wishlist>) {}

  async createOne(data: CreateWishlistDto): Promise<Wishlist> {
    const insertResult = await this.wishlistsRepository.insert(data);
    return insertResult.generatedMaps[0] as Wishlist;
  }

  findAll() {
    return this.wishlistsRepository.find();
  }

  findOne(id: number): Promise<Wishlist> {
    return this.wishlistsRepository.findOneByOrFail({ id });
  }

  async updateOne(id: number, data: UpdateWishlistDto): Promise<Wishlist> {
    const wishlist = await this.findOne(id);
    return this.wishlistsRepository.save({ ...wishlist, ...data });
  }

  async removeOne(id: number): Promise<Wishlist> {
    const wish = await this.findOne(id);
    return this.wishlistsRepository.remove(wish);
  }
}
