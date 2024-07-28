// decorators
import { Column, Entity } from 'typeorm';
import { IsEmail, IsString, IsUrl, Length } from 'class-validator';

// utils
import { WithIdAndDates } from 'src/utils/entities/with-id-and-dates';

// content

@Entity()
export class User extends WithIdAndDates {
  @IsString()
  @Length(2, 30)
  @Column({
    length: 30,
    unique: true,
    update: false,
  })
  username: string;

  @IsString()
  @Length(2, 200)
  @Column({
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  about: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @IsEmail({
    allow_utf8_local_part: false,
  })
  @Column({
    unique: true,
    update: false,
  })
  email: string;

  @Column()
  password: string;

  // wishes
  // offers
  // wishlists
}
