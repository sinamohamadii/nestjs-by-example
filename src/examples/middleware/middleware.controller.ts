import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

// All routes here live under /middleware
@Controller('middleware')
export class MiddlewareController {
  // The middleware already ran before this handler was reached.
  // We can read the requestId that RequestIdMiddleware attached to the request.
  // Try: GET /middleware/hello
  @Get('hello')
  hello(@Req() req: Request) {
    const requestId = (req as Request & { requestId?: string }).requestId;
    return {
      message: 'Hello! Check the server logs and the x-request-id header.',
      requestId,
    };
  }
}
