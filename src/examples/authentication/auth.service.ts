import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Check the credentials and, if valid, hand back a signed JWT.
  login(username: string, password: string) {
    const user = this.usersService.findByUsername(username);

    // Same error for "no user" and "wrong password" so we don't leak which one failed.
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // The payload is the data we want to carry inside the token.
    // `sub` (subject) is the conventional field for the user id.
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
