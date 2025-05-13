import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Controller('produits')
export class ProduitController {
  constructor(private readonly service: ProduitService) {}

  @Post()
  async create(@Body() dto: CreateProduitDto) {
    console.log('CreateProduitDto reçu:', dto);
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    console.log('Récupération de tous les produits');
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('Récupération du produit', id);
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProduitDto,
  ) {
    console.log(`UpdateProduitDto pour id ${id} reçu:`, dto);
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    console.log('Suppression du produit', id);
    return this.service.remove(id);
  }
}
