import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./store.entity";

@Entity()
export class StoreImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(() => Store,
        (store) => store.images, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    store: Store

}