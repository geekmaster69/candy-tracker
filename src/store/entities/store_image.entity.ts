import { Column, PrimaryGeneratedColumn } from "typeorm";


export enum StoreImageType {
    PROFILE = 'profile',
    MENU = 'menu',
}


export class StoreImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({
        type: 'enum',
        enum: StoreImageType,
    })
    typeImage: StoreImageType;

}