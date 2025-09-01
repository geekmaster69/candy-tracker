import { Column, CreateDateColumn, Entity, OneToOne, Point, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StoreImage } from "./store-image.entity";


@Entity()
export class CandyLocation {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'bool',
        default: true,
        primary: true
    })
    isActive: boolean;


    @Column({
        default: ''
    })
    title: string;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326, // Sistema de referencia geográfica (WGS84)
    })
    coordinates: Point;


    @OneToOne(() => StoreImage,
        (storeImage) => storeImage.candyLocation, { cascade: true, eager: true })
    profileImage: StoreImage;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;



}