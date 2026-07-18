import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';

// All routes here live under /cache
@Controller('cache')
export class CacheController {
  constructor(private readonly productsService: ProductsService) {}

  // Try: GET /cache/products/1
  // The FIRST call is slow (source: "database").
  // Repeat within 10 seconds and it is fast (source: "cache").
  @Get('products/:id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProduct(id);
  }
}
