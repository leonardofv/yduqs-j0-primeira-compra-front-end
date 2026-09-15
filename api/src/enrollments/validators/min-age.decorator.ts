import { differenceInYears, parseISO } from 'date-fns';
import { ValidateBy, type ValidationOptions } from 'class-validator';

export function MinAge(minimumAge: number, validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'minAge',
      constraints: [minimumAge],
      validator: {
        validate: (value) =>
          typeof value === 'string' && differenceInYears(new Date(), parseISO(value)) >= minimumAge,
      },
    },
    validationOptions,
  );
}