import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

type AuthInput = { email: string; password: string };

@Injectable()
export class AuthentificationService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authentificate(payload: AuthInput) {
    const user = await this.userService.findUserByEmail(payload.email);
    if (!user || user.password !== payload.password) throw new UnauthorizedException();
    return this.login(user);
  }

  async register(payload: AuthInput) {
    const existingUser = await this.userService.findUserByEmail(payload.email);
    if (existingUser) throw new UnauthorizedException('User already exists');
    const newUser = await this.userService.CreateUser(payload.email, payload.password);
    return this.login(newUser);
  }

  async login(user: AuthInput) {
    const tokenPayload = { email: user.email };
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return { access_token: accessToken, email: user.email };
  }
}