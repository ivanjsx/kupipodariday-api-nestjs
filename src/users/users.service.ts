// decorators
import { Injectable } from '@nestjs/common';

// providers
import { Repository } from 'typeorm';

// entities
import { User } from './entities/user.entity';

// data transfer objects
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

// content

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: Repository<User>) {}

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOneByOrFail({ username });
  }

  findOneWithWishes(username: string): Promise<User> {
    return this.usersRepository.findOneOrFail({
      where: { username },
      relations: ['wishes'],
    });
  }

  async updateOne(username: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findOne(username);
    return this.usersRepository.save({ ...user, ...data });
  }

  findMany(data: SearchUserDto): Promise<Array<User>> {
    const { query } = data;
    return this.usersRepository.find({
      where: [{ email: query }, { username: query }],
    });
  }
}
