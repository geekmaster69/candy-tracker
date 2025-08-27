import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./store.entity";


@Entity()
export class Promotion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => Store,
        (store) => store.promotions)
    store: Store;
}