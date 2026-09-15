import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  isoDateYearsAgo,
  validEnrollmentPayload,
} from '../../../test/fixtures/enrollment-payload.js';
import { CreateEnrollmentDto } from './create-enrollment.dto.js';

function validationErrors(payload: object) {
  return validate(plainToInstance(CreateEnrollmentDto, payload));
}

async function failedFields(payload: object): Promise<string[]> {
  const errors = await validationErrors(payload);
  return errors.map((error) => error.property);
}

async function messagesFor(field: string, payload: object): Promise<string[]> {
  const errors = await validationErrors(payload);
  const fieldError = errors.find((error) => error.property === field);
  return Object.values(fieldError?.constraints ?? {});
}

describe('CreateEnrollmentDto', () => {
  it('accepts a complete valid payload', async () => {
    expect(await failedFields(validEnrollmentPayload)).toEqual([]);
  });

  it('accepts cpf and phone with their input masks', async () => {
    const maskedPayload = {
      ...validEnrollmentPayload,
      cpf: '529.982.247-25',
      phone: '(11) 98765-4321',
    };

    expect(await failedFields(maskedPayload)).toEqual([]);
  });

  it.each([
    ['fullName', 'without a surname', { fullName: 'Maria' }],
    ['fullName', 'with an abbreviation', { fullName: 'Maria S Souza' }],
    ['cpf', 'with wrong check digits', { cpf: '12345678900' }],
    ['birthDate', 'under the minimum age', { birthDate: isoDateYearsAgo(10) }],
    ['birthDate', 'in the dd/MM/yyyy format', { birthDate: '20/05/2000' }],
    ['email', 'without a domain', { email: 'maria@' }],
    ['phone', 'that is a landline', { phone: '1133334444' }],
    [
      'graduationYear',
      'in the future',
      { graduationYear: new Date().getFullYear() + 1 },
    ],
    [
      'graduationYear',
      'older than the form options',
      { graduationYear: new Date().getFullYear() - 20 },
    ],
    ['acceptedTerms', 'not accepted', { acceptedTerms: false }],
    ['whatsappOptIn', 'that is not a boolean', { whatsappOptIn: 'yes' }],
  ])('rejects %s %s', async (field, _scenario, override) => {
    expect(
      await failedFields({ ...validEnrollmentPayload, ...override }),
    ).toContain(field);
  });

  it('rejects a payload missing a required field', async () => {
    const { email: _email, ...payloadWithoutEmail } = validEnrollmentPayload;

    expect(await failedFields(payloadWithoutEmail)).toContain('email');
  });

  it('rejects a birth date that does not exist as an invalid date', async () => {
    const payload = { ...validEnrollmentPayload, birthDate: '2000-02-31' };

    expect(await messagesFor('birthDate', payload)).toContain('Data inválida');
  });

  it('reports the validation messages in portuguese', async () => {
    const payload = { ...validEnrollmentPayload, cpf: '12345678900' };

    expect(await messagesFor('cpf', payload)).toEqual(['CPF inválido']);
  });
});
