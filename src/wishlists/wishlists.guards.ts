// libraries
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

// types
import { AuthenticatedRequest } from 'src/common/types';

// content

@Injectable()
export class OnlyWishlistAuthor implements CanActivate {
  constructor(private readonly wishlistsService: WishlistsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const wishlistId = parseInt(request.params.id);
    const wishlist = await this.wishlistsService.findByIdOr404(wishlistId);

    console.error('wishlist.author.id');
    console.error(wishlist.author.id);
    console.error('request.user.id');
    console.error(request.user.id);

    if (wishlist.author.id !== request.user.id) {
      throw new ForbiddenException(ONLY_WISHLIST_AUTHOR_ERROR_MESSAGE);
    }

    return true;
  }
}