import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MiddlewareController } from './middleware.controller';
import { LoggerMiddleware } from './logger.middleware';
import { RequestIdMiddleware } from './request-id.middleware';

// Unlike Guards or Pipes, middleware is not applied with a decorator.
// The module implements NestModule and wires middleware in configure().
@Module({
  controllers: [MiddlewareController],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // Middleware runs in the order listed here.
      .apply(RequestIdMiddleware, LoggerMiddleware)
      // Choose which routes it applies to. Here: every route under /middleware.
      .forRoutes('middleware');
  }
}
