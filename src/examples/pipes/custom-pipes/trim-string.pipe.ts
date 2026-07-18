import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

// Pipes are not only for numbers — they can clean up strings too.
// This Pipe removes leading and trailing spaces before the controller runs.
@Injectable()
export class TrimStringPipe implements PipeTransform {
  transform(value: string): string {
    // If the value is not a string, there is nothing to trim.
    if (typeof value !== 'string') {
      throw new BadRequestException('value must be a string');
    }

    const trimmed = value.trim();

    // After trimming, the input should not be empty.
    if (trimmed.length === 0) {
      throw new BadRequestException('value must not be empty');
    }

    return trimmed;
  }
}
