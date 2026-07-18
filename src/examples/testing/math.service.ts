import { BadRequestException, Injectable } from '@nestjs/common';

// A tiny service with logic worth testing.
@Injectable()
export class MathService {
  add(a: number, b: number): number {
    return a + b;
  }

  // Division has an edge case (dividing by zero) — exactly the kind of
  // behavior a unit test should pin down.
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new BadRequestException('Cannot divide by zero');
    }
    return a / b;
  }
}
