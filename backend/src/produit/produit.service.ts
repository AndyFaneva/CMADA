// fichier : src/produit/produit.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produit } from './produit.entity';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private readonly produitRepo: Repository<Produit>,
  ) {}

  async create(dto: CreateProduitDto): Promise<Produit> {
    console.log('Service.create DTO:', dto);
    const produitData: Partial<Produit> = {
      reference: dto.reference,
      nom: dto.nom,
      categorieId: dto.categorie_id,
      prix: dto.prix,
      stock: dto.stock,
      statut: dto.statut,
      description: dto.description,
      caracteristique_id: dto.caracteristique_id,
      image: dto.image,
    };
    const produit = this.produitRepo.create(produitData);
    console.log('Entity Produit before save:', produit);
    const saved = await this.produitRepo.save(produit);
    console.log('Entity Produit after save:', saved);
    return saved;
  }

  async findAll(): Promise<Produit[]> {
    console.log('Service.findAll');
    return this.produitRepo.find();
  }

  async findOne(id: number): Promise<Produit> {
    console.log('Service.findOne id =', id);
    const produit = await this.produitRepo.findOne({ where: { id } });
    if (!produit) {
      console.log('Produit not found');
      throw new NotFoundException('Produit introuvable');
    }
    return produit;
  }

  async update(id: number, dto: UpdateProduitDto): Promise<Produit> {
    console.log('Service.update DTO:', dto);
    const produit = await this.findOne(id);
    // Update fields
    if (dto.reference !== undefined) produit.reference = dto.reference;
    if (dto.nom !== undefined) produit.nom = dto.nom;
    if (dto.categorie_id !== undefined) produit.categorieId = dto.categorie_id;
    if (dto.prix !== undefined) produit.prix = dto.prix;
    if (dto.stock !== undefined) produit.stock = dto.stock;
    if (dto.statut !== undefined) produit.statut = dto.statut;
    if (dto.description !== undefined) produit.description = dto.description;
    if (dto.caracteristique_id !== undefined) produit.caracteristique_id = dto.caracteristique_id;
    if (dto.image !== undefined) produit.image = dto.image;

    console.log('Entity Produit before save (update):', produit);
    const saved = await this.produitRepo.save(produit);
    console.log('Entity Produit after save (update):', saved);
    return saved;
  }

  async remove(id: number): Promise<void> {
    console.log('Service.remove id =', id);
    const produit = await this.findOne(id);
    await this.produitRepo.remove(produit);
  }
}