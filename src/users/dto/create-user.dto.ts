// decorators
import {
  IsStrongPassword,
  IsOptional,
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
  ME,
} from '../users.constants';

// types
import { EscapableDto } from 'src/common/types';

// content

export class CreateUserDto extends EscapableDto {
  @IsEmail({
    allow_utf8_local_part: false,
  })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  @NotEquals(ME)
  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH)
  username: string;

  @IsOptional()
  @Length(MIN_USER_ABOUT_LENGTH, MAX_USER_ABOUT_LENGTH)
  about?: string;

  @IsOptional()
  @IsUrl({
    protocols: ['http', 'https'],
  })
  avatar?: string;
}
