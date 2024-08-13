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
  constructor(private readonly wishesService: WishesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const wishId = parseInt(request.params.id);
    const wish = await this.wishesService.findOnlyOwnerById(wishId);

    if (wish.owner.id !== request.user.id) {
      throw new ForbiddenException(ONLY_WISH_OWNER_ERROR_MESSAGE);
    }

    return true;
  }
}
