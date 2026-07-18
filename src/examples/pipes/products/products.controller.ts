import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ParsePositiveIntPipe } from '../custom-pipes/parse-positive-int.pipe';
import { TrimStringPipe } from '../custom-pipes/trim-string.pipe';

// All routes here live under /pipes/products
@Controller('pipes/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Step 1 — No Pipe.
  // Route parameters always arrive as strings, so `typeof id` is "string".
  // Try: GET /pipes/products/raw/1
  @Get('raw/:id')
  findRaw(@Param('id') id: string) {
    return { id, type: typeof id };
  }

  // Step 2 — Built-in ParseIntPipe.
  // It converts "1" into the number 1, and returns 400 for non-numeric input.
  // Try: GET /pipes/products/built-in/1  and  GET /pipes/products/built-in/abc
  @Get('built-in/:id')
  findWithBuiltInPipe(@Param('id', ParseIntPipe) id: number) {
    return { id, type: typeof id };
  }

  // Step 3 — Search endpoint using our custom TrimStringPipe.
  // Extra spaces around the keyword are removed before the controller runs.
  // Try: GET /pipes/products/search/   keyboard
  // (declared before ":id" so the word "search" is not treated as an id)
  @Get('search/:keyword')
  search(@Param('keyword', TrimStringPipe) keyword: string) {
    return this.productsService.search(keyword);
  }

  // Step 4 — Our custom ParsePositiveIntPipe.
  // It parses the id and rejects anything that is not a positive integer.
  // Try: GET /pipes/products/1  (ok)  and  /pipes/products/-5 or /0 or /abc (400)
  @Get(':id')
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}
