// decorators
import { IsPositive, IsNumber, Length, IsUrl, Max } from 'class-validator';

// constants
import {
  MONEY_DECIMAL_MAX_VALUE,
  MONEY_DECIMAL_SCALE,
} from 'src/common/constants';
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

  @Length(MIN_WISH_DESCRIPTION_LENGTH, MAX_WISH_DESCRIPTION_LENGTH)
  description: string;

  @IsPositive()
  @Max(MONEY_DECIMAL_MAX_VALUE)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_SCALE,
  })
  price: number;
}
