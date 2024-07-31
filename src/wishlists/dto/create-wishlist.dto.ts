// decorators
import { IsNumber, IsPositive, IsUrl, Length } from 'class-validator';

// constants
import {
  MIN_WISHLIST_NAME_LENGTH,
  MAX_WISHLIST_NAME_LENGTH,
} from 'src/utils/constants';

// content

export class CreateWishlistDto {
  @Length(MIN_WISHLIST_NAME_LENGTH, MAX_WISHLIST_NAME_LENGTH)
  name: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  image: string;

  @IsPositive({ each: true })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { each: true },
  )
  itemsId: Array<number>;
}
