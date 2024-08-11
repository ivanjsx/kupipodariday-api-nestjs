import * as bcrypt from 'bcryptjs';

const GENERATED_SALT_LENGTH = 12;

export function hash(password: string): Promise<string> {
  return bcrypt.hash(password, GENERATED_SALT_LENGTH);
}

export function compare(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
