import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { CandyLocation } from "./candy-location.entity";

@Entity()
export class StoreImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(() => CandyLocation, candyLocation => candyLocation.images, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

    candyLocation: CandyLocation;

}