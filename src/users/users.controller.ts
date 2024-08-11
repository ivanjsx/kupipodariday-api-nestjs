// decorators
import { CurrentlyAuthenticatedUser } from 'src/common/decorators';
import {
  UseInterceptors,
  Controller,
  UseFilters,
  UseGuards,
  Patch,
  Param,
  Post,
  Body,
  Get,
} from '@nestjs/common';

// providers
import { UsersService } from './users.service';

// guards
import { JwtAuth } from 'src/auth/jwt/jwt.guard';

// filters
import { UserNotFound } from './users.filters';
import { UserAlreadyExists } from 'src/common/filters';

// interceptors
import { HideWishes } from './users.interceptors';

// entities
import { User } from './users.entities';
import { Wish } from 'src/wishes/wishes.entities';

// data transfer objects
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

// constants
import { ME } from './users.constants';
import { HidePassword } from 'src/common/interceptors';

// content

@Controller('users')
@UseGuards(JwtAuth)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(ME)
  @UseInterceptors(HideWishes)
  findMe(@CurrentlyAuthenticatedUser() me: User): User {
    return me;
  }

  @Get(`${ME}/wishes`)
  findMyWishes(@CurrentlyAuthenticatedUser() me: User): Array<Wish> {
    return me.wishes;
  }

  @Patch(ME)
  @UseInterceptors(HideWishes)
  @UseInterceptors(HidePassword)
  @UseFilters(UserAlreadyExists)
  async updateMe(
    @Body() data: UpdateUserDto,
    @CurrentlyAuthenticatedUser() me: User,
  ): Promise<User> {
    return this.usersService.updateOne(me, data);
  }

  @Get(':username')
  @UseFilters(UserNotFound)
  async findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findByUsernameOr404(username);
  }

  @Get(':username/wishes')
  @UseFilters(UserNotFound)
  async findOnesWishes(
    @Param('username') username: string,
  ): Promise<Array<Wish>> {
    const user = await this.usersService.findOnlyWishesByUsername(username);
    return user.wishes;
  }

  @Post('find')
  async searchMany(@Body() data: SearchUserDto): Promise<Array<User>> {
    return this.usersService.searchMany(data);
  }
}
