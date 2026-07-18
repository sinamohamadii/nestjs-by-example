import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

// A Guard is a class that implements CanActivate.
// It answers one yes/no question: "should this request be allowed to continue?"
@Injectable()
export class ApiKeyGuard implements CanActivate {
  // In a real app this would come from configuration, not be hard-coded.
  private readonly validApiKey = 'secret-123';

  // Return true to allow the request, false (or throw) to block it.
  canActivate(context: ExecutionContext): boolean {
    // Pull the raw HTTP request out of the execution context.
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    if (apiKey !== this.validApiKey) {
      // Throwing gives the client a clear 401 instead of a generic 403.
      throw new UnauthorizedException('Invalid or missing API key');
    }

    return true;
  }
}
