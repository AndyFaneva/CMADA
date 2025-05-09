import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './commande.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Commande])],
  providers: [CommandeService],
  controllers: [CommandeController]
})
export class CommandeModule {}
