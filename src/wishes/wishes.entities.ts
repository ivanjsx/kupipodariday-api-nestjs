// decorators
import {
  ManyToMany,
  ManyToOne,
  OneToMany,
  Entity,
  Column,
  Check,
} from 'typeorm';
import {
  IsPositive,
  IsNumber,
  Length,
  IsUrl,
  IsInt,
  Min,
} from 'class-validator';

// entities
import { User } from 'src/users/users.entities';
import { Offer } from 'src/offers/offers.entities';
import { Wishlist } from 'src/wishlists/wishlists.entities';

// utils
import { WithIdAndDates } from 'src/utils/entities';

// constants
import { MONEY_DECIMAL_PLACES } from 'src/utils/constants';
import {
  MIN_WISH_DESCRIPTION_LENGTH,
  MAX_WISH_DESCRIPTION_LENGTH,
  MIN_WISH_NAME_LENGTH,
  MAX_WISH_NAME_LENGTH,
} from './wishes.constants';

// content

@Entity()
@Check(`"raised" <= "price"`)
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
    default: 0,
    type: 'decimal',
    scale: MONEY_DECIMAL_PLACES,
  })
  raised: number;

  @ManyToOne(() => Wish, (wish) => wish.direct_copies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  direct_copy_of: Wish;

  @OneToMany(() => Wish, (wish) => wish.direct_copy_of)
  direct_copies: Array<Wish>;

  @ManyToOne(() => Wish, (wish) => wish.descendant_copies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  root_copy_of: Wish;

  @OneToMany(() => Wish, (wish) => wish.root_copy_of)
  descendant_copies: Array<Wish>;

  @IsInt()
  @Min(0)
  @Column({
    scale: 0,
    default: 0,
  })
  copied: number;

  @ManyToOne(() => User, (user) => user.wishes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Array<Offer>;

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  lists: Array<Wishlist>;
}
