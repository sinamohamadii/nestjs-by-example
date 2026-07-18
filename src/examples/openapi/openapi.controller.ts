import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

// @ApiTags groups these routes under one heading in the Swagger UI.
@ApiTags('products')
@Controller('openapi/products')
export class OpenapiController {
  private readonly products: Array<{ id: number; name: string; price: number }> = [];

  // @ApiOperation adds a human-readable summary for this endpoint.
  @ApiOperation({ summary: 'List all products' })
  @Get()
  findAll() {
    return this.products;
  }

  // @ApiResponse documents what a successful response looks like.
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: 201, description: 'The product was created.' })
  @Post()
  create(@Body(new ValidationPipe()) dto: CreateProductDto) {
    const product = { id: this.products.length + 1, ...dto };
    this.products.push(product);
    return product;
  }
}
