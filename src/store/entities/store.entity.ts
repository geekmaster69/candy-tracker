import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Promotion, StoreImage } from "./";



@Entity()
export class Store {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'bool',
        default: true,
        primary: true
    })
    isActive: boolean;

    @Column({
        type: 'text',
        unique: true
    })
    title: string;

    @Column({
        type: 'text',
        nullable: true
    })
    storeHours?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    phoneNumber?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    whatsapp?: string;


    @Column({
        type: 'text',
        array: true,
        default: []

    })
    socialMedia: string[];


    @Column('float')
    latitude: number;

    @Column('float')
    longitude: number;



    @OneToMany(() => Promotion,
        (promotion) => promotion.store)
    promotions: Promotion[];


    @OneToMany(() => StoreImage,
        (storeImage) => storeImage.store,
        {cascade: true, eager: true}
    )
    images: StoreImage[]


    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
