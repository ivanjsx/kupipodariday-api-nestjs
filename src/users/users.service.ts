// libraries
import * as bcrypt from 'bcryptjs';

// decorators
import { ConflictException, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { Repository } from 'typeorm';

// interceptors
import { HidePassword } from 'src/utils/interceptors';

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

  async ensureNotExists(email: string, username: string): Promise<void> {
    const exists = await this.usersRepository.existsBy([
      { email },
      { username },
    ]);
    if (exists) {
      throw new ConflictException(USER_ALREADY_EXISTS);
    }
  }

  @UseInterceptors(HidePassword)
  async createOne(data: CreateUserDto): Promise<User> {
    await this.ensureNotExists(data.email, data.username);
    const hash = await bcrypt.hash(data.password, 12);
    const insertResult = await this.usersRepository.insert({
      ...data,
      password: hash,
    });
    return insertResult.generatedMaps[0] as User;
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
