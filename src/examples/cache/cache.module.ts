import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheController } from './cache.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    // With no options, this uses a simple in-memory store — no Redis required.
    // In production you would point it at Redis for a shared cache.
    NestCacheModule.register(),
  ],
  controllers: [CacheController],
  providers: [ProductsService],
})
export class CacheModule {}
