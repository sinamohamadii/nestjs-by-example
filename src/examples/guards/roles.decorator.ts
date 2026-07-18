import { SetMetadata } from '@nestjs/common';

// This key is how the decorator and the guard talk to each other.
export const ROLES_KEY = 'roles';

// A custom decorator that attaches the required roles to a route as metadata.
// Usage:  @Roles('admin')
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
