import { Controller, Get, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';

// Feature module controller — routes are scoped to /customers
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // List all customers: GET /customers
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  // Route parameter example: GET /customers/:id
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.customersService.findById(id);
  }
}
