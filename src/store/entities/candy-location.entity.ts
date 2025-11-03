import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, Point, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StoreImage } from "./store-image.entity";
import { User } from "../../auth/entities/user.entity";


@Entity()
export class CandyLocation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'bool',
        default: true,
        primary: true,
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

    @ManyToOne(
        () => User,
        (user) => user.candyLocations,
    )
    user: User

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;



}