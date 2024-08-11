// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

// entities
import { User } from './users.entities';

// data transfer objects
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

// utils
import { ILike } from 'typeorm';
import { hash } from 'src/utils/hashing';
import { UserCredentials } from 'src/utils/types';

// content

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findByUsernameOr404(
    username: string,
    fields: FindOptionsSelect<User> = undefined,
    join: FindOptionsRelations<User> = undefined,
  ): Promise<User> {
    return this.usersRepository.findOneOrFail({
      where: { username },
      select: fields,
      relations: join,
    });
  }

  public async findAndReturnOnlyCredentials(
    username: string,
  ): Promise<UserCredentials> {
    return this.findByUsernameOr404(username, {
      id: true,
      username: true,
      password: true,
    });
  }

  public async findAndReturnOnlyWishes(username: string): Promise<User> {
    return this.findByUsernameOr404(
      username,
      { wishes: true },
      { wishes: true },
    );
  }

  public async findByUsernameWishWishes(username: string): Promise<User> {
    return this.findByUsernameOr404(username, undefined, { wishes: true });
  }

  public async createOne(data: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      ...data,
      password: await hash(data.password),
    });
    return this.usersRepository.save(user);
  }

  public async updateOne(user: User, data: UpdateUserDto): Promise<User> {
    if (data.password) {
      data.password = await hash(data.password);
    }
    return this.usersRepository.save({ ...user, ...data });
  }

  public async searchMany(data: SearchUserDto): Promise<Array<User>> {
    const { query } = data;
    return this.usersRepository.find({
      where: [
        { email: ILike(`%${query}%`) },
        { username: ILike(`%${query}%`) },
      ],
    });
  }
}
