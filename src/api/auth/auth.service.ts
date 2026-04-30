import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const existing = await this.userRepository.findByEmail(createUserDto.email);
    if (existing) {
      throw new ForbiddenException('Email already registered');
    }

    const user = await this.userRepository.create(createUserDto);
    const { password_hash, ...safe } = user as any;
    const payload = { email: user.email, sub: String(user.id) };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token, user: safe };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password_hash);
    if (!match) return null;
    const { password_hash, ...result } = user as any;
    return result;
  }
  async login(user: { email: string; userId: number | string }) {
    const payload = { email: user.email, sub: String(user.userId) };
    const access_token = await this.jwtService.signAsync(payload, { expiresIn: '2h' });
    return {
      access_token,
      user: { email: user.email, userId: user.userId },
    };
  }

  async userLogin(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new ForbiddenException('Invalid credentials');

    const payload = { sub: String(user.id), email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    const { password_hash, ...safe } = user as any;
    return { access_token, user: safe };
  }
}


