import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Store {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({
        type: 'bool',
        default: true
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
        type: 'text',
        default: [],
        array: true,
    })
    socialMedia: string[];

    




}
