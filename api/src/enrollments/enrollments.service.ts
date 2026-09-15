import { ConflictException, Injectable } from '@nestjs/common';
import { CpfAlreadyRegisteredError } from './cpf-already-registered.error.js';
import { EnrollmentsRepository } from './enrollments.repository.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';

const onlyDigits = (value: string) => value.replace(/\D/g, '');

@Injectable()
export class EnrollmentsService {
  constructor(private readonly enrollmentsRepository: EnrollmentsRepository) {}

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