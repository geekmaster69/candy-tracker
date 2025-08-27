import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Promotion } from "./promotions.entity";


@Entity()
export class Store {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'bool',
        default: true,
        primary: true
    })
    isActive: boolean;

    @Column({
        type: 'text'
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
        type: 'simple-array',
        default: []

    })
    socialMedia: string[];


    @Column('decimal', { precision: 10, scale: 6 })
    latitude: number;

    @Column('decimal', { precision: 10, scale: 6 })
    longitude: number;


    @OneToMany(() => Promotion,
        (promotion) => promotion.store)
    promotions: Promotion[];


    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
