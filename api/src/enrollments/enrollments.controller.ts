import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import {
  EnrollmentCreatedResponseDto,
  EnrollmentDeletedResponseDto,
  EnrollmentResponseDto,
} from './dto/enrollment-responses.dto.js';
import { EnrollmentsService } from './enrollments.service.js';

@ApiTags('enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista as inscrições, das mais recentes para as mais antigas' })
  @ApiOkResponse({ type: [EnrollmentResponseDto] })
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma inscrição' })
  @ApiCreatedResponse({ type: EnrollmentCreatedResponseDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou campos não permitidos' })
  @ApiConflictResponse({ description: 'CPF já cadastrado' })
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui uma inscrição' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID da inscrição' })
  @ApiOkResponse({ type: EnrollmentDeletedResponseDto })
  @ApiBadRequestResponse({ description: 'ID não é um UUID válido' })
  @ApiNotFoundResponse({ description: 'Cadastro não encontrado' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.enrollmentsService.remove(id);
  }
}