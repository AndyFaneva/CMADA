import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'zD87s9fhsd8fyshdfsdyf@#jksdf908sdjfhsdjf', // 🔐 Remplace par une variable d'env
    });
  }

  async validate(payload: any) {
    return { utilisateur: payload.userId, email: payload.email, role: payload.role };
  }
}
