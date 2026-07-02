import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

// Feature module controller — routes are scoped to /products
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // List all products: GET /products
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // Route parameter example: GET /products/:id
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
