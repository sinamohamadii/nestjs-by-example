import { Injectable, NotFoundException } from '@nestjs/common';

export interface Customer {
  id: number;
  name: string;
  email: string;
}

// In-memory seed data — resets on server restart and is shared across all requests
const customers: Customer[] = [
  { id: 1, name: 'Monte Sina', email: 'monte@example.com' },
  { id: 2, name: 'Alice', email: 'alice@example.com' },
  { id: 3, name: 'John', email: 'john@example.com' },
];

@Injectable()
export class CustomersService {
  // Returns all customers owned by this feature module
  findAll() {
    return {
      module: 'Customers',
      customers,
    };
  }

  // Looks up a single customer by id
  findById(id: string) {
    const customerId = Number(id);
    const customer = customers.find((c) => c.id === customerId);

    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }

    return {
      module: 'Customers',
      customer,
    };
  }
}
