import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, OneToOne, Point, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StoreImage } from "./store-image.entity";
import { User } from "../../auth/entities/user.entity";

@Entity()
export class CandyLocation {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({
        type: 'bool',
        default: true
    })
    isActive: boolean;

    @Column({
        default: ''
    })
    title: string;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    coordinates: Point;

    @OneToMany(() => StoreImage,
        (storeImage) => storeImage.candyLocation, { cascade: true, eager: true })
    storeImages: StoreImage[];

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