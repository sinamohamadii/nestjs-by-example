import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

// Feature module controller — routes are scoped to /orders
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // List all orders: GET /orders
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // Route parameter example: GET /orders/:id
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  // Creates an order using ProductsService from the imported ProductsModule: POST /orders
  @Post()
  create(@Body() createOrder: CreateOrderDto) {
    return this.ordersService.create(createOrder);
  }
}
