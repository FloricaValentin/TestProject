import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!user || user.password !== password) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { email: user.email, sub: user.id };
      const access_token = this.jwtService.sign(payload);

      return { access_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
