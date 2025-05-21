import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationUtilisateurService } from './information_utilisateur.service';
import { InformationController } from './information_utilisateur.controller';
import { InformationUtilisateur } from './information_utilisateur.entity';
import { Utilisateur } from 'src/Utilisateur/utilisateur.entity';
import { UtilisateurModule } from 'src/Utilisateur/utilisateur.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InformationUtilisateur, Utilisateur]) ,// 👈 très important
    UtilisateurModule
  ],
  controllers: [InformationController],
  providers: [InformationUtilisateurService],
})
export class InformationUtilisateurModule {}
