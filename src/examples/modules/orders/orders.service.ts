import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';

export interface Order {
  id: number;
  customerId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// In-memory store — resets on server restart and is shared across all requests
const orders: Order[] = [
  {
    id: 1,
    customerId: 1,
    productId: 1,
    productName: 'NestJS Handbook',
    quantity: 1,
    unitPrice: 29.99,
    total: 29.99,
  },
];

@Injectable()
export class OrdersService {
  constructor(
    // Injected from ProductsModule — demonstrates cross-module provider sharing
    private readonly productsService: ProductsService,
  ) {}

  findAll() {
    return {
      module: 'Orders',
      orders,
    };
  }

  findById(id: string) {
    const orderId = Number(id);
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    return {
      module: 'Orders',
      order,
    };
  }

  // Creates an order by looking up the product through the exported ProductsService
  create(dto: CreateOrderDto) {
    const product = this.productsService.findById(dto.productId);
    const total = product.price * dto.quantity;

    const order: Order = {
      id: orders.length + 1,
      customerId: dto.customerId,
      productId: dto.productId,
      productName: product.name,
      quantity: dto.quantity,
      unitPrice: product.price,
      total,
    };

    orders.push(order);

    return {
      module: 'Orders',
      order,
    };
  }
}
