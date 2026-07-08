import { Controller, Get, NotFoundException, BadRequestException, InternalServerErrorException, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('filters')
@UseFilters(HttpExceptionFilter)
export class FiltersController {
  @Get('not-found')
  throwNotFound() {
    throw new NotFoundException('This item does not exist');
  }

  @Get('bad-request')
  throwBadRequest() {
    throw new BadRequestException('This request is not valid');
  }

  @Get('server-error')
  throwServerError() {
    throw new InternalServerErrorException('Something went wrong on the server');
  }

  @Get('unknown-error')
  throwUnknownError() {
    throw new Error('This is a random unexpected error');
  }
}