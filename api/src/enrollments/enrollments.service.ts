import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CpfAlreadyRegisteredError } from './cpf-already-registered.error.js';
import { EnrollmentNotFoundError } from './enrollment-not-found.error.js';
import { EnrollmentsRepository } from './enrollments.repository.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';

const onlyDigits = (value: string) => value.replace(/\D/g, '');

@Injectable()
export class EnrollmentsService {
  constructor(private readonly enrollmentsRepository: EnrollmentsRepository) {}

  findAll() {
    return this.enrollmentsRepository.findAll();
  }

  async remove(id: string) {
    try {
      await this.enrollmentsRepository.delete(id);
      return { message: 'Cadastro excluído com sucesso' };
    } catch (error) {
      if (error instanceof EnrollmentNotFoundError) {
        throw new NotFoundException('Cadastro não encontrado');
      }
      throw error;
    }
  }

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    try {
      const enrollment = await this.enrollmentsRepository.create({
        ...createEnrollmentDto,
        cpf: onlyDigits(createEnrollmentDto.cpf),
        phone: onlyDigits(createEnrollmentDto.phone),
        birthDate: new Date(createEnrollmentDto.birthDate),
      });
      return { id: enrollment.id, createdAt: enrollment.createdAt };
    } catch (error) {
      if (error instanceof CpfAlreadyRegisteredError) {
        throw new ConflictException('CPF já cadastrado');
      }
      throw error;
    }
  }
}