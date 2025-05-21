import { Body, Controller, Delete, Get, Param, Patch, Post, Request,UseGuards,UnauthorizedException, BadRequestException, Put, Req } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { Utilisateur } from './utilisateur.entity';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePasswordDto } from './dto/updatePasswordDto';


@Controller('Utilisateur')
export class UtilisateurController {
    constructor(private readonly service: UtilisateurService){}

    @Get()
    findAll(){
        return this.service.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id')id:number){
    //     return this.service.findOne(id);
    // }

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

    // @Patch(':id')
    // update(@Param('id')id:number, @Body()body:any){
    //     return this.service.update(id,body);
    // }
//changer statut
    @Patch(':id/statut')
async updateStatut(
  @Param('id') id: number,
  @Body('statut') statut: string,
) {
  if (!['actif', 'inactif'].includes(statut)) {
    throw new BadRequestException('Statut invalide');
  }
  return this.service.updateStatut(id, statut);
}

//modifer user
// @Put(':id')
// async updateUtilisateur(@Param('id') id: string, @Body() updateUtilisateurDto: UpdateUtilisateurDto) {
//   try {
//     // Log les données reçues avant de tenter la mise à jour
//     console.log('Données de la requête pour la mise à jour :', updateUtilisateurDto);
//     console.log('ID de l\'utilisateur à mettre à jour :', id);

//     return await this.service.update(Number(id), updateUtilisateurDto);
//   } catch (error) {
//     // Log l'erreur complète
//     console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
//     throw new Error('Mise à jour de l\'utilisateur échouée');
//   }
// }

    @Delete(':id')
    remove(@Param('id')id:number){
        return this.service.delete(id);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@Req() req) {
      console.log('Utilisateur extrait du token dans controller:', req.user);
      return await this.service.findById(req.user.id);
    }

    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateUtilisateurDto: UpdateUtilisateurDto,
    ): Promise<any> {
      console.log('ID reçu :', id);
      console.log('Données reçues dans updateUtilisateurDto :', updateUtilisateurDto);
    
      try {
        const result = await this.service.update1(+id, updateUtilisateurDto);
        console.log('Résultat de la mise à jour :', result);
        return result;
      } catch (error) {
        console.log("Ato");
        console.error('Erreur lors de la mise à jour :', error);
        throw error;
      }
    }
    
    @Put(':id/password')
    async updatePassword(
      @Param('id') id: string,
      @Body() dto: UpdatePasswordDto,
    ): Promise<any> {
      return this.service.updatePassword(+id, dto);
    }
    
    
    

}
