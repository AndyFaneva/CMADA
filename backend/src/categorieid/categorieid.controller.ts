// src/categorie/categorie.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategorieService } from './categorieid.service';
import { CreateCategorieDto } from './dto/create-categorieid.dto';
import { UpdateCategorieDto } from './dto/update-categorieid.dto';

@Controller('categorie')
export class CategorieController {
  constructor(private readonly service: CategorieService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateCategorieDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategorieDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
