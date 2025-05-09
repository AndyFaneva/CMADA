import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Utilisateur } from './utilisateur.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UtilisateurService {
    constructor(
        @InjectRepository(Utilisateur)
        private readonly repo: Repository<Utilisateur>,
        private readonly mailService: MailService,
        private jwtService: JwtService
    ){}

    findAll(): Promise<Utilisateur[]>{
        return this.repo.find();
    }

     findOne(id: number): Promise<Utilisateur | null> {
    return this.repo.findOneBy({ id });
  }

  async create(data: CreateUtilisateurDto): Promise<Utilisateur> {
    console.log('👉 Données reçues pour création :', data);
    const { mot_de_passe, confirmation_mot_de_passe, email, ...rest } = data;
  
    // Vérifie que les deux mots de passe sont identiques
    if (mot_de_passe !== confirmation_mot_de_passe) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }
  
    // 🔍 Vérifie si un utilisateur avec cet email existe déjà
    const existingUser = await this.repo.findOne({ where: { email } });
    if (existingUser) {
      console.log("Un utilisateur utilise déjà cette adresse email");
      throw new ConflictException('Un compte avec cet email existe déjà.');
    }
  
    console.log('🔐 Hash du mot de passe en cours...');
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    console.log('✅ Mot de passe hashé.');
  
    const utilisateur = this.repo.create({
      email,
      mot_de_passe: hashedPassword,
      ...rest,
    });
  
    console.log('📦 Utilisateur préparé pour enregistrement :', utilisateur);
    console.log('💾 Enregistrement en base...');
    const savedUser = await this.repo.save(utilisateur);
  
    console.log('📧 Envoi de l’e-mail de bienvenue à :', savedUser.email);
    try {
      await this.mailService.sendMail(
        savedUser.email,
        'Bienvenue sur C\'MADA Pro 🎉',
        ` <table width="100%" cellpadding="0" cellspacing="0" border="0" 
          style="background-size: cover; background-position: center; padding: 40px; background-color:blue; border-radius:20px">
          <tr>
            <td align="center" style="color: white; font-family: Arial, sans-serif; font-size:24">
              <h1>Bonjour ${savedUser.prenom}, ${savedUser.nom}</h1>
              <p>Merci pour votre inscription.</p>
              <img src="https://res.cloudinary.com/ds3kiy1qo/image/upload/v1746685418/Cmada_swo0nc.png" alt="logo"/>
            </td>
          </tr>
        </table>`
      );
      console.log('✅ E-mail envoyé avec succès.');
    } catch (err) {
      console.error('❌ Échec de l’envoi de l’e-mail :', err.message);
    }
  
    return savedUser;
  }
  

    async update(id:number, data: Partial<Utilisateur>): Promise<Utilisateur | null>{
        await this.repo.update(id,data);
        return this.findOne(id);
    }

    delete(id:number): Promise<any>{
        return this.repo.delete(id);
    }

    async findByEmail(email: string): Promise<Utilisateur | null> {
      console.log('Recherche de l\'utilisateur avec l\'email:', email);  // Log de l'email cherché
      const utilisateur = await this.repo.findOne({ where: { email } });
      if (utilisateur) {
        console.log('Utilisateur trouvé:', utilisateur);  // Log si utilisateur trouvé
      } else {
        console.log('Aucun utilisateur trouvé pour cet email');
      }
      return utilisateur;
    }
    
    async login(email: string, mot_de_passe: string): Promise<any> {
      console.log('Début de la connexion pour l\'email:', email);
      
      // Recherche l'utilisateur par email
      const utilisateur = await this.findByEmail(email);
      if (!utilisateur) {
        console.log('Erreur: utilisateur non trouvé pour l\'email:', email);
        throw new UnauthorizedException('Utilisateur non trouvé');
      }
    
      console.log('Utilisateur trouvé:', utilisateur); // Affiche les détails de l'utilisateur trouvé
      // Compare le mot de passe envoyé avec le mot de passe haché stocké dans la base de données
      const passwordValid = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
      console.log('voici',mot_de_passe , 'et ', utilisateur.mot_de_passe)
      console.log('Comparaison du mot de passe:', passwordValid ? 'Mot de passe valide' : 'Mot de passe invalide');
    
      // Si le mot de passe est incorrect, lance une exception
      if (!passwordValid) {
        console.log('Mot de passe invalide pour l\'utilisateur:', email);
        throw new UnauthorizedException('Mot de passe invalide');
      }
    
      // Crée un payload pour le JWT
      const payload = { sub: utilisateur.id, email: utilisateur.email };
      console.log('Payload pour JWT:', payload); // Affiche le payload avant de le signer
    
      // Génère un token JWT avec les informations de l'utilisateur
      const token = this.jwtService.sign(payload);
      console.log('Token JWT généré:', token); // Affiche le token généré
    
      // Retourne le token et les informations de l'utilisateur
      return {
        access_token: token,
        utilisateur, // Tu peux retourner les informations de l'utilisateur ici si besoin
      };
    }
    

}
