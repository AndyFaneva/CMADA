import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUtilisateurDto {
  @IsNotEmpty({ message: 'Le prénom est obligatoire.' })
  prenom: string;

  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  nom: string;

  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
  mot_de_passe: string;

  @IsNotEmpty({ message: 'La confirmation du mot de passe est obligatoire.' })
  confirmation_mot_de_passe: string;

  @IsNotEmpty({ message: 'Le rôle est obligatoire.' })
  role: string;

  @IsNotEmpty({ message: 'Le statut est obligatoire.' })
  statut: string;

   @IsOptional()
  telephone?: string;

   @IsOptional()
  entreprise?: string;

   @IsOptional()
  poste?: string;
}
