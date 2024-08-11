// decorators
import { IsBoolean, IsNumber, IsPositive } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';

// exceptions
import { BadRequestException } from '@nestjs/common';

// entities
import { User } from 'src/users/users.entities';
import { Wish } from 'src/wishes/wishes.entities';

// utils
import { WithIdAndDates } from 'src/common/entities';

// constants
import { MONEY_DECIMAL_PLACES } from 'src/common/constants';
import { AMOUNT_EXCEEDS_PRICE_ERROR_MESSAGE } from './offers.constants';

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

  @ManyToOne(() => Wish, (wish) => wish.offers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  item: Wish;

  @BeforeInsert()
  @BeforeUpdate()
  amountNotExceedsItemPrice() {
    if (this.amount > this.item.price) {
      throw new BadRequestException(AMOUNT_EXCEEDS_PRICE_ERROR_MESSAGE);
    }
  }

  @ManyToOne(() => User, (user) => user.offers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  proposer: User;
}
