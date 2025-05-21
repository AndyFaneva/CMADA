import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  mot_de_passe_actuel: string;

  @IsNotEmpty()
  @IsString()
  nouveau_mot_de_passe: string;

  @IsNotEmpty()
  @IsString()
  confirmation_nouveau_mot_de_passe: string;
}
