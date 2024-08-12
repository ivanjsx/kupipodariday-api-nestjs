// libraries
import escape from 'escape-html';

// decorators
import { IsInt, IsPositive, IsUrl, Length } from 'class-validator';

// constants
import {
  MIN_WISHLIST_NAME_LENGTH,
  MAX_WISHLIST_NAME_LENGTH,
} from '../wishlists.constants';

// types
import { EscapableDto } from 'src/common/types';

// content

export class CreateWishlistDto extends EscapableDto {
  @Length(MIN_WISHLIST_NAME_LENGTH, MAX_WISHLIST_NAME_LENGTH)
  name: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  image: string;

  @IsInt({ each: true })
  @IsPositive({ each: true })
  itemsId: Array<number>;

  public escapeFields(): this {
    const { name, image } = this;
    return {
      name: escape(name),
      image: escape(image),
      itemsId: this.itemsId,
    } as this;
  }
}
