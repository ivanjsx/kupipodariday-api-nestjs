export class CreateUserDto {
  email: string;
  username: string;
  password: string;

  about?: string;
  avatar?: string;
}
