import { AfterLoad, BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
    telephone:string;

    @Column()
    entreprise:string;

    @Column()
    poste:string;

     @Column({ nullable: true })
  image_profil: string;

    @BeforeInsert()
    setStatut() {
      if (this.role === 'fournisseur') {
        this.statut = 'inactif';
      } else if (this.role === 'client') {
        this.statut = 'actif';
      }
    }


}