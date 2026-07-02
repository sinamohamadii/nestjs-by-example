import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

// Aggregates all feature modules — each child module owns its own controllers and providers
// This module had no controller by itself and it just works as a container for the other modules.
@Module({
  imports: [CustomersModule, ProductsModule, OrdersModule, PaymentsModule],
})
export class ModulesModule {}
