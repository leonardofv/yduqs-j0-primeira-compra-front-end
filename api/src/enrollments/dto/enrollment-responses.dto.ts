import { ApiProperty } from '@nestjs/swagger';

// Classes usadas só para documentar as respostas no Swagger.

export class EnrollmentCreatedResponseDto {
  @ApiProperty({ format: 'uuid', example: '3f2b8c1e-9a4d-4e7b-8c2a-1d5e6f7a8b9c' })
  id: string;

  @ApiProperty({ format: 'date-time', example: '2026-09-15T12:00:00.000Z' })
  createdAt: string;
}

export class EnrollmentResponseDto {
  @ApiProperty({ format: 'uuid', example: '3f2b8c1e-9a4d-4e7b-8c2a-1d5e6f7a8b9c' })
  id: string;

  @ApiProperty({ example: 'Maria da Silva' })
  fullName: string;

  @ApiProperty({ example: '52998224725', description: 'Somente dígitos' })
  cpf: string;

  @ApiProperty({ format: 'date-time', example: '2000-05-20T00:00:00.000Z' })
  birthDate: string;

  @ApiProperty({ format: 'email', example: 'maria@email.com' })
  email: string;

  @ApiProperty({ example: '11987654321', description: 'Somente dígitos' })
  phone: string;

  @ApiProperty({ type: 'integer', example: 2021 })
  graduationYear: number;

  @ApiProperty({ example: true })
  acceptedTerms: boolean;

  @ApiProperty({ example: false })
  whatsappOptIn: boolean;

  @ApiProperty({ format: 'date-time', example: '2026-09-15T12:00:00.000Z' })
  createdAt: string;
}

export class EnrollmentDeletedResponseDto {
  @ApiProperty({ example: 'Cadastro excluído com sucesso' })
  message: string;
}