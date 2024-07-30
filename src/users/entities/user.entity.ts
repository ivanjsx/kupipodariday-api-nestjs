// decorators
import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsHash, IsString, IsUrl, Length } from 'class-validator';

// entities
import { Wish } from 'src/wishes/entities/wish.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

// utils
import { WithIdAndDates } from 'src/utils/entities/with-id-and-dates';

// constants
import {
  MIN_USER_ABOUT_LENGTH,
  MAX_USER_ABOUT_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  DEFAULT_USER_AVATAR,
  DEFAULT_USER_ABOUT,
} from 'src/utils/constants';

// content

@Entity()
export class User extends WithIdAndDates {
  @IsString()
  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH)
  @Column({
    length: MAX_USERNAME_LENGTH,
    unique: true,
  })
  username: string;

  @IsString()
  @Length(MIN_USER_ABOUT_LENGTH, MAX_USER_ABOUT_LENGTH)
  @Column({
    length: MAX_USER_ABOUT_LENGTH,
    default: DEFAULT_USER_ABOUT,
  })
  about: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  @Column({
    default: DEFAULT_USER_AVATAR,
  })
  avatar: string;

  @IsEmail({
    allow_utf8_local_part: false,
  })
  @Column({
    unique: true,
  })
  email: string;

  @IsHash('sha256')
  @Column()
  password: string;

  @Column()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Array<Wish>;

  @Column()
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Array<Offer>;

  @Column()
  @OneToMany(() => Wishlist, (wishlist) => wishlist.author)
  wishlists: Array<Wishlist>;
}
