import { Equals, IsBoolean, IsEmail, IsISO8601, IsInt, Matches, Max, Min } from 'class-validator';
import { IsValidCpf } from '../validators/is-valid-cpf.decorator.js';
import { IsValidMobilePhone } from '../validators/is-valid-mobile-phone.decorator.js';
import { MinAge } from '../validators/min-age.decorator.js';

const MINIMUM_AGE = 16;
const GRADUATION_YEARS_WINDOW = 20;
const currentYear = new Date().getFullYear();

// Nome e sobrenome, com duas letras ou mais.
const FULL_NAME_PATTERN = /^[A-Za-zÀ-ÿ'-]{2,}(\s[A-Za-zÀ-ÿ'-]{2,})+$/;

export class CreateEnrollmentDto {
  @Matches(FULL_NAME_PATTERN, { message: 'Informe nome e sobrenome, sem abreviações' })
  fullName: string;

  @IsValidCpf({ message: 'CPF inválido' })
  cpf: string;

  @IsISO8601({ strict: true }, { message: 'Data inválida' })
  @MinAge(MINIMUM_AGE, { message: `Você precisa ter pelo menos ${MINIMUM_AGE} anos` })
  birthDate: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsValidMobilePhone({ message: 'Celular inválido' })
  phone: string;

  @IsInt({ message: 'Selecione o ano de conclusão' })
  @Min(currentYear - GRADUATION_YEARS_WINDOW + 1, { message: 'Ano de conclusão inválido' })
  @Max(currentYear, { message: 'Ano de conclusão inválido' })
  graduationYear: number;

  @Equals(true, { message: 'É necessário aceitar os termos' })
  acceptedTerms: boolean;

  @IsBoolean({ message: 'Informe se aceita receber mensagens pelo WhatsApp' })
  whatsappOptIn: boolean;
}