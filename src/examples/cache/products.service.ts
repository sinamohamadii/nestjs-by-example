import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class ProductsService {
  // The cache manager is injected with the CACHE_MANAGER token.
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  // Pretend this is an expensive lookup (a slow database or external API).
  private async slowLookup(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
    return { id, name: 'Mechanical Keyboard', price: 120 };
  }

  async getProduct(id: number) {
    const key = `product:${id}`;

    // 1. Is it already in the cache? If so, return it immediately.
    const cached = await this.cache.get<{ id: number; name: string; price: number }>(key);
    if (cached) {
      return { source: 'cache', product: cached };
    }

    // 2. Not cached — do the slow work, then store the result for next time.
    const product = await this.slowLookup(id);
    await this.cache.set(key, product, 10_000); // keep for 10 seconds (ttl in ms)

    return { source: 'database', product };
  }
}
