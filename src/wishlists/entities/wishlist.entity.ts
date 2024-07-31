// decorators
import { IsString, IsUrl, Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

// entities
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

// utils
import { WithIdAndDates } from 'src/utils/entities/with-id-and-dates';

// constants
import {
  MIN_WISHLIST_DESCRIPTION_LENGTH,
  MAX_WISHLIST_DESCRIPTION_LENGTH,
  MIN_WISHLIST_NAME_LENGTH,
  MAX_WISHLIST_NAME_LENGTH,
} from 'src/utils/constants';

// content

@Entity()
export class Wishlist extends WithIdAndDates {
  @IsString()
  @Length(MIN_WISHLIST_NAME_LENGTH, MAX_WISHLIST_NAME_LENGTH)
  @Column({
    length: MAX_WISHLIST_NAME_LENGTH,
  })
  name: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  @Column()
  image: string;

  @IsString()
  @Length(MIN_WISHLIST_DESCRIPTION_LENGTH, MAX_WISHLIST_DESCRIPTION_LENGTH)
  @Column({
    length: MAX_WISHLIST_DESCRIPTION_LENGTH,
  })
  description: string;

  @Column()
  @ManyToOne(() => User, (user) => user.wishlists)
  author: User;

  @Column()
  @ManyToMany(() => Wish, (wish) => wish.lists)
  @JoinColumn()
  items: Array<Wish>;
}
