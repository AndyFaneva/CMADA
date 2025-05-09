import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token); // si expiré/invalide, une exception est levée
      return decoded;
    } catch (error) {
      console.error('Token invalide ou expiré', error.message);
      throw new Error('Token invalide ou expiré');
    }
  }
}
