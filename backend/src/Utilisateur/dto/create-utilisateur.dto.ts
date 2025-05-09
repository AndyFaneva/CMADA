import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';

export class CreateUtilisateurDto{
    @IsNotEmpty({ message: 'Le prénom est obligatoire.' })
    prenom:string;

    @IsNotEmpty({ message: 'Le prénom est obligatoire.' })
    nom:string;

    @IsEmail({},{message:'Invalide'})
    email:string;


  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
    mot_de_passe: string;

    @IsNotEmpty({ message: 'La confirmation du mot de passe est obligatoire.' })
    confirmation_mot_de_passe: string;
    role:string;
    statut:string;
    info_id?:number;
}