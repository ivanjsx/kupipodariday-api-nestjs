// decorators
import { Body, Controller, Post } from '@nestjs/common';

// providers
import { UsersService } from 'src/users/users.service';

// entities
import { User } from 'src/users/user.entity';

// data transfer objects
import { CreateUserDto } from 'src/users/dto/create-user.dto';

// content

@Controller()
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signUp(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createOne(data);
  }
}
