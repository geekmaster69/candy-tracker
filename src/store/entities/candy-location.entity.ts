import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    @Column('float')
    latitude: number;

    @Column('float')
    longitude: number;


}