import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Utilisateur {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    prenom:string;

    @Column()
    nom:string;

    @Column({nullable:true})
    statut:string;

    @Column()
    email:string;
    
    @Column()
    mot_de_passe: string;

    @Column()
    role:string;

    @Column()
    info_id:number;

    @BeforeInsert()
    setStatut() {
      if (this.role === 'fournisseur') {
        this.statut = 'inactif';
      } else if (this.role === 'client') {
        this.statut = 'actif';
      }
    }
}