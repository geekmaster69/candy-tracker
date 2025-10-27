import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, Point, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326, // Sistema de referencia geográfica (WGS84)
    })
    coordinates: Point;

    @OneToMany(() => Promotion,
        (promotion) => promotion.store)
    promotions: Promotion[];


    @OneToMany(() => StoreImage,
        (storeImage) => storeImage.store,
        { cascade: true, eager: true }
    )
    images: StoreImage[]

    @OneToOne(() => StoreImage,
        (storeImage) => storeImage.profileStoreImage, { cascade: true, eager: true })
    profileImage: StoreImage;


    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
