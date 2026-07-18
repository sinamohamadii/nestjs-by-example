import { Injectable } from '@nestjs/common';

// This chapter is about Pipes, not products — so the service stays fake and tiny.
// There is no database; we just return predictable data.
@Injectable()
export class ProductsService {
  // By the time this runs, the Pipe has already turned the id into a real number.
  findOne(id: number) {
    return {
      id,
      name: 'Mechanical Keyboard',
      price: 120,
    };
  }

  // Pretend to search for products by keyword.
  // The keyword arrives already trimmed thanks to TrimStringPipe.
  search(keyword: string) {
    return {
      keyword,
      results: [`${keyword} (result 1)`, `${keyword} (result 2)`],
    };
  }
}
