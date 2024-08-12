export type UserCredentials = {
  id: number;
  username: string;
  password: string;
};

export type AccessToken = {
  access_token: string;
};

export type JwtPayload = {
  username: string;
  sub: number;
};
