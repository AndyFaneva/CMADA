import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Utilisateur {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    prenom:string;

    @Column()
    nom:string;

    @Column({default:"inactif"})
    statut:string;

    @Column()
    email:string;
    
    @Column()
    mot_de_passe: string;

    @Column()
    role:string;

    @Column()
    info_id:number;
}