import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// The shape every response will be wrapped in.
interface Wrapped<T> {
  success: boolean;
  data: T;
}

// This Interceptor changes the response AFTER the controller returns.
// Whatever the controller returns becomes the `data` field of a standard envelope.
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Wrapped<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Wrapped<T>> {
    return next.handle().pipe(
      // `data` is the controller's return value; we reshape it here.
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
