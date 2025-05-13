import { IsNotEmpty, IsNumber, IsString, IsBoolean , IsInt} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProduitDto {
  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsInt()
  @Type(() => Number)
  categorie_id: number;

  @IsNumber()
  prix: number;

  @IsNumber()
  stock: number;

  @IsString()
  statut: string;

  @IsString()
  description: string;

  @IsNumber()
  caracteristique_id: number;

  @IsString()
  image: string;
}