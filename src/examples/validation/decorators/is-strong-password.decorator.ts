import { registerDecorator, ValidationOptions } from 'class-validator';
import { StrongPasswordConstraint } from '../validators/strong-password.validator';

export function IsStrongPassword(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions, // 👈 THIS is where message is supported
      validator: StrongPasswordConstraint,
    });
  };
}
