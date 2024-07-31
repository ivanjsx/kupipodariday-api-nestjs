// common

export const MONEY_DECIMAL_PLACES = 2;

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}

// users module

export const MIN_USERNAME_LENGTH = 2;
export const MAX_USERNAME_LENGTH = 30;

export const MIN_USER_ABOUT_LENGTH = 2;
export const MAX_USER_ABOUT_LENGTH = 200;

export const DEFAULT_USER_AVATAR = 'https://i.pravatar.cc/300';
export const DEFAULT_USER_ABOUT = 'Пока ничего не рассказал о себе';

// wishes module

export const MIN_WISH_NAME_LENGTH = 1;
export const MAX_WISH_NAME_LENGTH = 250;

export const MIN_WISH_DESCRIPTION_LENGTH = 1;
export const MAX_WISH_DESCRIPTION_LENGTH = 1024;

export const TOP_WISHES_LIMIT = 20;
export const LAST_WISHES_LIMIT = 40;

// wishlists module

export const MIN_WISHLIST_NAME_LENGTH = 1;
export const MAX_WISHLIST_NAME_LENGTH = 250;

export const MIN_WISHLIST_DESCRIPTION_LENGTH = 1;
export const MAX_WISHLIST_DESCRIPTION_LENGTH = 1500;
