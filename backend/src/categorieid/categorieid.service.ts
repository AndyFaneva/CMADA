// src/categorie/categorie.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategorieProduit } from './categorieid.entity';
import { CreateCategorieDto } from './dto/create-categorieid.dto';
import { UpdateCategorieDto } from './dto/update-categorieid.dto';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(CategorieProduit)
    private repo: Repository<CategorieProduit>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(dto: CreateCategorieDto) {
    const categorie = this.repo.create(dto);
    return this.repo.save(categorie);
  }

  async update(id: number, dto: UpdateCategorieDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
