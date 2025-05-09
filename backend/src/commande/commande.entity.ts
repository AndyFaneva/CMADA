import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Commande{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    description: string;

    @Column()
    dateCommande: Date;
}