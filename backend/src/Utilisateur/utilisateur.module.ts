import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './utilisateur.entity';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  imports:[
    JwtModule.register({
      secret: 'zD87s9fhsd8fyshdfsdyf@#jksdf908sdjfhsdjf', // ou récupéré depuis ConfigService
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Utilisateur]), MailModule],
  providers: [UtilisateurService],
  controllers: [AuthController,UtilisateurController]
})
export class UtilisateurModule {}
