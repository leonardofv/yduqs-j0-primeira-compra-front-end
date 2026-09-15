import { Injectable } from '@nestjs/common';
import { Prisma, type Enrollment } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CpfAlreadyRegisteredError } from './cpf-already-registered.error.js';

@Injectable()
export class EnrollmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EnrollmentCreateInput): Promise<Enrollment> {
    try {
      return await this.prisma.enrollment.create({ data });
    } catch (error) {
      // O CPF é a única coluna exclusiva, além do ID gerado.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new CpfAlreadyRegisteredError();
      }
      throw error;
    }
  }
}