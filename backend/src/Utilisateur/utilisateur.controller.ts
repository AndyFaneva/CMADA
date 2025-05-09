import { Body, Controller, Delete, Get, Param, Patch, Post, Request,UseGuards,UnauthorizedException } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { Utilisateur } from './utilisateur.entity';


@Controller('Utilisateur')
export class UtilisateurController {
    constructor(private readonly service: UtilisateurService){}

    @Get()
    findAll(){
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id')id:number){
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() data: CreateUtilisateurDto): Promise<Utilisateur> {
      return this.service.create(data);
    }
    // LOGIN
    @Post('login')
    async login(@Body() body: { email: string; mot_de_passe: string }) {
        console.log('Email:', body.email);
        console.log('Mot de passe:', body.mot_de_passe);
        return await this.service.login(body.email, body.mot_de_passe);
      }

    @Patch(':id')
    update(@Param('id')id:number, @Body()body:any){
        return this.service.update(id,body);
    }

    @Delete(':id')
    remove(@Param('id')id:number){
        return this.service.delete(id);
    }
}
