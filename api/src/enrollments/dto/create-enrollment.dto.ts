import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsBoolean, IsEmail, IsISO8601, IsInt, Matches, Max, Min } from 'class-validator';
import { IsValidCpf } from '../validators/is-valid-cpf.decorator.js';
import { IsValidMobilePhone } from '../validators/is-valid-mobile-phone.decorator.js';
import { MinAge } from '../validators/min-age.decorator.js';

const MINIMUM_AGE = 16;
const GRADUATION_YEARS_WINDOW = 20;
const currentYear = new Date().getFullYear();
const oldestGraduationYear = currentYear - GRADUATION_YEARS_WINDOW + 1;

// Nome e sobrenome, com duas letras ou mais.
const FULL_NAME_PATTERN = /^[A-Za-zÀ-ÿ'-]{2,}(\s[A-Za-zÀ-ÿ'-]{2,})+$/;

export class CreateEnrollmentDto {
  @ApiProperty({ example: 'Maria da Silva', description: 'Nome e sobrenome, sem abreviações' })
  @Matches(FULL_NAME_PATTERN, { message: 'Informe nome e sobrenome, sem abreviações' })
  fullName: string;

  @ApiProperty({ example: '529.982.247-25', description: 'CPF válido, com ou sem máscara' })
  @IsValidCpf({ message: 'CPF inválido' })
  cpf: string;

  @ApiProperty({
    example: '2000-05-20',
    format: 'date',
    description: `Data de nascimento (AAAA-MM-DD); idade mínima de ${MINIMUM_AGE} anos`,
  })
  @IsISO8601({ strict: true }, { message: 'Data inválida' })
  @MinAge(MINIMUM_AGE, { message: `Você precisa ter pelo menos ${MINIMUM_AGE} anos` })
  birthDate: string;

  @ApiProperty({ example: 'maria@email.com', format: 'email' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty({ example: '(11) 98765-4321', description: 'Celular brasileiro, com ou sem máscara' })
  @IsValidMobilePhone({ message: 'Celular inválido' })
  phone: string;

  // O exemplo acompanha o ano atual para continuar dentro da janela válida.
  @ApiProperty({
    example: currentYear - 5,
    minimum: oldestGraduationYear,
    maximum: currentYear,
    description: 'Ano de conclusão do ensino médio',
  })
  @IsInt({ message: 'Selecione o ano de conclusão' })
  @Min(oldestGraduationYear, { message: 'Ano de conclusão inválido' })
  @Max(currentYear, { message: 'Ano de conclusão inválido' })
  graduationYear: number;

  @ApiProperty({ example: true, description: 'Aceite dos termos; precisa ser true' })
  @Equals(true, { message: 'É necessário aceitar os termos' })
  acceptedTerms: boolean;

  @ApiProperty({ example: false, description: 'Aceita receber mensagens pelo WhatsApp' })
  @IsBoolean({ message: 'Informe se aceita receber mensagens pelo WhatsApp' })
  whatsappOptIn: boolean;
}
