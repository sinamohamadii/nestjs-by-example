import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

// Middleware can also modify the request before the controller sees it.
// Here we attach a unique id so every request can be traced.
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = randomUUID();

    // Add it to the request so controllers/services can read it...
    (req as Request & { requestId: string }).requestId = requestId;

    // ...and to the response headers so the client can see it too.
    res.setHeader('x-request-id', requestId);

    next();
  }
}
