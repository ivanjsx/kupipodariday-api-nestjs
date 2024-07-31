// decorators
import { IsNumber, IsString, IsUrl, Length } from 'class-validator';
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
  @IsString()
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

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_PLACES,
  })
  @Column({
    scale: MONEY_DECIMAL_PLACES,
  })
  price: number;

  @IsString()
  @Length(MIN_WISH_DESCRIPTION_LENGTH, MAX_WISH_DESCRIPTION_LENGTH)
  @Column({
    length: MAX_WISH_DESCRIPTION_LENGTH,
  })
  description: string;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_PLACES,
  })
  @Column({
    scale: MONEY_DECIMAL_PLACES,
  })
  raised: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @Column({
    scale: 0,
  })
  copied: number;

  @Column()
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Array<Offer>;

  @Column()
  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  lists: Array<Wishlist>;
}
