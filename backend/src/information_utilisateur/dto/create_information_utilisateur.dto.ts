import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInformationDto {
  @IsNotEmpty()
  user_id: number;

  @IsOptional()
  telephone?: string;

  @IsOptional()
  poste?: string;

  @IsOptional()
  entreprise?: string;
}
