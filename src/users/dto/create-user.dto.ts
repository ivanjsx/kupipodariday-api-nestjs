// decorators
import {
  IsStrongPassword,
  IsNotEmpty,
  NotEquals,
  IsEmail,
  Length,
  IsUrl,
} from 'class-validator';

// constants
import {
  MAX_USER_ABOUT_LENGTH,
  MIN_USER_ABOUT_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from 'src/utils/constants';

// content

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail({
    allow_utf8_local_part: false,
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  @IsNotEmpty()
  @NotEquals('me')
  @NotEquals('admin')
  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH)
  username: string;

  @Length(MIN_USER_ABOUT_LENGTH, MAX_USER_ABOUT_LENGTH)
  about?: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  avatar?: string;
}
