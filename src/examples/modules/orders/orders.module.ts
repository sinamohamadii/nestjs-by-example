import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

// Imports ProductsModule (not ProductsService directly) to access the exported provider
@Module({
  imports: [ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
