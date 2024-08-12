// libraries
import { Observable, map } from 'rxjs';
import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  Injectable,
} from '@nestjs/common';

// entities
import { User } from 'src/users/users.entities';
import { Wish } from 'src/wishes/wishes.entities';

// content

@Injectable()
export class HidePassword implements NestInterceptor<User, User> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<User> {
    return next.handle().pipe(
      map((user: User) => {
        delete user.password;
        return user;
      }),
    );
  }
}

@Injectable()
export class HideWishes implements NestInterceptor<User, User> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<User> {
    return next.handle().pipe(
      map((user: User) => {
        delete user.wishes;
        return user;
      }),
    );
  }
}

@Injectable()
export class HideHiddenOffers implements NestInterceptor<Wish, Wish> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<Wish>,
  ): Observable<Wish> {
    return next.handle().pipe(
      map((wish: Wish) => {
        wish.offers = wish.offers.filter((offer) => !offer.hidden);
        return wish;
      }),
    );
  }
}
