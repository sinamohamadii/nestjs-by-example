import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { MathService } from './math.service';

// A UNIT test: it checks one service in isolation, with no HTTP involved.
describe('MathService', () => {
  let service: MathService;

  // Build a tiny module that contains only what we're testing.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MathService],
    }).compile();

    service = module.get<MathService>(MathService);
  });

  it('adds two numbers', () => {
    expect(service.add(2, 3)).toBe(5);
  });

  it('divides two numbers', () => {
    expect(service.divide(10, 2)).toBe(5);
  });

  // Always test the edge cases, not just the happy path.
  it('throws when dividing by zero', () => {
    expect(() => service.divide(1, 0)).toThrow(BadRequestException);
  });
});
