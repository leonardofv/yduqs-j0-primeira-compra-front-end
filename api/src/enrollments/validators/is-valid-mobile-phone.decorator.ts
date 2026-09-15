import { isValidMobilePhone } from '@brazilian-utils/brazilian-utils';
import { ValidateBy, type ValidationOptions } from 'class-validator';

export function IsValidMobilePhone(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isValidMobilePhone',
      validator: {
        validate: (value) => typeof value === 'string' && isValidMobilePhone(value),
      },
    },
    validationOptions,
  );
}