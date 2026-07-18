import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

// A custom Pipe implements PipeTransform and does its work inside transform().
// This one turns an incoming string into a positive integer, or rejects it.
@Injectable()
export class ParsePositiveIntPipe implements PipeTransform {
  // `value` is the raw value coming from the request (always a string for route params).
  transform(value: string): number {
    const parsed = Number(value);

    // Reject anything that is not a whole number (e.g. "abc" or "1.5").
    if (!Number.isInteger(parsed)) {
      throw new BadRequestException('id must be an integer');
    }

    // Reject zero and negative numbers — a product id must be 1 or greater.
    if (parsed < 1) {
      throw new BadRequestException('id must be a positive number');
    }

    // The returned value is what the controller actually receives.
    return parsed;
  }
}
