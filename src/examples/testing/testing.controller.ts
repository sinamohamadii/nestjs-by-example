import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { MathService } from './math.service';

// All routes here live under /testing
@Controller('testing')
export class TestingController {
  constructor(private readonly mathService: MathService) {}

  // Try: GET /testing/add?a=2&b=3  →  { "result": 5 }
  @Get('add')
  add(@Query('a', ParseIntPipe) a: number, @Query('b', ParseIntPipe) b: number) {
    return { result: this.mathService.add(a, b) };
  }
}
