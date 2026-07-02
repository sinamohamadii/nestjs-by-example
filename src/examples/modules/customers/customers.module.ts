import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

// Self-contained feature module — controllers and providers stay within this boundary
@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
