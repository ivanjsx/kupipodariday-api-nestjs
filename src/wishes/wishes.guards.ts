// libraries
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

// types
import { AuthenticatedRequest } from 'src/common/types';

// content

@Injectable()
export class OnlyWishOwner implements CanActivate {
  constructor(private readonly wishesServise: WishesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const wishId = parseInt(request.params.id);
    const wish = await this.wishesServise.findOnlyOwnerById(wishId);

    console.error('wish.owner.id');
    console.error(wish.owner.id);
    console.error('request.user.id');
    console.error(request.user.id);

    if (wish.owner.id !== request.user.id) {
      throw new ForbiddenException(ONLY_WISH_OWNER_ERROR_MESSAGE);
    }

    return true;
  }
}
