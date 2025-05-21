import { IsOptional, IsString } from 'class-validator';

export class UpdateUtilisateurDto {
  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  statut?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  mot_de_passe?: string;

  @IsOptional()
  @IsString()
  confirmation_mot_de_passe?: string;
}
