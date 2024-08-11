// decorators
import { IsNumber, IsPositive, IsUrl, Length } from 'class-validator';

// constants
import { MONEY_DECIMAL_PLACES } from 'src/common/constants';
import {
  MIN_WISH_DESCRIPTION_LENGTH,
  MAX_WISH_DESCRIPTION_LENGTH,
  MIN_WISH_NAME_LENGTH,
  MAX_WISH_NAME_LENGTH,
} from '../wishes.constants';

// content

export class CreateWishDto {
  @Length(MIN_WISH_NAME_LENGTH, MAX_WISH_NAME_LENGTH)
  name: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  link: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  image: string;

  @IsPositive()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_PLACES,
  })
  price: number;

  @Length(MIN_WISH_DESCRIPTION_LENGTH, MAX_WISH_DESCRIPTION_LENGTH)
  description: string;
}
