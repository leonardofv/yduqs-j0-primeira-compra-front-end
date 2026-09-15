import { Injectable } from '@nestjs/common';
import { Prisma, type Enrollment } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CpfAlreadyRegisteredError } from './cpf-already-registered.error.js';
import { EnrollmentNotFoundError } from './enrollment-not-found.error.js';

@Injectable()
export class EnrollmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.enrollment.delete({ where: { id } });
    } catch (error) {
      // P2025: nenhum registro encontrado para o ID informado.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new EnrollmentNotFoundError();
      }
      throw error;
    }
  }

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