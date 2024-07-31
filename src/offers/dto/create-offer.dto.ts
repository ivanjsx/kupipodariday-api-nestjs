// decorators
import {
  IsPositive,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';

// constants
import { MONEY_DECIMAL_PLACES } from 'src/utils/constants';

// content

export class CreateOfferDto {
  @IsBoolean()
  hidden?: boolean;

  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_PLACES,
  })
  amount: number;

  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  itemId: number;
}
