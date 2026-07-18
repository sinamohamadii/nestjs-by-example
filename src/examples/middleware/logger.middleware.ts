import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Middleware runs BEFORE everything else — before Guards, Pipes, and the controller.
// It has access to the raw request and response, just like Express middleware.
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('LoggerMiddleware');

  // You MUST call next() to pass control to the next handler.
  // Forgetting it leaves the request hanging forever.
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${req.method} ${req.originalUrl}`);
    next();
  }
}
