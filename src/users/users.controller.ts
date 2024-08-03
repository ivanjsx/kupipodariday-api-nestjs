// libraries
import { Request } from 'express';

// decorators
import { Controller, Patch, Param, Post, Body, Get, Req } from '@nestjs/common';

// providers
import { UsersService } from './users.service';

// entities
import { User } from './user.entity';
import { Wish } from 'src/wishes/wish.entity';

// data transfer objects
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

// types
import { AuthenticatedRequest } from 'src/utils/types';

// content

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  @Get(':username/wishes')
  async findOnesWishes(
    @Param('username') username: string,
  ): Promise<Array<Wish>> {
    const user = await this.usersService.findOneWithWishes(username);
    return user.wishes;
  }

  @Get('me')
  findMe(@Req() request: AuthenticatedRequest): Promise<User> {
    return this.usersService.findOne(request.user.username);
  }

  @Patch('me')
  updateMe(
    @Req() request: AuthenticatedRequest,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateOne(request.user.username, data);
  }

  @Get('me/wishes')
  async findMyWishes(
    @Req() request: AuthenticatedRequest,
  ): Promise<Array<Wish>> {
    const me = await this.usersService.findOneWithWishes(request.user.username);
    return me.wishes;
  }

  @Post('find')
  findMany(@Body() data: SearchUserDto): Promise<Array<User>> {
    return this.usersService.findMany(data);
  }
}
