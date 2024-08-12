// libraries
import escape from 'escape-html';
import { OmitType, PartialType } from '@nestjs/mapped-types';

// utils
import { CreateWishDto } from './create-wish.dto';

// content

export class UncleanedUpdateWishDto extends PartialType(CreateWishDto) {
  public escapeFields(): UpdateWishDto {
    const { name, link, image, description } = this;
    return {
      name: escape(name),
      link: escape(link),
      image: escape(image),
      description: escape(description),
      price: this.price,
    };
  }
}

export class UpdateWishDto extends OmitType(UncleanedUpdateWishDto, [
  'escapeFields',
]) {}
