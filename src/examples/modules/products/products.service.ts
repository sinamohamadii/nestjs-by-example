import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
}

// In-memory seed data — resets on server restart and is shared across all requests
const products: Product[] = [
  { id: 1, name: 'NestJS Handbook', price: 29.99 },
  { id: 2, name: 'TypeScript Deep Dive', price: 34.99 },
  { id: 3, name: 'Node.js Patterns', price: 24.99 },
];

@Injectable()
export class ProductsService {
  // Returns all products owned by this feature module
  findAll() {
    return {
      module: 'Products',
      products,
    };
  }

  // Used by OrdersService across module boundaries — must be exported from ProductsModule
  findById(id: number): Product {
    const product = products.find((p) => p.id === id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  // HTTP-facing lookup — wraps findById with the standard response envelope
  findOne(id: string) {
    const product = this.findById(Number(id));

    return {
      module: 'Products',
      product,
    };
  }
}
