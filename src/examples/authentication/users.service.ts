import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  username: string;
  password: string;
}

// A tiny in-memory "user table". In a real app this would be a database.
// Passwords are plain text here only to keep the example simple —
// never store plain passwords in production (hash them, e.g. with bcrypt).
@Injectable()
export class UsersService {
  private readonly users: User[] = [{ id: 1, username: 'john', password: 'password123' }];

  findByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
