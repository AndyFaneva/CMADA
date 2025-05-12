import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'zD87s9fhsd8fyshdfsdyf@#jksdf908sdjfhsdjf',
      signOptions: { expiresIn: '5s' },
      //  1h si dans une heure
    }),
  ],
  controllers: [AuthController,AuthController],
  providers: [JwtStrategy],
})
export class AuthModule {}
