// decorators
import { Column, Entity, ManyToOne } from 'typeorm';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';

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
  @IsNotEmpty()
  @IsBoolean()
  @Column({
    default: false,
  })
  hidden: boolean;

  @IsNotEmpty()
  @IsPositive()
  @Min(0)
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
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column()
  @ManyToOne(() => User, (user) => user.offers)
  user: User;
}
