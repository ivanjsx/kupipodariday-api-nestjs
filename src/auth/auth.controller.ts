// decorators
import { CurrentlyAuthenticatedUser } from 'src/common/decorators';
import {
  UseInterceptors,
  Controller,
  UseFilters,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';

// providers
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

// guards
import { LocalAuth } from './local/local.guard';

// filters
import { IncorrectUsername, UserAlreadyExists } from 'src/common/filters';

// interceptors
import { HidePasswordFromUser } from 'src/common/interceptors';

// entities
import { User } from 'src/users/users.entities';

// data transfer objects
import { CreateUserDto } from 'src/users/dto/create-user.dto';

// types
import { AccessToken, UserCredentials } from 'src/common/types';

// content

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  @UseFilters(UserAlreadyExists)
  @UseInterceptors(HidePasswordFromUser)
  async signUp(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createOne(data);
  }

  @Post('signin')
  @UseGuards(LocalAuth)
  @UseFilters(IncorrectUsername)
  async signIn(
    @CurrentlyAuthenticatedUser()
    credentials: UserCredentials,
  ): Promise<AccessToken> {
    return this.authService.authenticate(credentials);
  }
}
