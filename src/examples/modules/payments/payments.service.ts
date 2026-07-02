import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: 'pending' | 'completed';
}

// In-memory store — resets on server restart and is shared across all requests
const payments: Payment[] = [
  { id: 1, orderId: 1, amount: 29.99, status: 'completed' },
];

@Injectable()
export class PaymentsService {
  constructor(
    // Injected from OrdersModule — demonstrates another cross-module import
    private readonly ordersService: OrdersService,
  ) {}

  findAll() {
    return {
      module: 'Payments',
      payments,
    };
  }

  // Processes a payment after verifying the order exists via the exported OrdersService
  create(dto: CreatePaymentDto) {
    this.ordersService.findById(String(dto.orderId));

    const payment: Payment = {
      id: payments.length + 1,
      orderId: dto.orderId,
      amount: dto.amount,
      status: 'completed',
    };

    payments.push(payment);

    return {
      module: 'Payments',
      payment,
    };
  }

  findById(id: string) {
    const paymentId = Number(id);
    const payment = payments.find((p) => p.id === paymentId);

    if (!payment) {
      throw new NotFoundException('Payment not found.');
    }

    return {
      module: 'Payments',
      payment,
    };
  }
}
