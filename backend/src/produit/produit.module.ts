import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './produit.entity';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { CategorieProduit } from 'src/categorieid/categorieid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produit, CategorieProduit])],
  controllers: [ProduitController],
  providers: [ProduitService],
})
export class ProduitModule {}
