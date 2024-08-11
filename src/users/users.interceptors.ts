import { Observable, map } from 'rxjs';
import { User } from 'src/users/users.entities';
import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class HideWishes implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<User> {
    return next.handle().pipe(
      map((user: User) => {
        delete user.wishes;
        return user;
      }),
    );
  }
}
