import { Controller, Get, Post, Body, UseGuards, Req, Put, ParseIntPipe, Param } from '@nestjs/common';
import { InformationUtilisateurService } from './information_utilisateur.service';
import { CreateInformationDto } from './dto/create_information_utilisateur.dto';
import { UpdateInformationDto } from './dto/update_information_utilisateur.dto';
import { AuthGuard } from '@nestjs/passport';
import { InformationUtilisateur } from './information_utilisateur.entity';
import { UpdateUtilisateurDto } from 'src/Utilisateur/dto/update-utilisateur.dto';
import { UtilisateurService } from 'src/Utilisateur/utilisateur.service';

@Controller('information')
export class InformationController {
  constructor(private readonly service: InformationUtilisateurService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateInformationDto) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateInformationDto) {
    return this.service.updateInformation(id, updateDto);
  }
  
  
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async get(@Req() req) {
    return this.service.findByUser(req.user.id);
  }

  @Get(':id')
  async getInformation(@Param('id', ParseIntPipe) infoId: number): Promise<InformationUtilisateur> {
    return this.service.findOne(infoId);
  }
}
