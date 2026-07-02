import { Module } from '@nestjs/common';
import { BasicsController } from './basics.controller';
import { BasicsService } from './basics.service';

// Registers the basics controller and service as a self-contained feature module
@Module({
  controllers: [BasicsController],
  providers: [BasicsService],
})
export class BasicsModule {}
