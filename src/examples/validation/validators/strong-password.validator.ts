import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'StrongPassword', async: false })
export class StrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string): boolean {
    if (typeof password !== 'string') {
      return false;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`';]/.test(
      password,
    );

    return hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`;
  }
}
