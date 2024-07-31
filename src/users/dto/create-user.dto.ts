export class CreateUserDto {
  email: string;
  password: string;
  username: string;

  about?: string;
  avatar?: string;
}
