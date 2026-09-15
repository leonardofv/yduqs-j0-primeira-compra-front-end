import { Body, Controller, Post } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { EnrollmentsService } from './enrollments.service.js';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }
}