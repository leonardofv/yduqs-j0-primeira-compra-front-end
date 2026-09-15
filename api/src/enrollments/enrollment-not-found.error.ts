export class EnrollmentNotFoundError extends Error {
  constructor() {
    super('Enrollment not found');
    this.name = 'EnrollmentNotFoundError';
  }
}