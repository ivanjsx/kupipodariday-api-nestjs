// decorators
import { Column, Entity } from 'typeorm';
import { IsBoolean, IsNumber } from 'class-validator';

// entities
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

// utils
import { WithIdAndDates } from 'src/utils/entities/with-id-and-dates';

// constants
import { MONEY_DECIMAL_PLACES } from 'src/utils/constants';

// content

@Entity()
export class Offer extends WithIdAndDates {
  @IsBoolean()
  @Column({
    default: false,
  })
  hidden: boolean;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_PLACES,
  })
  @Column({
    scale: MONEY_DECIMAL_PLACES,
  })
  amount: number;

  @Column()
  // TODO define relation
  user: User;

  @Column()
  // TODO define relation
  item: Wish;
}
