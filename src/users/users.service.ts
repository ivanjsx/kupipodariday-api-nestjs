// libraries
import * as bcrypt from 'bcryptjs';

// decorators
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

// providers
import { EntityNotFoundError, Repository } from 'typeorm';

// entities
import { User } from './users.entities';

// data transfer objects
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

// constants
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from 'src/utils/error-messages';

// content

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getUser(
    username: string,
    fire404 = false,
    fields: Array<keyof User> = undefined,
    join: Array<keyof User> = undefined,
  ): Promise<User> {
    const options = {
      where: { username },
      select: fields,
      relations: join,
    };
    if (!fire404) {
      return this.usersRepository.findOne(options);
    }
    try {
      return this.usersRepository.findOneOrFail(options);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(USER_NOT_FOUND);
      }
      throw error;
    }
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

  async createOne(data: CreateUserDto): Promise<User> {
    await this.ensureNotExists(data.email, data.username);
    const hash = await bcrypt.hash(data.password, 12);
    return this.usersRepository.save({
      ...data,
      password: hash,
    });
  }

  async updateOne(username: string, data: UpdateUserDto): Promise<User> {
    const user = await this.getUser(username, true);
    return this.usersRepository.save({ ...user, ...data });
  }

  searchMany(data: SearchUserDto): Promise<Array<User>> {
    const { query } = data;
    return this.usersRepository.find({
      where: [{ email: query }, { username: query }],
    });
  }
}
