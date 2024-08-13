// libraries
import {
  ForbiddenException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';

// providers
import { WishesService } from 'src/wishes/wishes.service';

// constants
import { ONLY_SOMEONE_ELSES_WISH_ERROR_MESSAGE } from './offers.constants';

// types
import { AuthenticatedRequest } from 'src/common/types';

// content

@Injectable()
export class OnlySomeoneElsesWish implements CanActivate {
  constructor(private readonly wishesService: WishesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const wishId = parseInt(request.body.itemId);
    const wish = await this.wishesService.findOnlyOwnerById(wishId);

    if (wish.owner.id === request.user.id) {
      throw new ForbiddenException(ONLY_SOMEONE_ELSES_WISH_ERROR_MESSAGE);
    }

    return true;
  }
}
