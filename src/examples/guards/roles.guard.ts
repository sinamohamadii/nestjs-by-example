import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from './roles.decorator';

// This guard reads the roles set by @Roles(...) and checks the caller's role.
@Injectable()
export class RolesGuard implements CanActivate {
  // Reflector lets a guard read metadata attached by decorators.
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Which roles did the route ask for? (e.g. ['admin'])
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    // No @Roles decorator means the route is open to any role.
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // For this simple demo the caller's role comes from a header.
    // In a real app it would come from the authenticated user.
    const request = context.switchToHttp().getRequest<Request>();
    const userRole = request.headers['x-user-role'];

    if (typeof userRole !== 'string' || !requiredRoles.includes(userRole)) {
      throw new ForbiddenException(`Requires one of these roles: ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}
