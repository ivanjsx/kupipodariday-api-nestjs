// decorators
import { IsNumber, IsUrl, Length, Min } from 'class-validator';
import { ManyToMany, ManyToOne, OneToMany, Entity, Column } from 'typeorm';

// entities
import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

// utils
import { WithIdAndDates } from 'src/utils/entities/with-id-and-dates';

// constants
import {
  MIN_WISH_DESCRIPTION_LENGTH,
  MAX_WISH_DESCRIPTION_LENGTH,
  MIN_WISH_NAME_LENGTH,
  MAX_WISH_NAME_LENGTH,
  MONEY_DECIMAL_PLACES,
} from 'src/utils/constants';

// content

@Entity()
export class Wish extends WithIdAndDates {
  @Length(MIN_WISH_NAME_LENGTH, MAX_WISH_NAME_LENGTH)
  @Column({
    length: MAX_WISH_NAME_LENGTH,
  })
  name: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  @Column()
  link: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  @Column()
  image: string;

  @Min(0)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_PLACES,
  })
  @Column({
    scale: MONEY_DECIMAL_PLACES,
  })
  price: number;

  @Length(MIN_WISH_DESCRIPTION_LENGTH, MAX_WISH_DESCRIPTION_LENGTH)
  @Column({
    length: MAX_WISH_DESCRIPTION_LENGTH,
  })
  description: string;

  @Min(0)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_PLACES,
  })
  @Column({
    scale: MONEY_DECIMAL_PLACES,
  })
  raised: number;

  @Min(0)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @Column({
    scale: 0,
  })
  copied: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @Column()
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  @Column({
    array: true,
  })
  offers: Array<Offer>;

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  @Column({
    array: true,
  })
  lists: Array<Wishlist>;
}
