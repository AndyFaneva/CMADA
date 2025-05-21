import { InformationUtilisateur } from "src/information_utilisateur/information_utilisateur.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


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

    @OneToOne(() => InformationUtilisateur, { nullable: true , cascade:true})
    @JoinColumn({ name: 'info_id' })
    info_id?: InformationUtilisateur; 


    @BeforeInsert()
    setStatut() {
      if (this.role === 'fournisseur') {
        this.statut = 'inactif';
      } else if (this.role === 'client') {
        this.statut = 'actif';
      }
    }


}