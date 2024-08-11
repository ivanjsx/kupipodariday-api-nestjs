// libraries
import { Request } from 'express';
import {
  ForbiddenException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';

// providers
import { WishlistsService } from './wishlists.service';

// constants
import { ONLY_WISHLIST_AUTHOR_ERROR_MESSAGE } from './wishlists.constants';

// content

@Injectable()
export class OnlyWishlistAuthor implements CanActivate {
  constructor(private readonly wishlistsService: WishlistsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const wishlistId = parseInt(request.params.id, 10);
    const wishlist = await this.wishlistsService.findByIdOr404(wishlistId);

    console.log('wishlist.author', wishlist.author);
    console.log('request.user', request.user);

    if (wishlist.author !== request.user) {
      throw new ForbiddenException(ONLY_WISHLIST_AUTHOR_ERROR_MESSAGE);
    }

    return true;
  }
}
