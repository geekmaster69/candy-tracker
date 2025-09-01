import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./store.entity";
import { CandyLocation } from "./candy-location.entity";

@Entity()
export class StoreImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(() => Store,
        (store) => store.images, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    store: Store

    @OneToOne(() => Store, store => store.profileImage)
    @JoinColumn() // Esta entidad tendrá la clave foránea
    profileStoreImage: Store;


    @OneToOne(() => CandyLocation, candyLocation => candyLocation.profileImage)
    @JoinColumn() // Esta entidad tendrá la clave foránea
    candyLocation: CandyLocation;

}