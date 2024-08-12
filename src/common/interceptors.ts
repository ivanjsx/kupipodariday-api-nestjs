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
