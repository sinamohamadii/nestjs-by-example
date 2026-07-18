import { Module } from '@nestjs/common';
import { TestingController } from './testing.controller';
import { MathService } from './math.service';

@Module({
  controllers: [TestingController],
  providers: [MathService],
})
export class TestingModule {}
