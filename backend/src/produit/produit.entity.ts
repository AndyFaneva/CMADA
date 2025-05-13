import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategorieProduit } from 'src/categorieid/categorieid.entity';

@Entity('produit')
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: string;

  @Column()
  nom: string;

  @Column({ name: 'categorie_id' })
  categorieId: number;

  // Relation Many-to-One vers CategorieProduit
  @ManyToOne(() => CategorieProduit, cat => cat.produits, { eager: true })
  @JoinColumn({ name: 'categorie_id' })
  categorie: CategorieProduit;

  @Column('decimal', { precision: 10, scale: 2 })
  prix: number;

  @Column()
  stock: number;

  @Column()
  statut: string;

  @Column('text')
  description: string;

  @Column()
  caracteristique_id: number;

  @Column()
  image: string;
}