// src/categorie/categorie.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieProduit } from './categorieid.entity';
import { CategorieService } from './categorieid.service';
import { CategorieController } from './categorieid.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategorieProduit])],
  providers: [CategorieService],
  controllers: [CategorieController],
  exports: [CategorieService]
})
export class CategorieModule {}
