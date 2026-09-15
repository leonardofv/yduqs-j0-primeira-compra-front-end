import { ConflictException } from '@nestjs/common';
import { validEnrollmentPayload } from '../../test/fixtures/enrollment-payload.js';
import { CpfAlreadyRegisteredError } from './cpf-already-registered.error.js';
import { EnrollmentsRepository } from './enrollments.repository.js';
import { EnrollmentsService } from './enrollments.service.js';

describe('EnrollmentsService', () => {
  const repository = { create: vi.fn() };
  const service = new EnrollmentsService(
    repository as unknown as EnrollmentsRepository,
  );

  beforeEach(() => {
    repository.create.mockReset();
  });

  it('stores cpf and phone as digits only', async () => {
    repository.create.mockResolvedValue({ id: '1', createdAt: new Date() });

    await service.create({
      ...validEnrollmentPayload,
      cpf: '529.982.247-25',
      phone: '(11) 98765-4321',
    });

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({ cpf: '52998224725', phone: '11987654321' }),
    );
  });

  it('stores the birth date as a date', async () => {
    repository.create.mockResolvedValue({ id: '1', createdAt: new Date() });

    await service.create({
      ...validEnrollmentPayload,
      birthDate: '2000-05-20',
    });

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({ birthDate: new Date('2000-05-20') }),
    );
  });

  it('returns only the id and creation date of the saved enrollment', async () => {
    const createdAt = new Date();
    repository.create.mockResolvedValue({
      ...validEnrollmentPayload,
      id: '1',
      createdAt,
    });

    await expect(service.create(validEnrollmentPayload)).resolves.toEqual({
      id: '1',
      createdAt,
    });
  });

  it('throws a conflict when the cpf is already registered', async () => {
    repository.create.mockRejectedValue(new CpfAlreadyRegisteredError());

    await expect(service.create(validEnrollmentPayload)).rejects.toThrow(
      new ConflictException('CPF já cadastrado'),
    );
  });

  it('rethrows unexpected repository errors', async () => {
    const databaseDown = new Error('connection refused');
    repository.create.mockRejectedValue(databaseDown);

    await expect(service.create(validEnrollmentPayload)).rejects.toBe(
      databaseDown,
    );
  });
});
