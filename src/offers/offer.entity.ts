// decorators
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsBoolean, IsNumber, IsPositive } from 'class-validator';

// entities
import { User } from 'src/users/user.entity';
import { Wish } from 'src/wishes/wish.entity';

// utils
import { WithIdAndDates } from 'src/utils/entities';

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

  @IsPositive()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_PLACES,
  })
  @Column({
    type: 'decimal',
    scale: MONEY_DECIMAL_PLACES,
  })
  amount: number;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;
}
