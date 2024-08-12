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
    const { name, image } = this;
    return {
      name: escape(name),
      image: escape(image),
      itemsId: this.itemsId,
    };
  }
}

export class CreateWishlistDto extends OmitType(UncleanedCreateWishlistDto, [
  'escapeFields',
]) {}
