import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { TransformInterceptor } from './transform.interceptor';

// All routes here live under /interceptors
@Controller('interceptors')
export class InterceptorsController {
  // Step 1 — No interceptor. The response is returned exactly as written.
  // Try: GET /interceptors/plain
  @Get('plain')
  plain() {
    return { name: 'Keyboard', price: 120 };
  }

  // Step 2 — LoggingInterceptor runs code before and after the handler.
  // Check your server console for the "→" and "←" timing logs.
  // Try: GET /interceptors/logged
  @Get('logged')
  @UseInterceptors(LoggingInterceptor)
  logged() {
    return { name: 'Mouse', price: 40 };
  }

  // Step 3 — TransformInterceptor wraps the response in a standard envelope.
  // The controller still returns plain data; the interceptor reshapes it.
  // Try: GET /interceptors/wrapped
  @Get('wrapped')
  @UseInterceptors(TransformInterceptor)
  wrapped() {
    return { name: 'Monitor', price: 300 };
  }
}
