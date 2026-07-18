import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

// An Interceptor implements NestInterceptor and wraps the handler.
// It can run code BEFORE and AFTER the controller — great for logging and timing.
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('LoggingInterceptor');

  // `next.handle()` returns a stream that resolves when the controller finishes.
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;

    // ---- BEFORE the controller runs ----
    const startedAt = Date.now();
    this.logger.log(`→ ${method} ${url}`);

    return next.handle().pipe(
      // ---- AFTER the controller has produced a response ----
      tap(() => {
        const ms = Date.now() - startedAt;
        this.logger.log(`← ${method} ${url} (${ms}ms)`);
      }),
    );
  }
}
