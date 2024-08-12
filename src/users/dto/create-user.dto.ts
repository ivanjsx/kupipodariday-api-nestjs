// libraries
import escape from 'escape-html';
import { OmitType } from '@nestjs/mapped-types';

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

// utils
import { UncleanedEscapableDto } from 'src/common/types';

// content

export class UncleanedCreateUserDto extends UncleanedEscapableDto {
  @IsEmail({
    allow_utf8_local_part: false,
  })
  email: string;

  @NotEquals(ME)
  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH)
  username: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  @IsOptional()
  @Length(MIN_USER_ABOUT_LENGTH, MAX_USER_ABOUT_LENGTH)
  about?: string;

  @IsOptional()
  @IsUrl({
    protocols: ['http', 'https'],
  })
  avatar?: string;

  public escapeFields(): CreateUserDto {
    const { email, username, password, about, avatar } = this;
    return {
      email: escape(email),
      username: escape(username),
      password: escape(password),
      about: escape(about),
      avatar: escape(avatar),
    };
  }
}

export class CreateUserDto extends OmitType(UncleanedCreateUserDto, [
  'escapeFields',
]) {}
