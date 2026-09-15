import { isValidCpf } from '@brazilian-utils/brazilian-utils';
import { ValidateBy, type ValidationOptions } from 'class-validator';

export function IsValidCpf(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isValidCpf',
      validator: {
        validate: (value) => typeof value === 'string' && isValidCpf(value),
      },
    },
    validationOptions,
  );
}