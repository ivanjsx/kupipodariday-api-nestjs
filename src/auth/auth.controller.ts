// decorators
import {
  UseInterceptors,
  Controller,
  UseGuards,
  Body,
  Post,
  Req,
} from '@nestjs/common';

// providers
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

// guards
import { LocalAuthGuard } from './local/local.guard';

// interceptors
import { HidePassword } from './auth.interceptors';

// entities
import { User } from 'src/users/users.entities';

// data transfer objects
import { CreateUserDto } from 'src/users/dto/create-user.dto';

// types
import { AccessTokenResponse } from './auth.types';
import { AuthenticatedRequest } from 'src/utils/common-types';

// content

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  @UseInterceptors(HidePassword)
  signUp(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createOne(data);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  signIn(@Req() request: AuthenticatedRequest): AccessTokenResponse {
    return this.authService.authenticate(request.user);
  }
}
