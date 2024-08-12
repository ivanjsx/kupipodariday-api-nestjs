// libraries
import escape from 'escape-html';
import { OmitType, PartialType } from '@nestjs/mapped-types';

// utils
import { CreateUserDto } from './create-user.dto';

// content

export class UncleanedUpdateUserDto extends PartialType(CreateUserDto) {
  public escapeFields(): UpdateUserDto {
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

export class UpdateUserDto extends OmitType(UncleanedUpdateUserDto, [
  'escapeFields',
]) {}
