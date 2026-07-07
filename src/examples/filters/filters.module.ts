import { Module } from '@nestjs/common';
import { FiltersController } from './filters.controller';

@Module({
  controllers: [FiltersController],
})
export class FiltersModule {}