import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

// Feature module controller — routes are scoped to /payments
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // List all payments: GET /payments
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  // Route parameter example: GET /payments/:id
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.paymentsService.findById(id);
  }

  // Creates a payment using OrdersService from the imported OrdersModule: POST /payments
  @Post()
  create(@Body() createPayment: CreatePaymentDto) {
    return this.paymentsService.create(createPayment);
  }
}
