import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produit } from '../produit/produit.entity';

@Entity('categorie_produit')
export class CategorieProduit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @OneToMany(() => Produit, produit => produit.categorie)
  produits: Produit[];
}