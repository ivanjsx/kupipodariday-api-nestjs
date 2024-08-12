// libraries
import { Request } from 'express';
import {
  ForbiddenException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';

// providers
import { WishesService } from './wishes.service';

// constants
import { ONLY_WISH_OWNER_ERROR_MESSAGE } from './wishes.constants';

// content

@Injectable()
export class OnlyWishOwner implements CanActivate {
  constructor(private readonly wishesServise: WishesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const wishId = parseInt(request.params.id);
    const wish = await this.wishesServise.findOnlyOwnerById(wishId);

    console.log('wish.owner', wish.owner);
    console.log('request.user', request.user);

    if (wish.owner !== request.user) {
      throw new ForbiddenException(ONLY_WISH_OWNER_ERROR_MESSAGE);
    }

    return true;
  }
}
