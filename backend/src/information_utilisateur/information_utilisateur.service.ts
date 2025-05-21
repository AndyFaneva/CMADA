import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InformationUtilisateur } from './information_utilisateur.entity';
import { CreateInformationDto } from './dto/create_information_utilisateur.dto';
import { UpdateInformationDto } from './dto/update_information_utilisateur.dto';
import { Utilisateur } from 'src/Utilisateur/utilisateur.entity';
import { UpdateUtilisateurDto } from 'src/Utilisateur/dto/update-utilisateur.dto';

@Injectable()
export class InformationUtilisateurService {
  constructor(
    @InjectRepository(InformationUtilisateur)
    private readonly informationRepo: Repository<InformationUtilisateur>,
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepo: Repository<Utilisateur>,
  ) {}

  async create(dto: CreateInformationDto) {
    console.log('DTO reçu :', dto);
  
    const utilisateur = await this.utilisateurRepo.findOne({
      where: { id: dto.user_id },
    });
  
    console.log('Utilisateur trouvé :', utilisateur);
  
    if (!utilisateur) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  
    // Création de l'information liée à l'utilisateur
    const info = this.informationRepo.create({
      telephone: dto.telephone,
      poste: dto.poste,
      entreprise: dto.entreprise,
      utilisateur: utilisateur,
    });
  
    const savedInfo = await this.informationRepo.save(info);
  
    console.log('Information enregistrée :', savedInfo);

    utilisateur.info_id = Object.assign(new InformationUtilisateur(), { id: savedInfo.id });
    // ⚠️ important : objet, pas juste un number
  
    const update = await this.utilisateurRepo.save(utilisateur);
  
    console.log('Utilisateur mis à jour avec info_id :', update);
  
    return savedInfo;
  }
  
  
  
  
  
  
  async findByUser(userId: number): Promise<InformationUtilisateur> {
    const info = await this.informationRepo.findOne({
      where: { utilisateur: { id: userId } },
      relations: ['utilisateur'],
    });
  
    if (!info) throw new NotFoundException('Information non trouvée');
    return info;
  }
  

// information.service.ts
async updateInformation(id: number, updateDto: UpdateInformationDto) {
  console.log('updateInformation appelé avec id =', id);
  console.log('Données à mettre à jour:', updateDto);

  try {
    const result = await this.informationRepo.update(id, updateDto);
    console.log('Résultat update:', result);

    if (result.affected === 0) {
      console.log('Aucune ligne mise à jour (id introuvable?)');
      throw new NotFoundException('Information utilisateur non trouvée');
    }

    return await this.informationRepo.findOneBy({ id });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
    throw error;
  }
}



  

  async findOne(infoId: number): Promise<InformationUtilisateur> {
    const information = await this.informationRepo.findOneBy({ id: infoId });
    if (!information) {
      throw new NotFoundException(`Information avec id ${infoId} non trouvée`);
    }
    return information;
  }
  
}
