import { IsOptional, IsString } from 'class-validator';

export class UpdateInformationDto {
  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  poste?: string;

  @IsOptional()
  @IsString()
  entreprise?: string;

  // ajoute d'autres champs nécessaires...
}
