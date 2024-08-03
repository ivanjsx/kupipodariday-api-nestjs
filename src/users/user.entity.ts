// decorators
import { Column, Entity, OneToMany } from 'typeorm';
import { NotEquals, IsEmail, Length, IsUrl } from 'class-validator';

// entities
import { Wish } from 'src/wishes/wish.entity';
import { Offer } from 'src/offers/offer.entity';
import { Wishlist } from 'src/wishlists/wishlist.entity';

// utils
import { IsBcryptHash } from 'src/utils/validators';
import { WithIdAndDates } from 'src/utils/entities';

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
  @IsEmail({
    allow_utf8_local_part: false,
  })
  @Column({
    unique: true,
  })
  email: string;

  @IsBcryptHash()
  @Column({
    select: false,
  })
  password: string;

  @NotEquals('me')
  @NotEquals('admin')
  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH)
  @Column({
    length: MAX_USERNAME_LENGTH,
    unique: true,
  })
  username: string;

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

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Array<Wish>;

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Array<Offer>;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.author)
  wishlists: Array<Wishlist>;
}
