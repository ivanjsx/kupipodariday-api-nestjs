// libraries
import escape from 'escape-html';
import { OmitType, PartialType } from '@nestjs/mapped-types';

// utils
import { CreateWishlistDto } from './create-wishlist.dto';

// content

export class UncleanedUpdateWishlistDto extends PartialType(CreateWishlistDto) {
  public escapeFields(): UpdateWishlistDto {
    const { name, image } = this;
    return {
      name: escape(name),
      image: escape(image),
      itemsId: this.itemsId,
    };
  }
}

export class UpdateWishlistDto extends OmitType(UncleanedUpdateWishlistDto, [
  'escapeFields',
]) {}
