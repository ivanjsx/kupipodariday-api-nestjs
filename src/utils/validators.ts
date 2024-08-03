import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsBcryptHashConstraint implements ValidatorConstraintInterface {
  defaultMessage(): string {
    return 'provide a valid bcrypt hash';
  }

  validate(value: any): boolean {
    if (typeof value !== 'string') {
      return false;
    }
    return /^\$2[aby]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(value);
  }
}

export function IsBcryptHash(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      validator: IsBcryptHashConstraint,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
    });
  };
}
