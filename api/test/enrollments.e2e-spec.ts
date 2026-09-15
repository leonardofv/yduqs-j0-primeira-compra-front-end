import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { validEnrollmentPayload } from './fixtures/enrollment-payload.js';

const FIRST_TEST_CPF = '11144477735';
const SECOND_TEST_CPF = '39053344705';
const TEST_CPFS = [FIRST_TEST_CPF, SECOND_TEST_CPF];
const UNKNOWN_ENROLLMENT_ID = '3f2b8c1e-9a4d-4e7b-8c2a-1d5e6f7a8b9c';

describe('Enrollments (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  // The suite shares the database from DATABASE_URL, so it only removes the
  // rows it creates instead of wiping the table.
  const deleteTestEnrollments = () =>
    prisma.enrollment.deleteMany({ where: { cpf: { in: TEST_CPFS } } });

  const createEnrollment = (cpf: string) =>
    request(app.getHttpServer())
      .post('/enrollments')
      .send({ ...validEnrollmentPayload, cpf });

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);
  });

  beforeEach(async () => {
    await deleteTestEnrollments();
  });

  afterAll(async () => {
    await deleteTestEnrollments();
    await app.close();
  });

  describe('POST /enrollments', () => {
    it('creates an enrollment and returns its id and creation date', async () => {
      const response = await createEnrollment(FIRST_TEST_CPF).expect(201);

      expect(response.body).toEqual({
        id: expect.any(String),
        createdAt: expect.any(String),
      });
    });

    it('stores cpf and phone with digits only when sent masked', async () => {
      await request(app.getHttpServer())
        .post('/enrollments')
        .send({
          ...validEnrollmentPayload,
          cpf: '111.444.777-35',
          phone: '(11) 98765-4321',
        })
        .expect(201);

      const stored = await prisma.enrollment.findUnique({
        where: { cpf: FIRST_TEST_CPF },
      });
      expect(stored?.phone).toBe('11987654321');
    });

    it('returns 400 when the cpf is invalid', async () => {
      const response = await createEnrollment('11111111111').expect(400);

      expect(response.body.message).toContain('CPF inválido');
    });

    it('returns 400 when the payload has a field that is not allowed', async () => {
      await request(app.getHttpServer())
        .post('/enrollments')
        .send({ ...validEnrollmentPayload, cpf: FIRST_TEST_CPF, role: 'admin' })
        .expect(400);
    });

    it('returns 409 when the cpf is already registered', async () => {
      await createEnrollment(FIRST_TEST_CPF).expect(201);

      const response = await createEnrollment(FIRST_TEST_CPF).expect(409);

      expect(response.body.message).toBe('CPF já cadastrado');
    });
  });

  describe('GET /enrollments', () => {
    it('lists enrollments from newest to oldest', async () => {
      const older = await createEnrollment(FIRST_TEST_CPF).expect(201);
      const newer = await createEnrollment(SECOND_TEST_CPF).expect(201);

      const response = await request(app.getHttpServer())
        .get('/enrollments')
        .expect(200);

      const testEnrollmentIds = response.body
        .filter((enrollment: { cpf: string }) => TEST_CPFS.includes(enrollment.cpf))
        .map((enrollment: { id: string }) => enrollment.id);
      expect(testEnrollmentIds).toEqual([newer.body.id, older.body.id]);
    });
  });

  describe('DELETE /enrollments/:id', () => {
    it('deletes the enrollment and confirms it', async () => {
      const created = await createEnrollment(FIRST_TEST_CPF).expect(201);

      const response = await request(app.getHttpServer())
        .delete(`/enrollments/${created.body.id}`)
        .expect(200);

      expect(response.body).toEqual({ message: 'Cadastro excluído com sucesso' });
      const stored = await prisma.enrollment.findUnique({
        where: { id: created.body.id },
      });
      expect(stored).toBeNull();
    });

    it('returns 404 when the enrollment does not exist', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/enrollments/${UNKNOWN_ENROLLMENT_ID}`)
        .expect(404);

      expect(response.body.message).toBe('Cadastro não encontrado');
    });

    it('returns 400 when the id is not a uuid', async () => {
      await request(app.getHttpServer())
        .delete('/enrollments/not-a-uuid')
        .expect(400);
    });
  });
});
