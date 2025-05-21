import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Utilisateur } from 'src/Utilisateur/utilisateur.entity';

@Entity()
export class InformationUtilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  poste: string;

  @Column({ nullable: true })
  entreprise: string;

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.info_id)
@JoinColumn({ name: 'user_id' })
utilisateur: Utilisateur;

}
