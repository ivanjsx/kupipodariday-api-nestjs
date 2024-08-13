// libraries
import escape from 'escape-html';
import { OmitType } from '@nestjs/mapped-types';

// decorators
import { IsInt, IsPositive, IsUrl, Length } from 'class-validator';

// constants
import {
  MIN_WISHLIST_NAME_LENGTH,
  MAX_WISHLIST_NAME_LENGTH,
} from '../wishlists.constants';

// utils
import { UncleanedEscapableDto } from 'src/common/types';

// content

export class UncleanedCreateWishlistDto extends UncleanedEscapableDto {
  @Length(MIN_WISHLIST_NAME_LENGTH, MAX_WISHLIST_NAME_LENGTH)
  name: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  image: string;

  @IsInt({ each: true })
  @IsPositive({ each: true })
  itemsId: Array<number>;

  public escapeFields(): CreateWishlistDto {
    const result: CreateWishlistDto = {
      name: escape(this.name),
      image: escape(this.image),
      itemsId: this.itemsId,
    };
    return result;
  }
}

export class CreateWishlistDto extends OmitType(UncleanedCreateWishlistDto, [
  'escapeFields',
]) {}
