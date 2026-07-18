import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

// All routes here live under /guards
@Controller('guards')
export class GuardsController {
  // Step 1 — No guard. Anyone can call this route.
  // Try: GET /guards/public
  @Get('public')
  publicRoute() {
    return { message: 'Anyone can see this.' };
  }

  // Step 2 — Protected by ApiKeyGuard.
  // The request is blocked unless it sends a valid "x-api-key" header.
  // Try: GET /guards/private  with header  x-api-key: secret-123
  @Get('private')
  @UseGuards(ApiKeyGuard)
  privateRoute() {
    return { message: 'You provided a valid API key.' };
  }

  // Step 3 — Two guards run in order: first the API key, then the role check.
  // @Roles('admin') tells RolesGuard which role is required.
  // Try: GET /guards/admin  with  x-api-key: secret-123  and  x-user-role: admin
  @Get('admin')
  @UseGuards(ApiKeyGuard, RolesGuard)
  @Roles('admin')
  adminRoute() {
    return { message: 'Welcome, admin.' };
  }
}
