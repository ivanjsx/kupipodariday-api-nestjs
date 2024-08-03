// libraries
import bcrypt from 'bcryptjs';

// decorators
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { Repository } from 'typeorm';

// entities
import { User } from './user.entity';

// data transfer objects
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

// constants
import { USER_ALREADY_EXISTS } from 'src/utils/error-messages';

// content

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOneByOrFail({ username });
  }

  findOneWithWishes(username: string): Promise<User> {
    return this.usersRepository.findOneOrFail({
      where: { username },
      relations: ['wishes'],
    });
  }

  async createOne(data: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(data.password, 10);
    try {
      const insertResult = await this.usersRepository.insert({
        ...data,
        password: hash,
      });
      return insertResult.generatedMaps[0] as User;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(USER_ALREADY_EXISTS);
      }
    }
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
